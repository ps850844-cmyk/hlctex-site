const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const frRoot = path.join(root, 'fr');
const productRoot = path.join(frRoot, 'textile', 'products');
const englishProductRoot = path.join(root, 'textile', 'products');

const productNames = {
  '100s-liquid-ammonia-supima-interlock': 'Interlock coton SUPIMA® 100S à l’ammoniaque liquide',
  '100s-mercerized-supima-cotton-interlock': 'Interlock coton SUPIMA® 100S mercerisé',
  '120s-2-ply-mercerized-supima-cotton-interlock': 'Interlock coton SUPIMA® 120S/2 mercerisé',
  '21s-liquid-ammonia-hemp-cotton-pique': 'Piqué chanvre-coton 21S à l’ammoniaque liquide',
  '21s-liquid-ammonia-jersey': 'Jersey coton 21S à l’ammoniaque liquide',
  '26s-mercerized-bci-cotton-jersey': 'Jersey coton BCI 26S mercerisé',
  '30s-mercerized-bci-cotton-jersey': 'Jersey coton BCI 30S mercerisé',
  '32s-2-ply-heavyweight-liquid-ammonia-jersey': 'Jersey lourd coton 32S/2 à l’ammoniaque liquide',
  '32s-mercerized-bci-cotton-pique': 'Piqué coton BCI 32S mercerisé',
  '37-5-bird-eye-mesh': 'Maille œil-de-perdrix 37.5®',
  '37-5-mercerized-cotton-pique': 'Piqué coton mercerisé 37.5®',
  '37-5-merino-wool-jersey': 'Jersey laine mérinos 37.5®',
  '37-5-nylon-merino-wool-mesh': 'Maille nylon-mérinos 37.5®',
  '37-5-spandex-interlock': 'Interlock stretch 37.5®',
  '37-5-spandex-jersey': 'Jersey stretch 37.5®',
  '40s-2-ply-liquid-ammonia-pique': 'Piqué coton 40S/2 à l’ammoniaque liquide',
  '40s-liquid-ammonia-interlock': 'Interlock coton 40S à l’ammoniaque liquide',
  '40s-mercerized-bci-cotton-interlock': 'Interlock coton BCI 40S mercerisé',
  '50s-2-ply-liquid-ammonia-jersey': 'Jersey coton 50S/2 à l’ammoniaque liquide',
  '50s-2-ply-mercerized-bci-cotton-pique': 'Piqué coton BCI 50S/2 mercerisé',
  '50s-liquid-ammonia-interlock': 'Interlock coton 50S à l’ammoniaque liquide',
  '50s-liquid-ammonia-spandex-jersey': 'Jersey coton stretch 50S à l’ammoniaque liquide',
  '50s-mercerized-bci-cotton-interlock': 'Interlock coton BCI 50S mercerisé',
  '50s-sorona-thermal-shielding-fabric': 'Jersey thermorégulant Sorona® 50S',
  '60s-2-ply-mercerized-supima-cotton-jersey': 'Jersey coton SUPIMA® 60S/2 mercerisé',
  '60s-liquid-ammonia-spandex-interlock': 'Interlock coton stretch 60S à l’ammoniaque liquide',
  '60s-mercerized-cotton-modal-spandex-interlock': 'Interlock coton-modal stretch 60S mercerisé',
  '60s-mercerized-supima-cotton-interlock': 'Interlock coton SUPIMA® 60S mercerisé',
  '80s-3-ply-mercerized-bci-cotton-pique': 'Piqué coton BCI 80S/3 mercerisé',
  '80s-mercerized-supima-cotton-interlock': 'Interlock coton SUPIMA® 80S mercerisé',
  'bamboo-4x2-spandex-rib': 'Tissu côtelé bambou-élasthanne 4×2',
  'bamboo-cotton-spandex-pique': 'Tissu piqué bambou-coton-élasthanne',
  'bamboo-cotton-spandex-single-jersey': 'Tissu bambou-coton jersey stretch',
  'bamboo-merino-wool-spandex-jersey': 'Tissu bambou-mérinos jersey stretch',
  'bamboo-organic-cotton-interlock': 'Tissu bambou-coton biologique interlock',
  'bamboo-polyester-jersey': 'Tissu bambou-polyester jersey',
  'bamboo-spandex-discharge-print-jersey': 'Jersey bambou à impression rongeante',
  'bamboo-spandex-pigment-digital-print-jersey': 'Jersey bambou à impression numérique pigmentaire',
  'bamboo-spandex-pigment-print-jersey': 'Jersey bambou à impression pigmentaire',
  'bamboo-spandex-reactive-digital-print-jersey': 'Jersey bambou à impression numérique réactive',
  'bamboo-spandex-reactive-print-jersey': 'Jersey bambou à impression réactive',
  'bamboo-spandex-single-jersey': 'Jersey bambou-élasthanne',
  'bamboo-viscose-spandex-striped-jersey': 'Jersey rayé bambou-élasthanne',
  'bci-cotton-liquid-ammonia-interlock': 'Interlock coton BCI à l’ammoniaque liquide',
  'coolmax-merino-striped-jersey': 'Jersey rayé COOLMAX®-mérinos',
  'coolmax-merino-wool-pique': 'Piqué COOLMAX®-mérinos',
  'cotton-cool-jade-fresh-fabric': 'Jersey coton Cool Jade-Fresh',
  'drirelease-jersey': 'Jersey drirelease®',
  'drirelease-pique': 'Piqué drirelease®',
  'high-uv-protection-fabric': 'Jersey haute protection UV',
  'mercerized-bci-cotton-linen-pique': 'Piqué coton BCI-lin mercerisé',
  'merino-nylon-spandex-jacquard': 'Jacquard mérinos-nylon stretch',
  'merino-wool-nylon-spandex-jersey': 'Jersey mérinos-nylon stretch',
  'pcm-temperature-regulating-interlock': 'Interlock thermorégulant PCM',
  'pcm-temperature-regulating-jersey': 'Jersey thermorégulant PCM',
  'rws-merino-wool-interlock': 'Interlock laine mérinos RWS',
  'rws-merino-wool-jersey': 'Jersey laine mérinos RWS',
  'sand-wash-modal-polyester-pique': 'Piqué modal-polyester lavé au sable',
  'sand-wash-modal-polyester-spandex-jersey': 'Jersey modal-polyester stretch lavé au sable',
  'sand-wash-modal-polyester-spandex-scuba': 'Maille scuba modal-polyester stretch lavée au sable',
  'sand-washed-ecocosy-polyester-spandex-scuba': 'Maille scuba EcoCosy®-polyester stretch lavée au sable',
  'sand-washed-modal-polyester-french-terry': 'Molleton modal-polyester lavé au sable',
  'sand-washed-modal-vertical-stripe-scuba': 'Maille scuba modal à rayures verticales lavée au sable',
  'sorona-bi-component-pique': 'Piqué bicomposant Sorona®',
  'tencel-merino-jersey': 'Jersey TENCEL™-mérinos',
  'ultra-fine-sand-washed-scuba-fabric': 'Maille scuba ultrafine lavée au sable',
  'ultra-light-merino-wool-jersey': 'Jersey ultraléger en laine mérinos',
  'ultra-light-tencel-merino-jersey': 'Jersey ultraléger TENCEL™-mérinos'
};

const bambooKeywords = {
  'bamboo-spandex-single-jersey': 'jersey bambou, tissu jersey bambou, tissu bambou-élasthanne, jersey bambou stretch, tissu 95 % viscose de bambou 5 % élasthanne',
  'bamboo-4x2-spandex-rib': 'tissu côtelé bambou, tissu côtelé bambou-élasthanne, maille côtelée bambou, côte bambou stretch',
  'bamboo-cotton-spandex-single-jersey': 'tissu bambou-coton, jersey bambou-coton, tissu jersey bambou-coton, tissu bambou-coton-élasthanne, tissu mélangé bambou-coton',
  'bamboo-cotton-spandex-pique': 'tissu piqué bambou, piqué bambou-coton, piqué bambou-élasthanne, tissu bambou pour polos',
  'bamboo-organic-cotton-interlock': 'tissu bambou-coton biologique, interlock bambou-coton, tissu interlock bambou, tissu bambou pour vêtements bébé',
  'bamboo-polyester-jersey': 'tissu bambou-polyester, jersey bambou-polyester, jersey mélangé bambou',
  'bamboo-spandex-discharge-print-jersey': 'tissu bambou imprimé, impression rongeante sur jersey bambou, tissu bambou imprimé pour pyjamas',
  'bamboo-spandex-pigment-digital-print-jersey': 'tissu bambou à impression numérique, impression numérique pigmentaire sur jersey bambou, tissu bambou imprimé pour pyjamas',
  'bamboo-spandex-pigment-print-jersey': 'tissu bambou à impression pigmentaire, jersey bambou imprimé, tissu bambou imprimé pour pyjamas',
  'bamboo-spandex-reactive-digital-print-jersey': 'tissu bambou à impression numérique réactive, jersey bambou imprimé, tissu bambou imprimé pour pyjamas',
  'bamboo-spandex-reactive-print-jersey': 'tissu bambou à impression réactive, jersey bambou imprimé, tissu bambou imprimé pour pyjamas',
  'bamboo-merino-wool-spandex-jersey': 'tissu bambou-mérinos, jersey bambou-mérinos, mélange bambou-laine, jersey mérinos-bambou'
};

const categorySeo = {
  'index.html': {
    title: 'HLC | Fabricant de tissus maille pour marques de vêtements',
    h1: 'Des tissus maille axés sur le confort.<br>Conçus pour une production fiable.',
    description: 'HLC fabrique des tissus maille en bambou, coton biologique, laine, modal et mélanges, avec teinture sans eau, mercerisation et finition à l’ammoniaque liquide.'
  },
  'textile/index.html': {
    title: 'Fabricant de tissus maille et fournisseur textile | HLC',
    h1: 'Collections de tissus maille et finitions textiles HLC',
    description: 'Découvrez les jerseys, interlocks, piqués, côtes et mailles techniques HLC en bambou, coton, laine, modal, lin et mélanges, avec développement B2B sur mesure.'
  },
  'textile/bamboo-fabric/index.html': {
    title: 'Tissu bambou : fabricant, fournisseur et grossiste | HLC',
    h1: 'Tissus en bambou pour l’habillement',
    description: 'Fabricant et fournisseur de tissus en bambou : jersey, interlock, côte, piqué et imprimés pour vêtements bébé, pyjamas et vêtements de nuit. Vente en gros, MOQ et essais.'
  },
  'textile/functional/index.html': {
    title: 'Tissus maille techniques : fabricant et fournisseur | HLC',
    h1: 'Tissus maille techniques et fonctionnels',
    description: 'Tissus maille techniques HLC pour gestion de l’humidité, thermorégulation, protection UV et élasticité : développement B2B, MOQ, essais et production sur mesure.'
  },
  'textile/knitted-fabric/index.html': {
    title: 'Tissus maille : fabricant de jersey, interlock et piqué | HLC',
    h1: 'Tissus maille classiques',
    description: 'Fabricant de tissus maille jersey, interlock, piqué et côtelés en coton, modal, bambou, lin et mélanges. Grammages, couleurs, toucher et finitions sur mesure.'
  },
  'textile/mercerized-liquid-ammonia-fabric/index.html': {
    title: 'Tissus mercerisés et finition à l’ammoniaque liquide | HLC',
    h1: 'Tissus mercerisés et finis à l’ammoniaque liquide',
    description: 'Comparez les jerseys, interlocks et piqués de coton mercerisés ou finis à l’ammoniaque liquide : composition, grammage, MOQ, prix, délais et essais HLC.'
  },
  'textile/womenswear-fabric/index.html': {
    title: 'Tissus maille au tombé souple pour mode féminine | HLC',
    h1: 'Tissus maille lavés au sable pour la mode féminine',
    description: 'Mailles modal et mélanges lavés au sable, au toucher doux et au tombé souple : jersey, piqué, scuba et molleton pour collections de mode féminine.'
  },
  'textile/wool-fabric/index.html': {
    title: 'Tissus maille en laine mérinos : fabricant et fournisseur | HLC',
    h1: 'Tissus maille en laine mérinos',
    description: 'Jerseys, interlocks, piqués et jacquards en laine mérinos, notamment RWS et ZQ : composition, grammage, MOQ, délais, essais et développement sur mesure.'
  },
  'company/esg/index.html': {
    title: 'Développement durable et ESG | Groupe HLC',
    h1: 'Développement durable et ESG',
    description: 'Découvrez les actions ESG de HLC : teinture à moindre impact, efficacité énergétique, bien-être des salariés, emploi inclusif et restauration de l’environnement.'
  },
  'company/profile/index.html': {
    title: 'Profil du fabricant textile HLC | Groupe HLC',
    h1: 'Profil de l’entreprise',
    description: 'Découvrez le profil de HLC : fabricant textile intégré, marchés, équipes, capacités de production et gammes de tissus maille pour les marques internationales.'
  },
  'company/quality/index.html': {
    title: 'Contrôle qualité et laboratoire textile | Groupe HLC',
    h1: 'Contrôle qualité et laboratoire d’essais',
    description: 'HLC contrôle les tissus et réalise en interne des essais de solidité des couleurs, pH, boulochage, retrait, abrasion et stabilité dimensionnelle.'
  },
  'development/index.html': {
    title: 'Développement de tissus maille sur mesure | Groupe HLC',
    h1: 'Nouveaux développements de tissus maille',
    description: 'Nouveaux tissus HLC en bambou, laine, modal et mélanges : structures fonctionnelles, toucher sur mesure, teinture à moindre impact et finitions spécialisées.'
  },
  'pickup/wl-dye/index.html': {
    title: 'Teinture sans eau pour tissus maille | Groupe HLC',
    h1: 'Teinture sans eau',
    description: 'Découvrez la teinture sans eau HLC pour tissus maille, conçue pour réduire l’utilisation d’eau et d’énergie tout en préservant le toucher et la tenue des couleurs.'
  }
};

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, value) { fs.writeFileSync(file, value, 'utf8'); }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function stripTags(value) {
  return value.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;|\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}
function field(html, name) {
  const re = new RegExp(`<([a-z0-9]+)\\b[^>]*data-template-field=["']${escapeRegExp(name)}["'][^>]*>([\\s\\S]*?)<\\/\\1>`, 'i');
  const match = html.match(re);
  return match ? stripTags(match[2]) : '';
}
function setField(html, name, value) {
  const re = new RegExp(`(<([a-z0-9]+)\\b[^>]*data-template-field=["']${escapeRegExp(name)}["'][^>]*>)[\\s\\S]*?(<\\/\\2>)`, 'i');
  return html.replace(re, `$1${value}$3`);
}
function setTitle(html, value) { return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${value}</title>`); }
function setMeta(html, key, value) {
  const attr = key.startsWith('og:') ? 'property' : 'name';
  const re = new RegExp(`<meta\\b(?=[^>]*\\b${attr}=["']${escapeRegExp(key)}["'])[^>]*>`, 'i');
  return html.replace(re, `<meta content="${value.replace(/"/g, '&quot;')}" ${attr}="${key}"/>`);
}
function setH1(html, value) { return html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, `$1${value}$2`); }
function cleanFrenchFacts(value) {
  let cleaned = value
    .replace(/^100%\s*Supima$/i, '100 % coton SUPIMA®')
    .replace(/\bRWS Merino Wool\b/gi, 'laine mérinos RWS')
    .replace(/\bMerino Wool\b/gi, 'laine mérinos')
    .replace(/\bBCI Cotton\b/gi, 'coton BCI')
    .replace(/\bBetter Cotton \(BCI\)/gi, 'coton Better Cotton (BCI)')
    .replace(/\bOrganic Cotton\b/gi, 'coton biologique')
    .replace(/\bLenzing Modal\b/gi, 'modal Lenzing')
    .replace(/\bCotton\b/gi, 'coton')
    .replace(/\bmeilleur coton \(BCI\)/gi, 'coton Better Cotton (BCI)')
    .replace(/\bbamboo viscose\b/gi, 'viscose de bambou')
    .replace(/\bspandex\b/gi, 'élasthanne')
    .replace(/\bElastane\b/gi, 'élasthanne')
    .replace(/\bRayon\b/gi, 'rayonne')
    .replace(/\bLinen\b/gi, 'lin')
    .replace(/\bHemp\b/gi, 'chanvre')
    .replace(/\bViscose\b/gi, 'viscose')
    .replace(/\bsorona\b/gi, 'Sorona®')
    .replace(/\bPolyester\b/g, 'polyester')
    .replace(/\bNylon\b/g, 'nylon')
    .replace(/(\d+(?:[.,]\d+)?)\s*%/g, '$1 %')
    .replace(/%(?=[A-Za-zÀ-ÿ])/g, '% ')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned;
}
function translateConstruction(value) {
  const v = stripTags(value).toLowerCase();
  if (v.includes('bird eye')) return 'œil-de-perdrix';
  if (v.includes('french terry')) return 'molleton French terry';
  if (v.includes('scuba')) return 'scuba';
  if (v.includes('jacquard')) return 'jacquard';
  if (v.includes('stripe')) return 'jersey rayé';
  if (v.includes('single jersey') || v === 'jersey') return 'jersey simple';
  if (v.includes('interlock')) return 'interlock';
  if (v.includes('pique') || v.includes('piqué')) return 'piqué';
  if (v.includes('rib')) return v.includes('4') ? 'côte 4×2' : 'côte';
  if (v.includes('mesh')) return 'mesh technique';
  return cleanFrenchFacts(value);
}
function constructionPhrase(value) {
  if (value === 'piqué') return 'un tissu piqué';
  if (value === 'jersey simple' || value === 'jersey rayé') return `un ${value}`;
  if (value === 'interlock') return 'un interlock';
  if (value.startsWith('côte')) return `une maille côtelée${value.includes('4×2') ? ' 4×2' : ''}`;
  if (value === 'molleton French terry') return 'un molleton French terry';
  return `une maille ${value}`;
}
function translateFinishing(value) {
  let v = stripTags(value);
  const replacements = [
    [/waterless dyeing/gi, 'teinture sans eau'],
    [/^piece dyed$/gi, 'teinture en pièce'],
    [/^p\s*\/\s*d$/gi, 'teinture en pièce'],
    [/liquid ammonia/gi, 'finition à l’ammoniaque liquide'],
    [/mercerized/gi, 'mercerisation'],
    [/sand[- ]wash(?:ed)?/gi, 'lavage au sable'],
    [/reactive digital print/gi, 'impression numérique réactive'],
    [/pigment digital print/gi, 'impression numérique pigmentaire'],
    [/reactive print/gi, 'impression réactive'],
    [/pigment print/gi, 'impression pigmentaire'],
    [/discharge print/gi, 'impression rongeante']
  ];
  for (const [from, to] of replacements) v = v.replace(from, to);
  return cleanFrenchFacts(v).replace(/^./, c => c.toUpperCase());
}
function translateApplications(value) {
  const first = stripTags(value).split(/\s*Development is reviewed/i)[0].replace(/[.\s]+$/, '');
  const special = {
    'brands seeking soft touch with improved durability, consistent colour and practical wash performance': 'les marques recherchant un toucher doux, une meilleure durabilité, une couleur régulière et un entretien fiable',
    'summer comfort, using hollow-structure sorona® fibres to help block external heat and reduce heat build-up on the body': 'le confort estival, grâce aux fibres Sorona® à structure creuse qui limitent l’apport de chaleur extérieure et son accumulation sur le corps',
    'baby pajamas, zippies, swaddles, t-shirts, underwear, sleepwear and loungewear, the fabric balances close-to-skin comfort with wash durability and shape retention': 'les pyjamas pour bébé, combinaisons zippées, langes, T-shirts, sous-vêtements, vêtements de nuit et vêtements d’intérieur, avec un équilibre entre confort à même la peau, tenue au lavage et maintien de la forme'
  };
  if (special[first.toLowerCase()]) return special[first.toLowerCase()];
  let out = first;
  const terms = [
    ['premium business shirts', 'chemises business haut de gamme'], ['casual collared shirts', 'chemises décontractées à col'],
    ['premium collared shirts', 'chemises haut de gamme à col'], ['high-performance stretch garments', 'vêtements stretch haute performance'],
    ['close-to-skin comfort garments', 'vêtements confort portés à même la peau'], ['premium performance essentials', 'pièces techniques haut de gamme'],
    ['refined close-to-skin essentials', 'pièces raffinées portées à même la peau'], ['refined everyday essentials', 'pièces raffinées du quotidien'],
    ['elevated everyday comfort garments', 'vêtements confort haut de gamme du quotidien'], ['performance lifestyle garments', 'vêtements techniques lifestyle'],
    ['lightweight outdoor essentials', 'pièces légères de plein air'], ['premium everyday comfort garments', 'vêtements confort haut de gamme du quotidien'],
    ['cold-weather performance garments', 'vêtements techniques pour temps froid'], ['performance base layers', 'sous-couches techniques'],
    ['technical base layers', 'sous-couches techniques'], ['premium base layers', 'sous-couches haut de gamme'],
    ['base layers', 'sous-couches'], ['outdoor activewear', 'vêtements de sport de plein air'], ['active casualwear', 'tenues sport-décontractées'],
    ['summer wool T-shirts', 'T-shirts d’été en laine'], ['sun-protection tops', 'hauts de protection solaire'],
    ['high-end loungewear', 'vêtements d’intérieur haut de gamme'], ['lightweight loungewear', 'vêtements d’intérieur légers'],
    ['loungewear', 'vêtements d’intérieur'], ['sleepwear', 'vêtements de nuit'], ['babywear', 'vêtements pour bébé'],
    ['baby footies', 'grenouillères pour bébé'], ['baby pajamas', 'pyjamas pour bébé'], ['footie', 'grenouillères'],
    ['pajamas', 'pyjamas'], ['zippies', 'combinaisons zippées'], ['swaddles', 'langes'], ['underwear', 'sous-vêtements'],
    ['kidswear', 'vêtements enfant'], ['homewear', 'vêtements d’intérieur'], ['travel wear', 'vêtements de voyage'],
    ['travel tops', 'hauts de voyage'], ['travel shirts', 'chemises de voyage'], ['travel sets', 'ensembles de voyage'],
    ['outdoor wear', 'vêtements de plein air'], ['winter loungewear', 'vêtements d’intérieur d’hiver'],
    ['running apparel', 'vêtements de course'], ['running shirts', 'maillots de course'], ['running tops', 'hauts de course'],
    ['hiking apparel', 'vêtements de randonnée'], ['hiking shirts', 'chemises de randonnée'], ['hiking tops', 'hauts de randonnée'],
    ['hiking polos', 'polos de randonnée'], ['cycling wear', 'vêtements de cyclisme'], ['training wear', 'tenues d’entraînement'],
    ['training tops', 'hauts d’entraînement'], ['sports tops', 'hauts de sport'], ['sports bras', 'brassières de sport'],
    ['gym wear', 'tenues de sport'], ['yoga tops', 'hauts de yoga'], ['compression wear', 'vêtements de compression'],
    ['performance uniforms', 'uniformes techniques'], ['rash guards', 'hauts anti-UV'], ['golf wear', 'vêtements de golf'],
    ['resort tops', 'hauts de villégiature'], ['premium polo shirts', 'polos haut de gamme'], ['luxury polo shirts', 'polos de luxe'],
    ['premium polos', 'polos haut de gamme'], ['polo shirts', 'polos'], ['polos', 'polos'], ['luxury T-shirts', 'T-shirts de luxe'],
    ['premium heavyweight T-shirts', 'T-shirts lourds haut de gamme'], ['premium T-shirts', 'T-shirts haut de gamme'],
    ['high-quality T-shirts', 'T-shirts de qualité'], ['winter T-shirts', 'T-shirts d’hiver'], ['summer T-shirts', 'T-shirts d’été'],
    ['T-shirts', 'T-shirts'], ['sweat-style jerseys', 'jerseys type sweat'], ['sweatshirts', 'sweats'], ['hoodies', 'sweats à capuche'],
    ['joggers', 'joggings'], ['lounge sets', 'ensembles détente'], ['casual sets', 'ensembles décontractés'],
    ['premium tops', 'hauts haut de gamme'], ['luxury tops', 'hauts de luxe'], ['lightweight tops', 'hauts légers'],
    ['casual tops', 'hauts décontractés'], ['relaxed tops', 'hauts décontractés'], ['outdoor tops', 'hauts de plein air'],
    ['thermal tops', 'hauts thermiques'], ['everyday wear', 'vêtements du quotidien'], ['daily essentials', 'essentiels du quotidien'],
    ['lifestyle essentials', 'pièces lifestyle'], ['active lifestyle essentials', 'pièces actives du quotidien'],
    ['other performance stretch garments', 'autres vêtements stretch techniques'], ['other comfort-focused garments', 'autres vêtements axés sur le confort'],
    ['smart casual shirts', 'chemises smart casual'], ['summer smart casualwear', 'tenues smart casual d’été'],
    ['smart casual sportswear', 'tenues sport smart casual'], ['outdoor casualwear', 'tenues décontractées de plein air'],
    ['elevated sportswear', 'vêtements de sport haut de gamme'], ['uniforms', 'uniformes'], ['leggings', 'leggings']
  ];
  terms.sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of terms) out = out.replace(new RegExp(escapeRegExp(from), 'gi'), to);
  out = out.replace(/,\s*and\s+/gi, ' et ').replace(/\sand\s/gi, ' et ').replace(/,\s*/g, ', ');
  return out.replace(/^./, c => c.toLowerCase());
}
function titleFor(name) {
  const suffix = ' | Fabricant de tissu maille HLC';
  return name.length + suffix.length <= 66 ? name + suffix : `${name} | HLC`;
}
function metaDescription(name, weight, composition) {
  let value = `${name} ${weight}, en ${composition}. Fiche technique HLC : largeur utile, MOQ, essais, prix, échantillons et délais de production.`;
  if (value.length > 160) value = `${name} ${weight}. Composition, largeur utile, MOQ, essais, prix, échantillons et délais de production HLC.`;
  return value;
}
function defaultKeywords(name, construction) {
  const primary = name.toLowerCase();
  return `${primary}, fabricant de tissus maille, fournisseur textile, maille ${construction}`;
}

function benefitCopy(slug) {
  if (slug.includes('bamboo')) return 'La viscose issue du bambou est recherchée pour son toucher souple, sa respirabilité et son confort au contact de la peau.';
  if (slug.includes('liquid-ammonia')) return 'La finition à l’ammoniaque liquide vise un toucher plus doux, une surface plus régulière et une meilleure stabilité dimensionnelle.';
  if (slug.includes('mercerized')) return 'La mercerisation vise une surface plus lisse, un lustre net et une couleur régulière.';
  if (slug.includes('37-5')) return 'La technologie 37.5® est destinée aux programmes recherchant gestion de l’humidité et confort thermique.';
  if (slug.includes('drirelease')) return 'La technologie drirelease® est destinée aux vêtements nécessitant une gestion rapide de l’humidité.';
  if (slug.includes('pcm-temperature')) return 'La technologie PCM est conçue pour contribuer à la régulation du confort thermique.';
  if (slug.includes('high-uv')) return 'Cette qualité est développée pour les vêtements nécessitant une protection UV renforcée.';
  if (slug.includes('cool-jade')) return 'La fibre Cool Jade-Fresh est utilisée pour développer un toucher frais destiné aux vêtements d’été.';
  if (slug.includes('sorona-thermal')) return 'Les fibres Sorona® à structure creuse sont utilisées pour limiter l’accumulation de chaleur dans les vêtements d’été.';
  if (slug.includes('sorona-bi-component')) return 'La fibre bicomposante Sorona® apporte élasticité et reprise sans modifier la composition indiquée.';
  if (slug.includes('coolmax')) return 'Le mélange COOLMAX®-mérinos associe gestion de l’humidité et confort thermique.';
  if (slug.includes('merino') || slug.includes('wool')) return 'La laine mérinos est sélectionnée pour le confort thermique, la respirabilité et les vêtements portés à même la peau.';
  if (slug.includes('sand-wash') || slug.includes('sand-washed')) return 'Le lavage au sable est utilisé pour obtenir un toucher plus doux et un tombé plus souple.';
  return '';
}

function updateJsonLdProductReferences(html) {
  return html.replace(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, (whole, jsonText) => {
    let obj;
    try { obj = JSON.parse(jsonText); } catch { return whole; }
    function visit(value) {
      if (!value || typeof value !== 'object') return;
      const target = typeof value.url === 'string' ? value.url : typeof value.item === 'string' ? value.item : '';
      if (target) {
        for (const [slug, name] of Object.entries(productNames)) {
          if (target.includes(`/textile/products/${slug}/`) && typeof value.name === 'string') value.name = name;
        }
      }
      for (const child of Object.values(value)) visit(child);
    }
    visit(obj);
    return whole.replace(jsonText, `\n${JSON.stringify(obj, null, 2)}\n`);
  });
}
function updateProductJsonLd(html, data) {
  return html.replace(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, (whole, jsonText) => {
    let obj;
    try { obj = JSON.parse(jsonText); } catch { return whole; }
    if (obj['@type'] === 'Product') {
      obj.name = data.name;
      obj.description = data.description;
      obj.material = data.composition;
      obj.keywords = data.keywords;
      for (const prop of obj.additionalProperty || []) {
        if (/structure/i.test(prop.name)) prop.value = data.construction;
        if (/^(fin|finition)$/i.test(prop.name)) { prop.name = 'Finition'; prop.value = data.finishing; }
        if (/utilisations|applications/i.test(prop.name)) prop.value = `${data.applications}. Développement contrôlé selon la spécification ${data.weight} en ${data.construction}.`;
        if (/rapport de test/i.test(prop.name)) prop.value = 'Disponible sur cette page produit';
        if (/délai pour les échantillons/i.test(prop.name)) prop.value = data.sampleLead;
        if (/délai de production/i.test(prop.name)) prop.value = data.bulkLead;
        if (/MOQ/i.test(prop.name)) prop.value = data.moq;
      }
    }
    if (obj['@type'] === 'BreadcrumbList' && obj.itemListElement?.length) {
      obj.itemListElement[obj.itemListElement.length - 1].name = data.name;
    }
    return whole.replace(jsonText, `\n${JSON.stringify(obj, null, 2)}\n`);
  });
}
function updateImages(html, slug, name, style) {
  return html.replace(/<img\b[^>]*>/gi, tag => {
    const src = (tag.match(/\bsrc="([^"]+)"/i) || [])[1] || '';
    if (!src.includes(`/assets/products/${slug}/`)) return tag;
    const alt = /test-result|report/i.test(src) ? `Rapport d’essai du ${name}, style ${style}` : `${name} – vue du tissu`;
    return /\balt="[^"]*"/i.test(tag) ? tag.replace(/\balt="[^"]*"/i, `alt="${alt}"`) : tag.replace(/<img/i, `<img alt="${alt}"`);
  }).replace(new RegExp(`data-alt="[^"]*"(?=[^>]*\/assets\/products\/${escapeRegExp(slug)}\/)`, 'gi'), `data-alt="${name} – vue du tissu"`);
}
function updateProduct(slug) {
  const file = path.join(productRoot, slug, 'index.html');
  const englishFile = path.join(englishProductRoot, slug, 'index.html');
  if (!fs.existsSync(file) || !fs.existsSync(englishFile)) throw new Error(`Page produit manquante : ${slug}`);
  let html = read(file);
  const english = read(englishFile);
  const name = productNames[slug];
  const style = field(html, 'style-number');
  const composition = cleanFrenchFacts(field(english, 'composition'));
  const weight = field(html, 'weight');
  const width = field(html, 'width');
  const yarn = field(html, 'detail-yarn-count');
  const moq = cleanFrenchFacts(field(html, 'detail-moq')).replace(/per colour/gi, 'par couleur');
  const sampleLead = field(html, 'detail-sample-lead').replace(/days/gi, 'jours');
  const bulkLead = field(html, 'detail-bulk-lead').replace(/days/gi, 'jours');
  const construction = translateConstruction(field(english, 'construction'));
  const structurePhrase = constructionPhrase(construction);
  const finishing = translateFinishing(field(english, 'detail-finishing'));
  const applications = translateApplications(field(english, 'detail-applications'));
  const benefit = benefitCopy(slug);
  const description = metaDescription(name, weight, composition);
  const keywords = bambooKeywords[slug] || defaultKeywords(name, construction);

  html = setTitle(html, titleFor(name));
  html = setMeta(html, 'description', description);
  html = setMeta(html, 'og:title', titleFor(name));
  html = setMeta(html, 'og:description', description);
  html = setMeta(html, 'twitter:title', titleFor(name));
  html = setMeta(html, 'twitter:description', description);
  html = setField(html, 'product-name', name);
  html = setField(html, 'breadcrumb', name);
  html = setField(html, 'composition', composition);
  html = setField(html, 'construction', construction);
  html = setField(html, 'short-description', `Le style ${style} est ${structurePhrase} de ${weight}, composé de ${composition}, avec une largeur utile de ${width}. La finition indiquée est « ${finishing} ». ${benefit ? `${benefit} ` : ''}Ce tissu est développé pour ${applications}.`);
  html = setField(html, 'seo-main-title', `${name} : spécifications et approvisionnement`);
  html = setField(html, 'seo-paragraph-1', `Le style ${style} associe ${composition} à une structure ${construction} de ${weight}${yarn ? `, tricotée en fil ${yarn}` : ''}. Sa finition « ${finishing} » est définie selon le toucher, l’aspect et les performances recherchés.${benefit ? ` ${benefit}` : ''}`);
  html = setField(html, 'seo-paragraph-2', `Le MOQ / MCQ est de ${moq}. Le délai standard des échantillons est de ${sampleLead} et le délai de production en série de ${bulkLead}. Les spécifications sont confirmées avant échantillonnage et production.`);
  html = setField(html, 'technical-details', `Le style ${style} est ${structurePhrase} de ${weight}, composé de ${composition}${yarn ? ` et tricoté en fil ${yarn}` : ''}. Les données ci-dessous définissent le programme de développement et de production.`);
  html = setField(html, 'detail-moq', moq);
  html = setField(html, 'detail-sample-lead', sampleLead);
  html = setField(html, 'detail-bulk-lead', bulkLead);
  html = setField(html, 'detail-applications', `${applications}. Développement contrôlé selon la spécification ${weight} en ${construction}.`);
  html = setField(html, 'detail-finishing', finishing);
  html = html.replace(/<dt>Fin<\/dt>/g, '<dt>Finition</dt>');
  html = html.replace(/(<figure class="catalog-test-result-media">[\s\S]*?<figcaption>)[\s\S]*?(<\/figcaption>)/i, `$1Rapport d’essai du ${name}, style ${style}. Ouvrez l’image haute résolution pour consulter les méthodes et résultats indiqués dans le rapport.$2`);
  html = updateProductJsonLd(html, { name, description, composition, keywords, construction, finishing, applications, weight, sampleLead, bulkLead, moq });
  html = updateImages(html, slug, name, style);
  write(file, html);
}

function updateRelatedNames(html) {
  for (const [slug, name] of Object.entries(productNames)) {
    const href = `/fr/textile/products/${slug}/`;
    const block = new RegExp(`(<a\\b[^>]*href="${escapeRegExp(href)}"[^>]*>[\\s\\S]*?<span class="catalog-related-name">)[\\s\\S]*?(<\\/span>)`, 'g');
    html = html.replace(block, `$1${name}$2`);
    const heading = new RegExp(`(<h2><a href="${escapeRegExp(href)}">)[\\s\\S]*?(<\\/a><\\/h2>)`, 'g');
    html = html.replace(heading, `$1${name}$2`);
  }
  html = html.replace(/<article\b[^>]*data-product-card[^>]*>[\s\S]*?<\/article>/gi, block => {
    for (const [slug, name] of Object.entries(productNames)) {
      if (block.includes(`/fr/textile/products/${slug}/`)) {
        block = block.replace(/\bdata-name="[^"]*"/i, `data-name="${name}"`);
        block = block.replace(/(<h2><a\b[^>]*>)[\s\S]*?(<\/a><\/h2>)/i, `$1${name}$2`);
      }
    }
    return block;
  });
  return html;
}

function updateProductReferenceAlts(html) {
  return html.replace(/<img\b[^>]*>/gi, tag => {
    const src = (tag.match(/\bsrc="([^"]+)"/i) || [])[1] || '';
    for (const [slug, name] of Object.entries(productNames)) {
      if (!src.includes(`/assets/products/${slug}/`)) continue;
      const alt = /test-result|report/i.test(src) ? `Rapport d’essai du ${name}` : `${name} – vue du tissu`;
      return /\balt="[^"]*"/i.test(tag) ? tag.replace(/\balt="[^"]*"/i, `alt="${alt}"`) : tag.replace(/<img/i, `<img alt="${alt}"`);
    }
    return tag;
  });
}

function updateCategoryPages() {
  for (const [relative, seo] of Object.entries(categorySeo)) {
    const file = path.join(frRoot, relative);
    if (!fs.existsSync(file)) continue;
    let html = read(file);
    html = setTitle(html, seo.title);
    html = setMeta(html, 'description', seo.description);
    html = setMeta(html, 'og:title', seo.title);
    html = setMeta(html, 'og:description', seo.description);
    html = setMeta(html, 'twitter:title', seo.title);
    html = setMeta(html, 'twitter:description', seo.description);
    html = setH1(html, seo.h1);
    html = html.replace(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, (whole, jsonText) => {
      let obj;
      try { obj = JSON.parse(jsonText); } catch { return whole; }
      if (['WebPage', 'CollectionPage'].includes(obj['@type'])) {
        obj.name = stripTags(seo.h1);
        obj.description = seo.description;
      }
      return whole.replace(jsonText, `\n${JSON.stringify(obj, null, 2)}\n`);
    });
    if (relative === 'textile/bamboo-fabric/index.html') {
      html = html.replace('Mailles en bambou pour vêtements bébé et pyjamas', 'Tissus en bambou pour vêtements bébé, pyjamas et vêtements de nuit');
      html = html.replace('HLC fabrique et fournit des tissus en bambou pour les programmes de gros. La gamme comprend maille, jersey, côte, interlock et tissus imprimés en bambou pour vêtements bébé, pyjamas et vêtements de nuit.', 'HLC est fabricant et fournisseur de tissus en bambou pour les programmes de gros. La collection réunit jersey bambou, interlock, maille côtelée, piqué et tissus imprimés pour vêtements bébé, pyjamas et vêtements de nuit, avec développement sur mesure, MOQ et essais.');
    }
    html = updateRelatedNames(html);
    html = updateJsonLdProductReferences(html);
    html = updateProductReferenceAlts(html);
    write(file, html);
  }
}

function polishAllFrenchPages() {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html') files.push(full);
    }
  }
  walk(frRoot);
  for (const file of files) {
    let html = read(file);
    html = html
      .replace(/Ammoniac liquide/g, 'Ammoniaque liquide')
      .replace(/ammoniac liquide/g, 'ammoniaque liquide')
      .replace(/Verrouillage/g, 'Interlock')
      .replace(/Maillot simple/g, 'Jersey simple')
      .replace(/\bMaillot\b/g, 'Jersey')
      .replace(/Plongée/g, 'Maille scuba')
      .replace(/Maille œil d'oiseau/g, 'Maille œil-de-perdrix')
      .replace(/4 2 Côtes/g, 'Côte 4×2')
      .replace(/finies \? l’ammoniaque/g, 'finies à l’ammoniaque')
      .replace(/Conçu pour une production fiable\./g, 'Conçus pour une production fiable.')
      .replace(/Mercerisation &amp; Ammoniaque liquide/g, 'Mercerisation et ammoniaque liquide')
      .replace(/Mercerisé &amp; Tissus à base d'ammoniaque liquide/g, 'Tissus mercerisés et finis à l’ammoniaque liquide')
      .replace(/Mercerisé & Tissus à base d'ammoniaque liquide/g, 'Tissus mercerisés et finis à l’ammoniaque liquide')
      .replace(/HLC MERCERIZED &amp; LIQUID AMMONIA COLLECTION/g, 'COLLECTION HLC MERCERISÉE ET FINIE À L’AMMONIAQUE LIQUIDE')
      .replace(/HLC COLLECTION DE TRICOTS D'AMMONIAQUE LIQUIDE/g, 'COLLECTION HLC DE MAILLES FINIES À L’AMMONIAQUE LIQUIDE')
      .replace(/HLC COLLECTION TRICOT DE BAMBOU/g, 'COLLECTION HLC DE MAILLES EN BAMBOU')
      .replace(/Liquid ammonia finishing helps premium cotton knits achieve a smoother surface, softer hand, cleaner drape and more dependable dimensional stability after washing\./g, 'La finition à l’ammoniaque liquide aide les mailles de coton haut de gamme à obtenir une surface plus lisse, un toucher plus doux, un tombé plus net et une meilleure stabilité dimensionnelle après lavage.')
      .replace(/HLC operates one Lafer liquid ammonia finishing line and two Korean Pukwang mercerization finishing lines, providing specialist finishing for cotton and blended knit fabrics\./g, 'HLC exploite une ligne Lafer de finition à l’ammoniaque liquide et deux lignes coréennes Pukwang de mercerisation, afin d’assurer en interne la finition spécialisée des mailles en coton et en fibres mélangées.')
      .replace(/HLC operates a Lafer liquid ammonia line and two Pukwang mercerization lines, supporting development, finishing and in-house quality control for international apparel brands\./g, 'HLC exploite une ligne Lafer de finition à l’ammoniaque liquide et deux lignes Pukwang de mercerisation, avec développement, finition et contrôle qualité en interne pour les marques internationales de vêtements.')
      .replace(/Low shrinkage\./g, 'Retrait maîtrisé.')
      .replace(/Liquid ammonia finishing gives SUPIMA cotton, Giza cotton and long-staple cotton knits a soft, refined hand, natural drape, breathability, wrinkle resistance and reliable wash stability\. It is suited to premium T-shirts, polo shirts, next-to-skin babywear, sleepwear and loungewear\./g, 'La finition à l’ammoniaque liquide apporte aux mailles en coton SUPIMA®, coton Giza et coton à longues fibres un toucher doux et raffiné, un tombé naturel, de la respirabilité, une meilleure résistance au froissement et une stabilité fiable au lavage. Elle convient aux T-shirts et polos haut de gamme, aux vêtements pour bébé portés à même la peau, aux vêtements de nuit et aux vêtements d’intérieur.')
      .replace(/A refined finish\./g, 'Une finition raffinée.')
      .replace(/<h2>\.<br>Une finition raffinée\.<\/h2>/g, '<h2>Éclat durable.<br>Une finition raffinée.</h2>')
      .replace(/Mercerized finishing brings refined lustre, rich colour and a smooth hand to SUPIMA cotton, Giza cotton, long-staple cotton, cotton-linen and ramie fabrics\. HLC develops custom fabrics for luxury T-shirts, polo shirts, babywear, sleepwear and loungewear by yarn count, weight, colour and hand feel\./g, 'La mercerisation apporte un lustre raffiné, une couleur profonde et un toucher lisse aux tissus en coton SUPIMA®, coton Giza, coton à longues fibres, coton-lin et ramie. HLC développe des tissus sur mesure pour T-shirts et polos de luxe, vêtements pour bébé, vêtements de nuit et vêtements d’intérieur, selon le titrage du fil, le grammage, la couleur et le toucher.')
      .replace(/Bamboo viscose and functional knit fabrics for babywear, sleepwear, loungewear and underwear—supported by technical testing, scalable production and responsible finishing\./g, 'Tissus maille en viscose de bambou et tissus fonctionnels pour vêtements bébé, vêtements de nuit, vêtements d’intérieur et sous-vêtements, avec essais techniques, production à grande échelle et finitions responsables.')
      .replace(/Lafer and Pukwang finishing lines help improve lustre, softness, dimensional stability and wash performance for premium knitted fabrics\./g, 'Les lignes de finition Lafer et Pukwang améliorent le lustre, la douceur, la stabilité dimensionnelle et la tenue au lavage des mailles haut de gamme.')
      .replace(/Improving water and energy efficiency while protecting the hand feel and colour performance of knitted fabrics\./g, 'Améliorer l’efficacité de l’eau et de l’énergie tout en préservant le toucher et la tenue des couleurs des tissus maille.')
      .replace(/Combining the silky hand of bamboo viscose with wool warmth for seasonal next-to-skin knits\./g, 'Associer le toucher soyeux de la viscose de bambou à la chaleur de la laine pour des mailles saisonnières portées à même la peau.')
      .replace(/Fluid drape, refined surfaces and multi-fibre blends for womenswear and embroidered fabric programmes\./g, 'Tombé fluide, surfaces raffinées et mélanges de fibres pour les collections de mode féminine et les programmes de tissus brodés.')
      .replace(/HLC advances more responsible textile manufacturing through lower-impact dyeing, employee wellbeing, inclusive employment and environmental restoration\./g, 'HLC fait progresser une fabrication textile plus responsable grâce à des procédés de teinture à moindre impact, au bien-être des salariés, à l’emploi inclusif et à la restauration de l’environnement.')
      .replace(/Each Arbor Day, employees take part in a mountain clean-up and plant approximately 500 trees as a long-term commitment to natural resource stewardship\./g, 'Chaque année lors de la Journée de l’arbre, les salariés participent au nettoyage d’une zone montagneuse et plantent environ 500 arbres, dans le cadre d’un engagement durable en faveur des ressources naturelles.')
      .replace(/HLC integrates sustainability across its operations and produces high-quality fabrics from natural, synthetic, regenerated and recycled fibres\. Our core expertise includes bamboo viscose, wool, mercerized and liquid-ammonia-finished cotton, and stretch-fibre blends\./g, 'HLC intègre le développement durable à l’ensemble de ses activités et produit des tissus de qualité en fibres naturelles, synthétiques, régénérées et recyclées. Notre savoir-faire couvre notamment la viscose de bambou, la laine, le coton mercerisé ou fini à l’ammoniaque liquide et les mélanges stretch.')
      .replace(/We manufacture fabrics for babywear, sleepwear, loungewear and fashion applications with controlled bulk quality, in-house testing and direct production coordination\./g, 'Nous fabriquons des tissus pour vêtements bébé, vêtements de nuit, vêtements d’intérieur et collections de mode, avec contrôle de la qualité en série, essais internes et coordination directe de la production.')
      .replace(/X-Rite light boxes, spectrophotometers, Martindale testers, crocking testers, US-standard washers and dryers, and xenon lightfastness equipment\./g, 'Cabines à lumière X-Rite, spectrophotomètres, testeurs Martindale et de dégorgement, machines à laver et sèche-linge conformes aux normes américaines, ainsi qu’équipements au xénon pour la solidité à la lumière.')
      .replace(/Equipment used for colour assessment, colourfastness, abrasion, pilling and dimensional-stability testing\./g, 'Équipements utilisés pour l’évaluation des couleurs et les essais de solidité des couleurs, d’abrasion, de boulochage et de stabilité dimensionnelle.')
      .replace(/Support sample analysis, specification development and customer projects across bamboo viscose, performance yarns, knit structures and finishing hand-feel\./g, 'Participer à l’analyse des échantillons, au développement des spécifications et aux projets clients portant sur la viscose de bambou, les fils techniques, les structures maille et le toucher des finitions.')
      .replace(/Connect buyer requirements with production and shipment schedules, ensuring that specifications, lead times, testing and certification details are communicated accurately\./g, 'Relier les exigences des acheteurs aux calendriers de production et d’expédition, en communiquant avec précision les spécifications, délais, essais et informations de certification.')
      .replace(/Improving knit-fabric environmental performance through lower dyeing temperatures and better water and energy efficiency\./g, 'Améliorer la performance environnementale des tissus maille grâce à des températures de teinture plus basses et à une meilleure efficacité de l’eau et de l’énergie.')
      .replace(/Combining bamboo viscose smoothness with wool warmth for autumn and winter next-to-skin knits\./g, 'Associer la douceur de la viscose de bambou à la chaleur de la laine pour des mailles automne-hiver portées à même la peau.')
      .replace(/Expanding sand-washed and embroidered fabric options through softer hand feel, refined drape, surface detail and multi-fibre blends\./g, 'Élargir les options de tissus lavés au sable et brodés grâce à un toucher plus doux, un tombé raffiné, des effets de surface et des mélanges de fibres.')
      .replace(/With controlled production, a softer hand, refined lustre and reliable dimensional stability, HLC supports programmes for multiple internationally recognised brands and their supply chains\./g, 'Grâce à une production maîtrisée, un toucher plus doux, un lustre raffiné et une stabilité dimensionnelle fiable, HLC accompagne les programmes de plusieurs marques internationales et de leurs chaînes d’approvisionnement.')
      .replace(/Over the past seven years, we have produced more than 13,000 tonnes of bamboo fabric\. That experience helps our team manage knitting, dyeing and finishing consistently across babywear, sleepwear, underwear and loungewear programmes\./g, 'Au cours des sept dernières années, nous avons produit plus de 13 000 tonnes de tissus en bambou. Cette expérience aide notre équipe à maîtriser le tricotage, la teinture et la finition pour les programmes de vêtements bébé, vêtements de nuit, sous-vêtements et vêtements d’intérieur.')
      .replace(/Its fine, smooth surface creates a buttery-soft hand suited to baby pajamas, zippies, bodysuits, underwear, sleepwear and sensory-conscious apparel\./g, 'Sa surface fine et lisse offre un toucher particulièrement doux, adapté aux pyjamas pour bébé, combinaisons zippées, bodies, sous-vêtements, vêtements de nuit et vêtements pensés pour les peaux sensibles.')
      .replace(/Jersey viscose et spandex de bambou supports flexible fitted garments\. Jersey spandex en coton bambou ajoute le corps et la résilience familiers de Better Cotton\./g, 'Le jersey en viscose de bambou et élasthanne convient aux vêtements ajustés et extensibles. Le jersey bambou-coton-élasthanne apporte davantage de tenue et la résistance familière du coton Better Cotton.')
      .replace(/Available specifications and test results support evaluation of composition, dimensional stability, colour fastness, pilling, MOQ and lead time\. OEKO-TEX information is supplied where applicable\./g, 'Les spécifications et résultats d’essai disponibles facilitent l’évaluation de la composition, de la stabilité dimensionnelle, de la solidité des couleurs, du boulochage, du MOQ et des délais. Les informations OEKO-TEX sont fournies lorsque cela s’applique.')
      .replace(/HLC develops functional knit fabrics around measurable requirements such as stretch and recovery, moisture management, breathability, thermal comfort, abrasion resistance and dimensional stability\./g, 'HLC développe des tissus maille fonctionnels selon des exigences mesurables : élasticité et reprise, gestion de l’humidité, respirabilité, confort thermique, résistance à l’abrasion et stabilité dimensionnelle.')
      .replace(/Each published product can include composition, GSM, width, construction, MOQ, lead time, price and test results to support sourcing decisions\./g, 'Chaque produit publié peut présenter la composition, le grammage, la largeur, la structure, le MOQ, les délais, le prix et les résultats d’essai afin de faciliter les décisions d’approvisionnement.')
      .replace(/No published fabrics match this category yet\./g, 'Aucun tissu publié ne correspond encore à cette catégorie.')
      .replace(/Refined cotton knits with smoother surfaces and improved dimensional stability\./g, 'Mailles de coton raffinées, aux surfaces plus lisses et à la stabilité dimensionnelle améliorée.')
      .replace(/HLC develops sand-washed jersey, scuba, pique and French terry using modal, EcoCosy® viscose, polyester and spandex to balance softness, structure and stretch recovery\./g, 'HLC développe des jerseys, mailles scuba, piqués et molletons lavés au sable en modal, viscose EcoCosy®, polyester et élasthanne, afin d’équilibrer douceur, tenue et reprise élastique.')
      .replace(/HLC and leading wool yarn supplier Xinao are both based in Tongxiang, Jiaxing\. More than ten years of cooperation have given our team extensive experience in Merino wool yarn selection and wool knit fabric development\./g, 'HLC et le fournisseur majeur de fils de laine Xinao sont tous deux établis à Tongxiang, Jiaxing. Plus de dix ans de coopération ont apporté à notre équipe une solide expérience de la sélection des fils mérinos et du développement de tissus maille en laine.')
      .replace(/HLC is one of the few high-quality dyeing mills in China with the capability to dye knitted wool fabrics, supporting consistent colour, controlled finishing and dependable bulk production\./g, 'HLC compte parmi les rares teintureries chinoises de qualité capables de teindre des tissus maille en laine, avec régularité des couleurs, finition maîtrisée et production en série fiable.')
      .replace(/Soft-touch modal, EcoCosy® viscose and polyester blend knits with a relaxed drape\./g, 'Mailles en modal, viscose EcoCosy® et polyester, au toucher doux et au tombé souple.')
      .replace(/Womenswear fabrics, menswear fabrics, menswear, womenswear, casual apparel, sleepwear fabrics, bedding accessories, infantwear and childrenswear\./g, 'Tissus pour mode féminine et masculine, vêtements décontractés, vêtements de nuit, accessoires de literie, vêtements pour bébé et vêtements enfant.')
      .replace(/(<a href="\/fr\/textile\/products\/bamboo-spandex-single-jersey\/">)Jersey viscose et spandex de bambou(<\/a>) supports flexible fitted garments\. (<a href="\/fr\/textile\/products\/bamboo-cotton-spandex-single-jersey\/">)Jersey spandex en coton bambou(<\/a>) ajoute le corps et la résilience familiers de Better Cotton\./g, '$1Jersey bambou-élasthanne$2 convient aux vêtements ajustés et extensibles. $3Jersey bambou-coton-élasthanne$4 apporte davantage de tenue et la résistance familière du coton Better Cotton.')
      .replace(/I agree that HLC may use the information provided to respond to this inquiry\./g, 'J’accepte que HLC utilise les informations fournies afin de répondre à cette demande.')
      .replace(/© Copyright HLC GROUP CO\., LTD\. All rights reserved\./g, '© HLC GROUP CO., LTD. Tous droits réservés.')
      .replace(/aria-label="中文"/g, 'aria-label="Changer de langue"')
      .replace(/EXEMPLE DEMANDE/g, 'DEMANDE D’ÉCHANTILLON')
      .replace(/Générer un exemple d'e-mail/g, 'Envoyer la demande d’échantillon')
      .replace(/Your email address is used only to prepare this sample request\./g, 'Votre adresse e-mail est utilisée uniquement pour traiter cette demande d’échantillon.')
      .replace(/nom@company\.com/g, 'nom@entreprise.com');
    html = html.replace(/(<p class="bamboo-product-spec">)([\s\S]*?)(<\/p>)/gi, (_, start, value, end) => `${start}${cleanFrenchFacts(value)}${end}`);
    html = updateRelatedNames(html);
    html = updateJsonLdProductReferences(html);
    html = updateProductReferenceAlts(html);
    write(file, html);
  }
}

function updateFrenchSitemapDates() {
  const file = path.join(root, 'sitemap.xml');
  let sitemap = read(file);
  sitemap = sitemap.replace(/(<url><loc>https:\/\/hlctex\.com\/fr\/[^<]*<\/loc><lastmod>)[^<]+(<\/lastmod>)/g, (_, before, after) => `${before}2026-08-22${after}`);
  write(file, sitemap);
}

for (const slug of Object.keys(productNames)) updateProduct(slug);
updateCategoryPages();
polishAllFrenchPages();
updateFrenchSitemapDates();

console.log(`Pages produit françaises mises à jour : ${Object.keys(productNames).length}`);
console.log(`Pages éditoriales françaises mises à jour : ${Object.keys(categorySeo).length}`);
