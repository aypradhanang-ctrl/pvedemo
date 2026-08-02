import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/ayushpradhanang/Documents/pve/outputs/image-requirements-20260802";
const outputPath = path.join(outputDir, "website-image-requirements.xlsx");
const previewPath = path.join(outputDir, "website-image-requirements.png");

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Image Requirements");
sheet.showGridLines = false;

const headers = [[
  "Page",
  "URL",
  "Component/Section",
  "Image Required",
  "Aspect Ratio",
  "Recommended Minimum Size",
  "Usage / Notes",
]];

const rows = [
  ["Home", "/", "Hero Section", "Homepage hero background", "16:9", "1920 x 1080", "Main landing visual. Use a premium crowd/stage/event image with safe space for text overlay."],
  ["Home", "/", "Featured Event Block", "Featured event image", "4:5", "1200 x 1500", "Used for the highlighted upcoming event."],
  ["Home", "/", "Upcoming Events Section", "Upcoming event card images", "4:5", "1200 x 1500", "One image per event card."],
  ["Home", "/", "Past Events Preview", "Past event preview images", "4:5", "1200 x 1500", "Used for compact archived-event previews."],
  ["Home", "/", "News Preview", "News/article thumbnail images", "4:3", "1200 x 900", "Used if newsroom items are shown on homepage."],

  ["About", "/about", "Intro Section", "About page main image", "16:10", "1600 x 1000", "Brand or event image that represents the company story."],

  ["Upcoming Events", "/events", "Hero Section", "Upcoming events hero background", "16:9", "1920 x 1080", "Banner image for the events page."],
  ["Upcoming Events", "/events", "Event Listing", "Upcoming event card images", "4:5", "1200 x 1500", "One image per listed event."],

  ["Event Detail", "/events/[slug]", "Hero Section", "Event hero/poster image", "16:9", "1920 x 1080", "Primary visual for each event detail page. Must crop well with text overlay."],
  ["Event Detail", "/events/[slug]", "Related Events", "Related event card images", "4:5", "1200 x 1500", "Used in the more-events section."],

  ["Past Events", "/events/past", "Hero Section", "Past events hero background", "16:9", "1920 x 1080", "Archive banner image."],
  ["Past Events", "/events/past", "Event Archive", "Past event card images", "4:5", "1200 x 1500", "One image per archived event."],

  ["Gallery", "/gallery", "Hero Section", "Gallery hero background", "16:9", "1920 x 1080", "Banner visual for gallery landing page."],
  ["Gallery", "/gallery", "Gallery Cards - Wide", "Wide gallery category images", "16:9", "1600 x 900", "Used for larger gallery cards such as Event Photography and Event Archive."],
  ["Gallery", "/gallery", "Gallery Cards - Standard", "Standard gallery category images", "4:5", "1200 x 1500", "Used for category cards like Videos, BTS, Media, Drone."],

  ["News", "/news", "Article Listing", "News/article images", "4:3", "1200 x 900", "One thumbnail image per article."],

  ["Sponsorships", "/sponsorships", "Optional Assets", "Event flyer / sponsorship showcase image", "4:5", "1200 x 1500", "Optional if sponsorship opportunities are tied to specific events."],

  ["Global", "Site-wide", "Brand Assets", "Primary logo", "Flexible", "SVG preferred", "Provide transparent logo in SVG if possible, plus PNG fallback."],
  ["Global", "Site-wide", "Brand Assets", "Favicon / site icon", "1:1", "512 x 512", "Square icon for browser tab and app/bookmark use."],
];

sheet.getRange("A1:G2").merge();
sheet.getRange("A1").values = [["WEBSITE IMAGE REQUIREMENTS"]];
sheet.getRange("A3:G3").merge();
sheet.getRange("A3").values = [[
  "This sheet lists only the image assets the client needs to provide for the current website pages.",
]];
sheet.getRange("A5:G5").values = headers;
sheet.getRange(`A6:G${rows.length + 5}`).values = rows;

sheet.getRange("A1:G2").format.fill.color = "#1F5FBF";
sheet.getRange("A1:G2").format.font.color = "#FFFFFF";
sheet.getRange("A1:G2").format.font.bold = true;
sheet.getRange("A1:G2").format.font.size = 15;
sheet.getRange("A1:G2").format.horizontalAlignment = "center";
sheet.getRange("A1:G2").format.verticalAlignment = "center";

sheet.getRange("A3:G3").format.fill.color = "#EAF2FF";
sheet.getRange("A3:G3").format.font.italic = true;
sheet.getRange("A3:G3").format.wrapText = true;

sheet.getRange("A5:G5").format.fill.color = "#4F81BD";
sheet.getRange("A5:G5").format.font.color = "#FFFFFF";
sheet.getRange("A5:G5").format.font.bold = true;
sheet.getRange("A5:G5").format.horizontalAlignment = "center";
sheet.getRange("A5:G5").format.verticalAlignment = "center";
sheet.getRange("A5:G5").format.wrapText = true;

sheet.getRange(`A5:G${rows.length + 5}`).format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
sheet.getRange(`A6:G${rows.length + 5}`).format.wrapText = true;
sheet.getRange(`A6:G${rows.length + 5}`).format.verticalAlignment = "top";
sheet.getRange(`A6:G${rows.length + 5}`).format.rowHeight = 40;

sheet.getRange("A:A").format.columnWidth = 18;
sheet.getRange("B:B").format.columnWidth = 18;
sheet.getRange("C:C").format.columnWidth = 24;
sheet.getRange("D:D").format.columnWidth = 28;
sheet.getRange("E:E").format.columnWidth = 14;
sheet.getRange("F:F").format.columnWidth = 18;
sheet.getRange("G:G").format.columnWidth = 38;
sheet.freezePanes.freezeRows(5);

const check = await workbook.inspect({
  kind: "table",
  sheetId: "Image Requirements",
  range: "A1:G24",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 7,
  maxChars: 5000,
});
console.log(check.ndjson);

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({
  sheetName: "Image Requirements",
  range: "A1:G24",
  scale: 1.4,
  format: "png",
  autoCrop: "all",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(JSON.stringify({ outputPath, previewPath }));
