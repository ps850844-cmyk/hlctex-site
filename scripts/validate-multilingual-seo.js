const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const origin = 'https://hlctex.com';
const locales = ['ko', 'ja', 'de', 'es', 'fr', 'ru', 'zh-tw'];
const hreflangForLocale = {
  ko: 'ko',
  ja: 'ja',
  de: 'de',
  es: 'es',
  fr: 'fr',
  ru: 'ru',
  'zh-tw': 'zh-hant',
};
const errors = [];

function walk(directory, result = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    // Generated import previews are local workflow artifacts, not deployed pages.
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'outputs') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath, result);
    else result.push(fullPath);
  }
  return result;
}

function routeFor(file) {
  const relative = path.relative(root, file).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return match ? match[1] : '';
}

function firstTag(html, name, predicate = () => true) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))]
    .map((match) => match[0])
    .find(predicate) || '';
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function localTarget(href, currentRoute) {
  if (!href || /^(?:#|mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  let url;
  try {
    url = new URL(href, `${origin}${currentRoute}`);
  } catch {
    return null;
  }
  if (url.hostname !== 'hlctex.com' && url.hostname !== 'www.hlctex.com') return null;
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    pathname = url.pathname;
  }
  if (pathname.endsWith('/')) return path.join(root, pathname.slice(1), 'index.html');
  const direct = path.join(root, pathname.slice(1));
  if (path.extname(pathname)) return direct;
  return path.join(direct, 'index.html');
}

const allFiles = walk(root);
const htmlFiles = allFiles.filter((file) => path.basename(file) === 'index.html');
const records = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  const robotsTag = firstTag(html, 'meta', (tag) => attr(tag, 'name').toLowerCase() === 'robots');
  const noindex = /\bnoindex\b/i.test(attr(robotsTag, 'content'));
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim() || '';
  const descriptionTag = firstTag(html, 'meta', (tag) => attr(tag, 'name').toLowerCase() === 'description');
  const canonicalTag = firstTag(html, 'link', (tag) => attr(tag, 'rel').toLowerCase() === 'canonical');
  const alternates = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((match) => match[0])
    .filter((tag) => attr(tag, 'rel').toLowerCase() === 'alternate' && attr(tag, 'hreflang'))
    .map((tag) => ({ lang: attr(tag, 'hreflang').toLowerCase(), href: attr(tag, 'href') }));
  records.set(route, {
    file,
    html,
    route,
    noindex,
    title,
    description: attr(descriptionTag, 'content').trim(),
    canonical: attr(canonicalTag, 'href'),
    alternates,
    text: visibleText(html),
  });
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1].trim());
const sitemapSet = new Set(sitemapUrls);
if (sitemapSet.size !== sitemapUrls.length) errors.push('sitemap.xml contains duplicate URLs');

const indexable = [...records.values()].filter((record) => !record.noindex);
for (const record of indexable) {
  const expectedCanonical = `${origin}${record.route}`;
  if (!record.title) errors.push(`${record.route}: missing title`);
  if (!record.description) errors.push(`${record.route}: missing meta description`);
  if (record.canonical !== expectedCanonical) errors.push(`${record.route}: incorrect canonical ${record.canonical}`);
  if (!sitemapSet.has(expectedCanonical)) errors.push(`${record.route}: absent from sitemap.xml`);

  const alternateMap = new Map();
  for (const alternate of record.alternates) {
    if (alternateMap.has(alternate.lang)) errors.push(`${record.route}: duplicate hreflang ${alternate.lang}`);
    alternateMap.set(alternate.lang, alternate.href);
  }
  const routeLocale = record.route.split('/')[1];
  if (locales.includes(routeLocale) && alternateMap.get(hreflangForLocale[routeLocale]) !== expectedCanonical) {
    errors.push(`${record.route}: missing or incorrect self hreflang`);
  }
  if (!alternateMap.has('x-default')) errors.push(`${record.route}: missing x-default hreflang`);

  for (const [lang, href] of alternateMap) {
    if (lang === 'x-default') continue;
    let alternateRoute;
    try {
      alternateRoute = new URL(href).pathname;
    } catch {
      errors.push(`${record.route}: invalid hreflang URL ${href}`);
      continue;
    }
    const target = records.get(alternateRoute);
    if (!target || target.noindex) {
      errors.push(`${record.route}: hreflang ${lang} points to missing/non-indexable ${alternateRoute}`);
      continue;
    }
    const reciprocal = target.alternates.some((item) => item.href === expectedCanonical);
    if (!reciprocal) errors.push(`${record.route}: hreflang ${lang} is not reciprocal`);
  }

  for (const match of record.html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attr(match[1], 'type').toLowerCase() !== 'application/ld+json') continue;
    try {
      JSON.parse(match[2]);
    } catch (error) {
      errors.push(`${record.route}: invalid JSON-LD (${error.message})`);
    }
  }
  const productObjects = (record.html.match(/"@type"\s*:\s*"Product"/gi) || []).length;
  if (productObjects > 1) errors.push(`${record.route}: duplicate Product structured data (${productObjects})`);

  for (const match of record.html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = attr(tag, 'src');
    if (!attr(tag, 'alt').trim()) errors.push(`${record.route}: image without alt (${src})`);
    const target = localTarget(src, record.route);
    if (target && !fs.existsSync(target)) errors.push(`${record.route}: missing image ${src}`);
  }

  for (const match of record.html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(match[0], 'href');
    const target = localTarget(href, record.route);
    if (target && !fs.existsSync(target)) errors.push(`${record.route}: broken internal link ${href}`);
  }
}

for (const url of sitemapSet) {
  let route;
  try {
    route = new URL(url).pathname;
  } catch {
    errors.push(`sitemap.xml contains invalid URL ${url}`);
    continue;
  }
  const target = records.get(route);
  if (!target || target.noindex) errors.push(`sitemap.xml lists missing/non-indexable ${route}`);
}

const untranslatedPhrases = [
  'View Product',
  'View Fabric',
  'Current Price',
  'Product Description',
  'Test Results',
  'Request Sample',
  'Why choose HLC',
  'Contact HLC',
  'Global Shipping',
  'Sample lead time',
  'Bulk lead time',
  'Factory area',
  'Production hours',
  'Related Products',
  'Applications',
  'Product Details',
];

for (const locale of locales) {
  const localized = indexable.filter((record) => record.route.startsWith(`/${locale}/`) || record.route === `/${locale}/`);
  for (const record of localized) {
    const counts = {
      hangul: (record.text.match(/[\uac00-\ud7a3]/g) || []).length,
      kana: (record.text.match(/[\u3040-\u30ff]/g) || []).length,
      cyrillic: (record.text.match(/[\u0400-\u04ff]/g) || []).length,
      cjk: (record.text.match(/[\u3400-\u9fff]/g) || []).length,
      replacement: (record.text.match(/\ufffd/g) || []).length,
    };
    if (locale === 'ko' && counts.hangul < 20) errors.push(`${record.route}: insufficient Korean content`);
    if (locale === 'ja' && counts.kana < 10) errors.push(`${record.route}: insufficient Japanese content`);
    if (locale === 'ru' && counts.cyrillic < 20) errors.push(`${record.route}: insufficient Russian content`);
    if (locale === 'zh-tw' && counts.cjk < 20) errors.push(`${record.route}: insufficient Traditional Chinese content`);
    if (['de', 'es', 'fr'].includes(locale) && (counts.hangul + counts.kana + counts.cyrillic > 0 || counts.cjk > 4)) {
      errors.push(`${record.route}: unexpected Asian/Cyrillic script in ${locale} page`);
    }
    if (counts.replacement) errors.push(`${record.route}: Unicode replacement characters found`);

    for (const phrase of untranslatedPhrases) {
      if (record.text.includes(phrase)) errors.push(`${record.route}: untranslated phrase "${phrase}"`);
    }

    const englishRoute = record.route.replace(new RegExp(`^/${locale}`), '') || '/';
    const english = records.get(englishRoute);
    if (english && !english.noindex) {
      if (record.title === english.title) errors.push(`${record.route}: title duplicates English page`);
      if (record.description === english.description) errors.push(`${record.route}: description duplicates English page`);
    }
  }
}

for (const locale of ['ko', 'zh-tw']) {
  for (const record of indexable.filter((item) => item.route === `/${locale}/` || item.route.startsWith(`/${locale}/`))) {
    for (const tag of record.html.matchAll(/<a\b[^>]*>/gi)) {
      if (attr(tag[0], 'aria-label').toLowerCase() === 'english' && attr(tag[0], 'href') !== '/') {
        errors.push(`${record.route}: English language switch points to ${attr(tag[0], 'href')}`);
      }
    }
  }
}

console.log(`HTML pages: ${records.size}`);
console.log(`Indexable pages: ${indexable.length}`);
console.log(`Sitemap URLs: ${sitemapSet.size}`);
for (const locale of locales) {
  console.log(`${locale}: ${indexable.filter((record) => record.route === `/${locale}/` || record.route.startsWith(`/${locale}/`)).length} indexable pages`);
}

if (errors.length) {
  console.error(`Validation errors: ${errors.length}`);
  for (const error of errors.slice(0, 150)) console.error(`- ${error}`);
  if (errors.length > 150) console.error(`... ${errors.length - 150} more`);
  process.exit(1);
}

console.log('Multilingual SEO validation passed with 0 errors.');
