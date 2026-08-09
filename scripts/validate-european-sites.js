const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const languages = ['de', 'es', 'fr'];
const errors = new Map();

function add(type, detail) {
  if (!errors.has(type)) errors.set(type, []);
  errors.get(type).push(detail);
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name === 'index.html') files.push(full);
  }
  return files;
}

for (const lang of languages) {
  const langRoot = path.join(root, lang);
  const files = walk(langRoot);
  if (files.length !== 86) add('page-count', `${lang}: ${files.length}`);

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(langRoot, file).replace(/\\/g, '/').replace(/index\.html$/, '');
    const expected = `https://hlctex.com/${lang}/${rel}`;
    if (!new RegExp(`<html[^>]+lang=["']${lang}["']`, 'i').test(html)) add('html-lang', file);
    if (!html.includes(`<link rel="canonical" href="${expected}">`)) add('canonical', `${file} -> ${expected}`);
    const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)"/g)].map(match => match[1]);
    const required = ['en', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ru', 'de', 'es', 'fr', 'x-default'];
    for (const code of required) if (!alternates.includes(code)) add('hreflang', `${file}: ${code}`);
    if (/HLCSEP|ZXQ\s*\d+\s*QXZ|�/.test(html)) add('translation-artifact', file);

    for (const match of html.matchAll(/href=["'](\/(?:de|es|fr)\/[^"'#?]*)["']/g)) {
      const href = match[1];
      const target = path.join(root, href.replace(/^\//, ''), 'index.html');
      if (!fs.existsSync(target)) add('broken-local-link', `${file}: ${href}`);
    }
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const lang of languages) {
  const count = (sitemap.match(new RegExp(`<loc>https://hlctex\\.com/${lang}/`, 'g')) || []).length;
  if (count !== 86) add('sitemap-count', `${lang}: ${count}`);
}
if (/\/(?:de|es|fr)\/(?:admin|motion-preview|textile\/product-template)\//.test(sitemap)) {
  add('private-route-in-sitemap', 'Excluded route found');
}

if (!errors.size) {
  console.log('PASS: 86 public pages per language; canonical, hreflang, links and sitemap are valid.');
  process.exit(0);
}

for (const [type, details] of errors) {
  console.log(`${type}: ${details.length}`);
  for (const detail of details.slice(0, 5)) console.log(`  ${detail}`);
}
process.exit(1);
