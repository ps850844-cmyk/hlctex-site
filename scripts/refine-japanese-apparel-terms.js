const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const jaRoot = path.join(root, 'ja');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const item = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(item);
    else if (entry.name === 'index.html') files.push(item);
  }
}

// Buyer-facing Japanese terminology follows common Japanese apparel-material
// usage. Replacements intentionally contain spaces or Japanese text so URL
// slugs, asset paths and hreflang links are never changed.
const replacements = [
  ['竹レーヨン', '竹繊維'],
  ['スパンデックス', 'ポリウレタン'],
  ['Pigment Digital Print', '顔料インクジェットプリント'],
  ['Reactive Digital Print', '反応染料インクジェットプリント'],
  ['Pigment Printing', '顔料プリント'],
  ['Reactive Printing', '反応染料プリント'],
  ['Discharge Printing', '抜染プリント'],
  ['Pigment Print', '顔料プリント'],
  ['Reactive Print', '反応染料プリント'],
  ['Discharge Print', '抜染プリント'],
  ['Laboratory report for ', '試験報告書：'],
  ['Laboratory report', '試験報告書'],
  ['development reference image', '開発参考画像'],
  ['fabric front view', '生地正面画像'],
  ['front view', '正面画像'],
  ['Close-up texture of ', '生地表面の拡大画像：'],
  ['HLC ニット 生地 Collections ・ Textile 加工', 'HLC ニット生地コレクション・加工'],
  ['HLC BAMBOO ニット COLLECTION', 'HLC 竹繊維ニットコレクション'],
  ['HLC BAMBOO ニット コレクション', 'HLC 竹繊維ニットコレクション'],
  ['HLC 液体アンモニア加工 ニット COLLECTION', 'HLC 液体アンモニア（液安）加工ニットコレクション'],
  ['HLC 液体アンモニア加工 ニット コレクション', 'HLC 液体アンモニア（液安）加工ニットコレクション'],
  ['シルケット・液体アンモニア加工', 'シルケット加工・液体アンモニア（液安）加工'],
  ['シルケット加工 &amp; 液体アンモニア加工', 'シルケット加工・液体アンモニア（液安）加工'],
  ['シルケット加工 & 液体アンモニア加工', 'シルケット加工・液体アンモニア（液安）加工'],
  ['BCIコットン Initiative', 'Better Cotton（BCI）'],
  ['Responsible ウール Standard', 'Responsible Wool Standard（RWS）'],
  ['商品詳細をExplore', '商品詳細を見る'],
  ['Explore the ', ''],
  ['Explore ', ''],
  ['Style#:', '品番：'],
  ['現在の価格', '参考価格'],
  ['商品説明', '商品説明'],
  ['Construction', '編み組織'],
  ['Applications', '用途'],
  ['Sample lead time', 'サンプル納期'],
  ['Bulk lead time', '量産納期'],
  ['Test results', '試験結果']
];

walk(jaRoot);

let changed = 0;
for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  for (const [source, target] of replacements) {
    html = html.split(source).join(target);
  }

  // Composition is expressed with the legally recognizable generic fibre
  // name while category and product names continue to use 竹繊維.
  html = html
    .replace(/(\d+)% 竹繊維/g, 'レーヨン（竹由来）$1％')
    .replace(/(\d+)% ポリウレタン/g, 'ポリウレタン$1％')
    .replace(/(\d+)% BCIコットン/g, 'BCIコットン$1％')
    .replace(/(\d+)% オーガニックコットン/g, 'オーガニックコットン$1％')
    .replace(/(\d+)% コットン/g, 'コットン$1％')
    .replace(/(\d+)% ポリエステル/g, 'ポリエステル$1％')
    .replace(/(\d+)% メリノウール/g, 'メリノウール$1％')
    .replace(/(\d+)% ウール/g, 'ウール$1％')
    .replace(/(％|コットン|ウール|ポリエステル|ポリウレタン|モダール|リヨセル|ナイロン)\s*\/\s*(?=レーヨン|コットン|ウール|ポリエステル|ポリウレタン|モダール|リヨセル|ナイロン)/g, '$1 / ')
    .replace(/\bStyle#\b/g, '品番')
    .replace(/<dt>重量<\/dt>/g, '<dt>目付（g/m²）</dt>')
    .replace(/<dt>幅<\/dt>/g, '<dt>有効幅</dt>')
    .replace(/<dt>構造<\/dt>/g, '<dt>編み組織</dt>')
    .replace(/<dt>最小ロット<\/dt>/g, '<dt>最小ロット（MOQ / 色別MCQ）</dt>');

  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
  }
}

console.log(`Refined Japanese apparel terminology in ${changed} of ${files.length} pages.`);
