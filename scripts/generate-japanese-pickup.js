const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';

const commonPairs = [
  ['Request Specifications &amp; Pricing', '仕様・見積もりを依頼'],
  ['Request Specifications & Pricing', '仕様・見積もりを依頼'],
  ['Mercerization &amp; Liquid Ammonia Finishing', 'シルケット・液体アンモニア加工'],
  ['Mercerization & Liquid Ammonia Finishing', 'シルケット・液体アンモニア加工'],
  ['Water- and Carbon-Reducing Dyeing', '節水・低炭素染色'],
  ['Corporate Sustainability &amp; ESG', '企業のサステナビリティ・ESG'],
  ['Certificates &amp; Certifications', '認証・証明書'],
  ['Certificates & Certifications', '認証・証明書'],
  ['Certifications &amp; Material Support', '認証・素材サポート'],
  ['Inspection &amp; Testing Centre', '検査・試験センター'],
  ['Sand-Washed Knit Fabrics', 'サンドウォッシュニット'],
  ['WL Dye® Waterless Dyeing', 'WL Dye® 無水染色'],
  ['Bamboo Viscose Knits', '竹レーヨンニット'],
  ['Embroidered Fabrics', '刺繍生地'],
  ['Functional Knits', '機能性ニット'],
  ['Company Profile', '会社概要'],
  ['Quality Management', '品質管理'],
  ['People &amp; Culture', '人材・企業文化'],
  ['About HLC', 'HLCについて'],
  ['Sustainability', 'サステナビリティ'],
  ['Contact Us', 'お問い合わせ'],
  ['Website tools', 'サイトツール'],
  ['Close menu', 'メニューを閉じる'],
  ['All rights reserved.', '無断転載を禁じます。'],
  ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', '中国浙江省嘉興市桐郷市濮院鎮恒楽路51号 314502'],
  ['Products', '製品'],
  ['Solutions', 'ソリューション'],
  ['Careers', '採用情報'],
  ['Wool Fabrics', 'ウール生地'],
  ['View details', '詳細を見る'],
  ['Style No.', '品番'],
  ['To be added', '追加予定'],
  ['Coming soon', '近日公開'],
  ['Price', '価格'],
  ['Contact', 'お問い合わせ'],
  ['Home', 'ホーム'],
  ['Tel ', '電話 '],
  ['Fax ', 'FAX '],
  ['Email ', 'メール ']
];

const pages = [
  {
    route: 'pickup/wl-dye',
    title: '無水染色技術｜HLC ニット生地',
    description: 'HLCの無水染色技術は、従来染色より水・蒸気・電力・薬剤の使用を抑えながら、柔らかな風合い、平滑な表面、安定した発色を実現します。',
    pairs: [
      ['Waterless Dyeing Technology for Knit Fabrics | HLC Group', '無水染色技術｜HLC ニット生地'],
      ['Waterless Dyeing', '無水染色'],
      ['WATERLESS:', '無水染色：'],
      ['Not a slogan.<br>A process decision.', 'スローガンではなく、<br>工程設計です。'],
      ['HLC applies a lower-water fibre colouration route designed to reduce the wet-processing load associated with conventional dyeing. The process supports stable production while using fewer resources.', 'HLCは、従来の染色で必要となる湿式工程を減らす低水使用型の繊維着色プロセスを採用しています。安定した生産品質を維持しながら、水・蒸気・電力・薬剤の使用量を抑えます。'],
      ['For buyers, waterless dyeing does not require paying a premium for lower environmental impact. By reducing water, steam, electricity and wet-processing steps, it helps lower total dyeing costs while limiting fibre friction and improving fabric softness, surface smoothness and overall performance.', 'バイヤーにとって、環境負荷の低減が追加コストになるとは限りません。水、蒸気、電力、湿式工程を減らすことで染色コストを抑え、繊維への摩擦を軽減し、生地の柔らかさ、表面平滑性、総合性能を高めます。'],
      ['Designed to use less.', '使用資源を減らすための設計。'],
      ['Compared with conventional dyeing, the Waterless route is designed around measurable reductions across the colouration process.', '従来染色と比べ、無水染色は着色工程全体で測定可能な資源使用量の削減を目指しています。'],
      ['A cleaner process.<br>A cleaner surface.', 'よりクリーンな工程。<br>より滑らかな表面。'],
      ['Reduced friction during colouration helps protect the fibre surface, supporting a smoother hand, less fluff and fewer wrinkles.', '着色時の摩擦を抑えることで繊維表面を保護し、より滑らかな風合い、毛羽の低減、しわの少ない表面を実現します。'],
      ['The resulting knit fabric is designed for brighter appearance, improved colour fastness and better resistance to pilling - performance that can be seen and felt in the finished garment.', '仕上がったニット生地は、明るい外観、優れた染色堅牢度、耐ピリング性を備え、完成衣料で見た目と手触りの違いを確認できます。'],
      ['Related Products', '関連製品'],
      ['Bamboo Viscose &amp; Modal Knits', '竹レーヨン・モダールニット'],
      ['Cotton &amp; Linen Blend Fabrics', 'コットン・リネン混ニット'],
      ['Waterless-Dyed Cotton Knits', '無水染色コットンニット'],
      ['RESOURCE IMPACT', '資源使用量'],
      ['FABRIC PERFORMANCE', '生地性能'],
      ['PRODUCTS', '製品'],
      ['Alpine landscape representing lower-impact Waterless dyeing', '環境負荷を抑えた無水染色を表現する山岳風景'],
      ['Waterless dyeing resource and fabric advantages', '無水染色による資源削減と生地性能の利点'],
      ['View the Waterless dyeing advantages image in high resolution', '無水染色の利点を示す画像を高解像度で表示'],
      ['Original waterless dyeing advantages presentation', '無水染色の利点を示す資料']
    ]
  },
  {
    route: 'pickup/mercerization-liquid-ammonia',
    title: 'シルケット・液体アンモニア加工｜HLC',
    description: 'Lafer液体アンモニア加工ライン1基とPukwangシルケット加工ライン2基で、コットンおよび混紡ニットの風合い、光沢、寸法安定性を高めます。',
    pairs: [
      ['Mercerization & Liquid Ammonia Finishing | HLC Group', 'シルケット・液体アンモニア加工｜HLC'],
      ['Mercerization &amp; Liquid Ammonia', 'シルケット・液体アンモニア加工'],
      ['FINISHING PERFORMANCE', '仕上げ性能'],
      ['Not surface decoration.<br>A performance decision.', '表面装飾ではなく、<br>性能を高める工程です。'],
      ['HLC operates one Lafer liquid ammonia finishing line and two Korean Pukwang mercerization finishing lines, providing specialist finishing for cotton and blended knit fabrics.', 'HLCはLafer液体アンモニア加工ライン1基と韓国Pukwangシルケット加工ライン2基を運用し、コットンおよび混紡ニット生地に専門的な仕上げ加工を提供しています。'],
      ['With controlled production, a softer hand, refined lustre and reliable dimensional stability, HLC supports programmes for multiple internationally recognised brands and their supply chains.', '管理された生産条件により、柔らかな風合い、上品な光沢、優れた寸法安定性を実現し、国際的な著名ブランドとそのサプライチェーンの生地開発を支えています。'],
      ['Fluid softness.<br>Low shrinkage.', 'しなやかな柔らかさ。<br>低い収縮率。'],
      ['Liquid ammonia finishing gives SUPIMA cotton, Giza cotton and long-staple cotton knits a soft, refined hand, natural drape, breathability, wrinkle resistance and reliable wash stability. It is suited to premium T-shirts, polo shirts, next-to-skin babywear, sleepwear and loungewear.', '液体アンモニア加工は、SUPIMAコットン、GIZAコットン、長繊維綿ニットに、柔らかく上質な風合い、自然なドレープ、通気性、防しわ性、安定した洗濯耐久性を与えます。高級Tシャツ、ポロシャツ、ベビー服、パジャマ、ルームウェアに適しています。'],
      ['Premium fibres.<br>A refined finish.', '高級素材を、<br>より上質に。'],
      ['Mercerized finishing brings refined lustre, rich colour and a smooth hand to SUPIMA cotton, Giza cotton, long-staple cotton, cotton-linen and ramie fabrics. HLC develops custom fabrics for luxury T-shirts, polo shirts, babywear, sleepwear and loungewear by yarn count, weight, colour and hand feel.', 'シルケット加工は、SUPIMAコットン、GIZAコットン、長繊維綿、綿麻、ラミー生地に、上品な光沢、鮮明な発色、滑らかな風合いを与えます。HLCは、糸番手、目付、色、手触りに合わせて、高級Tシャツ、ポロシャツ、ベビー服、パジャマ、ルームウェア向けの生地を開発します。'],
      ['Related Products', '関連製品'],
      ['SUPIMA &amp; Giza Cotton Knits', 'SUPIMA・GIZAコットンニット'],
      ['BCI Cotton Liquid Ammonia Interlock', 'BCIコットン液体アンモニア・インターロック'],
      ['Cotton, Linen &amp; Ramie Fabrics', 'コットン・リネン・ラミー生地'],
      ['60S Liquid Ammonia Spandex Interlock', '60番手 液体アンモニア・スパンデックスインターロック'],
      ['40S Liquid Ammonia Interlock', '40番手 液体アンモニア・インターロック'],
      ['50S Liquid Ammonia Interlock', '50番手 液体アンモニア・インターロック'],
      ['LIQUID AMMONIA', '液体アンモニア'],
      ['MERCERIZATION', 'シルケット加工'],
      ['PRODUCTS', '製品']
    ]
  }
];

function alternateLinks(route) {
  return [
    ['en', `${base}/${route}/`],
    ['zh-Hans', `${base}/zh/${route}/`],
    ['ko', `${base}/ko/${route}/`],
    ['ja', `${base}/ja/${route}/`],
    ['x-default', `${base}/${route}/`]
  ].map(([lang, href]) => `<link rel="alternate" hreflang="${lang}" href="${href}">`).join('\n');
}

function injectAlternates(html, route) {
  html = html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi, '\n');
  return html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i, `$1\n${alternateLinks(route)}`);
}

function replaceVisible(html, pairs) {
  const blocks = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, block => {
    blocks.push(block);
    return `__HLC_BLOCK_${blocks.length - 1}__`;
  });
  for (const [from, to] of [...pairs, ...commonPairs].sort((a, b) => b[0].length - a[0].length)) {
    html = html.split(from).join(to);
  }
  return html.replace(/__HLC_BLOCK_(\d+)__/g, (_, index) => blocks[Number(index)]);
}

function localizeLinks(html) {
  return html
    .replace(/https:\/\/hlctex\.com\/textile\//g, `${base}/ja/textile/`)
    .replace(/href="\/textile\//g, 'href="/ja/textile/')
    .replace(/https:\/\/hlctex\.com\/company\//g, `${base}/ja/company/`)
    .replace(/href="\/company\//g, 'href="/ja/company/')
    .replace(/https:\/\/hlctex\.com\/pickup\//g, `${base}/ja/pickup/`)
    .replace(/href="\/pickup\//g, 'href="/ja/pickup/')
    .replace(/href="\/contact\//g, 'href="/ja/contact/')
    .replace(/href="\/"/g, 'href="/ja/"')
    .replace(/href="\/#/g, 'href="/ja/#');
}

function build(page) {
  const source = path.join(root, page.route, 'index.html');
  let html = fs.readFileSync(source, 'utf8');
  html = localizeLinks(html);
  html = html
    .replace(/<html[^>]*lang="[^"]*"/i, '<html lang="ja"')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`)
    .replace(/<meta\b[^>]*name="description"[^>]*>/i, `<meta name="description" content="${page.description}">`)
    .replace(/<link\b[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${base}/ja/${page.route}/">`)
    .replace(/<meta\b[^>]*property="og:title"[^>]*>/i, `<meta property="og:title" content="${page.title}">`)
    .replace(/<meta\b[^>]*property="og:description"[^>]*>/i, `<meta property="og:description" content="${page.description}">`)
    .replace(/<meta\b[^>]*property="og:url"[^>]*>/i, `<meta property="og:url" content="${base}/ja/${page.route}/">`)
    .replace(/"inLanguage"\s*:\s*"[^"]+"/g, '"inLanguage": "ja-JP"');
  if (!/property="og:locale"/i.test(html)) html = html.replace('</title>', '</title><meta property="og:locale" content="ja_JP">');
  html = injectAlternates(html, page.route);
  html = replaceVisible(html, page.pairs);
  const output = path.join(root, 'ja', page.route, 'index.html');
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, html, 'utf8');

  for (const prefix of ['', 'zh/', 'ko/']) {
    const counterpart = path.join(root, prefix, page.route, 'index.html');
    if (fs.existsSync(counterpart)) {
      fs.writeFileSync(counterpart, injectAlternates(fs.readFileSync(counterpart, 'utf8'), page.route), 'utf8');
    }
  }
}

for (const page of pages) build(page);

let sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  const loc = `${base}/ja/${page.route}/`;
  if (!sitemap.includes(`<loc>${loc}</loc>`)) {
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${loc}</loc><lastmod>2026-08-09</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log('Generated Japanese waterless dyeing and finishing pages.');
