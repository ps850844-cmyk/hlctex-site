import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputPath = process.argv[2];
const previewDir = process.argv[3];

if (!outputPath || !previewDir) {
  throw new Error("Usage: node build-product-workbook.mjs <output.xlsx> <preview-dir>");
}

const workbook = Workbook.create();
console.error("builder: workbook created");
const guide = workbook.worksheets.add("使用说明");
const basics = workbook.worksheets.add("产品基础信息");
const details = workbook.worksheets.add("产品细节");
const content = workbook.worksheets.add("产品内容与SEO");
const images = workbook.worksheets.add("产品图片");
const related = workbook.worksheets.add("相关产品");
console.error("builder: worksheets created");

const colors = {
  navy: "#12263A",
  blue: "#1E5A7A",
  beige: "#EFE9DC",
  pale: "#F7F4ED",
  input: "#FFFBEA",
  green: "#E7F3EA",
  red: "#FCE8E6",
  white: "#FFFFFF",
  gray: "#5D6873",
  line: "#D8DEE5",
};

const titleFormat = {
  fill: colors.navy,
  font: { color: colors.white, bold: true, size: 18 },
  verticalAlignment: "center",
  horizontalAlignment: "left",
};

const sectionFormat = {
  fill: colors.beige,
  font: { color: colors.navy, bold: true, size: 12 },
  verticalAlignment: "center",
};

const headerFormat = {
  fill: colors.blue,
  font: { color: colors.white, bold: true, size: 10 },
  verticalAlignment: "center",
  horizontalAlignment: "center",
  wrapText: true,
  borders: {
    bottom: { style: "medium", color: colors.navy },
  },
};

const inputFormat = {
  fill: colors.input,
  font: { color: colors.navy, size: 10 },
  verticalAlignment: "top",
  wrapText: true,
  borders: {
    bottom: { style: "thin", color: colors.line },
  },
};

function setupTitle(sheet, range, title, subtitle) {
  sheet.showGridLines = false;
  sheet.getRange(range).merge();
  const titleCell = range.split(":")[0];
  sheet.getRange(titleCell).values = [[title]];
  sheet.getRange(range).format = titleFormat;
  const startColumn = titleCell.match(/[A-Z]+/)[0];
  const subtitleRange = `${startColumn}2:${range.split(":")[1].match(/[A-Z]+/)[0]}2`;
  sheet.getRange(subtitleRange).merge();
  sheet.getRange(`${startColumn}2`).values = [[subtitle]];
  sheet.getRange(subtitleRange).format = {
    fill: colors.pale,
    font: { color: colors.gray, italic: true, size: 10 },
    verticalAlignment: "center",
    wrapText: true,
  };
}

setupTitle(
  guide,
  "A1:H1",
  "HLC 产品资料自动导入表",
  "填写黄色单元格并插入产品图片；运行“更新产品.ps1”后，系统会生成或更新产品详情页。"
);
console.error("builder: guide title");
guide.getRange("A4:H4").merge();
guide.getRange("A4").values = [["使用步骤"]];
guide.getRange("A4:H4").format = sectionFormat;
guide.getRange("A5:H11").values = [
  ["1", "在“产品基础信息”填写一行产品资料；每个产品必须有唯一的“产品URL标识”。", null, null, null, null, null, null],
  ["2", "在“产品细节”使用同一个URL标识填写纱支、MOQ/MCQ、重量换算、交期、Applications与后整理。", null, null, null, null, null, null],
  ["3", "在“产品内容与SEO”使用同一个URL标识填写描述、测试结果、其他信息与SEO内容。测试结果图片可填写本地文件绝对路径。", null, null, null, null, null, null],
  ["4", "在“产品图片”同一行的图片格中直接插入图片，或填写图片文件路径。", null, null, null, null, null, null],
  ["5", "确认“发布”选择 YES，且“资料检查”显示“可生成”。", null, null, null, null, null, null],
  ["6", "关闭Excel，右键运行 product-import/更新产品.ps1；系统会生成产品页并更新 sitemap.xml。", null, null, null, null, null, null],
  ["7", "检查 Git 修改后提交并推送；服务器执行 git pull 即可上线。", null, null, null, null, null, null],
];
for (let row = 5; row <= 11; row += 1) {
  guide.getRange(`B${row}:H${row}`).merge();
}
guide.getRange("A5:H11").format = {
  fill: colors.white,
  font: { color: colors.navy, size: 11 },
  verticalAlignment: "center",
  wrapText: true,
  borders: {
    bottom: { style: "thin", color: colors.line },
  },
};
guide.getRange("A13:H13").merge();
guide.getRange("A13").values = [["填写规则"]];
guide.getRange("A13:H13").format = sectionFormat;
guide.getRange("A14:H19").values = [
  ["必填", "产品URL标识、款号、英文产品名、成分、英文产品描述、SEO标题、Meta描述、至少一张主图。", null, null, null, null, null, null],
  ["URL标识", "仅使用小写英文字母、数字与短横线，例如 bamboo-viscose-single-jersey。", null, null, null, null, null, null],
  ["价格", "码价与KG价请填写数字，不要输入“US$”；有效期填写真实日期。价格暂缺可留空。", null, null, null, null, null, null],
  ["图片", "建议横向高清图，主图至少1600px宽。插入图片时将左上角放在对应黄色图片格内。", null, null, null, null, null, null],
  ["SEO", "标题建议50–60个英文字符；Meta description建议140–160个英文字符，语言自然，避免关键词堆砌。", null, null, null, null, null, null],
  ["示例", "示例行的发布状态为 NO，不会生成网页。复制示例后改成真实产品并选择 YES。", null, null, null, null, null, null],
];
for (let row = 14; row <= 19; row += 1) {
  guide.getRange(`B${row}:H${row}`).merge();
}
guide.getRange("A14:H19").format = {
  fill: colors.white,
  font: { color: colors.navy, size: 10 },
  verticalAlignment: "center",
  wrapText: true,
  borders: {
    bottom: { style: "thin", color: colors.line },
  },
};
guide.getRange("A1:H1").format.rowHeight = 34;
guide.getRange("A2:H2").format.rowHeight = 34;
guide.getRange("A4:H4").format.rowHeight = 26;
guide.getRange("A5:A19").format.columnWidth = 10;
guide.getRange("B5:H19").format.columnWidth = 16;
guide.getRange("A5:H19").format.rowHeight = 34;
guide.freezePanes.freezeRows(4);
console.error("builder: guide complete");

setupTitle(
  basics,
  "A1:Q1",
  "产品基础信息",
  "一行代表一个产品。黄色单元格为输入区；最后两列由公式自动生成。"
);
console.error("builder: basics title");
const basicHeaders = [
  "发布",
  "产品URL标识",
  "款号（Style#）",
  "产品名称（英文）",
  "系列名称（英文）",
  "实时价格 USD/码",
  "实时价格 USD/KG",
  "价格有效期",
  "成分",
  "克重（g/m²）",
  "有效幅宽（cm）",
  "织物组织",
  "HS编码（选填）",
  "原产国",
  "完整URL（自动）",
  "资料检查（自动）",
  "备注（不发布）",
];
basics.getRange("A4:Q4").values = [basicHeaders];
basics.getRange("A4:Q4").format = headerFormat;
const basicExample = [
  "NO",
  "example-bamboo-knit",
  "HLC-EXAMPLE",
  "95% Bamboo Viscose Spandex Single Jersey",
  "HLC BAMBOO KNIT COLLECTION",
  6.8,
  15.4,
  new Date("2026-08-30"),
  "95% bamboo viscose / 5% spandex",
  200,
  150,
  "Single jersey",
  "6006.32",
  "China",
  null,
  null,
  "示例行，请复制后填写真实产品",
];
basics.getRange("A5:Q5").values = [basicExample];
basics.getRange("O5").formulas = [['=IF(B5="","","https://hlctex.com/textile/products/"&B5&"/")']];
basics.getRange("P5").formulas = [['=IF(B5="","",IF(A5<>"YES","未发布",IF(OR(C5="",D5="",I5=""),"缺少必填项","可生成")))']];
basics.getRange("O5:O104").fillDown();
basics.getRange("P5:P104").fillDown();
basics.getRange("A5:Q104").format = inputFormat;
basics.getRange("O5:P104").format.fill = colors.green;
basics.getRange("A5:A104").dataValidation = { rule: { type: "list", values: ["NO", "YES"] } };
basics.getRange("A5:A104").conditionalFormats.add("cellIs", {
  operator: "equal",
  formula: '"YES"',
  format: { fill: colors.green, font: { bold: true, color: "#246B3C" } },
});
basics.getRange("P5:P104").conditionalFormats.add("containsText", {
  text: "缺少",
  format: { fill: colors.red, font: { bold: true, color: "#A61B1B" } },
});
basics.getRange("F5:G104").format.numberFormat = '"US$"0.00';
basics.getRange("H5:H104").format.numberFormat = "yyyy-mm-dd";
basics.getRange("J5:J104").format.numberFormat = '0" g/m²"';
basics.getRange("K5:K104").format.numberFormat = '0" cm"';
basics.getRange("A4:Q104").format.rowHeight = 30;
basics.getRange("D5:E104").format.rowHeight = 42;
const basicWidths = [9, 28, 16, 36, 30, 17, 17, 15, 34, 12, 14, 22, 18, 14, 45, 18, 34];
basicWidths.forEach((width, index) => {
  basics.getRangeByIndexes(3, index, 101, 1).format.columnWidth = width;
});
basics.freezePanes.freezeRows(4);
basics.freezePanes.freezeColumns(3);
basics.tables.add("A4:Q104", true, "ProductBasicsTable").style = "TableStyleMedium2";
console.error("builder: basics complete");

setupTitle(
  details,
  "A1:I1",
  "产品细节",
  "使用与基础信息完全相同的产品URL标识。除URL标识外，其余字段可按产品实际情况填写；留空的细节行不会显示在网页中。"
);
const detailHeaders = [
  "产品URL标识",
  "细节说明（英文，选填）",
  "纱支",
  "MOQ / MCQ（英文）",
  "每KG等于多少码",
  "Sample lead time（英文）",
  "Bulk lead time（英文）",
  "Applications（英文）",
  "后整理（英文）",
];
details.getRange("A4:I4").values = [detailHeaders];
details.getRange("A4:I4").format = headerFormat;
details.getRange("A5:I5").values = [[
  "example-bamboo-knit",
  "Buyer-facing production and delivery details for this fabric programme.",
  "32S + 30D",
  "500 kg / 100 kg per colour",
  2.26,
  "5–7 working days",
  "25–35 days after approval",
  "Babywear, sleepwear and loungewear",
  "Waterless dyeing",
]];
details.getRange("A5:I104").format = inputFormat;
details.getRange("E5:E104").format.numberFormat = '0.00" yd/kg"';
details.getRange("A4:I104").format.rowHeight = 36;
details.getRange("B5:I104").format.rowHeight = 54;
const detailWidths = [28, 48, 18, 30, 20, 26, 28, 38, 28];
detailWidths.forEach((width, index) => {
  details.getRangeByIndexes(3, index, 101, 1).format.columnWidth = width;
});
details.freezePanes.freezeRows(4);
details.freezePanes.freezeColumns(1);
details.tables.add("A4:I104", true, "ProductDetailsTable").style = "TableStyleMedium2";
console.error("builder: details complete");

setupTitle(
  content,
  "A1:Q1",
  "产品内容与 SEO",
  "使用与基础信息完全相同的产品URL标识。测试结果可填写文字，也可填写本地图片路径；文本支持换行。"
);
const contentHeaders = [
  "产品URL标识",
  "产品描述（英文）",
  "测试结果（英文）",
  "测试结果图片路径（可选）",
  "测试结果图片ALT（英文）",
  "其他信息（英文）",
  "SEO分类标签（英文）",
  "SEO主标题（英文）",
  "SEO段落1（英文）",
  "SEO段落2（英文）",
  "SEO标题（英文）",
  "Meta描述（英文）",
  "主图ALT（英文）",
  "图2 ALT（英文）",
  "图3 ALT（英文）",
  "图4 ALT（英文）",
  "SEO内容图ALT（英文）",
];
content.getRange("A4:Q4").values = [contentHeaders];
content.getRange("A4:Q4").format = headerFormat;
content.getRange("A5:Q5").values = [[
  "example-bamboo-knit",
  "A soft bamboo viscose stretch single jersey developed for babywear, sleepwear and loungewear.",
  "Test results may include shrinkage, colourfastness, pilling and stretch recovery to agreed standards.",
  "",
  "Bamboo knit fabric laboratory test result",
  "OEKO-TEX certification and sample support are available according to the selected fabric programme.",
  "BAMBOO KNIT FABRIC",
  "Soft bamboo viscose jersey for babywear and sleepwear development.",
  "This bamboo viscose knit combines breathable comfort, moisture management and four-way stretch for close-to-skin garments.",
  "HLC supports fibre sourcing, knitting, waterless dyeing, finishing, in-house testing and international shipment from one integrated factory.",
  "Bamboo Viscose Spandex Knit Fabric Manufacturer | HLC",
  "Explore soft bamboo viscose spandex single jersey for babywear, sleepwear and loungewear, with custom dyeing, finishing and testing from HLC.",
  "Brown bamboo viscose spandex single jersey fabric",
  "Bamboo knit fabric drape and stretch detail",
  "Bamboo viscose jersey colour and surface view",
  "Close-up texture of bamboo knit fabric",
  "Bamboo viscose knit fabric for babywear development",
]];
content.getRange("A5:Q104").format = inputFormat;
content.getRange("B5:L104").format.rowHeight = 72;
content.getRange("A4:Q104").format.rowHeight = 42;
content.getRange("A5:A104").format.columnWidth = 28;
content.getRange("B5:F104").format.columnWidth = 46;
content.getRange("G5:H104").format.columnWidth = 34;
content.getRange("I5:L104").format.columnWidth = 52;
content.getRange("M5:Q104").format.columnWidth = 36;
content.freezePanes.freezeRows(4);
content.freezePanes.freezeColumns(1);
content.tables.add("A4:Q104", true, "ProductContentTable").style = "TableStyleMedium2";
console.error("builder: content complete");

setupTitle(
  images,
  "A1:F1",
  "产品图片",
  "可直接把图片插入黄色单元格，或在格内填写图片绝对路径/网站路径。每张图建议使用不同视角。"
);
images.getRange("A4:F4").values = [[
  "产品URL标识",
  "主图（必填）",
  "图2",
  "图3",
  "图4",
  "SEO内容图",
]];
images.getRange("A4:F4").format = headerFormat;
images.getRange("A5:F5").values = [[
  "example-bamboo-knit",
  "E:\\产品图片\\example-main.jpg",
  "E:\\产品图片\\example-drape.jpg",
  "",
  "",
  "E:\\产品图片\\example-editorial.jpg",
]];
images.getRange("A5:F24").format = inputFormat;
images.getRange("A5:A24").format.columnWidth = 28;
images.getRange("B5:F24").format.columnWidth = 28;
images.getRange("A5:F24").format.rowHeight = 110;
images.freezePanes.freezeRows(4);
images.freezePanes.freezeColumns(1);
images.tables.add("A4:F24", true, "ProductImagesTable").style = "TableStyleMedium2";
console.error("builder: images complete");

setupTitle(
  related,
  "A1:D1",
  "相关产品",
  "填写其他产品的URL标识；留空时保留模板默认推荐。"
);
related.getRange("A4:D4").values = [[
  "产品URL标识",
  "相关产品1 URL标识",
  "相关产品2 URL标识",
  "相关产品3 URL标识",
]];
related.getRange("A4:D4").format = headerFormat;
related.getRange("A5:D5").values = [[
  "example-bamboo-knit",
  "bvf",
  "bvcf",
  "",
]];
related.getRange("A5:D104").format = inputFormat;
related.getRange("A5:D104").format.columnWidth = 30;
related.getRange("A5:D104").format.rowHeight = 30;
related.freezePanes.freezeRows(4);
related.tables.add("A4:D104", true, "RelatedProductsTable").style = "TableStyleMedium2";
console.error("builder: related complete");

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.mkdir(previewDir, { recursive: true });
console.error("builder: directories ready");

console.error("builder: exporting");
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.error("builder: importing for verification");
const verifiedWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));

console.error("builder: inspecting");
const inspection = await verifiedWorkbook.inspect({
  kind: "table",
  range: "产品基础信息!A1:Q8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 17,
});
console.log(inspection.ndjson);

const detailInspection = await verifiedWorkbook.inspect({
  kind: "table",
  range: "产品细节!A1:I8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 9,
});
console.log(detailInspection.ndjson);

const contentInspection = await verifiedWorkbook.inspect({
  kind: "table",
  range: "产品内容与SEO!A1:Q8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 17,
});
console.log(contentInspection.ndjson);

console.error("builder: scanning errors");
const errors = await verifiedWorkbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

if (process.env.HLC_RENDER_WITH_ARTIFACT === "1") {
  for (const [sheetName, range, fileName] of [
    ["使用说明", "A1:H19", "guide.png"],
    ["产品基础信息", "A1:Q8", "basics.png"],
    ["产品细节", "A1:I8", "details.png"],
    ["产品内容与SEO", "A1:Q7", "content.png"],
    ["产品图片", "A1:F8", "images.png"],
    ["相关产品", "A1:D8", "related.png"],
  ]) {
    console.error(`builder: rendering ${sheetName}`);
    const preview = await verifiedWorkbook.render({
      sheetName,
      range,
      scale: 1,
      format: "png",
    });
    await fs.writeFile(
      path.join(previewDir, fileName),
      new Uint8Array(await preview.arrayBuffer())
    );
  }
}

await fs.rm(`${outputPath}.inspect.ndjson`, { force: true });
console.log(`Saved ${outputPath}`);
