const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const base = 'https://hlctex.com';
const lastmod = '2026-08-08';

const pages = [
  {
    slug: 'wl-dye',
    title: '니트 원단 무수 염색 기술 | HLC',
    description: 'HLC의 니트 원단 무수 염색 기술은 물, 증기, 전력과 탄소 배출 영향을 줄이면서 부드러운 촉감과 깨끗한 원단 표면을 구현합니다.',
    replacements: [
      ['无水化：', '무수 염색:'],
      ['不是一句口号，', '단순한 슬로건이 아닌,'],
      ['而是一项流程决策。', '생산 공정의 선택입니다.'],
      ['HLC采用低水纤维染色工艺，旨在减少传统染色工艺中湿加工环节的工序。该工艺在保证生产稳定性的同时，还能减少资源消耗。', 'HLC는 기존 염색 공정의 습식 가공 단계를 줄이기 위해 저수량 섬유 염색 공정을 적용합니다. 안정적인 생산 품질을 유지하면서 물과 에너지 사용을 줄일 수 있습니다.'],
      ['对采购商而言，无水染色无需以增加成本换取更低的环境影响。通过减少用水、蒸汽、电力及湿加工环节，它有助于降低综合染色成本，同时减少纤维摩擦，提升面料的柔软手感、表面光洁度与整体性能。', '바이어는 환경 영향을 낮추기 위해 별도의 프리미엄을 지불할 필요가 없습니다. 물, 증기, 전력과 습식 가공 단계를 줄여 전체 염색 비용을 낮추는 동시에 섬유 마찰을 줄이고 원단의 부드러운 촉감, 표면 평활도와 전반적인 성능을 향상시킵니다.'],
      ['01 / 资源影响', '01 / 자원 절감'],
      ['从工艺源头降低投入。', '공정 단계부터 자원 사용을 줄입니다.'],
      ['与传统染色相比，Waterless工艺围绕着色过程中的资源减量进行设计。', '기존 염색과 비교해 무수 염색 공정은 착색 과정에서 물과 에너지 사용량을 줄이도록 설계되었습니다.'],
      ['02 / 面料表现', '02 / 원단 성능'],
      ['更少摩擦，', '마찰은 줄이고,'],
      ['更洁净的布面。', '원단 표면은 더 깨끗하게.'],
      ['着色过程中的摩擦更少，有助于保护纤维表面，使成品布面更平整、毛羽更少，并减少折痕。', '착색 과정의 마찰을 줄여 섬유 표면을 보호하고 완성 원단을 더욱 평활하게 하며 잔털과 주름을 줄이는 데 도움이 됩니다.'],
      ['针织面料可获得更明亮的外观、更好的色牢度和抗起球表现，让工艺优势最终体现在成衣的视觉与触感上。', '니트 원단은 더욱 선명한 외관, 우수한 색상 견뢰도와 내필링성을 확보할 수 있어 공정의 장점이 완성 의류의 외관과 촉감으로 이어집니다.'],
      ['无水染色纤维素面料', '무수 염색 셀룰로오스 원단'],
      ['竹纤维与莫代尔针织面料', '대나무 비스코스 및 모달 니트 원단'],
      ['无水染色混纺面料', '무수 염색 혼방 원단'],
      ['棉麻混纺面料', '면·리넨 혼방 원단'],
      ['超柔纯棉', '초유연 순면'],
      ['无水染色纯棉针织面料', '무수 염색 순면 니트 원단']
      ,['象征低环境影响无水染色的高山草地景观', '저환경 영향 무수 염색을 상징하는 고산 초원 풍경']
      ,['无水染色资源优势与面料表现', '무수 염색의 자원 절감 효과와 원단 성능']
      ,['浮窗查看高清无水染色优势图片', '고해상도 무수 염색 장점 이미지 보기']
      ,['无水染色优势原版说明', '무수 염색의 주요 장점 안내 이미지']
      ,['浮窗查看高清无水染色面料优势图片', '고해상도 무수 염색 원단 장점 이미지 보기']
      ,['无水染色面料优势原版说明', '무수 염색 원단의 주요 장점 안내 이미지']
      ,['查看详情并咨询无水染色竹纤维与莫代尔针织面料', '무수 염색 대나무 비스코스 및 모달 니트 원단 문의하기']
      ,['适用于婴童服装与睡衣的柔软无水染色竹纤维和莫代尔针织面料', '유아복과 잠옷에 적합한 부드러운 무수 염색 대나무 비스코스 및 모달 니트 원단']
      ,['查看详情并咨询无水染色棉麻混纺面料', '무수 염색 면·리넨 혼방 원단 문의하기']
      ,['代表无水染色棉麻混纺开发的深蓝色平整针织面料', '무수 염색 면·리넨 혼방 개발을 보여 주는 짙은 남색의 평활한 니트 원단']
      ,['查看详情并咨询无水染色超柔纯棉针织面料', '무수 염색 초유연 순면 니트 원단 문의하기']
      ,['布面光洁且手感柔软的无水染色超柔纯棉针织面料', '표면이 깨끗하고 촉감이 부드러운 무수 염색 초유연 순면 니트 원단']
      ,['高清无水染色图片', '고해상도 무수 염색 이미지']
    ]
  },
  {
    slug: 'mercerization-liquid-ammonia',
    title: '머서라이즈 및 액체 암모니아 가공 | HLC',
    description: 'HLC의 Lafer 액체 암모니아 라인과 Pukwang 머서라이즈 라인은 고급 면 니트 원단의 광택, 부드러운 촉감과 치수 안정성을 향상시킵니다.',
    replacements: [
      ['丝光与液氨整理', '머서라이즈 및 액체 암모니아 가공'],
      ['整理性能', '후가공 성능'],
      ['不是表面修饰。', '단순한 표면 가공이 아닌,'],
      ['而是性能整理。', '원단 성능을 위한 선택입니다.'],
      ['HLC 配备一条 Lafer 液氨整理生产线和两条韩国 Pukwang 丝光整理生产线，为棉及混纺针织面料提供专业后整理服务。', 'HLC는 Lafer 액체 암모니아 가공 라인 1기와 한국 Pukwang 머서라이즈 라인 2기를 운영하며 면 및 혼방 니트 원단에 전문 후가공 서비스를 제공합니다.'],
      ['凭借稳定的生产控制、柔软手感、细腻光泽和出色的尺寸稳定性，我们长期服务于多个国际知名品牌及其供应链项目。', '안정적인 생산 관리와 부드러운 촉감, 섬세한 광택, 우수한 치수 안정성을 바탕으로 여러 글로벌 브랜드와 공급망 프로젝트를 장기간 지원하고 있습니다.'],
      ['01 / 液氨整理', '01 / 액체 암모니아 가공'],
      ['柔软垂顺，', '부드럽고 자연스러운 드레이프,'],
      ['洗后低缩水。', '세탁 후에도 낮은 수축률.'],
      ['液氨整理尤其适合 SUPIMA 棉、Giza 棉和长绒棉针织面料，可呈现柔软细腻的手感、自然垂坠、良好透气性、抗皱性与稳定的水洗表现，适用于高端 T 恤、Polo 衫、婴童贴身衣物、睡衣和家居服。', '액체 암모니아 가공은 SUPIMA 면, Giza 면과 장섬유 면 니트 원단에 부드럽고 섬세한 촉감, 자연스러운 드레이프, 우수한 통기성, 구김 방지와 안정적인 세탁 성능을 제공합니다. 프리미엄 티셔츠, 폴로셔츠, 유아용 밀착 의류, 잠옷과 라운지웨어에 적합합니다.'],
      ['02 / 丝光整理', '02 / 머서라이즈 가공'],
      ['高端纤维，', '고급 면 소재에,'],
      ['更高级的质感。', '더욱 정교한 표면감.'],
      ['丝光整理为 SUPIMA 棉、Giza 棉、长绒棉、棉麻及苎麻等高端面料带来细腻光泽、饱满色彩与顺滑手感。HLC 面向高端 T 恤、Polo 衫、婴童服装、睡衣和家居服，支持按纱支、克重、颜色与手感定制开发。', '머서라이즈 가공은 SUPIMA 면, Giza 면, 장섬유 면, 면·리넨과 라미 원단에 섬세한 광택, 풍부한 색감과 매끄러운 촉감을 제공합니다. HLC는 프리미엄 티셔츠, 폴로셔츠, 유아복, 잠옷과 라운지웨어용으로 원사 번수, 중량, 색상과 촉감에 맞춘 맞춤 개발을 지원합니다.'],
      ['丝光棉', '머서라이즈 면'],
      ['SUPIMA 棉与 Giza 棉针织面料', 'SUPIMA 면 및 Giza 면 니트 원단'],
      ['液氨整理', '액체 암모니아 가공'],
      ['高端长绒棉针织面料', '고급 장섬유 면 니트 원단'],
      ['纤维素混纺', '셀룰로오스 혼방'],
      ['棉麻与苎麻丝光面料', '면·리넨 및 라미 머서라이즈 원단']
      ,['棕色丝光与液氨整理针织面料，呈现平滑柔软且富有光泽的布面', '매끄럽고 부드러우며 섬세한 광택을 지닌 브라운 머서라이즈 및 액체 암모니아 가공 니트 원단']
      ,['HLC 丝光与液氨整理设备', 'HLC 머서라이즈 및 액체 암모니아 가공 설비']
      ,['在浮窗中高清查看液氨整理生产线', '액체 암모니아 가공 생산 라인 고해상도 이미지 보기']
      ,['HLC 针织面料液氨整理生产线', 'HLC 니트 원단 액체 암모니아 가공 생산 라인']
      ,['在浮窗中高清查看丝光整理生产线', '머서라이즈 가공 생산 라인 고해상도 이미지 보기']
      ,['HLC 针织面料开幅丝光整理生产线', 'HLC 니트 원단 오픈폭 머서라이즈 가공 생산 라인']
      ,['查看详情并咨询丝光 SUPIMA 棉与 Giza 棉针织面料', '머서라이즈 SUPIMA 면 및 Giza 면 니트 원단 문의하기']
      ,['具有细腻光泽的棕色丝光 SUPIMA 棉与 Giza 棉针织面料', '섬세한 광택을 지닌 브라운 머서라이즈 SUPIMA 면 및 Giza 면 니트 원단']
      ,['查看详情并咨询液氨整理高端长绒棉针织面料', '액체 암모니아 가공 고급 장섬유 면 니트 원단 문의하기']
      ,['展现液氨整理柔软垂顺手感的高端长绒棉面料', '액체 암모니아 가공의 부드러운 촉감과 자연스러운 드레이프를 보여 주는 고급 장섬유 면 원단']
      ,['查看详情并咨询丝光棉麻与苎麻面料', '머서라이즈 면·리넨 및 라미 원단 문의하기']
      ,['表面平整的纤维素针织面料，代表丝光棉麻与苎麻混纺产品', '매끄러운 표면의 셀룰로오스 니트 원단으로 머서라이즈 면·리넨 및 라미 혼방 제품을 보여 줍니다']
      ,['高清整理设备图片', '고해상도 후가공 설비 이미지']
    ]
  }
];

const common = [
  ['针织面料无水染色技术｜HLC', '니트 원단 무수 염색 기술 | HLC'],
  ['丝光与液氨整理｜HLC', '머서라이즈 및 액체 암모니아 가공 | HLC'],
  ['博森', ''],
  ['产品', '제품'], ['解决方案', '솔루션'], ['我们是谁', 'HLC 소개'],
  ['可持续性', '지속가능성'], ['职业生涯', '채용'], ['联系我们', '문의하기'],
  ['竹纤维针织面料', '대나무 비스코스 니트 원단'], ['丝光 &amp; 液氨', '머서라이즈 &amp; 액체 암모니아'],
  ['功能性针织面料', '기능성 니트 원단'], ['羊毛面料', '울 원단'], ['砂洗针织面料', '샌드 워싱 니트 원단'],
  ['常规针织面料', '일반 니트 원단'], ['认证与材料支持', '인증 및 소재 지원'], ['WL Dye® 无水染色', 'WL Dye® 무수 염색'],
  ['丝光与液氨整理', '머서라이즈 및 액체 암모니아 가공'], ['检验环节与检测中心', '검사 및 시험 센터'],
  ['按项目获取规格与报价', '사양 및 견적 요청'], ['公司简介', '회사 개요'], ['品质管理', '품질 관리'],
  ['证书与认证', '인증서 및 인증'], ['企业永续 ESG', '기업 지속가능성 및 ESG'], ['节水与减碳染色', '절수·저탄소 염색'],
  ['人才理念', '인재 및 기업 문화'], ['无水染色', '무수 염색'], ['相关产品', '관련 제품'], ['相关제품', '관련 제품'],
  ['03 / PRODUCTS', '03 / 제품'], ['查看详情', '제품 보기'], ['款号', 'Style#'], ['待补充', '추가 예정'],
  ['价格', '가격'], ['待更新', '업데이트 예정'], ['中国浙江省嘉兴市桐乡市濮院镇恒乐路51号（邮编：314502）', '중국 저장성 자싱시 퉁샹시 푸위안진 헝러로 51, 314502'],
  ['电话 ', '전화 '], ['传真 ', '팩스 '], ['邮箱', '이메일'], ['网站工具', '사이트 도구'],
  ['关闭菜单', '메뉴 닫기'], ['关闭高清图片', '고해상도 이미지 닫기'], ['在浮窗中高清查看', '고해상도 이미지 보기: '],
  ['搜索', '검색'], ['认证标章', '인증 마크'], ['© Copyright', '© Copyright']
];

function replaceAll(html, pairs) {
  for (const [from, to] of [...pairs].sort((a, b) => b[0].length - a[0].length)) {
    html = html.split(from).join(to);
  }
  return html;
}

function languageLinks(html, slug) {
  const en = `${base}/pickup/${slug}/`;
  const zh = `${base}/zh/pickup/${slug}/`;
  const ko = `${base}/ko/pickup/${slug}/`;
  html = html.replace(/\s*<link[^>]+hreflang=[^>]+>/gi, '');
  const alternates = `<link rel="alternate" hreflang="en" href="${en}"><link rel="alternate" hreflang="zh-Hans" href="${zh}"><link rel="alternate" hreflang="ko" href="${ko}"><link rel="alternate" hreflang="x-default" href="${en}">`;
  return html.replace(/(<link rel="canonical"[^>]+>)/i, `$1${alternates}`);
}

for (const page of pages) {
  const source = path.join(root, 'zh', 'pickup', page.slug, 'index.html');
  let html = fs.readFileSync(source, 'utf8');
  html = html.replace(/<html lang="[^"]+">/i, '<html lang="ko">');
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${page.description}">`);
  html = html.replace(/<link rel="canonical" href="[^"]+">/i, `<link rel="canonical" href="${base}/ko/pickup/${page.slug}/">`);
  html = html.replace(/\/zh\//g, '/ko/');
  html = html.replace(/href="\/pickup\/(wl-dye|mercerization-liquid-ammonia)\//g, 'href="/ko/pickup/$1/');
  html = html.replace(/href="\/ko\/contact\//g, 'href="/contact/');
  html = replaceAll(html, page.replacements);
  html = replaceAll(html, common);
  html = html.replace(/<a href="[^"]+" aria-label="English">/i, `<a href="/pickup/${page.slug}/" aria-label="English">`);
  html = languageLinks(html, page.slug);
  html = html.replace(/<meta property="og:locale" content="[^"]*">/i, '<meta property="og:locale" content="ko_KR">');
  if (!/<meta property="og:title"/i.test(html)) {
    html = html.replace('</head>', `<meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${base}/ko/pickup/${page.slug}/"><meta property="og:locale" content="ko_KR"></head>`);
  }
  const out = path.join(root, 'ko', 'pickup', page.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
}

for (const langRoot of ['ko']) {
  const dir = path.join(root, langRoot);
  const files = [];
  (function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html') files.push(full);
    }
  }(dir));
  for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/href="\/pickup\/wl-dye\//g, 'href="/ko/pickup/wl-dye/');
    html = html.replace(/href="\/pickup\/mercerization-liquid-ammonia\//g, 'href="/ko/pickup/mercerization-liquid-ammonia/');
    html = html.replace(/머서라이즈 및 액체 암모니아 Finishing/g, '머서라이즈 및 액체 암모니아 가공');
    html = html.replace(/>Mercerization</g, '>머서라이즈 가공<');
    html = html.replace(/"value": "Mercerization"/g, '"value": "머서라이즈 가공"');
    html = html.replace(/02 \/ PERFORMANCE FINISHING/g, '02 / 고기능 후가공');
    html = html.replace(/aria-label="Waterless dyeing"/g, 'aria-label="무수 염색"');
    html = html.replace(/aria-label="Explore waterless dyeing"/g, 'aria-label="무수 염색 공정 보기"');
    html = html.replace(/aria-label="Explore mercerization and liquid ammonia finishing"/g, 'aria-label="머서라이즈 및 액체 암모니아 가공 보기"');
    html = html.replace(/aria-label="Explore Mercerization and Liquid Ammonia 후가공"/g, 'aria-label="머서라이즈 및 액체 암모니아 가공 보기"');
    html = html.replace(/Water- 및 Carbon-Reducing Dyeing/g, '절수·저탄소 염색');
    html = html.replace(/Mercerization &amp; 액체 암모니아 가공 후가공/g, '머서라이즈 &amp; 액체 암모니아 가공');
    html = html.replace(/Mercerization & 액체 암모니아 가공 후가공/g, '머서라이즈 & 액체 암모니아 가공');
    html = html.replace(/Mercerization &amp; 액체 암모니아 가공/g, '머서라이즈 &amp; 액체 암모니아 가공');
    html = html.replace(/Corporate 지속가능성 &amp; ESG/g, '기업 지속가능성 및 ESG');
    html = html.replace(/Corporate 지속가능성 & ESG/g, '기업 지속가능성 및 ESG');
    html = html.replace(/People &amp; Culture/g, '인재 및 기업 문화');
    html = html.replace(/People & Culture/g, '인재 및 기업 문화');
    html = html.replace(/문의하기 Us/g, '문의하기');
    html = html.replace(/01 \/ WATERLESS DYEING/g, '01 / 무수 염색');
    html = html.replace(/01 \/ LOWER-IMPACT COLOUR/g, '01 / 저영향 염색');
    html = html.replace(/aria-label="Mercerization and liquid ammonia finishing"/g, 'aria-label="머서라이즈 및 액체 암모니아 가공"');
    html = html.replace(/<h3>Performance buyers can verify<\/h3>/g, '<h3>바이어가 확인할 수 있는 성능 정보</h3>');
    html = html.replace(/<h3>Integrated finishing support<\/h3>/g, '<h3>통합 후가공 지원</h3>');
    html = html.replace(/Each product page provides composition, GSM, cuttable width, 원사 count, MOQ, lead time, prices 및 available laboratory test results for sourcing evaluation\./g, '각 제품 페이지에서 혼용률, 중량, 재단 가능 폭, 원사 번수, MOQ, 납기, 가격과 제공 가능한 시험 결과를 확인할 수 있습니다.');
    html = html.replace(/HLC operates a Lafer 액체 암모니아 가공 line 및 two Pukwang mercerization lines, supporting development, finishing 및 in-house quality control for international apparel brands\./g, 'HLC는 Lafer 액체 암모니아 가공 라인 1기와 Pukwang 머서라이즈 라인 2기를 운영하며 글로벌 의류 브랜드를 위한 개발, 후가공과 사내 품질 관리를 지원합니다.');
    html = html.replace(/<h2 id="liquidAmmoniaBenefitsTitle">Why 액체 암모니아 가공 finished 코튼\?<\/h2>/g, '<h2 id="liquidAmmoniaBenefitsTitle">왜 액체 암모니아 가공 면 원단을 선택해야 할까요?</h2>');
    html = html.replace(/액체 암모니아 가공 finishing helps premium 코튼 니트s achieve a smoother surface, softer hand, cleaner drape 및 more dependable dimensional stability after washing\./g, '액체 암모니아 가공은 고급 면 니트 원단에 더욱 매끄러운 표면, 부드러운 촉감, 깨끗한 드레이프와 안정적인 세탁 후 치수 안정성을 제공합니다.');
    html = html.replace(/<h3>Premium 코튼 with a refined hand<\/h3>/g, '<h3>섬세한 촉감의 프리미엄 면 원단</h3>');
    html = html.replace(/BCI 코튼, 수피마 코튼, Giza 코튼 및 other long-staple 코튼 qualities can be developed for elevated T-shirts, polos, 내의, 아동복, 잠옷 및 라운지웨어\./g, 'BCI 면, SUPIMA 면, Giza 면과 기타 장섬유 면 소재를 프리미엄 티셔츠, 폴로셔츠, 내의, 아동복, 잠옷과 라운지웨어용으로 개발할 수 있습니다.');
    html = html.replace(/aria-label="Mercerized and liquid ammonia fabric products"/g, 'aria-label="머서라이즈 및 액체 암모니아 가공 원단 제품"');
    fs.writeFileSync(file, html, 'utf8');
  }
}

for (const page of pages) {
  for (const prefix of ['', 'zh/']) {
    const file = path.join(root, prefix, 'pickup', page.slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    let html = fs.readFileSync(file, 'utf8');
    html = languageLinks(html, page.slug);
    fs.writeFileSync(file, html, 'utf8');
  }
}

let sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const page of pages) {
  const url = `${base}/ko/pickup/${page.slug}/`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    sitemap = sitemap.replace('</urlset>', `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`);
  }
}
fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');

console.log('Generated Korean waterless dyeing and finishing pages.');
