const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const base='https://hlctex.com';
const route='contact';
const title='お問い合わせ｜HLC ニット生地メーカー';
const description='竹レーヨン、ウール、機能性ニット、シルケット・液体アンモニア加工に関する生地仕様、サンプル、MOQ、納期、見積りをご相談ください。';
const pairs=[
  ['WL Dye® Waterless Dyeing','WL Dye® 無水染色'],['Mercerization & Liquid Ammonia Finishing','シルケット・液体アンモニア加工'],['Request Specifications & Pricing','仕様・見積もりを依頼'],['Certificates & Certifications','認証・証明書'],
  ['Contact HLC | Bamboo & Functional Knit Fabric Supplier',title],
  ['Products','製品'],['Solutions','ソリューション'],['About HLC','HLCについて'],['Sustainability','サステナビリティ'],['Careers','採用情報'],['Contact Us','お問い合わせ'],
  ['Bamboo Viscose Knits','竹レーヨンニット'],['Mercerization &amp; Liquid Ammonia Finishing','シルケット・液体アンモニア加工'],['Functional Knits','機能性ニット'],['Wool Fabrics','ウール生地'],['Sand-Washed Knit Fabrics','サンドウォッシュニット'],['Embroidered Fabrics','刺繍生地'],
  ['Company Profile','会社概要'],['Quality Management','品質管理'],['Certificates &amp; Certifications','認証・証明書'],['Corporate Sustainability &amp; ESG','サステナビリティ・ESG'],['People &amp; Culture','人材・企業文化'],
  ['Close menu','メニューを閉じる'],['Home','ホーム'],['Contact','お問い合わせ'],
  ['Please use the form below for fabric enquiries. Our team will review the information and contact you directly.','生地の仕様、サンプル、MOQ、納期、見積りについて、下記フォームからお問い合わせください。担当者より直接ご連絡します。'],
  ['Required fields','必須項目'],['Name','お名前'],['Email','メール'],['Country / Region','国・地域'],['Company name','会社名'],['Inquiry','お問い合わせ内容'],
  ['You may include the fabric use, composition, weight, width and quantity.','用途、混率、目付、幅、数量などをご記入ください。'],
  ['I agree that HLC may use the information provided to respond to this inquiry.','お問い合わせへの回答のため、HLCが入力情報を利用することに同意します。'],
  ['Send inquiry','問い合わせを送信'],['Contact details','連絡先'],['China office & factory','中国本社・工場'],['Direct contact','直接のお問い合わせ'],
  ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China','中国浙江省嘉興市桐郷市濮院鎮恒楽路51号 314502'],
  ['Tel','電話'],['Fax','ファクス'],['All rights reserved.','無断転載を禁じます。'],['Website tools','サイトツール']
];
function replaceVisible(html){const blocks=[];html=html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi,b=>{blocks.push(b);return`__BLOCK_${blocks.length-1}__`;});for(const[a,b]of pairs)html=html.split(a).join(b);return html.replace(/__BLOCK_(\d+)__/g,(_,i)=>blocks[+i]);}
function alternates(){return `<link rel="alternate" hreflang="en" href="${base}/contact/">\n<link rel="alternate" hreflang="zh-Hans" href="${base}/zh/contact/">\n<link rel="alternate" hreflang="ja" href="${base}/ja/contact/">\n<link rel="alternate" hreflang="x-default" href="${base}/contact/">`;}
function inject(html){html=html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi,'\n');return html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i,`$1\n${alternates()}`);}
let html=fs.readFileSync(path.join(root,'contact','index.html'),'utf8');
html=html.replace(/<html[^>]*lang="[^"]*"/i,'<html lang="ja"').replace(/<title>[\s\S]*?<\/title>/i,`<title>${title}</title>`).replace(/<meta\b[^>]*name="description"[^>]*>/i,`<meta name="description" content="${description}">`).replace(/<link\b[^>]*rel="canonical"[^>]*>/i,`<link rel="canonical" href="${base}/ja/contact/">`).replace(/<meta\b[^>]*property="og:title"[^>]*>/i,`<meta property="og:title" content="${title}">`).replace(/<meta\b[^>]*property="og:description"[^>]*>/i,`<meta property="og:description" content="${description}">`).replace(/<meta\b[^>]*property="og:url"[^>]*>/i,`<meta property="og:url" content="${base}/ja/contact/">`).replace(/data-contact-language="en"/g,'data-contact-language="ja"');
if(!/property="og:locale"/i.test(html))html=html.replace('</title>','</title><meta property="og:locale" content="ja_JP">');
html=inject(html).replace(/href="\/company\//g,'href="/ja/company/').replace(/href="\/textile\//g,'href="/ja/textile/').replace(/href="\/pickup\//g,'href="/ja/pickup/').replace(/href="\/contact\//g,'href="/ja/contact/').replace(/href="\/"/g,'href="/ja/"').replace(/href="\/#/g,'href="/ja/#');
html=replaceVisible(html).replace(/"inLanguage"\s*:\s*"[^"]+"/g,'"inLanguage": "ja-JP"');
const out=path.join(root,'ja','contact','index.html');fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,html,'utf8');
for(const prefix of['','zh/']){const file=path.join(root,prefix,'contact','index.html');if(fs.existsSync(file))fs.writeFileSync(file,inject(fs.readFileSync(file,'utf8')),'utf8');}
let sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');const loc=`${base}/ja/contact/`;if(!sitemap.includes(`<loc>${loc}</loc>`))sitemap=sitemap.replace('</urlset>',`  <url><loc>${loc}</loc><lastmod>2026-08-09</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n</urlset>`);fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap,'utf8');
console.log('Generated Japanese contact page.');
