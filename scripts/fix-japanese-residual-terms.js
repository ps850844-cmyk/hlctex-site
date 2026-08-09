const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'ja');
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const item = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(item);
    else if (entry.name === 'index.html') files.push(item);
  }
}

const replacements = [
  ['Bamboo + BCIコットン + ポリウレタン', '竹繊維 + BCIコットン + ポリウレタン'],
  ['Bamboo ポリエステル', '竹繊維・ポリエステル'],
  ['Bamboo ポリウレタン', '竹繊維・ポリウレタン'],
  ['47% EcoCosy® Viscose/ポリエステル47％ / ポリウレタン6％', 'EcoCosy®レーヨン47％ / ポリエステル47％ / ポリウレタン6％'],
  ['EcoCosy® Viscose', 'EcoCosy®レーヨン'],
  ['modern ルームウェア', 'モダンなルームウェア'],
  ['travel sets', 'トラベルセット'],
  ['COLLECTION', 'コレクション'],
  ['Ultra-fine', '極細'],
  ['Style#を含む', '品番を含む'],
  ['BCIコットン27％ (BCI)', 'BCIコットン27％'],
  ['28% 18.5 μm メリノウール', '18.5μm メリノウール28％'],
  ['Navy ', 'ネイビー '],
  ['Brown ', 'ブラウン '],
  ['Beige ・ cream ', 'ベージュ・クリーム '],
  ['Dusty pink ', 'ダスティピンク '],
  ['Soft yellow ', 'ソフトイエロー ']
];

walk(root);
let changed = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  for (const [source, target] of replacements) html = html.split(source).join(target);
  html = html.replace(/(\d+)\s*生地s\b/g, '$1種類');
  if (html !== before) {
    fs.writeFileSync(file, html, 'utf8');
    changed += 1;
  }
}

console.log(`Cleaned residual mixed-language terms in ${changed} Japanese pages.`);
