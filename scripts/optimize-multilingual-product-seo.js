const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['de', 'es', 'fr', 'ja', 'ko', 'ru', 'zh-tw'];

const wording = {
  de: {
    materials: {
      supima: 'SUPIMA Baumwoll', cotton: 'Baumwoll', hempCotton: 'Hanf-Baumwoll',
      cottonModal: 'Baumwoll-Modal', cottonLinen: 'Baumwoll-Leinen',
    },
    structures: { jersey: 'Jersey Stoff', interlock: 'Interlock Stoff', pique: 'Piqué Stoff' },
    qualifiers: { mercerized: 'mercerisiert', liquid: 'Flüssigammoniak', heavy: 'schwer', stretch: 'Stretch', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}. Material: ${material}; Gewicht: ${weight}; Bindung: ${structure}. MOQ, Muster, Prüfberichte und Serienfertigung direkt beim Strickstoffhersteller HLC anfragen.`,
  },
  es: {
    materials: {
      supima: 'algodón SUPIMA', cotton: 'algodón', hempCotton: 'cáñamo y algodón',
      cottonModal: 'algodón y modal', cottonLinen: 'algodón y lino',
    },
    structures: { jersey: 'Tejido jersey de', interlock: 'Tejido interlock de', pique: 'Tejido piqué de' },
    qualifiers: { mercerized: 'mercerizado', liquid: 'amoníaco líquido', heavy: 'pesado', stretch: 'elástico', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}. Composición: ${material}; gramaje: ${weight}; estructura: ${structure}. Consulte MOQ, muestras, ensayos y producción a medida con el fabricante HLC.`,
  },
  fr: {
    materials: {
      supima: 'coton SUPIMA', cotton: 'coton', hempCotton: 'chanvre et coton',
      cottonModal: 'coton et modal', cottonLinen: 'coton et lin',
    },
    structures: { jersey: 'Tissu jersey en', interlock: 'Tissu interlock en', pique: 'Tissu piqué en' },
    qualifiers: { mercerized: 'mercerisé', liquid: 'ammoniaque liquide', heavy: 'lourd', stretch: 'stretch', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}. Composition : ${material} ; grammage : ${weight} ; structure : ${structure}. Demandez le MOQ, des échantillons, les essais et la production sur mesure au fabricant HLC.`,
  },
  ja: {
    materials: {
      supima: 'SUPIMAコットン', cotton: 'コットン', hempCotton: 'ヘンプ・コットン',
      cottonModal: 'コットン・モダール', cottonLinen: 'コットン・リネン',
    },
    structures: { jersey: '天竺生地', interlock: 'スムース生地', pique: '鹿の子生地' },
    qualifiers: { mercerized: 'シルケット加工', liquid: '液体アンモニア加工', heavy: 'ヘビーウェイト', stretch: 'ストレッチ', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}。混率：${material}、目付：${weight}、組織：${structure}。MOQ、サンプル、試験結果、カスタム量産についてHLCへお問い合わせください。`,
  },
  ko: {
    materials: {
      supima: '수피마 코튼', cotton: '코튼', hempCotton: '헴프 코튼',
      cottonModal: '코튼 모달', cottonLinen: '코튼 리넨',
    },
    structures: { jersey: '저지 원단', interlock: '인터록 원단', pique: '피케 원단' },
    qualifiers: { mercerized: '머서라이즈 가공', liquid: '액체 암모니아 가공', heavy: '헤비웨이트', stretch: '스트레치', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}. 혼용률: ${material}, 중량: ${weight}, 조직: ${structure}. MOQ, 샘플, 시험 결과 및 맞춤 대량 생산은 HLC에 문의하십시오.`,
  },
  ru: {
    materials: {
      supima: 'хлопка SUPIMA', cotton: 'хлопка', hempCotton: 'конопли и хлопка',
      cottonModal: 'хлопка и модала', cottonLinen: 'хлопка и льна',
    },
    structures: { jersey: 'Трикотаж джерси из', interlock: 'Ткань интерлок из', pique: 'Ткань пике из' },
    qualifiers: { mercerized: 'мерсеризованный', liquid: 'жидкий аммиак', heavy: 'плотный', stretch: 'стретч', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}. Состав: ${material}; плотность: ${weight}; переплетение: ${structure}. Уточните MOQ, образцы, испытания и серийное производство у HLC.`,
  },
  'zh-tw': {
    materials: {
      supima: 'SUPIMA 棉', cotton: '棉', hempCotton: '大麻纖維棉',
      cottonModal: '棉莫代爾', cottonLinen: '棉亞麻',
    },
    structures: { jersey: '單面針織布', interlock: '雙面針織布', pique: '珠地布' },
    qualifiers: { mercerized: '絲光', liquid: '液氨整理', heavy: '重磅', stretch: '彈性', bci: 'BCI' },
    description: (keyword, material, weight, structure) => `${keyword}。成分：${material}；克重：${weight}；組織：${structure}。可向 HLC 洽詢 MOQ、樣品、測試資料及客製量產。`,
  },
};

function htmlEscape(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function yarnCount(slug) {
  const match = slug.match(/^(\d+)s(?:-(\d+)-ply)?/i);
  return match ? `${match[1]}S${match[2] ? `/${match[2]}` : ''}` : '';
}

function productProfile(slug) {
  const structure = slug.includes('interlock') ? 'interlock' : slug.includes('pique') ? 'pique' : slug.includes('jersey') ? 'jersey' : null;
  const isProcessProduct = /(?:liquid-ammonia|mercerized)/.test(slug) && structure;
  if (!isProcessProduct) return null;

  let material = 'cotton';
  if (slug.includes('supima')) material = 'supima';
  else if (slug.includes('hemp-cotton')) material = 'hempCotton';
  else if (slug.includes('cotton-modal')) material = 'cottonModal';
  else if (slug.includes('cotton-linen')) material = 'cottonLinen';

  return {
    structure,
    material,
    count: yarnCount(slug),
    mercerized: slug.includes('mercerized'),
    liquid: slug.includes('liquid-ammonia'),
    heavy: slug.includes('heavyweight'),
    stretch: slug.includes('spandex'),
    bci: slug.includes('bci'),
    technology: slug.startsWith('37-5-') ? '37.5®' : '',
  };
}

function searchTitle(locale, slug, profile) {
  const w = wording[locale];
  let keyword;
  if (locale === 'de') keyword = `${w.materials[profile.material]}-${w.structures[profile.structure]}`;
  else if (locale === 'es' || locale === 'fr' || locale === 'ru') keyword = `${w.structures[profile.structure]} ${w.materials[profile.material]}`;
  else keyword = `${w.materials[profile.material]}${locale === 'zh-tw' ? '' : ' '}${w.structures[profile.structure]}`;

  const qualifiers = [];
  if (profile.bci) qualifiers.push(w.qualifiers.bci);
  if (profile.mercerized) qualifiers.push(w.qualifiers.mercerized);
  if (profile.liquid) qualifiers.push(w.qualifiers.liquid);
  if (profile.heavy) qualifiers.push(w.qualifiers.heavy);
  if (profile.stretch) qualifiers.push(w.qualifiers.stretch);
  if (profile.technology) qualifiers.push(profile.technology);
  if (profile.count) qualifiers.push(profile.count);

  const separator = ['ja', 'zh-tw'].includes(locale) ? '｜' : ' | ';
  const brand = locale === 'ja' ? 'HLC ニット生地メーカー'
    : locale === 'ko' ? 'HLC 니트 원단 제조업체'
      : locale === 'zh-tw' ? 'HLC 針織布製造商'
        : 'HLC';
  return {
    keyword,
    full: `${keyword}${qualifiers.length ? `${separator}${qualifiers.join(locale === 'zh-tw' ? ' ' : ' ')}` : ''}${separator}${brand}`,
  };
}

function improveNonProcessTitle(locale, title) {
  let next = title;
  if (locale === 'de') {
    next = next.replace(/Spandex/gi, 'Elasthan');
  } else if (locale === 'es') {
    next = next.replace(/Tejido entrelazado/gi, 'Tejido interlock')
      .replace(/Tela entrelazada/gi, 'Tejido interlock')
      .replace(/Tela de buceo/gi, 'Tejido scuba')
      .replace(/^Buceo\b/i, 'Tejido scuba')
      .replace(/Tela de jersey/gi, 'Tejido jersey')
      .replace(/spandex/gi, 'elastano')
      .replace(/(Tejido scuba[^|]*) lavada(?=\s|\|)/gi, '$1 lavado');
  } else if (locale === 'ja') {
    next = next.replace(/thermal-shielding/gi, '遮熱').replace(/Temperature-Regulating/gi, '温度調節')
      .replace(/Heavyweight/gi, 'ヘビーウェイト').replace(/Ultra-Light/gi, '超軽量').replace(/Ultra-fine/gi, '極細');
  } else if (locale === 'ko') {
    next = next.replace(/thermal-shielding/gi, '차열').replace(/Temperature-Regulating/gi, '온도 조절')
      .replace(/Heavyweight/gi, '헤비웨이트').replace(/Ultra-Light/gi, '초경량').replace(/Ultra-fine/gi, '초극세');
  } else if (locale === 'ru') {
    next = next.replace(/thermal-shielding/gi, 'теплозащитная').replace(/Temperature-Regulating/gi, 'терморегулирующая')
      .replace(/High UV protection ткань/gi, 'Ткань с высокой защитой от УФ').replace(/High UV protection/gi, 'Ткань с высокой защитой от УФ')
      .replace(/Ткань с высокой защитой от УФ ткань/gi, 'Ткань с высокой защитой от УФ')
      .replace(/Ultra-Light/gi, 'Ультралёгкая')
      .replace(/Sand-washed/gi, 'С песочной стиркой').replace(/spandex/gi, 'эластан').replace(/scuba/gi, 'скуба')
      .replace(/хлопок Cool Jade-Fresh ткань/gi, 'Хлопковая охлаждающая ткань Cool Jade-Fresh')
      .replace(/хлопок Cool Jade-Fresh fabric/gi, 'Хлопковая охлаждающая ткань Cool Jade-Fresh');
  }
  return next;
}

function getAttribute(html, field) {
  const re = new RegExp(`data-template-field="${field}"[^>]*>([^<]*)<`, 'i');
  const match = html.match(re);
  return match ? match[1].trim() : '';
}

function replaceMeta(html, key, value) {
  const escaped = htmlEscape(value);
  const patterns = key === 'description'
    ? [/<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/i, /<meta\s+content="[^"]*"\s+name="description"\s*\/?\s*>/i]
    : [new RegExp(`<meta\\s+property="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 'i'), new RegExp(`<meta\\s+content="[^"]*"\\s+property="${key}"\\s*\\/?\\s*>`, 'i'), new RegExp(`<meta\\s+name="${key}"\\s+content="[^"]*"\\s*\\/?\\s*>`, 'i'), new RegExp(`<meta\\s+content="[^"]*"\\s+name="${key}"\\s*\\/?\\s*>`, 'i')];
  for (const pattern of patterns) {
    if (pattern.test(html)) return html.replace(pattern, `<meta content="${escaped}" ${key === 'description' || key.startsWith('twitter:') ? 'name' : 'property'}="${key}"/>`);
  }
  throw new Error(`Missing meta field: ${key}`);
}

function titleKeyword(title, locale) {
  const separator = ['ja', 'zh-tw'].includes(locale) ? '｜' : ' | ';
  return title.split(separator)[0].trim();
}

let changedPages = 0;
const changesByLocale = Object.fromEntries(LOCALES.map((locale) => [locale, 0]));

for (const locale of LOCALES) {
  const directory = path.join(ROOT, locale, 'textile', 'products');
  for (const slug of fs.readdirSync(directory)) {
    const file = path.join(directory, slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    const original = fs.readFileSync(file, 'utf8');
    const oldTitle = (original.match(/<title>([^<]*)<\/title>/i) || [])[1];
    if (!oldTitle) continue;

    const profile = productProfile(slug);
    const planned = profile ? searchTitle(locale, slug, profile) : null;
    const newTitle = planned ? planned.full : improveNonProcessTitle(locale, oldTitle);
    if (newTitle === oldTitle) continue;

    let html = original.replace(/<title>[^<]*<\/title>/i, `<title>${htmlEscape(newTitle)}</title>`);
    html = replaceMeta(html, 'og:title', newTitle);
    html = replaceMeta(html, 'twitter:title', newTitle);

    const keyword = planned ? planned.keyword : titleKeyword(newTitle, locale);
    const material = getAttribute(html, 'composition');
    const weight = getAttribute(html, 'weight');
    const structure = getAttribute(html, 'construction');
    if (material && weight && structure) {
      const description = wording[locale].description(keyword, material, weight, structure);
      html = replaceMeta(html, 'description', description);
      html = replaceMeta(html, 'og:description', description);
      html = replaceMeta(html, 'twitter:description', description);
    }

    fs.writeFileSync(file, html);
    changedPages += 1;
    changesByLocale[locale] += 1;
  }
}

console.log(JSON.stringify({ changedPages, changesByLocale }, null, 2));
