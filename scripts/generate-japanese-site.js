const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';
const today = '2026-08-08';

const catalogs = {
  '': ['HLC｜ベビー・キッズ向け垂直統合ニット生地メーカー', 'HLCは竹レーヨン、オーガニックコットン、メリノウール、機能性繊維を使用し、ベビー服、パジャマ、ルームウェア向けニット生地を開発・生産しています。'],
  'textile': ['HLC ニット生地コレクション｜竹・ウール・機能性素材', '竹レーヨン、メリノウール、機能性、サンドウォッシュ、刺繍、シルケット・液体アンモニア加工のニット生地をご覧いただけます。'],
  'textile/bamboo-fabric': ['竹レーヨン・バンブーニット生地｜HLC', 'ベビー服、パジャマ、肌着、ルームウェア向けの竹レーヨン・スパンデックス混ニット生地。目付、MOQ、納期、試験結果をご確認ください。'],
  'textile/mercerized-liquid-ammonia-fabric': ['シルケット・液体アンモニア加工ニット生地｜HLC', 'SUPIMA、BCIコットン、高級綿混紡向けのシルケット加工・液体アンモニア加工ニット生地コレクションです。'],
  'textile/functional': ['機能性ニット生地｜吸汗速乾・UV・温度調節｜HLC', '吸汗速乾、温度調節、UVカット、ストレッチ性能を備えた機能性ニット生地を用途と試験結果から比較できます。'],
  'textile/wool-fabric': ['メリノウール・ウールニット生地｜HLC', 'ZQメリノ、RWS、ミュールジングフリーウールを使用した天竺、スムース、鹿の子、機能性混紡ニット生地です。'],
  'textile/womenswear-fabric': ['サンドウォッシュニット生地｜HLC', '柔らかな風合いと自然なドレープを生むモダール、テンセル、混紡サンドウォッシュニット生地です。'],
  'textile/embroidered-fabric': ['オーダー刺繍生地｜HLC', '婦人服、ベビー・キッズ、ブランドコレクション向けのオーダー刺繍ニット・織物生地開発サービスです。']
};

const terms = [
  ['Bamboo Viscose Spandex','竹レーヨン・ポリウレタン'], ['Bamboo Cotton Spandex','竹レーヨン・コットン・ポリウレタン'],
  ['Bamboo Organic Cotton','竹レーヨン・オーガニックコットン'], ['Bamboo Merino Wool Spandex','竹レーヨン・メリノウール・ポリウレタン'],
  ['Bamboo Viscose','竹レーヨン'], ['Liquid-Ammonia-Finished','液体アンモニア加工'], ['Liquid Ammonia','液体アンモニア加工'],
  ['liquid ammonia','液体アンモニア加工'], ['Mercerized','シルケット加工'], ['mercerized','シルケット加工'],
  ['Sand Washed','サンドウォッシュ'], ['Sand Wash','サンドウォッシュ'], ['Sand-washed','サンドウォッシュ'], ['Sand-wash','サンドウォッシュ'],
  ['Temperature Regulating','温度調節'], ['High UV Protection','高UVカット'], ['Moisture Management','吸汗速乾'],
  ['Reactive Digital Print','反応染料デジタルプリント'], ['Pigment Digital Print','顔料デジタルプリント'],
  ['Single Jersey','天竺'], ['single jersey','天竺'], ['French Terry','裏毛'], ['Merino Wool','メリノウール'],
  ['Organic Cotton','オーガニックコットン'], ['Better Cotton','BCIコットン'], ['BCI Cotton','BCIコットン'],
  ['Supima Cotton','SUPIMAコットン'], ['Cotton Modal','コットン・モダール'], ['Spandex','ポリウレタン'],
  ['Polyester','ポリエステル'], ['Nylon','ナイロン'], ['Tencel','テンセル'], ['Modal','モダール'],
  ['Interlock','スムース'], ['interlock','スムース'], ['Jersey','天竺'], ['jersey','天竺'], ['Pique','鹿の子'], ['pique','鹿の子'],
  ['Mesh','メッシュ'], ['Jacquard','ジャカード'], ['Scuba','ダンボールニット'], ['Rib','リブ'], ['Striped','ボーダー'],
  ['Functional','機能性'], ['Embroidered','刺繍'], ['Knit','ニット'], ['Rayon','レーヨン'], ['Wool','ウール'],
  ['Cotton','コットン'], ['Hemp','ヘンプ'], ['Linen','リネン'], ['Fabric','生地'], ['Fabrics','生地'],
  ['Waterless dyeing','無水染色'], ['waterless dyeing','無水染色'], ['Babywear','ベビー服'], ['babywear','ベビー服'],
  ['Kidswear','キッズウェア'], ['kidswear','キッズウェア'], ['Sleepwear','パジャマ'], ['sleepwear','パジャマ'],
  ['Loungewear','ルームウェア'], ['loungewear','ルームウェア'], ['Underwear','肌着'], ['underwear','肌着'],
  ['Womenswear','婦人服'], ['womenswear','婦人服'], ['Menswear','紳士服'], ['menswear','紳士服'],
  ['Pajamas','パジャマ'], ['pajamas','パジャマ'], ['bodysuit','ボディスーツ'], ['romper','ロンパース'],
  ['per colour','色ごと'], ['days','日'], ['yarn','糸']
];

// Product-use wording needs phrase-level translation before individual material
// terms are replaced. Keep the longer phrases first so Japanese product pages
// read naturally instead of becoming a mixture of English and Japanese.
const applicationTerms = [
  ['elevated everyday sportswear','上質なデイリースポーツウェア'], ['elevated everyday comfort garments','上質なデイリーウェア'],
  ['premium everyday comfort garments','上質なデイリーウェア'], ['active lifestyle essentials','アクティブライフ向け衣料'],
  ['technical base layers','高機能ベースレイヤー'], ['performance base layers','高機能ベースレイヤー'],
  ['premium polo shirts','高級ポロシャツ'], ['casual collared shirts','カジュアルシャツ'], ['business shirts','ビジネスシャツ'],
  ['smart casual shirts','スマートカジュアルシャツ'], ['sun-protection tops','UVカットトップス'],
  ['high-quality T-shirts','高品質Tシャツ'], ['premium T-shirts','高級Tシャツ'], ['training tops','トレーニングトップス'],
  ['running shirts','ランニングシャツ'], ['running layers','ランニングウェア'], ['hiking shirts','ハイキングシャツ'],
  ['travel shirts','トラベルシャツ'], ['travel tops','トラベルトップス'], ['travel wear','トラベルウェア'],
  ['resort tops','リゾート向けトップス'], ['outdoor casualwear','アウトドアカジュアル'], ['outdoor tops','アウトドアトップス'],
  ['compression wear','コンプレッションウェア'], ['cycling wear','サイクルウェア'], ['sports tops','スポーツトップス'],
  ['sports bras','スポーツブラ'], ['lightweight tops','軽量トップス'], ['premium tops','高級トップス'],
  ['close-to-skin essentials','肌着'], ['base layers','ベースレイヤー'], ['casual tops','カジュアルトップス'],
  ['lounge sets','ルームウェアセット'], ['casual sets','カジュアルセット'], ['baby footies','ベビー用足付きロンパース'],
  ['knit dresses','ニットドレス'], ['formal wear','フォーマルウェア'], ['evening wear','イブニングウェア'],
  ['T-shirts','Tシャツ'], ['polo shirts','ポロシャツ'], ['golf wear','ゴルフウェア'], ['activewear','アクティブウェア'],
  ['gym wear','ジムウェア'], ['yoga tops','ヨガトップス'], ['rash guards','ラッシュガード'], ['leggings','レギンス'],
  ['hoodies','パーカー'], ['joggers','ジョガーパンツ'], ['sweatshirts','スウェット'], ['cardigans','カーディガン'],
  ['skirts','スカート'], ['footie','足付きロンパース'], ['summer comfort','夏向け衣料']
];

const ui = [
  ['Primary navigation','メインナビゲーション'], ['Site tools','サイトツール'], ['Products','製品'], ['Solutions','ソリューション'],
  ['About HLC','HLCについて'], ['Sustainability','サステナビリティ'], ['Careers','採用情報'], ['Contact us','お問い合わせ'], ['Contact','お問い合わせ'],
  ['Home','ホーム'], ['Bamboo Fabrics','竹レーヨン生地'], ['Bamboo Fabric','竹レーヨン生地'], ['Fabrics','生地'],
  ['Current price','参考価格'], ['valid through Aug 30, 2026','2026年8月30日まで有効'], ['Valid through Aug 30, 2026','2026年8月30日まで有効'],
  ['(valid through Aug 30)','（8月30日まで有効）'], ['Mercerization','シルケット加工'],
  ['Corporate Sustainability & ESG','企業のサステナビリティ・ESG'], ['Corporate Sustainability &amp; ESG','企業のサステナビリティ・ESG'],
  ['People & Culture','人材・企業文化'], ['People &amp; Culture','人材・企業文化'], ['Activewear','アクティブウェア'],
  ['Piece Dyed','反染め'], ['Yarn Dyed','先染め'],
  ['Request a sample','サンプル依頼'], ['Characteristics','製品仕様'], ['Composition','混率'], ['Weight','目付'],
  ['Cuttable width','有効幅'], ['Construction','組織'], ['Worldwide shipping','海外発送'],
  ['In-house inspection and test support','自社検査・試験対応'], ['Product information','製品情報'],
  ['Product description','商品説明'], ['Details','詳細'], ['Test results','試験結果'], ['Other','その他'],
  ['Yarn count','糸番手'], ['Weight conversion','重量換算'], ['Sample lead time','サンプル納期'],
  ['Bulk lead time','量産納期'], ['Applications','用途'], ['Finishing','加工'], ['YOU MAY ALSO LIKE','関連製品'],
  ['Similar fabrics','類似生地'], ['View product','製品を見る'], ['View fabric','生地を見る'], ['Show filters','絞り込み'],
  ['No fabrics match the selected filters.','選択した条件に該当する生地はありません。'], ['Price on request','価格はお問い合わせください'],
  ['Buyer services','バイヤーサポート'], ['Product images','製品画像'], ['Open high-resolution product image','高解像度画像を開く'],
  ['Email for business','業務用メールアドレス'], ['Create sample request email','サンプル依頼メールを作成'],
  ['Business email','業務用メールアドレス'], ['Generate sample email','サンプル依頼メールを作成'],
  ['Your email address is used only to prepare this sample request.','入力されたメールアドレスは、サンプル依頼メールの作成にのみ使用されます。'],
  ['Open the high-resolution image to review the reported methods and results directly.','高解像度画像で試験方法と結果を直接ご確認いただけます。'],
  ['Open the high-resolution image to review the reported methods & results.','高解像度画像で試験方法と結果をご確認いただけます。'],
  ['Open the high-resolution image to review the reported methods and results.','高解像度画像で試験方法と結果をご確認いただけます。'],
  ['Product image preview','製品画像プレビュー'], ['Close image preview','画像プレビューを閉じる'],
  ['Open high-resolution test result image','高解像度の試験結果画像を開く'],
  ['Close sample request','サンプル依頼を閉じる'], ['Sample request','サンプル依頼'], ['Submit','送信'], ['Search','検索'],
  ['Inspection &amp; Testing Centre','検査・試験センター'], ['Inspection & Testing Centre','検査・試験センター'],
  ['Request Specifications &amp; Quotation','仕様・見積りを依頼'], ['Request Specifications &amp; Pricing','仕様・見積りを依頼'],
  ['Request Specifications & Pricing','仕様・見積りを依頼'], ['Company Profile','会社概要'], ['Quality Management','品質管理'],
  ['Certificates &amp; Certifications','認証・証明書'], ['Certificates & Certifications','認証・証明書'],
  ['Close menu','メニューを閉じる'], ['Application options','用途'], ['Composition options','混率'],
  ['Bamboo Viscose Knit Fabrics','竹レーヨンニット生地'], ['Bamboo Viscose Knits','竹レーヨンニット生地'],
  ['Functional Knit Fabrics','機能性ニット生地'], ['Functional Knits','機能性ニット生地'], ['Wool Fabrics','メリノウールニット生地'],
  ['Sand-Washed Knit Fabrics','サンドウォッシュニット生地'], ['Embroidered Fabrics','オーダー刺繍生地'],
  ['Soft knit fabrics for babywear, sleepwear and next-to-skin apparel.','ベビー服、パジャマ、肌着向けの柔らかなニット生地。'],
  ['Thermoregulation, moisture management, cooling and performance development.','温度調節、吸汗速乾、接触冷感などの機能性開発。'],
  ['Refined cotton knits with smoother surfaces and improved dimensional stability.','滑らかな表面と寸法安定性を備えた高品質コットンニット。'],
  ['Merino wool and RWS-certified wool blend fabrics.','メリノウールとRWS認証ウール混ニット生地。'],
  ['Soft-touch modal, EcoCosy® viscose and polyester blend knits with a relaxed drape.','柔らかなモダール、EcoCosy®レーヨン、ポリエステル混のドレープニット。'],
  ['Custom decorative fabrics for womenswear, occasionwear and branded apparel.','婦人服、オケージョンウェア、ブランド衣料向けのオーダー刺繍生地。'],
  ['Certifications &amp; Material Support','認証・素材サポート'], ['Certifications & Material Support','認証・素材サポート'],
  ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China','中国浙江省嘉興市桐郷市濮院鎮恒楽路51号 314502'],
  ['All rights reserved.','無断転載を禁じます。'], ['Email','メール'], ['Tel','電話'], ['Fax','ファクス']
];

const editorial = {
  'textile/bamboo-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>HLCの竹レーヨン生地が選ばれる理由</h2><p>HLCは年間1,800トン以上の竹レーヨン生地を生産し、約80トンの生機と100トンの糸を常備しています。リピート生産を迅速に立ち上げ、競争力のある価格と安定した納期を提供します。</p><p class="bamboo-editorial-followup">過去7年間で13,000トン以上を生産。ベビー服、パジャマ、肌着、ルームウェア向け生地の編立・染色・仕上げ品質を一貫して管理しています。</p><h2 class="bamboo-editorial-section-title" id="bambooBenefitsTitle">竹レーヨンニット生地の特徴</h2><p>竹レーヨンは、なめらかな肌触り、柔らかなドレープ、快適な着心地が特長の再生セルロース繊維です。ポリウレタンやコットンとの混紡で、柔らかさ、伸縮性、回復性を用途に合わせて調整できます。</p><h3>ベビー服とパジャマ向けの柔らかさ</h3><p>肌に触れる面がなめらかで、パジャマ、ロンパース、ボディスーツ、肌着、ルームウェアの開発に適しています。</p><h3>通気性と吸湿性</h3><p>必要な目付、幅、伸縮性、最終用途に合わせて編組織と仕上げを設計します。</p><h3>確認できる品質</h3><p>製品ごとに混率、寸法安定性、染色堅牢度、ピリング、MOQ、納期、試験結果を確認でき、該当製品のOEKO-TEX資料も提供します。</p></section>`,
  'textile/mercerized-liquid-ammonia-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>高級コットンニットのための仕上げ加工</h2><p>HLCはLafer液体アンモニア加工ライン1基とPukwangシルケット加工ライン2基を保有しています。BCIコットン、SUPIMA、GIZAコットンニットの風合い、光沢、寸法安定性、洗濯後の外観を向上させます。</p><h3>ブランド仕様に合わせた開発</h3><p>ポロシャツ、Tシャツ、肌着、ベビー服、パジャマ、ルームウェア向けに、糸番手、目付、組織、目標風合いを調整します。</p><h3>試験結果と生産情報</h3><p>各製品ページで混率、目付、MOQ、サンプル・量産納期、試験結果をご確認いただけます。</p></section>`,
  'textile/functional': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>用途から選ぶ機能性ニット生地</h2><p>吸汗速乾、温度調節、UVカット、接触冷感、ストレッチ機能を、実際の着用環境と編組織に合わせて設計します。HLCは目標目付と性能基準に沿って、糸、編立、染色、仕上げを一体で調整します。</p><h3>数値で確認できる性能</h3><p>対象製品には寸法安定性、染色堅牢度、ピリング、吸水・速乾などの試験結果を提供します。</p></section>`,
  'textile/wool-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>HLCのメリノウール生地が選ばれる理由</h2><p>HLCは世界的なウール糸メーカーXinaoと同じ浙江省嘉興市桐郷に拠点を置き、10年以上の協業を通じてメリノウールの編立・染色特性を熟知しています。安定した糸調達と競争力のある価格を提供します。</p><h3>責任あるメリノウール</h3><p>プロジェクトに応じて、ミュールジングフリー、RWS、ZQ Merino認証糸に対応します。</p><h3>ウールニット染色の専門性</h3><p>HLCは中国でも数少ないウールニット生地の染色に対応できる専門工場として、天竺、スムース、鹿の子、機能性混紡を開発します。</p></section>`,
  'textile/womenswear-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>サンドウォッシュニット生地</h2><p>モダール、テンセル、ポリエステル、混紡ニットに柔らかな風合いと自然なドレープを付与します。婦人服、ルームウェア、カジュアルコレクション向けに目付、組織、表面感を開発します。</p></section>`,
  'textile/embroidered-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>ブランド向けオーダー刺繍生地</h2><p>婦人服、ベビー・キッズ、ドレス、カプセルコレクション向けに、刺繍柄と立体感を用途に合わせて設計します。ニットまたは織物のベース生地、混率、目付、色、風合い、柄リピートを組み合わせ、サンプル確認後に有効幅、MOQ、試作・量産納期、試験項目などの生産仕様をご案内します。</p></section>`
};

function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function replaceTerms(s){let out=s; for(const [a,b] of terms) out=out.replace(new RegExp(esc(a),'gi'),b); return out.replace(/\s+/g,' ').trim();}
function translateApplications(s){let out=clean(s);for(const[a,b]of applicationTerms)out=out.replace(new RegExp(esc(a),'gi'),b);out=replaceTerms(out);return out.replace(/\s*(?:,|;|\/|\band\b|&amp;|&)\s*/gi,'、').replace(/\s*[・]\s*/g,'、').replace(/、+/g,'、').replace(/[.。]+$/,'').trim();}
function extract(html,re,f=''){const m=html.match(re); return m?m[1].replace(/<[^>]+>/g,'').trim():f;}
function clean(s){return s.replace(/g\/m虏/gi,'g/m²').replace(/路/g,'・').replace(/15鈥\?0/g,'15～20').replace(/30鈥\?0/g,'30～40');}
function url(route,lang='en'){return `${base}${lang==='ja'?'/ja':''}/${route?route.replace(/^\//,'')+'/':''}`.replace(/([^:]\/)\/+/,'$1');}
function alternates(route,hasZh=false){let x=`<link rel="alternate" hreflang="en" href="${url(route)}">\n`; if(hasZh)x+=`<link rel="alternate" hreflang="zh-Hans" href="${base}/zh/${route?route+'/':''}">\n`; x+=`<link rel="alternate" hreflang="ko" href="${base}/ko/${route?route+'/':''}">\n<link rel="alternate" hreflang="ja" href="${url(route,'ja')}">\n<link rel="alternate" hreflang="x-default" href="${url(route)}">`; return x;}
function inject(html,route,hasZh=false){html=html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi,'\n'); const block=alternates(route,hasZh); return /<link[^>]+rel="canonical"/i.test(html)?html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i,`$1\n${block}`):html.replace('</head>',`${block}\n</head>`);}
function updateSource(file,route,hasZh=false){if(!fs.existsSync(file))return; const html=inject(fs.readFileSync(file,'utf8'),route,hasZh); fs.writeFileSync(file,html,'utf8');}
function localizeLinks(html){return html.replace(/https:\/\/hlctex\.com\/textile\//g,`${base}/ja/textile/`).replace(/href="\/textile\//g,'href="/ja/textile/').replace(/https:\/\/hlctex\.com\/company\//g,`${base}/ja/company/`).replace(/href="\/company\//g,'href="/ja/company/').replace(/https:\/\/hlctex\.com\/pickup\//g,`${base}/ja/pickup/`).replace(/href="\/pickup\//g,'href="/ja/pickup/').replace(/href="\/contact\//g,'href="/ja/contact/').replace(/href="\/"/g,'href="/ja/"').replace(/href="\/#/g,'href="/ja/#');}
function setMeta(html,route,title,desc){html=html.replace(/<html[^>]*lang="[^"]*"/i,'<html lang="ja"').replace(/<title>[\s\S]*?<\/title>/i,`<title>${title}</title>`).replace(/<meta\b[^>]*name="description"[^>]*>/i,`<meta name="description" content="${desc}">`).replace(/<link\b[^>]*rel="canonical"[^>]*>/i,`<link rel="canonical" href="${url(route,'ja')}">`).replace(/<meta\b[^>]*property="og:title"[^>]*>/i,`<meta property="og:title" content="${title}">`).replace(/<meta\b[^>]*property="og:description"[^>]*>/i,`<meta property="og:description" content="${desc}">`).replace(/<meta\b[^>]*property="og:url"[^>]*>/i,`<meta property="og:url" content="${url(route,'ja')}">`).replace(/<meta\b[^>]*name="twitter:title"[^>]*>/i,`<meta name="twitter:title" content="${title}">`).replace(/<meta\b[^>]*name="twitter:description"[^>]*>/i,`<meta name="twitter:description" content="${desc}">`); if(!/property="og:locale"/i.test(html))html=html.replace('</title>','</title>\n<meta property="og:locale" content="ja_JP">'); return html;}
function translateVisibleText(text){
  let output=text;
  // Translate complete phrases before shorter shared terms.  Otherwise entries
  // such as "cotton", "knits" or "and" partially rewrite a sentence and stop
  // its full Japanese translation from matching.
  for(const [a,b] of [...ui].sort((x,y)=>y[0].length-x[0].length))output=output.replace(new RegExp(esc(a),'g'),b);
  return replaceTerms(output)
    .replace(/(\d+)\s+fabrics\b/gi,'$1種類')
    .replace(/(\d+)生地s\b/gi,'$1種類')
    .replace(/\band\b/gi,'・');
}
function replaceVisible(html){
  const blocks=[];
  html=html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi,b=>{blocks.push(b);return `__BLOCK_${blocks.length-1}__`;});
  html=html.replace(/>([^<]+)</g,(m,t)=>`>${translateVisibleText(t)}<`);
  html=html.replace(/\b(alt|aria-label|placeholder|title)="([^"]*)"/gi,(m,a,v)=>`${a}="${translateVisibleText(v)}"`);
  return html.replace(/__BLOCK_(\d+)__/g,(_,i)=>blocks[+i]);
}
function fixJson(html,route,product={}){return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,(whole,raw)=>{try{const d=JSON.parse(raw); const visit=x=>{if(!x||typeof x!=='object')return; if(['Product','CollectionPage','WebPage','Organization'].includes(x['@type']))x.inLanguage='ja-JP'; if(x['@type']==='Product'){
      if(product.name)x.name=product.name;
      if(product.description)x.description=product.description;
      if(product.composition)x.material=replaceTerms(clean(product.composition));
      if(Array.isArray(x.additionalProperty))x.additionalProperty.forEach(p=>{if(!p||typeof p!=='object')return; const originalName=p.name; const names={'Yarn count':'糸番手','Fabric weight':'目付','Cuttable width':'有効幅','Construction':'組織','Finishing':'加工','Sample lead time':'サンプル納期','Bulk lead time':'量産納期','Applications':'用途','Test report':'試験報告書'}; if(names[p.name])p.name=names[p.name]; if(typeof p.value==='string')p.value=originalName==='Applications'?translateApplications(p.value):replaceTerms(clean(p.value)).replace(/\band\b/gi,'・');});
    } for(const k of Object.keys(x)){if(['url','item','@id'].includes(k)&&typeof x[k]==='string'&&x[k].startsWith(base)&&!x[k].includes('/assets/')){const p=x[k].slice(base.length).replace(/^\/(ko\/|zh\/|ja\/)?/,''); x[k]=`${base}/ja/${p}`;} else visit(x[k]);}}; visit(d); return `<script type="application/ld+json">${JSON.stringify(d,null,2)}</script>`;}catch{return whole;}});}

function translateHomepage(html){const pairs=[
  ['KNIT FABRICS · RESPONSIBLE FINISHING','ニット生地・責任ある仕上げ'],
  ['Comfort-led knits.<br>Built for dependable production.','着心地を考えたニット生地。<br>安定した生産体制でお届けします。'],
  ['Bamboo viscose and functional knit fabrics for babywear, sleepwear, loungewear and underwear—supported by technical testing, scalable production and responsible finishing.','HLCは竹レーヨンと機能性ニット生地を、ベビー服、パジャマ、ルームウェア、肌着向けに開発・生産し、自社試験、量産対応、責任ある仕上げで品質を支えます。'],
  ['MATERIAL × PROCESS','素材 × プロセス'],
  ['A softer hand, with a lighter footprint.','柔らかな風合いを、より少ない環境負荷で。'],
  ['HLC connects next-to-skin knit development with lower-impact dyeing and finishing—balancing softness, dimensional stability, wash performance and resource efficiency.','HLCは肌に触れるニット生地の開発と環境負荷の低い染色・仕上げを一体化し、柔らかさ、寸法安定性、洗濯耐久性、資源効率のバランスを追求しています。'],
  ['01 / LOWER-IMPACT COLOUR','01 / 環境負荷を抑えた染色'],
  ['A fibre-colouration approach designed to reduce water and chemical use while maintaining colour performance and a soft hand for next-to-skin fabrics.','水と薬剤の使用量を抑えながら、発色性と肌に触れる生地の柔らかな風合いを両立する繊維染色です。'],
  ['Explore the process','工程を見る'],
  ['02 / PERFORMANCE FINISHING','02 / 高機能仕上げ'],
  ['Mercerization &amp; Liquid Ammonia Finishing','シルケット・液体アンモニア加工'],
  ['Lafer and Pukwang finishing lines help improve lustre, softness, dimensional stability and wash performance for premium knitted fabrics.','Lafer液体アンモニア加工ラインとPukwangシルケット加工ラインにより、高級ニット生地の光沢、柔らかさ、寸法安定性、洗濯後の外観を向上させます。'],
  ['Latest developments','最新開発'],
  ['Bamboo Blend Development','竹レーヨン混紡開発'],
  ['Softer, more stable bamboo viscose knits developed for babywear, sleepwear and next-to-skin apparel.','ベビー服、パジャマ、肌着向けに、より柔らかく安定した竹レーヨンニットを開発します。'],
  ['Low-Temperature Dyeing','低温染色'],
  ['Improving water and energy efficiency while protecting the hand feel and colour performance of knitted fabrics.','ニット生地の風合いと発色性を保ちながら、水とエネルギーの効率を高めます。'],
  ['Functional Knit Structures','機能性ニット組織'],
  ['Balancing breathability, stretch and next-to-skin comfort for active and everyday apparel programmes.','スポーツウェアと日常着向けに、通気性、伸縮性、肌当たりの良さを設計します。'],
  ['Bamboo &amp; Wool Blends','竹レーヨン・ウール混紡'],
  ['Combining the silky hand of bamboo viscose with wool warmth for seasonal next-to-skin knits.','竹レーヨンのなめらかさとウールの保温性を組み合わせた、季節向けの肌着用ニットです。'],
  ['Lightweight UV Knits','軽量UVカットニット'],
  ['Lightweight knit development focused on coverage, wash durability and everyday sun-protection applications.','日常の紫外線対策に向け、軽さ、カバー性、洗濯耐久性を重視したニットを開発します。'],
  ['Embroidered &amp; Sand-Washed Knit Fabrics','刺繍・サンドウォッシュニット生地'],
  ['Fluid drape, refined surfaces and multi-fibre blends for womenswear and embroidered fabric programmes.','婦人服と刺繍生地向けに、自然なドレープ、洗練された表面、多素材混紡を開発します。'],
  ['Soft knit fabrics for babywear, sleepwear and next-to-skin apparel.','ベビー服、パジャマ、肌着向けの柔らかなニット生地。'],
  ['Thermoregulation, moisture management, cooling and performance development.','温度調節、吸汗速乾、接触冷感などの機能性開発。'],
  ['Refined cotton knits with smoother surfaces and improved dimensional stability.','滑らかな表面と寸法安定性を備えた高品質コットンニット。'],
  ['Merino wool and RWS-certified wool blend fabrics.','メリノウールとRWS認証ウール混ニット生地。'],
  ['Soft-touch modal, EcoCosy® viscose and polyester blend knits with a relaxed drape.','柔らかなモダール、EcoCosy®レーヨン、ポリエステル混のドレープニット。'],
  ['Custom decorative fabrics for womenswear, occasionwear and branded apparel.','婦人服、オケージョンウェア、ブランド衣料向けのオーダー刺繍生地。'],
  ['Learn more','詳しく見る'],['More developments','開発事例をもっと見る'],['Our People','働く人々'],
  ['Water-Saving, Lower-Carbon Dyeing','節水・低炭素染色'],['Water- and Carbon-Reducing Dyeing','節水・炭素削減染色'],
  ['Mercerization &amp; Liquid Ammonia','シルケット・液体アンモニア加工'],['Inspection &amp; Testing','検査・試験']
]; return replaceAllLiteral(html,pairs);}

function replaceAllLiteral(html,pairs){for(const[a,b]of pairs)html=html.split(a).join(b);return html;}
function productDescription(name,composition,weight,construction,apps){const spec=[replaceTerms(clean(composition)),clean(weight),replaceTerms(construction)].filter(Boolean).join('、'); const use=apps?`${translateApplications(apps)}向けに適しています。`:''; return `HLCの${name}。${spec}の仕様で生産し、肌に触れる衣料に求められる柔らかな風合いと安定した品質を提供します。${use}MOQ、サンプル・量産納期、試験結果をご確認いただけます。`;}
function buildProduct(slug){const src=path.join(root,'textile','products',slug,'index.html'); let html=fs.readFileSync(src,'utf8'); const enName=extract(html,/<h1[^>]*data-template-field="product-name"[^>]*>([\s\S]*?)<\/h1>/i,slug); const name=replaceTerms(enName); const comp=extract(html,/data-template-field="composition">([\s\S]*?)<\/dd>/i); const weight=extract(html,/data-template-field="weight">([\s\S]*?)<\/dd>/i); const cons=extract(html,/data-template-field="construction">([\s\S]*?)<\/dd>/i); const apps=extract(html,/data-template-field="detail-applications">([\s\S]*?)<\/dd>/i).split('. Development')[0]; const jaApps=translateApplications(apps); const route=`textile/products/${slug}`; const desc=productDescription(name,comp,weight,cons,jaApps); html=localizeLinks(html); html=setMeta(html,route,`${name}｜HLC ニット生地`,desc); html=inject(html,route,false); html=replaceVisible(html); html=html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i,`<h1$1>${name}</h1>`).replace(/data-template-field="breadcrumb">[\s\S]*?<\/li>/i,`data-template-field="breadcrumb">${name}</li>`).replace(/<p data-template-field="short-description">[\s\S]*?<\/p>/i,`<p data-template-field="short-description">${desc}</p>`).replace(/<h2 data-template-field="seo-main-title">[\s\S]*?<\/h2>/i,`<h2 data-template-field="seo-main-title">${name}の仕様と調達情報</h2>`).replace(/<p data-template-field="seo-paragraph-1">[\s\S]*?<\/p>/i,`<p data-template-field="seo-paragraph-1">${replaceTerms(clean(comp))}、${clean(weight)}、${replaceTerms(cons)}のニット生地です。量産前に目付、幅、風合い、性能基準を確認します。</p>`).replace(/<p data-template-field="seo-paragraph-2">[\s\S]*?<\/p>/i,`<p data-template-field="seo-paragraph-2">標準サンプル納期は15～20日、量産納期は30～40日です。MOQと色別MCQは製品詳細に基づいてご相談ください。</p>`).replace(/<p data-template-field="technical-details">[\s\S]*?<\/p>/i,`<p data-template-field="technical-details">${name}は${replaceTerms(clean(comp))}、${clean(weight)}、${replaceTerms(cons)}の仕様で生産します。糸、編立、染色、仕上げは目標風合いと性能に合わせて調整できます。</p>`).replace(/(<dd data-template-field="detail-applications">)[\s\S]*?(<\/dd>)/i,`$1${jaApps}$2`).replace(/SAMPLE REQUEST/g,'サンプル依頼').replace(/Request this [^<]* sample/g,'この生地のサンプルを依頼').replace(/Enter your business email\.[^<]*/g,'業務用メールアドレスを入力すると、Style#を含むHLC宛てのサンプル依頼メールが作成されます。').replace(/\(valid through Aug 30\)/gi,'（8月30日まで有効）').replace(/data-alt="[^"]*fabric front view"/gi,`data-alt="${name} 生地画像"`).replace(/alt="[^"]*fabric front view"/gi,`alt="${name} 生地画像"`).replace(/alt="[^"]*fabric detail view"/gi,`alt="${name} 生地詳細画像"`).replace(/alt="[^"]*high-resolution view"/gi,`alt="${name} 高解像度画像"`).replace(/alt="[^"]*laboratory test report"/gi,`alt="${name} 試験報告書"`); html=fixJson(html,route,{name,description:desc,composition:comp}); const out=path.join(root,'ja','textile','products',slug,'index.html'); fs.mkdirSync(path.dirname(out),{recursive:true}); fs.writeFileSync(out,html,'utf8');}
function buildCatalog(route){const [title,desc]=catalogs[route]; const src=path.join(root,route,'index.html'); let html=fs.readFileSync(src,'utf8'); html=localizeLinks(html); html=setMeta(html,route,title,desc); const hasZh=['','textile','textile/bamboo-fabric','textile/functional'].includes(route); html=inject(html,route,hasZh); if(route==='')html=translateHomepage(html); html=replaceVisible(html); const headings={'textile/bamboo-fabric':'竹レーヨンニット生地','textile/mercerized-liquid-ammonia-fabric':'シルケット・液体アンモニア加工ニット生地','textile/functional':'機能性ニット生地','textile/wool-fabric':'メリノウールニット生地','textile/womenswear-fabric':'サンドウォッシュニット生地','textile/embroidered-fabric':'オーダー刺繍生地'}; if(headings[route])html=html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i,`<h1>${headings[route]}</h1>`); html=html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)\s*<span class="bamboo-catalog-count">[^<]*<\/span>/i,(m,h)=>`${h}<span class="bamboo-catalog-count">${(m.match(/(\d+)/)||['',''])[1]}種類</span>`).replace(/HLC BAMBOO KNIT COLLECTION/g,'HLC 竹レーヨンニットコレクション'); if(editorial[route])html=html.replace(/<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial">[\s\S]*?<\/section>/i,editorial[route]); html=fixJson(html,route); const out=path.join(root,'ja',route,'index.html'); fs.mkdirSync(path.dirname(out),{recursive:true}); fs.writeFileSync(out,html,'utf8');}

const buildCatalogBase=buildCatalog;
buildCatalog=function(route){
  buildCatalogBase(route);
  if(!editorial[route])return;
  const out=path.join(root,'ja',route,'index.html');
  let html=fs.readFileSync(out,'utf8');
  html=html.replace(/<section(?=[^>]*class="bamboo-filter-editorial")[^>]*>[\s\S]*?<\/section>/i,editorial[route]);
  fs.writeFileSync(out,html,'utf8');
};

for(const route of Object.keys(catalogs)){if(fs.existsSync(path.join(root,route,'index.html'))){buildCatalog(route); updateSource(path.join(root,route,'index.html'),route,['','textile','textile/bamboo-fabric','textile/functional'].includes(route));}}
const productsRoot=path.join(root,'textile','products'); const slugs=fs.readdirSync(productsRoot).filter(s=>s!=='product-template'&&fs.existsSync(path.join(productsRoot,s,'index.html'))); for(const slug of slugs){buildProduct(slug); updateSource(path.join(productsRoot,slug,'index.html'),`textile/products/${slug}`,false);}
for(const route of ['','textile','textile/bamboo-fabric','textile/functional']){updateSource(path.join(root,'zh',route,'index.html'),route,true);}
for(const route of Object.keys(catalogs)){updateSource(path.join(root,'ko',route,'index.html'),route,['','textile','textile/bamboo-fabric','textile/functional'].includes(route));}
for(const slug of slugs)updateSource(path.join(root,'ko','textile','products',slug,'index.html'),`textile/products/${slug}`,false);
let sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'); const routes=[...Object.keys(catalogs),...slugs.map(s=>`textile/products/${s}`)]; for(const route of routes){const u=url(route,'ja'); if(!sitemap.includes(`<loc>${u}</loc>`))sitemap=sitemap.replace('</urlset>',`  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>${route.includes('/products/')?'monthly':'weekly'}</changefreq><priority>${route===''?'1.0':route.includes('/products/')?'0.7':'0.8'}</priority></url>\n</urlset>`);} fs.writeFileSync(path.join(root,'sitemap.xml'),sitemap,'utf8');

// Final pass for small interface strings inherited from the English templates.
const jaFiles=[];
function collectJapanesePages(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())collectJapanesePages(file);else if(entry.name==='index.html')jaFiles.push(file);}}
collectJapanesePages(path.join(root,'ja'));
for(const file of jaFiles){let html=fs.readFileSync(file,'utf8');html=html
  .replace(/>Home</g,'>ホーム<')
  .replace(/HLC BAMBOO KNIT COLLECTION/g,'HLC 竹レーヨンニットコレクション')
  .replace(/HLC FUNCTIONAL KNIT COLLECTION/g,'HLC 機能性ニットコレクション')
  .replace(/HLC LIQUID AMMONIA KNIT COLLECTION/g,'HLC 液体アンモニア加工ニットコレクション')
  .replace(/HLC MERCERIZED LIQUID AMMONIA COLLECTION/g,'HLC シルケット・液体アンモニア加工コレクション')
  .replace(/HLC WOOL FABRIC COLLECTION/g,'HLC ウールニットコレクション')
  .replace(/HLC SAND WASH KNIT COLLECTION/g,'HLC サンドウォッシュニットコレクション')
  .replace(/01\s*\/\s*BAMBOO/g,'01 / 竹レーヨン')
  .replace(/02\s*\/\s*PERFORMANCE/g,'02 / 機能性')
  .replace(/03\s*\/\s*FINISHING/g,'03 / 仕上げ加工')
  .replace(/04\s*\/\s*WOOL/g,'04 / ウール')
  .replace(/05\s*\/\s*SAND WASH/g,'05 / サンドウォッシュ')
  .replace(/06\s*\/\s*EMBROIDERY/g,'06 / 刺繍')
  .replace(/No published[^<]*match this category yet\./gi,'このカテゴリーには、現在公開中の生地がありません。')
  .replace(/(\d+)\s*fabrics\b/gi,'$1種類')
  .replace(/目付 conversion/gi,'重量換算')
  .replace(/1\s*KG\s*=\s*([0-9.]+)\s*YDS/gi,'1 kg = $1ヤード')
  .replace(/100%\s*Supima\b/gi,'100% SUPIMAコットン')
  .replace(/aria-label="Filter [^"]*"/gi,'aria-label="生地を絞り込む"')
  .replace(/<legend>([^<]*) options<\/legend>/gi,'<legend>$1の選択肢</legend>');
fs.writeFileSync(file,html,'utf8');}
console.log(`Generated Japanese homepage, ${Object.keys(catalogs).length-1} catalogs and ${slugs.length} products.`);
