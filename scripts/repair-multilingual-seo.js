const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

function htmlFiles(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...htmlFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith('.html')) result.push(fullPath);
  }
  return result;
}

function replaceInFiles(files, replacements) {
  let changed = 0;
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    let updated = original;
    for (const [from, to] of replacements) updated = updated.split(from).join(to);
    if (updated !== original) {
      fs.writeFileSync(file, updated, 'utf8');
      changed += 1;
    }
  }
  return changed;
}

const localeFiles = Object.fromEntries(
  ['ko', 'ja', 'de', 'es', 'fr', 'ru', 'zh-tw'].map((locale) => [
    locale,
    htmlFiles(path.join(root, locale)),
  ]),
);

const bambooCatalogFiles = [
  path.join(root, 'textile', 'bamboo-fabric', 'index.html'),
  ...Object.keys(localeFiles).map((locale) => path.join(root, locale, 'textile', 'bamboo-fabric', 'index.html')),
].filter((file) => fs.existsSync(file));

// The legacy Simplified Chinese bamboo page is intentionally a noindex redirect.
// It must not remain in hreflang clusters because alternates must be indexable.
replaceInFiles(bambooCatalogFiles, [
  ['<link rel="alternate" hreflang="zh-Hans" href="https://hlctex.com/zh/textile/bamboo-fabric/">', ''],
]);

const localizedApplications = {
  ko: '컴프레션 웨어, 레깅스, 트레이닝 톱, 스포츠 브라, 베이스 레이어 및 고기능성 스트레치 의류',
  ja: 'コンプレッションウェア、レギンス、トレーニングトップ、スポーツブラ、ベースレイヤー、高機能ストレッチウェア',
  de: 'Kompressionsbekleidung, Leggings, Trainingsoberteile, Sport-BHs, Baselayer und leistungsstarke Stretchbekleidung',
  es: 'prendas de compresión, leggings, tops de entrenamiento, sujetadores deportivos, capas base y prendas elásticas de alto rendimiento',
  fr: 'vêtements de compression, leggings, hauts d’entraînement, brassières de sport, premières couches et vêtements extensibles haute performance',
  ru: 'компрессионная одежда, легинсы, тренировочные топы, спортивные бюстгальтеры, базовые слои и высокоэластичная функциональная одежда',
};

for (const [locale, translated] of Object.entries(localizedApplications)) {
  replaceInFiles(localeFiles[locale], [
    ['compression wear, leggings, training tops, sports bras, base layers and high-performance stretch garments', translated],
    ['compression wear, leggings, training tops, sports bras, base layers 및 high-performance stretch garments', translated],
    ['コンプレッションウェア、レギンス、トレーニングトップス、スポーツブラ、ベースレイヤー、high-performance stretch garments', translated],
    ['high-performance stretch garments', translated],
  ]);
}

replaceInFiles(localeFiles.ko, [
  ['href="/"', 'href="/ko/"'],
  ['href="/textile/mercerized-liquid-ammonia-fabric/"', 'href="/ko/textile/mercerized-liquid-ammonia-fabric/"'],
  ['href="/textile/functional/"', 'href="/ko/textile/functional/"'],
  ['href="/textile/wool-fabric/"', 'href="/ko/textile/wool-fabric/"'],
  ['href="/textile/womenswear-fabric/"', 'href="/ko/textile/womenswear-fabric/"'],
  ['href="/textile/embroidered-fabric/"', 'href="/ko/textile/embroidered-fabric/"'],
  ['CNY 113,873,906.12 (as of May 31, 2026)', 'CNY 113,873,906.12 (2026년 5월 31일 기준)'],
  ['Piece Dyed', '반응염 염색'],
  ['detail view', '상세 이미지'],
  ['training tops, running shirts, base layers, gym wear, yoga tops 및 other performance stretch garments', '트레이닝 탑, 러닝 셔츠, 베이스 레이어, 짐웨어, 요가 탑 및 고기능성 스트레치 의류'],
]);

// Keep the language switch honest: every control labelled "English" must
// point to the English homepage, not to the current localised route.
for (const files of Object.values(localeFiles)) {
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(
      /<a\b[^>]*\baria-label=["']English["'][^>]*>/gi,
      (tag) => tag.replace(/\bhref=(["'])[^"']*\1/i, 'href="/"'),
    );
    if (updated !== original) fs.writeFileSync(file, updated, 'utf8');
  }
}

replaceInFiles(localeFiles.ja, [
  ['Piece Dyed', '反染め'],
  ['other performance stretch garments', 'その他の高機能ストレッチウェア'],
  ['detail view', 'ディテール画像'],
]);

replaceInFiles(localeFiles.ru, [
  ['href="/#search"', 'href="/ru/#search"'],
  ['>Profile Name<', '>Наименование<'],
  ['>Business<', '>Направления деятельности<'],
  ['>Established<', '>Основана<'],
  ['>General Manager<', '>Генеральный директор<'],
  ['>Office<', '>Адрес<'],
  ['>Registered Capital<', '>Уставный капитал<'],
  ['>Employees<', '>Сотрудники<'],
  ['>Sales<', '>Выручка<'],
  ['>Annual Sales<', '>Годовой объём продаж<'],
  ['>Customers<', '>Клиенты<'],
  ['>Traded Products<', '>Продукция<'],
  ['>Sales Mix<', '>Структура продаж<'],
  ['>Affiliated Companies<', '>Связанные компании<'],
  ['(as of May 31, 2026)', '(по состоянию на 31 мая 2026 г.)'],
  ['>Send inquiry<', '>Отправить запрос<'],
  ['>Компания Profile<', '>Профиль компании<'],
  ['Direct contact', 'Прямой контакт'],
  ['"name": "Applications"', '"name": "Применение"'],
  ['Piece Dyed', 'Крашение полотна'],
  ['detail view', 'детальный вид'],
  ['Baby footies', 'детские комбинезоны с закрытыми ножками'],
  ['high-функциональный', 'высокофункциональный'],
  ['training tops, running shirts, base layers, gym wear, yoga tops и other performance stretch garments', 'тренировочные топы, беговые футболки, базовые слои, одежда для фитнеса, топы для йоги и другая функциональная эластичная одежда'],
  ['training tops, running shirts, base layers, gym wear, yoga tops and other performance stretch garments. Development is reviewed against the 180 gsm Single Jersey specification.', 'тренировочные топы, беговые футболки, базовые слои, одежда для фитнеса, топы для йоги и другая функциональная эластичная одежда. Разработка проверяется по спецификации кулирной глади плотностью 180 г/м².'],
]);

replaceInFiles(localeFiles['zh-tw'], [
  ['href="/#search"', 'href="/zh-tw/#search"'],
  ['Piece Dyed', '匹染'],
]);

replaceInFiles(localeFiles.de, [
  ['>General Manager<', '>Geschäftsführer<'],
  ['Piece Dyed', 'Stückgefärbt'],
  ['training tops, running shirts, base layers, gym wear, yoga tops and other performance stretch garments. Development is reviewed against the 180 gsm Single Jersey specification.', 'Trainingsoberteile, Laufshirts, Baselayer, Fitnessbekleidung, Yoga-Tops und weitere funktionelle Stretchbekleidung. Die Entwicklung wird anhand der Single-Jersey-Spezifikation mit 180 g/m² geprüft.'],
]);

replaceInFiles(localeFiles.es, [
  ['Piece Dyed', 'Teñido en pieza'],
  ['training tops, running shirts, base layers, gym wear, yoga tops and other performance stretch garments. Development is reviewed against the 180 gsm Single Jersey specification.', 'tops de entrenamiento, camisetas de running, primeras capas, prendas de gimnasio, tops de yoga y otras prendas elásticas funcionales. El desarrollo se revisa según la especificación de punto jersey de 180 g/m².'],
  ['Fabricante de tejidos de punto de viscosa de bambú &amp; Venta al por mayor | HLC', 'Tejido de bambú al por mayor | Fabricante HLC'],
]);

replaceInFiles(localeFiles.fr, [
  ['Applications', 'Utilisations'],
  ['D?couvrez', 'Découvrez'],
  ['tricot?s', 'tricotés'],
  ['m?rinos', 'mérinos'],
  ['qualit?s', 'qualités'],
  ['d?lais', 'délais'],
  ['contr?le', 'contrôle'],
  ['humidit?', 'humidité'],
  ['?lasticit?', 'élasticité'],
  ['v?tements', 'vêtements'],
  ['lav?s', 'lavés'],
  ['f?minine', 'féminine'],
  ['tomb?', 'tombé'],
  ['merceris?', 'mercerisé'],
  ['int?gr?', 'intégré'],
  ['int?gr', 'intégr'],
  ['am?liorer', 'améliorer'],
  ['l?ammoniaque', 'l’ammoniaque'],
  ['r?solution', 'résolution'],
  ['r?sultats', 'résultats'],
  ['stabilit?', 'stabilité'],
  ['qualit?', 'qualité'],
  ['haute r?solution', 'haute résolution'],
  ['finissage ? l\'ammoniaque liquide', 'finissage à l’ammoniaque liquide'],
  ['&amp ;', '&amp;'],
  ['茅', 'é'],
  ['脿', 'à'],
  ['聽', ''],
  ['Piece Dyed', 'Teinture en pièce'],
  ['<dt>Applications</dt>', '<dt>Utilisations</dt>'],
  ['"name": "Applications"', '"name": "Utilisations"'],
  ['other performance stretch garments', 'autres vêtements extensibles haute performance'],
  ['detail view', 'vue de détail'],
  ['Contacter HLC | Fournisseur de tissus tricotés fonctionnels Bamboo &', 'Contacter HLC | Fabricant de tissus tricotés'],
  ['& | Groupe HLC', 'Centre de contrôle et d’essais | Groupe HLC'],
  ['This bamboo knit fabric combines 95% Tanboocel bamboo viscose supplied by TANBOOCEL UNION with 5% spandex. Natural breathability and moisture management meet buttery softness and four-way stretch, while waterless dyeing reduces fibre friction for a smooth, silk-like surface. OEKO-TEX STANDARD 100 certification supports baby pajamas, zippies, swaddles, sleepwear and loungewear development.', 'Ce jersey de bambou associe 95 % de viscose de bambou Tanboocel fournie par TANBOOCEL UNION à 5 % d’élasthanne. Il offre respirabilité, gestion de l’humidité, toucher très doux et extensibilité quadridirectionnelle. La teinture sans eau limite le frottement des fibres pour une surface lisse. Certifié OEKO-TEX STANDARD 100, il convient aux pyjamas pour bébés, gigoteuses, langes, vêtements de nuit et tenues d’intérieur.'],
  ['Fabricant de tissu tricoté en viscose de bambou &amp; Vente en gros | HLC', 'Tissu de bambou en gros | Fabricant HLC'],
]);

replaceInFiles(localeFiles.ru, [
  ['трикотаж джерси из модала, полиэстера и эластана с песочной стиркой | HLC', 'Трикотаж с песочной стиркой: модал и эластан | HLC'],
]);

const developmentTranslations = {
  ko: '개발 사양은 240 g/m² 인터록 기준으로 검토합니다.',
  ja: '開発仕様は240 g/m²のスムース基準に基づいて確認します。',
  de: 'Die Entwicklung wird anhand der 240-g/m²-Interlock-Spezifikation geprüft.',
  es: 'El desarrollo se revisa según la especificación de interlock de 240 g/m².',
  fr: 'Le développement est validé selon la spécification interlock de 240 g/m².',
  ru: 'Разработка проверяется по спецификации интерлока плотностью 240 г/м².',
};

for (const [locale, translated] of Object.entries(developmentTranslations)) {
  replaceInFiles(localeFiles[locale], [
    ['Development is reviewed against the 240 gsm Interlock specification.', translated],
    ['Development is reviewed against the 240 gsm スムース specification', translated],
  ]);
}

console.log('Multilingual SEO text and link repairs completed.');
