const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const products = {
  en: {
    source: "textile/bamboo-fabric/index.html",
    collectionUrl: "https://hlctex.com/textile/bamboo-fabric/",
    collectionName: "Bamboo Viscose Knit Fabric Collection",
    collectionDescription:
      "Compare HLC bamboo viscose stretch jersey and bamboo viscose Better Cotton blend fabrics for babywear, sleepwear, loungewear and underwear.",
    siblingLabel: "Bamboo fabric collection",
    ariaLabel: "Bamboo fabric product pages",
    items: {
      BVF: {
        slug: "bvf",
        title: "95% Bamboo Viscose 5% Spandex Jersey Fabric | BVF | HLC",
        description:
          "BVF 95% bamboo viscose 5% spandex single jersey for baby pajamas, zippies, swaddles and loungewear. View 200 GSM specifications, test report, MOQ and pricing.",
        name: "BVF 95% Bamboo Viscose 5% Spandex Single Jersey Fabric",
        sku: "BVF-001",
        image: "https://hlctex.com/assets/bamboo-knit-hero.jpg",
        material: "95% bamboo viscose, 5% spandex",
        category: "Bamboo viscose knit fabric for baby pajamas, sleepwear and underwear",
        lowPrice: "1.47",
        highPrice: "2.95",
        applications:
          "Baby pajamas, zippies, convertible footies, two-piece PJ sets, swaddles, infant gowns, bodysuits, underwear, base layers and loungewear",
        searchTerms:
          "95 bamboo viscose 5 spandex fabric, bamboo jersey fabric supplier, bamboo pajama fabric, baby sleepwear fabric, zippy and footie fabric, bamboo underwear fabric",
        performance:
          "Buttery-soft hand feel, breathable comfort, moisture-wicking performance, temperature regulation and four-way stretch",
      },
      BVCF: {
        slug: "bvcf",
        title: "Bamboo Viscose Better Cotton Spandex Jersey | BVCF | HLC",
        description:
          "BVCF bamboo viscose, Better Cotton and spandex single jersey for babywear, pajamas and T-shirts. View 200 GSM specifications, test report, MOQ and pricing.",
        name: "BVCF Bamboo Viscose Better Cotton Spandex Single Jersey Fabric",
        sku: "BVCF-001",
        image: "https://hlctex.com/assets/bvcf-knit-hero.png",
        material: "68% bamboo viscose, 27% Better Cotton, 5% spandex",
        category: "Bamboo viscose and Better Cotton knit fabric for babywear and sleepwear",
        lowPrice: "1.63",
        highPrice: "3.11",
        applications:
          "Baby pajamas, zippies, two-piece PJ sets, bodysuits, loungewear, underwear and T-shirts",
        searchTerms:
          "bamboo viscose cotton spandex fabric, bamboo cotton jersey supplier, BCI cotton bamboo fabric, bamboo babywear fabric, bamboo pajama fabric",
        performance:
          "Soft next-to-skin hand feel, breathability, moisture management, cotton-rich dimensional stability and comfortable stretch recovery",
      },
    },
  },
  zh: {
    source: "zh/textile/bamboo-fabric/index.html",
    collectionUrl: "https://hlctex.com/zh/textile/bamboo-fabric/",
    collectionName: "竹纤维针织面料系列",
    collectionDescription:
      "比较 HLC 竹纤维粘胶弹力汗布与竹纤维粘胶 Better Cotton 混纺面料，适用于婴童服、睡衣、家居服和内衣。",
    siblingLabel: "竹纤维面料系列",
    ariaLabel: "竹纤维产品独立页面",
    items: {
      BVF: {
        slug: "bvf",
        title: "95%竹纤维粘胶5%氨纶汗布｜BVF婴童睡衣面料｜HLC",
        description:
          "BVF 95%竹纤维粘胶5%氨纶弹力汗布，适用于婴童睡衣、连体衣、襁褓和家居服。查看200 GSM规格、测试报告、MOQ、交期与报价。",
        name: "BVF 95%竹纤维粘胶5%氨纶弹力汗布",
        sku: "BVF-001",
        image: "https://hlctex.com/assets/bamboo-knit-hero.jpg",
        material: "95%竹纤维粘胶，5%氨纶",
        category: "婴童睡衣、家居服和内衣用竹纤维粘胶针织面料",
        lowPrice: "1.47",
        highPrice: "2.95",
        applications:
          "婴童睡衣、连体衣、可转换包脚衣、两件套睡衣、襁褓、婴儿睡袍、包屁衣、内衣和家居服",
        searchTerms:
          "95 bamboo viscose 5 spandex fabric, bamboo jersey fabric supplier, bamboo pajama fabric, baby sleepwear fabric, zippy and footie fabric",
        performance:
          "黄油般柔软手感、透气舒适、吸湿排汗、温度调节和四向拉伸",
      },
      BVCF: {
        slug: "bvcf",
        title: "竹纤维粘胶BCI棉氨纶汗布｜BVCF婴童面料｜HLC",
        description:
          "BVCF竹纤维粘胶、Better Cotton与氨纶弹力汗布，适用于婴童服、睡衣、连体衣和T恤。查看200 GSM规格、测试报告、MOQ、交期与报价。",
        name: "BVCF竹纤维粘胶Better Cotton氨纶弹力汗布",
        sku: "BVCF-001",
        image: "https://hlctex.com/assets/bvcf-knit-hero.png",
        material: "68%竹纤维粘胶，27% Better Cotton，5%氨纶",
        category: "婴童服和睡衣用竹纤维粘胶与Better Cotton混纺针织面料",
        lowPrice: "1.63",
        highPrice: "3.11",
        applications:
          "婴童睡衣、连体衣、两件套睡衣、包屁衣、家居服、内衣和T恤",
        searchTerms:
          "bamboo viscose cotton spandex fabric, bamboo cotton jersey supplier, BCI cotton bamboo fabric, bamboo babywear fabric",
        performance:
          "柔软亲肤、透气吸湿、棉感尺寸稳定性和舒适弹力回复",
      },
    },
  },
};

function jsonLd(language, product, url) {
  const isZh = language === "zh";
  return `<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: product.name,
        sku: product.sku,
        url,
        image: product.image,
        description: product.description,
        brand: { "@type": "Brand", name: "HLC" },
        manufacturer: { "@type": "Organization", name: "HLC GROUP CO., LTD." },
        material: product.material,
        category: product.category,
        offers: {
          "@type": "AggregateOffer",
          url,
          priceCurrency: "USD",
          lowPrice: product.lowPrice,
          highPrice: product.highPrice,
          offerCount: "6",
          priceValidUntil: "2026-08-30",
          availability: "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          eligibleQuantity: {
            "@type": "QuantitativeValue",
            value: "1000",
            unitText: "YDS",
          },
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: isZh ? "克重" : "Weight", value: "200 g/m²" },
          { "@type": "PropertyValue", name: isZh ? "幅宽" : "Width", value: "150 cm" },
          { "@type": "PropertyValue", name: isZh ? "纱支" : "Yarn count", value: "32S + 30D" },
          { "@type": "PropertyValue", name: isZh ? "组织" : "Construction", value: "Single jersey" },
          { "@type": "PropertyValue", name: "MOQ / MCQ", value: "1000 YDS" },
          { "@type": "PropertyValue", name: isZh ? "交期" : "Lead time", value: "30–45 days" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isZh ? "首页" : "Home", item: isZh ? "https://hlctex.com/zh/" : "https://hlctex.com/" },
          { "@type": "ListItem", position: 2, name: isZh ? "竹纤维面料" : "Bamboo Viscose Fabrics", item: products[language].collectionUrl },
          { "@type": "ListItem", position: 3, name: product.sku, item: url },
        ],
      },
    ],
  },
  null,
  2
)}
</script>`;
}

function collectionJsonLd(language, config) {
  const isZh = language === "zh";
  const list = Object.values(config.items).map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: product.name,
    url: `${config.collectionUrl}${product.slug}/`,
  }));
  return `<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: config.collectionName,
        url: config.collectionUrl,
        description: config.collectionDescription,
        mainEntity: { "@type": "ItemList", itemListElement: list },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: isZh ? "首页" : "Home", item: isZh ? "https://hlctex.com/zh/" : "https://hlctex.com/" },
          { "@type": "ListItem", position: 2, name: config.collectionName, item: config.collectionUrl },
        ],
      },
    ],
  },
  null,
  2
)}
</script>`;
}

function replaceCollectionHead(source, language, config) {
  const title = language === "zh"
    ? "竹纤维针织面料系列｜BVF与BVCF婴童睡衣面料｜HLC"
    : "Bamboo Viscose Knit Fabrics for Babywear & Sleepwear | HLC";
  return source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${config.collectionDescription}">`)
    .replace('<meta property="og:type" content="product">', '<meta property="og:type" content="website">')
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${config.collectionDescription}">`);
}

function replaceHead(source, language, config, product) {
  const url = `${config.collectionUrl}${product.slug}/`;
  const alternate = language === "zh"
    ? `https://hlctex.com/textile/bamboo-fabric/${product.slug}/`
    : `https://hlctex.com/zh/textile/bamboo-fabric/${product.slug}/`;
  const enUrl = language === "zh" ? alternate : url;
  const zhUrl = language === "zh" ? url : alternate;

  let output = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${product.title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${product.description}">`)
    .replace(
      /<link rel="canonical"[\s\S]*?<meta property="og:type"/,
      `<link rel="canonical" href="${url}"><link rel="alternate" hreflang="en" href="${enUrl}"><link rel="alternate" hreflang="zh-CN" href="${zhUrl}"><link rel="alternate" hreflang="x-default" href="${enUrl}">\n  <meta property="og:type"`
    )
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${product.title}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${product.description}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
    .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${product.image}">`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, jsonLd(language, product, url));
  return output;
}

function buildLanguage(language, config) {
  const sourcePath = path.join(root, config.source);
  let source = fs.readFileSync(sourcePath, "utf8");
  const sectionStart = source.indexOf('<section class="product-page-slider"');
  const suffixStart = source.indexOf('<section class="section lazy-secret-section">');
  const bvfStart = source.indexOf('<article class="product-page-slide is-active" data-product-page="BVF"');
  const bvcfStart = source.indexOf('<article class="product-page-slide" data-product-page="BVCF"');
  const bvcfEnd = source.indexOf('      </div>\n\n      <button class="product-slider-arrow', bvcfStart);
  if ([sectionStart, suffixStart, bvfStart, bvcfStart, bvcfEnd].some((value) => value < 0)) {
    throw new Error(`Unable to locate product page sections in ${config.source}`);
  }

  const prefix = source
    .slice(0, sectionStart)
    .replace(/[ \t]*<h1 class="seo-page-title">[\s\S]*?<\/h1>\r?\n?/, "")
    .replace(/<main>\s*$/, "<main>\n");
  const suffix = source.slice(suffixStart);
  const blocks = {
    BVF: source.slice(bvfStart, bvcfStart).trim(),
    BVCF: source.slice(bvcfStart, bvcfEnd).trim(),
  };
  for (const code of Object.keys(blocks)) {
    blocks[code] = blocks[code].replace(
      new RegExp(`<h[12](?:\\s[^>]*)?>(?:<a[^>]*>)?${code}(?:<\\/a>)?<\\/h[12]>`),
      `<h1>${code}</h1>`
    );
  }
  blocks.BVCF = blocks.BVCF
    .replace('class="product-page-slide"', 'class="product-page-slide is-active"')
    .replace('aria-hidden="true"', 'aria-hidden="false"');

  for (const [code, product] of Object.entries(config.items)) {
    const otherCode = code === "BVF" ? "BVCF" : "BVF";
    const other = config.items[otherCode];
    const singleSection = `    <section class="product-page-slider product-page-single" data-product-slider aria-label="${product.name}">
      <div class="product-page-track" data-product-track>
${blocks[code]}
      </div>
    </section>
    <nav class="product-sibling-nav" aria-label="${config.ariaLabel}">
      <a href="${language === "zh" ? "/zh" : ""}/textile/bamboo-fabric/">← ${config.siblingLabel}</a>
      <a href="${language === "zh" ? "/zh" : ""}/textile/bamboo-fabric/${other.slug}/">${otherCode} →</a>
    </nav>

`;
    let page = replaceHead(prefix + singleSection + suffix, language, config, product);
    page = page
      .replace(
        /<tr><th>Buyer Search Terms<\/th><td>[\s\S]*?<\/td><\/tr>/,
        `<tr><th>Buyer Search Terms</th><td>${product.searchTerms}</td></tr>`
      )
      .replace(
        /<tr><th>Product Applications<\/th><td>[\s\S]*?<\/td><\/tr>/,
        `<tr><th>Product Applications</th><td>${product.applications}</td></tr>`
      )
      .replace(
        /<tr><th>Performance<\/th><td>[\s\S]*?<\/td><\/tr>/,
        `<tr><th>Performance</th><td>${product.performance}</td></tr>`
      );
    if (code === "BVCF") {
      page = page
        .replace("<span data-report-product>BVF</span>", "<span data-report-product>BVCF</span>")
        .replace("subject=BVF%20Test%20Report", "subject=BVCF%20Test%20Report");
    }

    const outputDir = path.join(path.dirname(sourcePath), product.slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), page);
  }

  const languagePrefix = language === "zh" ? "/zh" : "";
  source = replaceCollectionHead(source, language, config)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, collectionJsonLd(language, config))
    .replace(/[ \t]*<h1 class="seo-page-title">[\s\S]*?<\/h1>\r?\n?/, "")
    .replace(
      /<h[12](?:\s[^>]*)?>(?:<a[^>]*>)?BVF(?:<\/a>)?<\/h[12]>/,
      `<h2><a href="${languagePrefix}/textile/bamboo-fabric/bvf/">BVF</a></h2>`
    )
    .replace(
      /<h[12](?:\s[^>]*)?>(?:<a[^>]*>)?BVCF(?:<\/a>)?<\/h[12]>/,
      `<h2><a href="${languagePrefix}/textile/bamboo-fabric/bvcf/">BVCF</a></h2>`
    )
    .replace("<main>", `<main>\n    <h1 class="seo-page-title">${config.collectionName}</h1>`)
    .replace(
      /(<h1 class="seo-page-title">[\s\S]*?<\/h1>)[\s\r\n]*(<section class="product-page-slider")/,
      "$1\n    $2"
    );
  fs.writeFileSync(sourcePath, source);
}

buildLanguage("en", products.en);
buildLanguage("zh", products.zh);
