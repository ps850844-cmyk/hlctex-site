const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name === 'index.html') pages.push(file);
  }
}

const replacements = [
  ['Inspection & Testing Centre', '検査・試験センター'],
  ['Inspection &amp; Testing Centre', '検査・試験センター'],
  ['Inspection & Testing', '検査・試験'],
  ['Inspection &amp; Testing', '検査・試験'],
  ['Mercerization & Liquid Ammonia Finishing', 'シルケット・液体アンモニア加工'],
  ['Mercerization &amp; Liquid Ammonia Finishing', 'シルケット・液体アンモニア加工'],
  ['Mercerization & Liquid Ammonia', 'シルケット・液体アンモニア加工'],
  ['Mercerization &amp; Liquid Ammonia', 'シルケット・液体アンモニア加工'],
  ['Water- and Carbon-Reducing Dyeing', '節水・低炭素染色'],
  ['Water-Saving, Lower-Carbon Dyeing', '節水・低炭素染色'],
  ['Our People', '私たちの人材'],
  ['People & Culture', '人材・企業文化'],
  ['People &amp; Culture', '人材・企業文化'],
  ['Certifications & Material Support', '認証・素材サポート'],
  ['Certifications &amp; Material Support', '認証・素材サポート'],
  ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', '中国浙江省嘉興市桐郷市濮院鎮恒楽路51号 314502'],
  ['MERCERIZED COTTON', 'シルケットコットン'],
  ['WATERLESS CELLULOSE', '無水染色セルロース'],
  ['ULTRA-SOFT COTTON', '超柔軟コットン'],
  ['ESG & SUSTAINABILITY', 'ESG・サステナビリティ'],
  ['ESG &amp; SUSTAINABILITY', 'ESG・サステナビリティ'],
  ['Copyright HLC GROUP CO., LTD.', '© HLC GROUP CO., LTD.'],
  ['Laboratory report for ', '試験報告書：'],
  ['fabric main view', '生地メイン画像'],
  ['fabric front view', '生地正面画像'],
  ['fabric detail view', '生地詳細画像'],
  ['texture and colour detail', '風合い・色の詳細'],
  ['high-resolution view', '高解像度画像'],
  ['close-to-skin comfort garments', '肌に触れる快適ウェア'],
  ['close-to-skin cooling garments', '接触冷感ウェア'],
  ['cold-weather performance garments', '防寒機能ウェア'],
  ['elevated everyday essentials', '上質なデイリーウェア'],
  ['elevated everyday wear', '上質なデイリーウェア'],
  ['elevated sportswear', '高品質スポーツウェア'],
  ['everyday performance shirting', '日常向け機能性シャツ'],
  ['daily essentials', 'デイリーウェア'],
  ['high-end smart casualwear', '高級スマートカジュアル'],
  ['high-performance stretch garments', '高機能ストレッチウェア'],
  ['lightweight outdoor essentials', '軽量アウトドア向け定番ウェア'],
  ['lightweight outdoor', '軽量アウトドアウェア'],
  ['lightweight performance tops', '軽量機能性トップス'],
  ['lifestyle essentials', 'ライフスタイルウェア'],
  ['other comfort-focused garments', 'その他の快適性重視ウェア'],
  ['other performance stretch garments', 'その他の機能性ストレッチウェア'],
  ['performance lifestyle garments', '機能性ライフスタイルウェア'],
  ['performance uniforms', '機能性ユニフォーム'],
  ['practical wash performance', '実用的な洗濯耐久性'],
  ['premium collared shirts', '高級襟付きシャツ'],
  ['premium heavyweight T-shirts', '高級厚手Tシャツ'],
  ['premium performance essentials', '高品質機能性ウェア'],
  ['reduce heat build-up on the body', '体にこもる熱を軽減'],
  ['refined everyday essentials', '上質なデイリーウェア'],
  ['relaxed everyday wear', 'リラックス感のある日常着'],
  ['shape retention', '形態安定性'],
  ['smart casual sportswear', 'スマートカジュアルスポーツウェア'],
  ['summer smart casualwear', '夏向けスマートカジュアル'],
  ['balances close-to-skin comfort with wash durability', '肌に触れる快適さと洗濯耐久性を両立します'],
  ['brands seeking soft touch with improved durability', '柔らかな風合いと耐久性を求めるブランド'],
  ['using hollow-structure Sorona® fibres to help block external heat', '中空構造のSorona®繊維で外部からの熱を抑えます'],
  ['active casualwear', 'アクティブカジュアル'],
  ['hiking apparel', 'ハイキングウェア'],
  ['hiking polos', 'ハイキング用ポロシャツ'],
  ['hiking tops', 'ハイキング用トップス'],
  ['homewear', 'ホームウェア'],
  ['luxury T-shirts', 'ラグジュアリーTシャツ'],
  ['luxury tops', 'ラグジュアリートップス'],
  ['outdoor wear', 'アウトドアウェア'],
  ['premium outdoor', '高級アウトドアウェア'],
  ['premium polos', '高級ポロシャツ'],
  ['relaxed tops', 'リラックストップス'],
  ['running apparel', 'ランニングウェア'],
  ['running tops', 'ランニング用トップス'],
  ['summer T-shirts', '夏向けTシャツ'],
  ['sweat-style', 'スウェットスタイル'],
  ['thermal tops', '保温トップス'],
  ['training wear', 'トレーニングウェア'],
  ['travel sets', 'トラベルセット'],
  ['winter T-shirts', '冬向けTシャツ'],
  ['branded apparel', 'ブランド衣料'],
  ['consistent colour', '安定した色調'],
  ['modern', 'モダン'],
  ['refined', '上質'],
  ['cooling', '冷感'],
  ['lightweight', '軽量'],
  ['swaddles', 'おくるみ'],
  ['uniforms', 'ユニフォーム'],
  ['zippies', 'ジップ付きベビーウェア'],
  ['Discharge Printing', '抜染プリント'],
  ['Custom decorative fabrics for womenswear, occasionwear and branded apparel.', '婦人服、オケージョンウェア、ブランド衣料向けのオーダー装飾生地。'],
  ['Ultra-Light Merino Wool', '超軽量メリノウール'],
  ['Ultra-Light TENCEL™ Merino', '超軽量TENCEL™メリノ'],
  ['PCM Temperature-Regulating', 'PCM温度調節'],
  ['Bird Eye', 'バードアイ'],
  ['Cool Jade-Fresh', 'クールジェイド・フレッシュ'],
  ['Bi-Component', '複合繊維'],
  ['Discharge Print', '抜染プリント'],
  ['Pigment Print', '顔料プリント'],
  ['Reactive Print', '反応染料プリント'],
  ['Ultra-fine', '極細'],
  ['Elastane', 'ポリウレタン'],
  ['Viscose', 'レーヨン'],
  ['Merino Wool', 'メリノウール'],
  ['Merino', 'メリノ'],
  ['vertical stripe', '縦ストライプ'],
  ['Wool Blend', 'ウール混'],
  ['Collections', 'コレクション'],
  ['Company /', '会社 /'],
  ['COLLECTION', 'コレクション']
];

walk(path.join(root, 'ja'));
for (const file of pages) {
  let html = fs.readFileSync(file, 'utf8');
  for (const [source, target] of replacements) {
    const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(escaped, 'gi'), target);
  }
  html = html
    .replace(/(\d+)生地s\b/gi, '$1種類')
    .replace(/(\d+)\s*fabrics\b/gi, '$1種類')
    .replace(/aria-label="Wool fabrics products"/gi, 'aria-label="ウール生地製品"')
    .replace(/aria-label="([^\"]*) products"/gi, 'aria-label="$1製品"');
  fs.writeFileSync(file, html, 'utf8');
}

console.log(`Finalized ${pages.length} Japanese pages.`);
