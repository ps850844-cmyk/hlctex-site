const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const replacements = {
  ja: new Map([
    ['Corporate サステナビリティ & ESG', '企業のサステナビリティとESG'],
    ['Water- ・ Carbon-Reducing Dyeing', '節水・低炭素染色'],
    ['Water-Saving, Lower-Carbon Dyeing', '節水・低炭素染色'],
    ['生地 Inspection &amp; Testing', '生地検査・試験'],
    ['Our People', '人材・企業文化'],
    ['お問い合わせ Us', 'お問い合わせ'],
    ['シルケット加工・液体アンモニア（液安）加工 加工', 'シルケット加工・液体アンモニア（液安）加工'],
    ['<strong>サンドウォッシュ ニットs</strong>', '<strong>サンドウォッシュニット生地</strong>'],
    ['T Shirts', 'Tシャツ'],
    ['<strong>Pattern, texture', '<strong>柄・質感'],
    ['Low-Temperature, Water-Saving Dyeing', '低温・節水染色'],
    ['Publication date to be confirmed', '公開日未定'],
    ['brands seeking soft touch with improved durability、consistent colour、practical wash performance', '柔らかな風合い、耐久性、安定した色調、実用的な洗濯性能を求めるブランド向け'],
  ]),
  ko: new Map([
    ['01 / CERTIFICATE VIEWER', '01 / 인증서 뷰어'],
    ['Paid-in CNY 113,873,906.12', '납입 자본금 CNY 113,873,906.12'],
    ['Datacolor spectrophotometer', 'Datacolor 분광측색기'],
    ['© Copyright HLC GROUP CO., LTD. All rights reserved.', '© HLC GROUP CO., LTD. 모든 권리 보유.'],
    ['Scope certificate and complete appendices · 6 pages', '인증 범위 증명서 및 전체 부속서 · 6페이지'],
    ['Dyeing and sales of linen yarn and fabric', '리넨 원사 및 원단 염색·판매'],
    ['Lightweight 니트 development focused on coverage, wash durability 및 everyday sun-protection applications.', '커버력과 세탁 내구성, 일상적인 자외선 차단 용도에 초점을 맞춘 경량 니트 개발.'],
    ['Fluid drape, refined surfaces 및 multi-fibre blends for wo남성복 및 자수 원단 programmes.', '여성복과 자수 원단 컬렉션을 위한 유연한 드레이프, 정교한 표면감과 복합 섬유 혼방.'],
    ['Pattern, texture 및 dimensional detail', '패턴, 질감 및 입체 디테일'],
    ['Water- 및 Carbon-Reducing Dyeing', '절수·저탄소 염색'],
    ['Low-Temperature, Water-Saving Dyeing', '저온·절수 염색'],
    ['Publication date to be confirmed', '공개일 미정'],
    ['Performance developed around the end use', '최종 용도에 맞춰 설계한 기능성'],
  ]),
  ru: new Map([
    ['01 / CERTIFICATE VIEWER', '01 / ПРОСМОТР СЕРТИФИКАТОВ'],
    ['Customers &amp; Markets', 'Клиенты и рынки'],
    ['Customers & Markets', 'Клиенты и рынки'],
    ['Datacolor spectrophotometer', 'Спектрофотометр Datacolor'],
    ['It is suited to премиальный T-shirts, polo shirts, next-to-skin детская одежда, пижамы and домашняя одежда.', 'Подходит для премиальных футболок, поло, детской одежды, прилегающей к телу, пижам и домашней одежды.'],
    ['HLC develops custom видов тканей for luxury T-shirts, polo shirts, детская одежда, пижамы and домашняя одежда by пряжа count, weight, colour and hand feel.', 'HLC разрабатывает ткани на заказ для премиальных футболок, поло, детской одежды, пижам и домашней одежды с учётом номера пряжи, плотности, цвета и требуемого грифа.'],
    ['хлопок, лён &amp; Ramie ткани', 'ткани из хлопка, льна и рами'],
    ['хлопок, лён & Ramie ткани', 'ткани из хлопка, льна и рами'],
    ['Baby &amp; Kids ткань Division', 'Подразделение тканей для детской одежды'],
    ['Baby & Kids ткань Division', 'Подразделение тканей для детской одежды'],
    ['Martindale abrasion &amp; pilling tester', 'Тестер истирания и пиллингуемости Martindale'],
    ['Publication date to be confirmed', 'Дата публикации уточняется'],
    ['Low-Temperature, Water-Saving Dyeing', 'Низкотемпературное водосберегающее крашение'],
    ['New Performance трикотажный Structures', 'Новые функциональные структуры трикотажа'],
    ['бамбуковая вискоза &amp; шерсть Blends', 'Смесовый трикотаж из бамбуковой вискозы и шерсти'],
    ['бамбуковая вискоза & шерсть Blends', 'Смесовый трикотаж из бамбуковой вискозы и шерсти'],
    ['Lightweight Sun-Protective трикотажныйs', 'Лёгкий солнцезащитный трикотаж'],
    ['Embroidery &amp; с песочной стиркой трикотажный Development', 'Разработка вышитого трикотажа и трикотажа с песочной стиркой'],
    ['50S Sorona thermal-shielding fabric', 'Теплозащитный трикотаж 50S Sorona'],
  ]),
  'zh-tw': new Map([
    ['Waterless工藝', '無水染色工藝'],
    ['Performance buyers can verify', '採購方可驗證的性能'],
  ]),
};

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : entry.name === 'index.html' ? [file] : [];
  });
}

let changed = 0;
for (const [lang, phrases] of Object.entries(replacements)) {
  for (const file of walk(path.join(root, lang))) {
    const original = fs.readFileSync(file, 'utf8');
    let html = original;
    for (const [from, to] of phrases) html = html.split(from).join(to);
    if (html !== original) {
      fs.writeFileSync(file, html, 'utf8');
      changed += 1;
    }
  }
}

// Keep breadcrumb labels fully localized on Korean company pages.
for (const file of walk(path.join(root, 'ko'))) {
  const original = fs.readFileSync(file, 'utf8');
  const html = original
    .replace(/(<a href="\/ko\/">)Home(<\/a>)/g, '$1홈$2')
    .replace(/(<a href="\/ko\/">홈<\/a> \/ )Company( \/)/g, '$1회사$2');
  if (html !== original) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
  }
}

console.log(`Updated ${changed} localized pages.`);
