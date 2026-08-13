const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';
const today = '2026-08-08';

const catalogs = [
  ['', 'HLC | 유아동 의류용 수직 통합 니트 원단 제조업체', 'HLC는 대나무 비스코스, 오가닉 코튼, 메리노 울과 기능성 섬유를 사용해 유아동복, 잠옷과 라운지웨어용 니트 원단을 개발·생산합니다.'],
  ['textile', 'HLC 니트 원단 컬렉션 | 대나무·울·기능성 원단', '대나무 비스코스, 메리노 울, 기능성, 샌드 워싱, 자수 및 머서라이즈·액체 암모니아 가공 니트 원단을 살펴보세요.'],
  ['textile/bamboo-fabric', '대나무 비스코스 니트 원단 | HLC', '유아동 잠옷, 내의와 라운지웨어 개발을 위한 대나무 비스코스 스판 및 혼방 니트 원단입니다. 중량, MOQ, 납기와 시험 결과를 확인하세요.'],
  ['textile/mercerized-liquid-ammonia-fabric', '머서라이즈·액체 암모니아 가공 니트 원단 | HLC', '수피마, BCI 코튼과 고급 면 혼방에 적용하는 머서라이즈 및 액체 암모니아 가공 니트 원단 컬렉션입니다.'],
  ['textile/functional', '기능성 니트 원단 | HLC', '흡한속건, 온도 조절, 자외선 차단과 신축 성능을 갖춘 기능성 니트 원단을 용도와 시험 결과로 비교하세요.'],
  ['textile/wool-fabric', '메리노 울 니트 원단 | HLC', 'ZQ 메리노, RWS 및 뮬징 프리 울을 사용한 저지, 인터록, 피케와 기능성 혼방 니트 원단입니다.'],
  ['textile/womenswear-fabric', '샌드 워싱 니트 원단 | HLC', '부드러운 촉감과 자연스러운 드레이프를 위한 모달, 텐셀 및 혼방 샌드 워싱 니트 원단입니다.'],
  ['textile/embroidered-fabric', '맞춤 자수 원단 | HLC', '여성복, 유아동복과 브랜드 컬렉션을 위한 맞춤 자수 니트 및 직물 원단 개발 서비스입니다.'],
];

const termPairs = [
  ['Bamboo Viscose Spandex', '대나무 비스코스 스판덱스'],
  ['Bamboo Cotton Spandex', '대나무 코튼 스판덱스'],
  ['Bamboo Organic Cotton', '대나무 오가닉 코튼'],
  ['Bamboo Merino Wool Spandex', '대나무 메리노 울 스판덱스'],
  ['Bamboo Viscose', '대나무 비스코스'],
  ['Fabrics', '원단'],
  ['Liquid Ammonia', '액체 암모니아 가공'],
  ['liquid ammonia', '액체 암모니아 가공'],
  ['Liquid-Ammonia-Finished', '액체 암모니아 가공'],
  ['Mercerized', '머서라이즈 가공'],
  ['mercerized', '머서라이즈 가공'],
  ['Sand Washed', '샌드 워싱'],
  ['Sand Wash', '샌드 워싱'],
  ['Sand-washed', '샌드 워싱'],
  ['Sand-wash', '샌드 워싱'],
  ['Ultra Fine', '초극세'],
  ['Ultra-Light', '초경량'],
  ['Temperature Regulating', '온도 조절'],
  ['High UV Protection', '고자외선 차단'],
  ['Reactive Digital Print', '반응성 디지털 프린트'],
  ['Pigment Digital Print', '안료 디지털 프린트'],
  ['Reactive Print', '반응성 프린트'],
  ['Pigment Print', '안료 프린트'],
  ['Discharge Print', '발염 프린트'],
  ['Single Jersey', '싱글 저지'],
  ['single jersey', '싱글 저지'],
  ['French Terry', '프렌치 테리'],
  ['Merino Wool', '메리노 울'],
  ['Organic Cotton', '오가닉 코튼'],
  ['Better Cotton', 'BCI 코튼'],
  ['BCI Cotton', 'BCI 코튼'],
  ['Supima Cotton', '수피마 코튼'],
  ['Cotton Modal', '코튼 모달'],
  ['Spandex', '스판덱스'],
  ['Polyester', '폴리에스터'],
  ['Nylon', '나일론'],
  ['Tencel', '텐셀'],
  ['Modal', '모달'],
  ['Sorona', '소로나'],
  ['Coolmax', '쿨맥스'],
  ['Drirelease', '드라이릴리즈'],
  ['Interlock', '인터록'],
  ['interlock', '인터록'],
  ['Jersey', '저지'],
  ['jersey', '저지'],
  ['Pique', '피케'],
  ['pique', '피케'],
  ['Mesh', '메시'],
  ['Jacquard', '자카드'],
  ['Scuba', '스쿠버'],
  ['Rib', '리브'],
  ['Striped', '스트라이프'],
  ['Vertical Stripe', '세로 스트라이프'],
  ['Bird Eye', '버드아이'],
  ['Bi-Component', '바이컴포넌트'],
  ['Thermal-Shielding', '보온 조절'],
  ['Functional', '기능성'],
  ['Embroidered', '자수'],
  ['Knit', '니트'],
  ['Collection', '컬렉션'],
  ['Rayon', '레이온'],
  ['Wool', '울'],
  ['Cotton', '코튼'],
  ['Hemp', '헴프'],
  ['Linen', '리넨'],
  ['Fabric', '원단'],
  ['Waterless dyeing', '무수 염색'],
  ['waterless dyeing', '무수 염색'],
  ['babywear', '유아복'], ['Babywear', '유아복'], ['kidswear', '아동복'], ['Kidswear', '아동복'],
  ['sleepwear', '잠옷'], ['Sleepwear', '잠옷'], ['loungewear', '라운지웨어'], ['Loungewear', '라운지웨어'],
  ['underwear', '내의'], ['Underwear', '내의'], ['menswear', '남성복'], ['Menswear', '남성복'],
  ['womenswear', '여성복'], ['Womenswear', '여성복'], ['pajamas', '파자마'], ['Pajamas', '파자마'],
  ['footie', '풀바디 우주복'], ['bodysuit', '바디수트'], ['romper', '롬퍼'],
  ['per colour', '색상당'], ['days', '일'], ['yarn', '원사'],
];

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function koName(name) {
  let out = name;
  for (const [a,b] of termPairs) out = out.replace(new RegExp(esc(a), 'gi'), b);
  return out.replace(/\s+/g, ' ').trim();
}
function extract(html, re, fallback='') { const m = html.match(re); return m ? m[1].replace(/<[^>]+>/g,'').trim() : fallback; }
function clean(s) { return s.replace(/g\/m虏/gi, 'g/m²').replace(/路/g, '·').replace(/15鈥\?0/g, '15–20').replace(/30鈥\?0/g, '30–40'); }
function routeUrl(route, lang='en') { return `${base}${lang === 'ko' ? '/ko' : ''}/${route ? route.replace(/^\//,'') + '/' : ''}`.replace(/([^:]\/)\/+/, '$1'); }
function alternates(route, hasZh=false) {
  const en = routeUrl(route, 'en');
  const ko = routeUrl(route, 'ko');
  const ja = `${base}/ja/${route ? route + '/' : ''}`;
  let s = `<link href="${en}" hreflang="en" rel="alternate"/>\n<link href="${ko}" hreflang="ko" rel="alternate"/>\n<link href="${ja}" hreflang="ja" rel="alternate"/>\n`;
  if (hasZh) s += `<link href="${base}/zh/${route ? route + '/' : ''}" hreflang="zh-Hans" rel="alternate"/>\n`;
  return s + `<link href="${en}" hreflang="x-default" rel="alternate"/>`;
}
function injectAlternates(html, route, hasZh=false) {
  html = html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi, '\n');
  const block = alternates(route, hasZh);
  if (/<link[^>]+rel="canonical"/i.test(html)) return html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i, `$1\n${block}`);
  return html.replace('</head>', `${block}\n</head>`);
}
function sourceHreflang(file, route, hasZh=false) {
  let html = fs.readFileSync(file, 'utf8');
  html = injectAlternates(html, route, hasZh);
  fs.writeFileSync(file, html);
}

const uiPairs = [
  ['Primary navigation','주요 메뉴'], ['Site tools','사이트 도구'], ['Products','제품'], ['Solutions','솔루션'],
  ['About HLC','HLC 소개'], ['Sustainability','지속가능성'], ['Careers','채용'], ['Contact us','문의하기'],
  ['Home','홈'], ['Fabrics','원단'], ['Bamboo Fabrics','대나무 원단'], ['Bamboo Fabric','대나무 원단'],
  ['Current price','현재 가격'], ['valid through Aug 30, 2026','2026년 8월 30일까지 유효'],
  ['Request a sample','스와치 신청'], ['Characteristics','원단 상세정보'], ['Composition','소재 구성'], ['Weight','중량'],
  ['Cuttable width','재단 가능 폭'], ['Construction','조직'], ['Worldwide shipping','전 세계 배송'],
  ['In-house inspection and test support','사내 검사 및 시험 지원'], ['Product information','제품 정보'],
  ['Product description','제품 설명'], ['Details','상세 정보'], ['Test results','시험 결과'], ['Other','기타'],
  ['Yarn count','원사 번수'], ['Weight conversion','중량 환산'], ['Sample lead time','샘플 납기'],
  ['Bulk lead time','벌크 납기'], ['Applications','용도'], ['Finishing','후가공'],
  ['YOU MAY ALSO LIKE','관련 제품'], ['Similar fabrics','비슷한 원단'], ['View product','제품 보기'],
  ['View fabric','원단 보기'], ['Show filters','필터 보기'], ['No fabrics match the selected filters.','선택한 조건과 일치하는 원단이 없습니다.'],
  ['Price on request','가격 문의'], ['Style#:','Style#：'],
  ['Buyer services','바이어 서비스'], ['Product images','제품 이미지'], ['Open high-resolution product image','고해상도 제품 이미지 열기'],
  ['Email for business','영업용 이메일'], ['Create sample request email','샘플 요청 이메일 만들기'],
  ['Close sample request','샘플 요청 닫기'], ['Sample request','샘플 요청'], ['Submit','보내기'],
  ['Contact','문의하기'], ['Search','검색'], ['Inspection &amp; Testing Centre','검사 및 시험 센터'],
  ['Inspection & Testing Centre','검사 및 시험 센터'], ['Inspection &amp; Testing','검사 및 시험'],
  ['Request Specifications &amp; Quotation','사양 및 견적 요청'], ['Company Profile','회사 정보'],
  ['Request Specifications &amp; Pricing','사양 및 견적 요청'], ['Request Specifications & Pricing','사양 및 견적 요청'],
  ['Request Specifications and Pricing','사양 및 견적 요청'],
  ['Quality Management','품질 관리'], ['Certificates &amp; Certifications','인증서 및 인증'],
  ['Our People','HLC 인재'], ['Application options','용도 옵션'], ['Composition options','소재 구성 옵션'],
  ['Valid through Aug 30, 2026','2026년 8월 30일까지 유효'], ['Weight conversion','중량 환산'],
  ['Bamboo Viscose Knit Fabrics','대나무 비스코스 니트 원단'], ['Bamboo Viscose Knits','대나무 비스코스 니트 원단'],
  ['Functional Knit Fabrics','기능성 니트 원단'], ['Functional Knits','기능성 니트 원단'],
  ['Wool Fabrics','메리노 울 니트 원단'], ['Sand-Washed Knit Fabrics','샌드 워싱 니트 원단'],
  ['Embroidered Fabrics','맞춤 자수 원단'], ['Certifications &amp; Material Support','인증 및 소재 지원'],
  ['Certifications & Material Support','인증 및 소재 지원'], ['Certificates & Certifications','인증서 및 인증'],
  ['Water-Saving, Lower-Carbon Dyeing','절수·저탄소 염색'], ['Corporate Sustainability &amp; ESG','기업 지속가능성 및 ESG'],
  ['Corporate Sustainability & ESG','기업 지속가능성 및 ESG'], ['Close menu','메뉴 닫기'],
];

function replaceUi(html) {
  const protectedBlocks = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, (block) => {
    const token = `__HLC_PROTECTED_BLOCK_${protectedBlocks.length}__`;
    protectedBlocks.push(block);
    return token;
  });
  for (const [a,b] of uiPairs) html = html.replace(new RegExp(esc(a), 'g'), b);
  html = html.replace(/(\d+)\s+fabrics\b/gi, '$1종 원단');
  // Translate buyer-facing text only. Never touch URLs, filenames, data attributes or asset paths.
  html = html.replace(/>([^<]+)</g, (whole, text) => {
    let translated = text;
    for (const [a,b] of termPairs) translated = translated.replace(new RegExp(esc(a), 'gi'), b);
    translated = translated.replace(/\band\b/gi, '및');
    return `>${translated}<`;
  });
  html = html.replace(/__HLC_PROTECTED_BLOCK_(\d+)__/g, (_, index) => protectedBlocks[Number(index)]);
  return clean(html);
}
function internalToKo(html) {
  html = html.replace(/https:\/\/hlctex\.com\/pickup\//g, `${base}/ko/pickup/`);
  html = html.replace(/href="\/pickup\//g, 'href="/ko/pickup/');
  html = html.replace(/https:\/\/hlctex\.com\/textile\//g, `${base}/ko/textile/`);
  html = html.replace(/href="\/textile\//g, 'href="/ko/textile/');
  html = html.replace(/https:\/\/hlctex\.com\/company\//g, `${base}/ko/company/`);
  html = html.replace(/href="\/company\//g, 'href="/ko/company/');
  html = html.replace(/href="\/"/g, 'href="/ko/"');
  html = html.replace(/href="\/#/g, 'href="/ko/#');
  return html;
}
function setMeta(html, route, title, description) {
  html = html.replace(/<html[^>]*lang="[^"]*"/i, '<html lang="ko"');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta\b[^>]*name="description"[^>]*>/i, `<meta content="${description}" name="description"/>`);
  html = html.replace(/<link\b[^>]*rel="canonical"[^>]*>/i, `<link href="${routeUrl(route,'ko')}" rel="canonical"/>`);
  html = html.replace(/<meta\b[^>]*property="og:title"[^>]*>/i, `<meta content="${title}" property="og:title"/>`);
  html = html.replace(/<meta\b[^>]*property="og:description"[^>]*>/i, `<meta content="${description}" property="og:description"/>`);
  html = html.replace(/<meta\b[^>]*property="og:url"[^>]*>/i, `<meta content="${routeUrl(route,'ko')}" property="og:url"/>`);
  html = html.replace(/<meta\b[^>]*name="twitter:title"[^>]*>/i, `<meta content="${title}" name="twitter:title"/>`);
  html = html.replace(/<meta\b[^>]*name="twitter:description"[^>]*>/i, `<meta content="${description}" name="twitter:description"/>`);
  if (!/property="og:locale"/i.test(html)) html = html.replace('</title>', '</title>\n<meta content="ko_KR" property="og:locale"/>');
  return html;
}
function fixJsonUrls(html) {
  html = html.replace(/"(url|item|@id)": "https:\/\/hlctex\.com\/(?!assets\/)(?!ko\/)([^"#]*)"/g, (m,k,p) => `"${k}": "${base}/ko/${p}"`);
  // Product JSON-LD is localized by localizeProductJsonLd(). Keeping Product
  // in this fallback caused a second top-level inLanguage property to be
  // inserted after serialization, which Google rejects as a duplicate field.
  html = html.replace(/"@type": "(CollectionPage|WebPage)"(?!,\s*"inLanguage")/g, '"@type": "$1",\n  "inLanguage": "ko-KR"');
  return html;
}

const editorialByRoute = {
  'textile/bamboo-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial">
<h2>왜 HLC 대나무 원단을 선택해야 하나요?</h2>
<p>HLC는 연간 1,800톤 이상의 대나무 비스코스 원단을 생산하며, 약 80톤의 생지와 100톤의 원사를 상시 확보합니다. 반복 발주를 빠르게 시작할 수 있어 가격 경쟁력과 안정적인 납기를 제공합니다.</p>
<p class="bamboo-editorial-followup">최근 7년 동안 13,000톤 이상을 생산한 경험을 바탕으로 유아복, 잠옷, 내의와 라운지웨어용 원단의 편직·염색·후가공 품질을 일관되게 관리합니다.</p>
<h2 class="bamboo-editorial-section-title" id="bambooBenefitsTitle">대나무 비스코스 니트 원단의 특징</h2>
<p>대나무 비스코스는 매끄러운 촉감, 유연한 드레이프와 편안한 착용감으로 평가받는 재생 셀룰로오스 섬유입니다. 스판덱스나 코튼과 혼방해 부드러움, 신축성과 복원력을 조정할 수 있습니다.</p>
<h3>유아복과 잠옷에 적합한 부드러움</h3><p>피부에 닿는 표면이 매끄러워 파자마, 우주복, 바디수트, 내의와 라운지웨어 개발에 적합합니다.</p>
<h3>통기성과 수분 관리</h3><p>HLC는 요구 중량, 폭, 신축성과 최종 용도에 맞춰 조직과 후가공을 설계합니다.</p>
<h3>검증 가능한 성능</h3><p>제품별 소재 구성, 치수 안정성, 견뢰도, 필링, MOQ, 납기와 시험 결과를 확인할 수 있으며 해당 제품의 OEKO-TEX 자료도 제공합니다.</p>
</section>`,
  'textile/mercerized-liquid-ammonia-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>고급 코튼 니트에 필요한 후가공</h2><p>HLC는 Lafer 액체 암모니아 생산라인 1대와 Pukwang 머서라이즈 생산라인 2대를 운영합니다. BCI 코튼, 수피마와 기자 코튼 니트의 촉감, 광택, 치수 안정성과 세탁 후 외관을 개선합니다.</p><h3>브랜드 개발에 맞춘 사양</h3><p>폴로, 티셔츠, 내의, 유아복, 잠옷과 라운지웨어용 원단을 원사 번수, 중량, 조직과 목표 촉감에 맞춰 개발합니다.</p><h3>시험 결과와 생산 정보</h3><p>제품 페이지에서 소재, 중량, MOQ, 샘플 및 벌크 납기와 시험 결과를 확인할 수 있습니다.</p></section>`,
  'textile/functional': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>용도에 맞는 기능성 니트 원단</h2><p>흡한속건, 온도 조절, 자외선 차단, 냉감과 신축 기능은 실제 착용 환경과 원단 조직에 맞춰 선택해야 합니다. HLC는 목표 중량과 성능 기준에 따라 원사, 편직, 염색과 후가공을 함께 설계합니다.</p><h3>수치로 확인하는 성능</h3><p>가능한 제품에는 치수 안정성, 견뢰도, 필링, 흡수·건조와 관련 시험 결과를 제공해 개발팀과 구매팀의 비교를 돕습니다.</p></section>`,
  'textile/wool-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>왜 HLC 메리노 울 원단을 선택해야 할까요?</h2><h3>10년 이상 축적한 지역 기반의 울 소재 경험</h3><p>HLC와 세계적인 울 원사 공급업체 신아오(Xinao)는 모두 저장성 자싱시 퉁샹에 있습니다. 10년이 넘는 협업을 통해 메리노 울 원사 선정부터 니트 조직 개발, 염색과 후가공까지 폭넓은 경험을 축적했습니다.</p><h3>경쟁력 있는 가격과 안정적인 납기</h3><p>지역 울 공급망과 가까워 원사 조달과 커뮤니케이션 시간을 줄일 수 있으며, 이를 바탕으로 경쟁력 있는 가격, 일관된 품질 관리와 안정적인 벌크 납기를 제공합니다.</p><h3>니트 울 염색 전문성</h3><p>HLC는 중국에서 니트 울 원단 염색이 가능한 소수의 전문 염색 공장 중 하나로, 균일한 색상과 관리된 후가공, 안정적인 대량 생산을 지원합니다.</p><h3>책임 있는 메리노 울 선택</h3><p>프로젝트 요구에 따라 RWS 인증 울, 뮬징 프리 울, ZQ 메리노 울과 기능성 울 혼방 원단을 프리미엄 의류용으로 개발할 수 있습니다.</p></section>`,
  'textile/womenswear-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>샌드 워싱 니트 원단</h2><p>샌드 워싱은 모달, 텐셀, 폴리에스터와 혼방 니트에 부드러운 촉감과 자연스러운 드레이프를 더합니다. 여성복, 라운지웨어와 캐주얼 컬렉션에 맞춰 중량, 조직과 표면 효과를 개발합니다.</p></section>`,
  'textile/embroidered-fabric': `<section aria-labelledby="bambooBenefitsTitle" class="bamboo-filter-editorial"><h2>브랜드를 위한 맞춤 자수 원단</h2><p>여성복, 유아동복과 캡슐 컬렉션을 위한 자수 패턴, 바탕 원단, 색상과 반복 규격을 함께 개발합니다. 샘플 확인 후 생산 사양과 납기를 협의합니다.</p></section>`
};

function localizeWoolCatalog(html) {
  const replacements = [
    ['Composition options', '소재 구성 선택'], ['소재 구성 options', '소재 구성 선택'],
    ['Weight options', '중량 선택'], ['중량 options', '중량 선택'],
    ['Construction options', '조직 선택'], ['조직 options', '조직 선택'],
    ['Application options', '용도 선택'], ['용도 options', '용도 선택'],
    ['Filter wool fabrics', '울 원단 필터'], ['Wool Blend', '울 혼방'], ['울 Blend', '울 혼방'],
    ['Activewear', '스포츠웨어'], ['No published fabrics match this category yet.', '현재 이 카테고리에 게시된 원단이 없습니다.'],
    ['No published 원단 match this category yet.', '현재 이 카테고리에 게시된 원단이 없습니다.'],
    ['Merino Wool Nylon Spandex Jersey', '메리노 울 나일론 스판덱스 저지'],
    ['RWS Merino Wool Jersey', 'RWS 메리노 울 저지'], ['RWS Merino Wool Interlock', 'RWS 메리노 울 인터록'],
    ['Ultra-Light Merino Wool Jersey', '초경량 메리노 울 저지'],
    ['Ultra-Light TENCEL™ Merino Jersey', '초경량 TENCEL™ 메리노 저지'],
    ['Ultra-Light TENCEL Merino Jersey', '초경량 TENCEL™ 메리노 저지'],
    ['초경량 텐셀™ Merino 저지', '초경량 TENCEL™ 메리노 저지'],
    ['COOLMAX® Merino Striped Jersey', 'COOLMAX® 메리노 스트라이프 저지'],
    ['COOLMAX Merino Striped Jersey', 'COOLMAX® 메리노 스트라이프 저지'],
    ['쿨맥스® Merino 스트라이프 저지', 'COOLMAX® 메리노 스트라이프 저지'],
    ['TENCEL™ Merino Jersey', 'TENCEL™ 메리노 저지'], ['TENCEL Merino Jersey', 'TENCEL™ 메리노 저지'],
    ['텐셀™ Merino 저지', 'TENCEL™ 메리노 저지'],
    ['Merino Nylon Spandex Jacquard', '메리노 나일론 스판덱스 자카드'],
    ['Merino 나일론 스판덱스 자카드', '메리노 나일론 스판덱스 자카드'],
    ['37.5® Nylon Merino Wool Mesh', '37.5® 나일론 메리노 울 메시'],
    ['37.5 Nylon Merino Wool Mesh', '37.5® 나일론 메리노 울 메시'],
    ['COOLMAX® Merino Wool Pique', 'COOLMAX® 메리노 울 피케'],
    ['COOLMAX Merino Wool Pique', 'COOLMAX® 메리노 울 피케'],
    ['Merino Wool', '메리노 울'], ['Elastane', '엘라스테인'], ['Nylon', '나일론'],
    ['HLC WOOL FABRIC COLLECTION', 'HLC 울 원단 컬렉션'],
    ['fabric front view', '원단 정면 이미지'],
    ['Wool fabric products', '울 원단 제품'], ['Wool 원단 products', '울 원단 제품'],
    ['Breadcrumb', '이동 경로'], ['HLC home', 'HLC 홈'], ['HLC Certifications', 'HLC 인증'],
    ['Style#：', '품번:'], ['Style#:', '품번:'],
    ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', '중국 저장성 자싱시 퉁샹시 푸위안진 헝러로 51, 314502'],
    ['Tel +86 573 8887 0000', '전화 +86 573 8887 0000'], ['Fax +86 573 8870 800', '팩스 +86 573 8870 800'],
    ['Email', '이메일'],
    ['© Copyright HLC GROUP CO., LTD. All rights reserved.', '© HLC GROUP CO., LTD. 모든 권리 보유.']
  ];
  for (const [from, to] of replacements) html = html.replace(new RegExp(esc(from), 'g'), to);
  return html;
}

function translateHomepage(html) {
  const exact = [
    ['KNIT FABRICS · RESPONSIBLE FINISHING','니트 원단 · 책임 있는 후가공'],
    ['Comfort-led knits.<br>Built for dependable production.','편안함을 위한 니트 원단.<br>안정적인 생산으로 완성합니다.'],
    ['Bamboo viscose and functional knit fabrics for babywear, sleepwear, loungewear and underwear—supported by technical testing, scalable production and responsible finishing.','대나무 비스코스와 기능성 니트 원단을 유아복, 잠옷, 라운지웨어와 내의 용도로 개발하며, 자체 시험·생산·후가공으로 품질을 관리합니다.'],
    ['MATERIAL × PROCESS','소재 × 공정'], ['A softer hand, with a lighter footprint.','더 부드러운 촉감, 더 적은 자원 사용.'],
    ['HLC connects next-to-skin knit development with lower-impact dyeing and finishing—balancing softness, dimensional stability, wash performance and resource efficiency.','HLC는 피부에 닿는 니트 원단 개발과 저영향 염색·후가공을 연결해 부드러움, 치수 안정성, 세탁 성능과 자원 효율을 균형 있게 관리합니다.'],
    ['Waterless Dyeing','무수 염색'], ['Explore the process','공정 보기'], ['Mercerization &amp; Liquid Ammonia','머서라이즈 &amp; 액체 암모니아 가공'],
    ['Latest developments','최신 개발'], ['Learn more','자세히 보기'], ['Bamboo Blend Development','대나무 혼방 개발'],
    ['Functional Knit Structures','기능성 니트 조직'], ['Low-Temperature Dyeing','저온 염색'],
    ['A fibre-colouration approach designed to reduce water and chemical use while maintaining colour performance and a soft hand for next-to-skin fabrics.','피부에 닿는 원단의 부드러운 촉감과 색상 성능을 유지하면서 물과 화학물질 사용을 줄이도록 설계한 섬유 염색 방식입니다.'],
    ['Lafer and Pukwang finishing lines help improve lustre, softness, dimensional stability and wash performance for premium knitted fabrics.','Lafer 액체 암모니아 라인과 Pukwang 머서라이즈 라인으로 고급 니트 원단의 광택, 부드러움, 치수 안정성과 세탁 성능을 개선합니다.'],
    ['Softer, more stable bamboo viscose knits developed for babywear, sleepwear and next-to-skin apparel.','유아동복, 잠옷과 피부에 닿는 의류를 위해 더 부드럽고 안정적인 대나무 비스코스 니트를 개발합니다.'],
    ['Improving water and energy efficiency while protecting the hand feel and colour performance of knitted fabrics.','니트 원단의 촉감과 색상 성능을 보호하면서 물과 에너지 효율을 높입니다.'],
    ['Balancing breathability, stretch and next-to-skin comfort for active and everyday apparel programmes.','액티브웨어와 일상복에 필요한 통기성, 신축성과 피부 접촉 편안함을 균형 있게 설계합니다.'],
    ['Combining the silky hand of bamboo viscose with wool warmth for seasonal next-to-skin knits.','대나무 비스코스의 매끄러운 촉감과 울의 보온성을 결합한 간절기용 피부 접촉 니트를 개발합니다.'],
  ];
  for (const [a,b] of exact) html = html.replace(new RegExp(esc(a),'g'), b);
  return html;
}
function koProductDescription(name, composition, weight, construction, apps) {
  const spec = [koName(clean(composition)), clean(weight), koName(construction)].filter(Boolean).join(', ');
  const use = apps ? ` ${apps.replace(/\.$/,'')} 용도 개발에 적합합니다.` : '';
  return `HLC의 ${name}입니다. ${spec} 사양으로 생산되며, 부드러운 촉감과 안정적인 품질을 요구하는${use} MOQ, 샘플·벌크 납기와 시험 결과를 한 페이지에서 확인할 수 있습니다.`.replace('하는 용도','하는 의류 용도');
}
function localizeProductJsonLd(html, route, name, description, composition, koApps) {
  const propertyNames = {
    'Yarn count': '원사 번수', 'Fabric weight': '원단 중량', 'Cuttable width': '재단 가능 폭',
    'Construction': '조직', 'Finishing': '후가공', 'Sample lead time': '샘플 납기',
    'Bulk lead time': '벌크 납기', 'Applications': '용도', 'Test report': '시험 보고서'
  };
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi, (whole, raw) => {
    try {
      const data = JSON.parse(raw);
      if (data['@type'] !== 'Product') return whole;
      data.inLanguage = 'ko-KR';
      data.name = name;
      data.description = description;
      data.url = routeUrl(route, 'ko');
      if (composition) data.material = koName(clean(composition));
      if (Array.isArray(data.additionalProperty)) {
        data.additionalProperty = data.additionalProperty.map((item) => {
          const originalName = item.name;
          item.name = propertyNames[originalName] || originalName;
          if (originalName === 'Applications' || originalName === '용도') item.value = koApps;
          else if (originalName === 'Test report' || originalName === '시험 보고서') item.value = '이 제품 페이지에서 확인 가능';
          else if (typeof item.value === 'string') item.value = koName(clean(item.value));
          return item;
        });
      }
      if (data.offers) data.offers.url = routeUrl(route, 'ko');
      return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
    } catch (_) {
      return whole;
    }
  });
}
function buildProduct(srcFile, slug) {
  let html = fs.readFileSync(srcFile, 'utf8');
  const enName = extract(html, /<h1[^>]*data-template-field="product-name"[^>]*>([\s\S]*?)<\/h1>/i, slug);
  const name = koName(enName);
  const composition = extract(html, /data-template-field="composition">([\s\S]*?)<\/dd>/i);
  const weight = extract(html, /data-template-field="weight">([\s\S]*?)<\/dd>/i);
  const construction = extract(html, /data-template-field="construction">([\s\S]*?)<\/dd>/i);
  const apps = extract(html, /data-template-field="detail-applications">([\s\S]*?)<\/dd>/i).split('. Development')[0];
  const koApps = koName(apps).replace(/\band\b/gi, '및');
  const description = koProductDescription(name, composition, weight, construction, koApps);
  const route = `textile/products/${slug}`;
  html = internalToKo(html);
  html = setMeta(html, route, `${name} | HLC 니트 원단`, description);
  html = injectAlternates(html, route, false);
  html = replaceUi(html);
  html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, `<h1$1>${name}</h1>`);
  html = html.replace(/data-template-field="breadcrumb">[\s\S]*?<\/li>/i, `data-template-field="breadcrumb">${name}</li>`);
  html = html.replace(/<p data-template-field="short-description">[\s\S]*?<\/p>/i, `<p data-template-field="short-description">${description}</p>`);
  html = html.replace(/<h2 data-template-field="seo-main-title">[\s\S]*?<\/h2>/i, `<h2 data-template-field="seo-main-title">${name} 사양 및 소싱 정보</h2>`);
  html = html.replace(/<p data-template-field="seo-paragraph-1">[\s\S]*?<\/p>/i, `<p data-template-field="seo-paragraph-1">${koName(clean(composition))}와 ${clean(weight)} 사양의 ${koName(construction)} 원단입니다. 실제 개발 전 중량, 폭, 촉감과 성능 기준을 함께 검토합니다.</p>`);
  html = html.replace(/<p data-template-field="seo-paragraph-2">[\s\S]*?<\/p>/i, `<p data-template-field="seo-paragraph-2">표준 샘플 납기는 15–20일, 벌크 생산 납기는 30–40일이며 MOQ와 색상별 MCQ는 제품 상세정보를 기준으로 협의합니다.</p>`);
  html = html.replace(/<p data-template-field="technical-details">[\s\S]*?<\/p>/i, `<p data-template-field="technical-details">${name}은 ${koName(clean(composition))}, ${clean(weight)}, ${koName(construction)} 사양으로 생산합니다. 원사, 편직, 염색과 후가공은 목표 촉감과 성능에 맞춰 조정할 수 있습니다.</p>`);
  html = html.replace(/(<dd data-template-field="detail-applications">)[\s\S]*?(<\/dd>)/i, `$1${koApps}$2`);
  html = html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (!/test-result/i.test(tag)) return tag;
    return /alt="[^"]*"/i.test(tag)
      ? tag.replace(/alt="[^"]*"/i, `alt="${name} 시험 보고서"`)
      : tag.replace(/<img/i, `<img alt="${name} 시험 보고서"`);
  });
  html = html.replace(/<figcaption>[\s\S]*?<\/figcaption>/i, `<figcaption>${name}의 시험 보고서입니다. 고해상도 이미지에서 시험 방법과 결과를 확인할 수 있습니다.</figcaption>`);
  html = html.replace(/SAMPLE REQUEST/g, '스와치 신청');
  html = html.replace(/Request this [^<]* sample/g, '이 원단의 스와치 신청');
  html = html.replace(/Enter your business email\. We will prepare a sample request addressed to HLC with the current product Style#\./g, '영업용 이메일을 입력하면 현재 Style#가 포함된 HLC 스와치 신청 메일이 생성됩니다.');
  html = html.replace(/<a aria-label="[^\"]*" href="\/zh\/textile\/">/i, '<a aria-label="English" href="/">');
  html = localizeProductJsonLd(html, route, name, description, composition, koApps);
  html = fixJsonUrls(html);
  html = html.replace(/"name":\s*"[^"]+"/g, (m) => m.includes('HLC Group') ? m : m);
  const out = path.join(root, 'ko', 'textile', 'products', slug, 'index.html');
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.writeFileSync(out, html);
}

function buildCatalog(route, title, description) {
  const src = path.join(root, route ? route : '', 'index.html');
  let html = fs.readFileSync(src, 'utf8');
  html = internalToKo(html);
  html = setMeta(html, route, title, description);
  const hasZh = ['', 'textile', 'textile/bamboo-fabric', 'textile/functional'].includes(route);
  html = injectAlternates(html, route, hasZh);
  if (route === '') html = translateHomepage(html);
  html = replaceUi(html);
  if (route === 'textile') {
    const textileLandingPairs = [
      ['HLC 니트 원단 컬렉션s 및 Textile 후가공', 'HLC 니트 원단 컬렉션 및 후가공'],
      ['HLC textile collections', 'HLC 니트 원단 컬렉션'],
      ['Bamboo viscose knit fabric for babywear and sleepwear', '유아동복과 잠옷용 대나무 비스코스 니트 원단'],
      ['Functional knit fabric with thermoregulation performance', '체온 조절 기능성 니트 원단'],
      ['Mercerized and liquid ammonia finished cotton knit fabric', '머서라이즈 및 액체 암모니아 가공 코튼 니트 원단'],
      ['Merino wool jersey fabric and RWS wool blend development', '메리노 울 저지 및 RWS 울 혼방 원단'],
      ['Soft sand-washed modal polyester spandex knit fabric', '부드러운 샌드 워싱 모달 폴리에스터 스판덱스 니트 원단'],
      ['Custom decorative and embroidered fabric development', '맞춤 장식 및 자수 원단 개발'],
      ['01 / BAMBOO', '01 / 대나무'],
      ['02 / PERFORMANCE', '02 / 기능성'],
      ['03 / FINISHING', '03 / 후가공'],
      ['06 / EMBROIDERY', '06 / 자수'],
      ['Soft 니트 원단 for 유아복, 잠옷 및 next-to-skin apparel.', '유아동복, 잠옷과 피부에 닿는 의류를 위한 부드러운 대나무 비스코스 니트 원단입니다.'],
      ['Thermoregulation, moisture management, cooling 및 performance development.', '체온 조절, 흡한속건, 냉감과 신축 성능을 용도에 맞춰 개발합니다.'],
      ['머서라이즈 가공 &amp;<br>액체 암모니아 가공', '머서라이즈 &amp; 액체 암모니아 가공'],
      ['Refined 코튼 니트s with smoother surfaces 및 improved dimensional stability.', '코튼 니트의 표면을 매끄럽게 하고 촉감과 치수 안정성을 개선하는 프리미엄 후가공입니다.'],
      ['메리노 울 및 RWS-certified 울 blend 원단.', '메리노 울, RWS 인증 울과 기능성 울 혼방으로 저지, 인터록과 피케 원단을 개발합니다.'],
      ['샌드 워싱 니트s', '샌드 워싱 니트'],
      ['Soft-touch 모달, EcoCosy® viscose 및 폴리에스터 blend 니트s with a relaxed drape.', '모달, EcoCosy® 비스코스와 폴리에스터 혼방 니트에 부드러운 촉감과 자연스러운 드레이프를 더합니다.'],
      ['Custom decorative 원단 for wo남성복, occasionwear 및 branded apparel.', '여성복, 예복과 브랜드 컬렉션을 위한 맞춤 자수 원단을 개발합니다.'],
    ];
    for (const [from, to] of textileLandingPairs) html = html.replace(new RegExp(esc(from), 'g'), to);
  }
  html = html.replace(/<a aria-label="[^\"]*" href="\/zh\/textile\/">/i, '<a aria-label="English" href="/">');
  html = html.replace(/<h1>Bamboo Viscose Knit 원단s<\/h1>/i, '<h1>대나무 비스코스 니트 원단</h1>');
  html = html.replace(/<h1>Mercerized and 액체 암모니아 가공 원단s<\/h1>/i, '<h1>머서라이즈·액체 암모니아 가공 니트 원단</h1>');
  html = html.replace(/<h1>Functional Knit 원단s<\/h1>/i, '<h1>기능성 니트 원단</h1>');
  html = html.replace(/<h1>울 원단s<\/h1>/i, '<h1>메리노 울 니트 원단</h1>');
  html = html.replace(/<h1>Women[^<]*<\/h1>/i, '<h1>샌드 워싱 니트 원단</h1>');
  html = html.replace(/<h1>Embroidered 원단s<\/h1>/i, '<h1>맞춤 자수 원단</h1>');
  html = html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)\s*<span class="bamboo-catalog-count">[^<]*<\/span>/i, (m,h1) => {
    const count = (m.match(/(\d+)/) || [,''])[1];
    return `${h1}<span class="bamboo-catalog-count">${count}종 원단</span>`;
  });
  html = html.replace(/HLC BAMBOO KNIT COLLECTION/g, 'HLC 대나무 니트 컬렉션');
  if (editorialByRoute[route]) html = html.replace(/<section aria-labelledby="[^"]+" class="bamboo-filter-editorial">[\s\S]*?<\/section>/i, editorialByRoute[route]);
  if (route === 'textile/wool-fabric') html = localizeWoolCatalog(html);
  html = fixJsonUrls(html);
  const out = path.join(root, 'ko', route, 'index.html');
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.writeFileSync(out, html);
}

for (const [route,title,desc] of catalogs) {
  const src = path.join(root, route, 'index.html');
  if (fs.existsSync(src)) {
    buildCatalog(route,title,desc);
    sourceHreflang(src, route, ['', 'textile', 'textile/bamboo-fabric', 'textile/functional'].includes(route));
  }
}

const productsRoot = path.join(root, 'textile', 'products');
const productSlugs = fs.readdirSync(productsRoot).filter(slug => fs.existsSync(path.join(productsRoot,slug,'index.html')) && slug !== 'product-template');
for (const slug of productSlugs) {
  const src = path.join(productsRoot, slug, 'index.html');
  buildProduct(src, slug);
  sourceHreflang(src, `textile/products/${slug}`, false);
}

for (const route of ['', 'textile', 'textile/bamboo-fabric', 'textile/functional']) {
  const zh = path.join(root, 'zh', route, 'index.html');
  if (fs.existsSync(zh)) sourceHreflang(zh, route, true);
}

let sitemap = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const koRoutes = catalogs.map(x=>x[0]).concat(productSlugs.map(s=>`textile/products/${s}`));
const additions = koRoutes.filter(route => !sitemap.includes(`<loc>${routeUrl(route,'ko')}</loc>`)).map(route => `  <url>\n    <loc>${routeUrl(route,'ko')}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.includes('/products/') ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${route === '' ? '1.0' : route.includes('/products/') ? '0.7' : '0.8'}</priority>\n  </url>`).join('\n');
if (additions) sitemap = sitemap.replace('</urlset>', `${additions}\n</urlset>`);
fs.writeFileSync(path.join(root,'sitemap.xml'), sitemap);

console.log(`Generated Korean homepage, ${catalogs.length-1} catalog pages and ${productSlugs.length} product pages.`);
