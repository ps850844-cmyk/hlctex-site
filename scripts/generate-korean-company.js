const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';
const today = '2026-08-08';

const pages = {
  overview: {
    title: 'HLC 소개 | 수직 통합 니트 원단 제조업체',
    description: '2003년 설립된 HLC는 원단 개발, 편직, 염색, 후가공과 품질 검사를 통합 운영하는 니트 원단 제조업체입니다.',
    replacements: [
      ['WHO WE ARE', 'HLC 소개'],
      ['Integrity<br>First', '신뢰를<br>최우선으로'],
      ['Founded in 2003, HLC is a vertically integrated textile manufacturer.', '2003년에 설립된 HLC는 수직 통합 생산 체계를 갖춘 니트 원단 제조업체입니다.'],
      ['HLC integrates sustainability across its operations and produces high-quality fabrics from natural, synthetic, regenerated and recycled fibres. Our core expertise includes bamboo viscose, wool, mercerized and liquid-ammonia-finished cotton, and stretch-fibre blends.', 'HLC는 천연·합성·재생·리사이클 섬유를 활용한 고품질 원단을 생산하며, 대나무 비스코스, 울, 머서라이즈 및 액체 암모니아 가공 면, 신축성 혼방 원단을 전문적으로 개발합니다.'],
      ['We manufacture fabrics for babywear, sleepwear, loungewear and fashion applications with controlled bulk quality, in-house testing and direct production coordination.', '유아동복, 잠옷, 라운지웨어와 패션 의류용 원단을 생산하며, 사내 시험과 일관된 벌크 품질 관리, 공장 직영 생산 관리로 구매 프로젝트를 지원합니다.'],
      ['HLC facilities and production capacity', 'HLC 생산 시설 및 생산 능력'],
      ['Animated HLC facilities and production capacity', 'HLC 생산 시설 및 생산 능력 안내']
    ]
  },
  profile: {
    title: '회사 정보 | HLC GROUP CO., LTD.',
    description: 'HLC GROUP CO., LTD.의 설립연도, 사업 분야, 생산 조직, 소재와 제품, 주요 시장 및 계열사 정보를 확인하세요.',
    replacements: [
      ['Company Profile', '회사 정보'], ['Name', '회사명'], ['Business', '사업 내용'],
      ['Development, knitting, dyeing, finishing, sales and export of bamboo viscose, wool, cotton/TENCEL™, functional and other fashion fabrics; related garments and home-textile products.', '대나무 비스코스, 울, 코튼/TENCEL™, 기능성 및 패션 원단의 개발·편직·염색·후가공·판매·수출과 관련 의류 및 홈텍스타일 제품'],
      ['Established', '설립'], ['General Manager', '대표이사'], ['Xiaofeng Dong', 'Dong Xiaofeng'],
      ['Office', '본사 및 공장'], ['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', '중국 저장성 자싱시 퉁샹시 푸위안진 헝러로 51, 314502'],
      ['Registered Capital', '등록 자본금'], ['Paid-in CNY 113,873,906.12 (as of May 31, 2026)', '납입 자본금 CNY 113,873,906.12 (2026년 5월 31일 기준)'],
      ['Employees', '임직원'], ['Annual Sales', '연간 매출'], ['CNY 320 million (FY2025)', 'CNY 3억 2천만 (2025 회계연도)'],
      ['Customers &amp; Markets', '고객 및 시장'], ['Customers & Markets', '고객 및 시장'],
      ['Domestic / China', '중국 내수'], ['Purchasing:', '구매:'], ['fabric manufacturers and garment factories', '원단 제조업체 및 봉제공장'],
      ['Sales:', '판매:'], ['apparel manufacturers, retailers and e-commerce companies', '의류 제조업체, 유통업체 및 전자상거래 기업'],
      ['Overseas', '해외'], ['Europe, Southeast Asia, South Korea, Taiwan and the United States', '유럽, 동남아시아, 한국, 대만 및 미국'],
      ['Products Traded', '취급 제품'], ['Womenswear fabrics, menswear fabrics, menswear, womenswear, casual apparel, sleepwear fabrics, bedding accessories, infantwear and childrenswear.', '여성복·남성복 원단, 캐주얼 의류, 잠옷 원단, 침구 제품, 유아 및 아동복'],
      ['Sales Mix', '매출 구성'], ['Baby &amp; Kids Fabric Division', '유아동 원단 부문'], ['Baby & Kids Fabric Division', '유아동 원단 부문'],
      ['Casual Fabric Division', '캐주얼 원단 부문'], ['Garments — menswear, womenswear and finished products', '의류 — 남성복, 여성복 및 완제품'], ['Leasing Business', '임대 사업'],
      ['Affiliated Companies', '계열사'], ['Tongxiang Bosen High-Performance Fiber Materials Co., Ltd.', 'Tongxiang Bosen High-Performance Fiber Materials Co., Ltd.'], ['Tongxiang Bosen Import &amp; Export Co., Ltd.', 'Tongxiang Bosen Import & Export Co., Ltd.']
    ]
  },
  quality: {
    title: '원단 검사 및 시험센터 | HLC',
    description: 'HLC의 4점식 원단 검사와 색상 견뢰도, 수축률, pH, 필링, 마모 및 치수 안정성 시험 역량을 확인하세요.',
    replacements: [
      ['Inspection &amp; Testing Centre', '원단 검사 및 시험센터'], ['Inspection & Testing Centre', '원단 검사 및 시험센터'],
      ['Four-Point Fabric Inspection', '4점식 원단 검사'],
      ['Our trained inspection team records and reports defects such as holes, broken ends, skew and staining under the four-point system.', '숙련된 검사팀이 4점식 검사 기준에 따라 구멍, 실 끊김, 사행, 오염 등의 결점을 기록하고 보고합니다.'],
      ['Testing Centre', '시험센터'], ['Trained laboratory technicians evaluate colourfastness, pH, pilling, shrinkage and other finished-fabric performance requirements.', '시험 담당자가 견뢰도, pH, 필링, 수축률 등 완성 원단의 주요 성능을 평가합니다.'],
      ['Testing Equipment', '시험 장비'], ['X-Rite light boxes, spectrophotometers, Martindale testers, crocking testers, US-standard washers and dryers, and xenon lightfastness equipment.', 'X-Rite 표준광원, 분광측색기, 마틴데일 마모시험기, 마찰 견뢰도 시험기, 미국 규격 세탁기·건조기와 제논 내광성 시험 장비를 운영합니다.'],
      ['Testing equipment in our inspection centre', 'HLC 원단 검사센터의 시험 장비'], ['Equipment used for colour assessment, colourfastness, abrasion, pilling and dimensional-stability testing.', '색상 판정, 견뢰도, 마모, 필링과 치수 안정성 평가에 사용하는 시험 장비입니다.']
      ,['INSPECTION', '원단 검사'], ['LAB EQUIPMENT', '시험 장비'], ['LAB', '시험실'], ['EQUIPMENT', '장비']
      ,['Martindale abrasion &amp; pilling tester', '마틴데일 마모·필링 시험기'], ['Xenon arc lightfastness tester', '제논 아크 내광성 시험기']
      ,['X-Rite colour assessment light box', 'X-Rite 색상 평가 표준광원'], ['AATCC standard washer', 'AATCC 규격 세탁기']
      ,['Crocking fastness tester', '마찰 견뢰도 시험기'], ['Textile formaldehyde analyzer', '섬유 포름알데히드 분석기'], ['Textile shrinkage oven', '섬유 수축률 건조기']
    ]
  },
  certificates: {
    title: '섬유 인증서 | OEKO-TEX·GOTS·GRS·RWS·ISO | HLC',
    description: 'HLC의 OEKO-TEX STANDARD 100, GOTS, GRS, RWS, European Flax와 ISO 품질·환경·안전·에너지 관리 인증서를 확인하세요.',
    replacements: [
      ['Verified certificates', '검증된 인증서'], ['Use the arrows, keyboard or swipe gesture to turn one page at a time.', '화살표, 키보드 또는 스와이프로 인증서를 한 페이지씩 확인할 수 있습니다.'],
      ['OCS, GRS &amp; RWS Scope Certificate', 'OCS·GRS·RWS 범위 인증서'], ['OCS, GRS & RWS Scope Certificate', 'OCS·GRS·RWS 범위 인증서'],
      ['Certified Product Appendix', '인증 제품 부속서'], ['Certified Site Appendix', '인증 사업장 부속서'], ['European Flax Certificate', 'European Flax 인증서'],
      ['ISO 9001 Quality Management', 'ISO 9001 품질경영'], ['ISO 14001 Environmental Management', 'ISO 14001 환경경영'], ['ISO 45001 Occupational Health &amp; Safety', 'ISO 45001 안전보건경영'], ['ISO 45001 Occupational Health & Safety', 'ISO 45001 안전보건경영'], ['ISO 50001 Energy Management', 'ISO 50001 에너지경영'],
      ['Original certificate files', '인증서 원본 파일'], ['Open original PDF', 'PDF 원본 보기'], ['Previous certificate', '이전 인증서'], ['Next certificate', '다음 인증서']
      ,['View original PDF', 'PDF 원본 보기'], ['PDF DOCUMENTS', 'PDF 문서']
      ,['Knitted fabric · Product Class I for baby articles', '니트 원단 · 유아용 제품 등급 I']
      ,['Quality, environmental and occupational safety systems', '품질·환경·안전보건 경영시스템']
      ,['Energy management system · Chinese and English', '에너지경영시스템 · 중문 및 영문']
    ]
  },
  esg: {
    title: '지속가능경영 및 ESG | HLC',
    description: 'HLC의 저영향 염색, 물·에너지·탄소 절감, 포용적 고용과 임직원 환경보전 활동을 확인하세요.',
    replacements: [
      ['Corporate Sustainability &amp; ESG', '지속가능경영 및 ESG'], ['Corporate Sustainability & ESG', '지속가능경영 및 ESG'],
      ['HLC advances more responsible textile manufacturing through lower-impact dyeing, employee wellbeing, inclusive employment and environmental restoration.', 'HLC는 저영향 염색, 임직원 복지, 포용적 고용과 환경복원 활동을 통해 더 책임 있는 섬유 생산을 추진합니다.'],
      ['Renewable Energy, Water Saving &amp; Carbon Reduction', '재생에너지·물 절감·탄소 저감'], ['Renewable Energy, Water Saving & Carbon Reduction', '재생에너지·물 절감·탄소 저감'],
      ['We continue to reduce water, energy and carbon impacts through waterless dyeing and lower-impact wet-processing routes.', '저수 염색과 환경부하가 낮은 습식 공정을 통해 물과 에너지 사용량, 탄소 배출 영향을 지속적으로 줄입니다.'],
      ['Inclusive Employment Programme', '포용적 고용 프로그램'], ['Our inclusive employment programme creates meaningful job opportunities for people with disabilities, supported by ongoing employee volunteering.', '장애인을 위한 안정적인 일자리를 마련하고 임직원 봉사활동을 지속적으로 운영합니다.'],
      ['Annual Tree-Planting Initiative', '매년 진행하는 식목 활동'], ['Each Arbor Day, employees take part in a mountain clean-up and plant approximately 500 trees as a long-term commitment to natural resource stewardship.', '매년 식목일에 임직원이 산림 정화 활동에 참여하고 약 500그루의 나무를 심으며 자연환경 보호를 실천합니다.']
    ]
  },
  recruitment: {
    title: '채용 및 인재 | HLC',
    description: 'HLC의 원단 개발, 품질 검사, 생산 관리와 해외 영업 분야에서 소재와 품질을 이해하는 인재를 찾습니다.',
    replacements: [
      ['Build dependable textiles with people who care about materials, quality and long-term partnerships.', '소재와 품질, 장기적인 파트너십을 소중히 여기는 사람들과 신뢰할 수 있는 원단을 만듭니다.'],
      ['HLC values people in fabric development, quality inspection, production management and international business. We grow with colleagues who keep learning, understand materials and respect quality.', 'HLC는 원단 개발, 품질 검사, 생산 관리와 해외 영업 분야의 인재를 중요하게 생각합니다. 끊임없이 배우고 소재를 이해하며 품질을 존중하는 동료와 함께 성장합니다.'],
      ['Fabric Development &amp; Analysis', '원단 개발 및 분석'], ['Fabric Development & Analysis', '원단 개발 및 분석'],
      ['Support sample analysis, specification development and customer projects across bamboo viscose, performance yarns, knit structures and finishing hand-feel.', '대나무 비스코스, 기능성 원사, 니트 조직과 후가공 촉감에 관한 샘플 분석, 사양 개발 및 고객 프로젝트를 지원합니다.'],
      ['Quality Inspection &amp; Laboratory', '품질 검사 및 시험실'], ['Quality Inspection & Laboratory', '품질 검사 및 시험실'],
      ['Support fabric inspection and testing for colourfastness, shrinkage, pH and pilling within a consistent quality-management process.', '일관된 품질관리 절차에 따라 원단 검사와 견뢰도, 수축률, pH 및 필링 시험을 수행합니다.'],
      ['Merchandising &amp; Production Coordination', '생산 및 수출 관리'], ['Merchandising & Production Coordination', '생산 및 수출 관리'],
      ['Connect buyer requirements with production and shipment schedules, ensuring that specifications, lead times, testing and certification details are communicated accurately.', '바이어 요구사항을 생산·출하 일정과 연결하고 사양, 납기, 시험 및 인증 정보를 정확하게 관리합니다.']
    ]
  }
};

const common = [
  ['Products', '제품'], ['Solutions', '솔루션'], ['About HLC', 'HLC 소개'], ['Sustainability', '지속가능성'], ['Careers', '채용'], ['Contact Us', '문의하기'],
  ['Bamboo Viscose Knits', '대나무 비스코스 니트'], ['Mercerization &amp; Liquid Ammonia', '머서라이즈 및 액체 암모니아'], ['Mercerization & Liquid Ammonia', '머서라이즈 및 액체 암모니아'],
  ['Functional Knits', '기능성 니트'], ['Wool Fabrics', '울 원단'], ['Sand-Washed Knit Fabrics', '샌드워시 니트 원단'], ['Embroidered Fabrics', '자수 원단'],
  ['Certifications &amp; Material Support', '인증 및 소재 지원'], ['Certifications & Material Support', '인증 및 소재 지원'],
  ['WL Dye® Waterless Dyeing', 'WL Dye® 저수 염색'], ['Mercerization &amp; Liquid Ammonia Finishing', '머서라이즈 및 액체 암모니아 가공'], ['Mercerization & Liquid Ammonia Finishing', '머서라이즈 및 액체 암모니아 가공'],
  ['Inspection &amp; Testing Centre', '원단 검사 및 시험센터'], ['Inspection & Testing Centre', '원단 검사 및 시험센터'], ['Request Specifications &amp; Pricing', '사양 및 견적 문의'], ['Request Specifications & Pricing', '사양 및 견적 문의'],
  ['Company Profile', '회사 정보'], ['Quality Management', '품질 관리'], ['Certificates &amp; Certifications', '인증서 및 인증'], ['Certificates & Certifications', '인증서 및 인증'],
  ['Corporate Sustainability &amp; ESG', '지속가능경영 및 ESG'], ['Corporate Sustainability & ESG', '지속가능경영 및 ESG'], ['Water- and Carbon-Reducing Dyeing', '물·탄소 저감 염색'],
  ['People &amp; Culture', '인재 및 조직문화'], ['People & Culture', '인재 및 조직문화'], ['Close menu', '메뉴 닫기'], ['Website tools', '사이트 도구'],
  ['HLC Certifications', 'HLC 인증'], ['All rights reserved.', '모든 권리 보유.'], ['Email', '이메일'], ['Tel', '전화'], ['Fax', '팩스']
  ,['No. 51 Hengle Road, Puyuan Town, Tongxiang, Jiaxing, Zhejiang 314502, China', '중국 저장성 자싱시 퉁샹시 푸위안진 헝러로 51, 314502']
];

function protect(html, fn) {
  const blocks = [];
  html = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, block => {
    const token = `__HLC_BLOCK_${blocks.length}__`;
    blocks.push(block);
    return token;
  });
  html = fn(html);
  return html.replace(/__HLC_BLOCK_(\d+)__/g, (_, i) => blocks[Number(i)]);
}

function replaceAll(html, pairs) {
  return protect(html, value => {
    for (const [from, to] of pairs) value = value.split(from).join(to);
    return value;
  });
}

function alternates(route) {
  return `<link rel="alternate" hreflang="en" href="${base}/${route}/">\n<link rel="alternate" hreflang="zh-Hans" href="${base}/zh/${route}/">\n<link rel="alternate" hreflang="ko" href="${base}/ko/${route}/">\n<link rel="alternate" hreflang="x-default" href="${base}/${route}/">`;
}

function injectAlternates(html, route) {
  html = html.replace(/\s*<link[^>]+hreflang=[^>]+>\s*/gi, '\n');
  const block = alternates(route);
  return html.replace(/(<link[^>]+rel="canonical"[^>]*>)/i, `$1\n${block}`);
}

function setMeta(html, key, config) {
  const route = `company/${key}`;
  html = html.replace(/<html[^>]*lang="[^"]*"/i, '<html lang="ko"');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${config.title}</title>`);
  html = html.replace(/<meta\b[^>]*name="description"[^>]*>/i, `<meta name="description" content="${config.description}">`);
  html = html.replace(/<link\b[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${base}/ko/${route}/">`);
  if (!/property="og:locale"/i.test(html)) html = html.replace('</title>', '</title><meta property="og:locale" content="ko_KR">');
  html = html.replace(/<meta\b[^>]*property="og:title"[^>]*>/i, `<meta property="og:title" content="${config.title}">`);
  html = html.replace(/<meta\b[^>]*property="og:description"[^>]*>/i, `<meta property="og:description" content="${config.description}">`);
  html = html.replace(/<meta\b[^>]*property="og:url"[^>]*>/i, `<meta property="og:url" content="${base}/ko/${route}/">`);
  html = injectAlternates(html, route);
  return html;
}

function localizeLinks(html) {
  return html
    .replace(/href="\/company\//g, 'href="/ko/company/')
    .replace(/href="\/textile\//g, 'href="/ko/textile/')
    .replace(/href="\/"/g, 'href="/ko/"')
    .replace(/href="\/#/g, 'href="/ko/#');
}

for (const [key, config] of Object.entries(pages)) {
  const source = path.join(root, 'company', key, 'index.html');
  let html = fs.readFileSync(source, 'utf8');
  html = setMeta(html, key, config);
  html = localizeLinks(html);
  // Page-specific phrases go first so a short common label cannot partially
  // translate a longer heading (for example, Corporate Sustainability & ESG).
  html = replaceAll(html, [...config.replacements, ...common]);
  html = html.replace(/aria-label="[^"\n]*中文[^"\n]*"/g, 'aria-label="English"');
  html = html.replace(/href="\/zh\/company\/[^"]+"/i, `href="/company/${key}/"`);
  html = html.replace(/"inLanguage"\s*:\s*"[^"]+"/g, '"inLanguage": "ko-KR"');
  html = html.replace(/https:\/\/hlctex\.com\/company\//g, `${base}/ko/company/`);
  const out = path.join(root, 'ko', 'company', key, 'index.html');
  fs.mkdirSync(path.dirname(out), {recursive: true});
  fs.writeFileSync(out, html, 'utf8');

  for (const prefix of ['', 'zh/']) {
    const sourcePath = path.join(root, prefix, 'company', key, 'index.html');
    if (!fs.existsSync(sourcePath)) continue;
    const original = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(sourcePath, injectAlternates(original, `company/${key}`), 'utf8');
  }
}

// Every Korean page should keep visitors inside the Korean company and product sections.
const koRoot = path.join(root, 'ko');
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') {
      let html = fs.readFileSync(full, 'utf8');
      html = html.replace(/href="\/company\//g, 'href="/ko/company/');
      fs.writeFileSync(full, html, 'utf8');
    }
  }
}
walk(koRoot);

let sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const key of Object.keys(pages)) {
  const url = `${base}/ko/company/${key}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    sitemap = sitemap.replace('</urlset>', `  <url><loc>${url}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.68</priority></url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log(`Generated ${Object.keys(pages).length} Korean company pages.`);
