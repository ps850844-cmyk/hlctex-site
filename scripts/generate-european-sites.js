const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = path.resolve(__dirname, '..');
const today = '2026-08-09';
const languages = {
  de: { html: 'de', label: 'Deutsch' },
  es: { html: 'es', label: 'Español' },
  fr: { html: 'fr', label: 'Français' }
};
const languagePrefixes = new Set(['zh', 'zh-tw', 'ja', 'ko', 'ru', 'de', 'es', 'fr']);
const protectedWords = [
  'HLC', 'BCI', 'SUPIMA', 'Giza', 'OEKO-TEX', 'RWS', 'ZQ Merino', 'EcoCosy',
  'TANBOOCEL', 'Lafer', 'Pukwang', 'WL Dye', 'Style#', 'MOQ', 'MCQ', 'USD',
  'ASTM', 'AATCC', 'JIS', 'GRS', 'OCS', 'GOTS', 'ISO', 'Higg Index'
];

const manualTranslations = {
  de: {
    'Home': 'Startseite', 'Products': 'Produkte', 'Product': 'Produkt', 'About HLC': 'Über HLC',
    'Sustainability': 'Nachhaltigkeit', 'Careers': 'Karriere', 'Contact': 'Kontakt',
    'Product Description': 'Produktbeschreibung', 'Details': 'Details', 'Test Results': 'Testergebnisse',
    'Other': 'Weitere Informationen', 'Features': 'Merkmale', 'Composition': 'Zusammensetzung',
    'Weight': 'Gewicht', 'Width': 'Breite', 'Construction': 'Struktur', 'Applications': 'Anwendungen',
    'Request Sample': 'Muster anfordern', 'Global Shipping': 'Weltweiter Versand', 'View Fabric': 'Stoff ansehen',
    'View Product': 'Produkt ansehen', 'Why choose HLC?': 'Warum HLC wählen?', 'Valid through': 'Gültig bis',
    'Sample lead time': 'Musterlieferzeit', 'Bulk lead time': 'Lieferzeit für Großaufträge'
  },
  es: {
    'Home': 'Inicio', 'Products': 'Productos', 'Product': 'Producto', 'About HLC': 'Acerca de HLC',
    'Sustainability': 'Sostenibilidad', 'Careers': 'Empleo', 'Contact': 'Contacto',
    'Product Description': 'Descripción del producto', 'Details': 'Detalles', 'Test Results': 'Resultados de las pruebas',
    'Other': 'Más información', 'Features': 'Características', 'Composition': 'Composición',
    'Weight': 'Peso', 'Width': 'Ancho', 'Construction': 'Estructura', 'Applications': 'Aplicaciones',
    'Request Sample': 'Solicitar muestra', 'Global Shipping': 'Envíos internacionales', 'View Fabric': 'Ver tejido',
    'View Product': 'Ver producto', 'Why choose HLC?': '¿Por qué elegir HLC?', 'Valid through': 'Válido hasta',
    'Sample lead time': 'Plazo de entrega de muestras', 'Bulk lead time': 'Plazo de entrega de producción'
  },
  fr: {
    'Home': 'Accueil', 'Products': 'Produits', 'Product': 'Produit', 'About HLC': 'À propos de HLC',
    'Sustainability': 'Développement durable', 'Careers': 'Carrières', 'Contact': 'Contact',
    'Product Description': 'Description du produit', 'Details': 'Détails', 'Test Results': 'Résultats des tests',
    'Other': 'Autres informations', 'Features': 'Caractéristiques', 'Composition': 'Composition',
    'Weight': 'Poids', 'Width': 'Largeur', 'Construction': 'Structure', 'Applications': 'Applications',
    'Request Sample': 'Demander un échantillon', 'Global Shipping': 'Expédition internationale', 'View Fabric': 'Voir le tissu',
    'View Product': 'Voir le produit', 'Why choose HLC?': 'Pourquoi choisir HLC ?', 'Valid through': "Valable jusqu'au",
    'Sample lead time': 'Délai pour les échantillons', 'Bulk lead time': 'Délai de production'
  }
};

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'outputs') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function routeFromFile(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '';
  return rel.replace(/\/index\.html$/, '');
}

const sourceFiles = walk(root).filter(file => {
  if (path.basename(file) !== 'index.html') return false;
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const first = rel.split('/')[0];
  if (languagePrefixes.has(first) || rel.startsWith('assets/') || rel.startsWith('scripts/')) return false;
  if (rel.startsWith('admin/')) return false;
  const html = fs.readFileSync(file, 'utf8');
  return !/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
});
const routes = sourceFiles.map(routeFromFile);
const routeSet = new Set(routes);

function protect(text) {
  const values = [];
  let output = text;
  for (const word of protectedWords) {
    output = output.split(word).join(`ZXQ${values.push(word) - 1}QXZ`);
  }
  output = output.replace(/\b(?:HLC-[A-Z0-9-]+|BV[A-Z0-9-]*-?\d*|\d+(?:\.\d+)?\s?(?:g\/m²|gsm|cm|m²|kg|yd|USD))\b/gi, match => `ZXQ${values.push(match) - 1}QXZ`);
  output = output.replace(/[\/#?&]/g, match => `ZXQ${values.push(match) - 1}QXZ`);
  return { output, values };
}

function restore(text, values) {
  return text.replace(/ZXQ\s*(\d+)\s*QXZ/gi, (_, n) => values[Number(n)] ?? _);
}

const caches = {};
for (const lang of Object.keys(languages)) {
  const file = path.join(root, 'scripts', `.translation-cache-${lang}.json`);
  caches[lang] = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  Object.assign(caches[lang], manualTranslations[lang]);
}

function needsTranslation(text) {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > 1 && /[A-Za-z]/.test(t) && !/^(https?:|mailto:|tel:|#|\/)/i.test(t) && !/^[\d\s.,:%+\-\/()#&|]+$/.test(t);
}

function translateBatch(lang, texts) {
  const missing = [...new Set(texts.filter(needsTranslation).filter(t => !caches[lang][t]))];
  for (let start = 0; start < missing.length; ) {
    const group = [];
    let size = 0;
    while (start < missing.length && group.length < 8) {
      const item = missing[start];
      if (group.length && size + item.length > 1200) break;
      group.push(item); size += item.length; start++;
    }
    const protectedGroup = group.map(protect);
    const joined = protectedGroup.map((x, i) => `HLCSEP${i}START ${x.output} HLCSEP${i}END`).join('\n');
    let raw = '', data = null;
    for (let attempt = 0; attempt < 6; attempt++) {
      try {
        raw = cp.execFileSync('curl.exe', [
          '--max-time', '45', '-sS', `https://lingva.ml/api/v1/en/${lang}/${encodeURIComponent(joined)}`
        ], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
        if (raw.trim().startsWith('{')) {
          const response = JSON.parse(raw);
          if (response.translation) { data = [[response.translation]]; break; }
        }
      } catch (error) {
        if (attempt === 5) throw error;
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1500 + attempt * 1000);
    }
    if (!data) throw new Error(`Translation service did not return JSON for ${lang}`);
    const translated = Array.isArray(data[0]) ? (data[0] || []).map(part => Array.isArray(part) ? part[0] : part).join('') : String(data[0] || '');
    for (let i = 0; i < group.length; i++) {
      const re = new RegExp(`HLCSEP\\s*${i}\\s*START\\s*([\\s\\S]*?)\\s*HLCSEP\\s*${i}\\s*END`, 'i');
      const match = translated.match(re);
      caches[lang][group[i]] = restore(match ? match[1].trim() : group[i], protectedGroup[i].values);
    }
    fs.writeFileSync(path.join(root, 'scripts', `.translation-cache-${lang}.json`), JSON.stringify(caches[lang], null, 2), 'utf8');
  }
}

function visibleTexts(html) {
  const protectedBlocks = [];
  const masked = html.replace(/<(script|style|svg|code|pre)\b[\s\S]*?<\/\1>/gi, block => `HLCBLOCK${protectedBlocks.push(block) - 1}`);
  const texts = [];
  masked.replace(/>([^<]+)</g, (_, text) => { const t = text.replace(/\s+/g, ' ').trim(); if (needsTranslation(t)) texts.push(t); return _; });
  masked.replace(/\b(?:alt|title|aria-label|placeholder)="([^"]+)"/gi, (_, text) => { if (needsTranslation(text)) texts.push(text); return _; });
  return texts;
}

function metaTexts(html) {
  const texts = [];
  html.replace(/<meta\b[^>]*>/gi, tag => {
    const key = (tag.match(/\b(?:name|property)="([^"]+)"/i) || [])[1] || '';
    const value = (tag.match(/\bcontent="([^"]+)"/i) || [])[1] || '';
    if (/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key) && needsTranslation(value)) texts.push(value);
    return tag;
  });
  return texts;
}

function jsonLdTexts(html) {
  const texts = [];
  html.replace(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, (_, jsonText) => {
    let data; try { data = JSON.parse(jsonText); } catch { return _; }
    (function collect(obj) {
      if (!obj || typeof obj !== 'object') return;
      for (const [key, value] of Object.entries(obj)) {
        if (['name', 'description', 'category', 'audience', 'headline'].includes(key) && typeof value === 'string' && needsTranslation(value)) texts.push(value);
        else collect(value);
      }
    })(data);
    return _;
  });
  return texts;
}

function translateHtml(html, lang) {
  const blocks = [];
  let masked = html.replace(/<(script|style|svg|code|pre)\b[\s\S]*?<\/\1>/gi, block => `HLCBLOCK${blocks.push(block) - 1}`);
  masked = masked.replace(/>([^<]+)</g, (whole, text) => {
    const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0], t = text.replace(/\s+/g, ' ').trim();
    return needsTranslation(t) ? `>${lead}${caches[lang][t] || t}${trail}<` : whole;
  });
  masked = masked.replace(/\b(alt|title|aria-label|placeholder)="([^"]+)"/gi, (whole, attr, text) =>
    needsTranslation(text) ? `${attr}="${(caches[lang][text] || text).replace(/"/g, '&quot;')}"` : whole);
  return masked.replace(/HLCBLOCK(\d+)/g, (_, n) => blocks[Number(n)]);
}

function translateMeta(html, lang) {
  return html.replace(/<meta\b[^>]*>/gi, tag => {
    const key = (tag.match(/\b(?:name|property)="([^"]+)"/i) || [])[1] || '';
    const value = (tag.match(/\bcontent="([^"]+)"/i) || [])[1] || '';
    if (!/^(?:description|og:title|og:description|twitter:title|twitter:description)$/i.test(key) || !needsTranslation(value)) return tag;
    const translated = (caches[lang][value] || value).replace(/"/g, '&quot;');
    return tag.replace(/\bcontent="[^"]+"/i, `content="${translated}"`);
  });
}

function localizedPath(url, lang) {
  if (!url.startsWith('/') || url.startsWith('//')) return url;
  if (/^\/(?:assets|images|media|uploads|favicon|robots\.txt|sitemap\.xml|[\w-]+\.(?:txt|xml|ico))/i.test(url)) return url;
  const clean = url.split(/[?#]/)[0].replace(/^\//, '').replace(/\/$/, '');
  const suffix = url.slice(url.split(/[?#]/)[0].length);
  const parts = clean.split('/');
  if (languagePrefixes.has(parts[0])) parts.shift();
  const route = parts.join('/');
  if (!routeSet.has(route)) return url;
  return `/${lang}/${route ? `${route}/` : ''}${suffix}`;
}

function routeUrl(route, prefix = '') { return `https://hlctex.com/${prefix ? `${prefix}/` : ''}${route ? `${route}/` : ''}`; }

function injectSeo(html, route, lang) {
  html = html.replace(/<html\b[^>]*\blang="[^"]*"/i, match => match.replace(/lang="[^"]*"/i, `lang="${languages[lang].html}"`));
  if (!/<html\b[^>]*\blang=/i.test(html)) html = html.replace(/<html\b/i, `<html lang="${languages[lang].html}"`);
  html = html.replace(/\b(href|action)="([^"]+)"/gi, (whole, attr, value) => `${attr}="${localizedPath(value, lang)}"`);
  html = html.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]+"[^>]*>/gi, '');
  const alternates = [
    ['en', ''], ['zh-Hans', 'zh'], ['zh-Hant', 'zh-tw'], ['ja', 'ja'], ['ko', 'ko'], ['ru', 'ru'],
    ['de', 'de'], ['es', 'es'], ['fr', 'fr'], ['x-default', '']
  ].map(([code, prefix]) => `<link rel="alternate" hreflang="${code}" href="${routeUrl(route, prefix)}">`).join('\n');
  const seo = `<link rel="canonical" href="${routeUrl(route, lang)}">\n${alternates}`;
  html = html.replace(/<\/head>/i, `${seo}\n</head>`);
  html = html.replace(/https:\/\/hlctex\.com\/(?:zh\/|zh-tw\/|ja\/|ko\/|ru\/|de\/|es\/|fr\/)?/g, `https://hlctex.com/${lang}/`);
  return html;
}

function translateJsonLd(html, lang) {
  return html.replace(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, (whole, jsonText) => {
    let data; try { data = JSON.parse(jsonText); } catch { return whole; }
    const values = [];
    function collect(obj) {
      if (!obj || typeof obj !== 'object') return;
      for (const [key, value] of Object.entries(obj)) {
        if (['name', 'description', 'category', 'audience', 'headline'].includes(key) && typeof value === 'string' && needsTranslation(value)) values.push(value);
        else collect(value);
      }
    }
    collect(data); translateBatch(lang, values);
    function apply(obj) {
      if (!obj || typeof obj !== 'object') return;
      for (const [key, value] of Object.entries(obj)) {
        if (['name', 'description', 'category', 'audience', 'headline'].includes(key) && typeof value === 'string' && caches[lang][value]) obj[key] = caches[lang][value];
        else apply(value);
      }
    }
    apply(data);
    return whole.replace(jsonText, `\n${JSON.stringify(data, null, 2)}\n`);
  });
}

function applyEditorialCorrections(html, lang, route) {
  if (route !== 'company/overview') return html;
  const corrections = {
    de: [
      ['Integrität<br>Erstes', 'Integrität<br>zuerst']
    ],
    es: [
      ['<span>WHO WE ARE</span>', '<span>QUIÉNES SOMOS</span>'],
      ['Integridad<br>Primer', 'La integridad<br>es lo primero']
    ],
    fr: [
      ['Intégrité<br>Premier', "L’intégrité<br>avant tout"]
    ]
  };
  for (const [from, to] of corrections[lang] || []) html = html.replaceAll(from, to);
  return html;
}

const requestedLanguages = process.argv.slice(2).filter(lang => languages[lang]);
const missingOnly = process.argv.includes('--missing');
for (const lang of (requestedLanguages.length ? requestedLanguages : Object.keys(languages))) {
  const targetFiles = missingOnly ? sourceFiles.filter(file => {
    const route = routeFromFile(file);
    return !fs.existsSync(path.join(root, lang, route, 'index.html'));
  }) : sourceFiles;
  const allTexts = targetFiles.flatMap(file => {
    const html = fs.readFileSync(file, 'utf8');
    return [...visibleTexts(html), ...metaTexts(html), ...jsonLdTexts(html)];
  });
  translateBatch(lang, allTexts);
  for (const file of targetFiles) {
    const route = routeFromFile(file);
    let html = fs.readFileSync(file, 'utf8');
    html = translateHtml(html, lang);
    html = translateMeta(html, lang);
    html = translateJsonLd(html, lang);
    html = injectSeo(html, route, lang);
    html = applyEditorialCorrections(html, lang, route);
    const out = path.join(root, lang, route, 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html, 'utf8');
  }
  fs.writeFileSync(path.join(root, 'scripts', `.translation-cache-${lang}.json`), JSON.stringify(caches[lang], null, 2), 'utf8');
  console.log(`${lang}: ${targetFiles.length} pages generated`);
}

// Add the three new languages to hreflang clusters on every existing counterpart.
for (const prefix of ['', 'zh', 'zh-tw', 'ja', 'ko', 'ru']) {
  for (const route of routes) {
    const file = path.join(root, prefix, route, 'index.html');
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<link\s+rel="alternate"\s+hreflang="(?:de|es|fr)"[^>]*>\s*/gi, '');
    const tags = ['de', 'es', 'fr'].map(lang => `<link rel="alternate" hreflang="${lang}" href="${routeUrl(route, lang)}">`).join('\n');
    html = html.replace(/<\/head>/i, `${tags}\n</head>`);
    fs.writeFileSync(file, html, 'utf8');
  }
}

let sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
sitemap = sitemap.replace(/\s*<url><loc>https:\/\/hlctex\.com\/(?:de|es|fr)\/[^<]*<\/loc>[\s\S]*?<\/url>\s*/g, '\n');
for (const lang of Object.keys(languages)) {
  for (const route of routes) {
    const url = routeUrl(route, lang);
    const product = route.includes('/products/');
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${url}</loc><lastmod>${today}</lastmod><changefreq>${product ? 'monthly' : 'weekly'}</changefreq><priority>${route === '' ? '1.0' : product ? '0.7' : '0.8'}</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Sitemap updated with ${routes.length * 3} localized URLs.`);
