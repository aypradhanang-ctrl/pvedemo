import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/ayushpradhanang/Documents/pve/outputs/content-requirements-20260802";
const outputPath = path.join(outputDir, "website-content-requirements.xlsx");
const previewPath = path.join(outputDir, "website-content-requirements.png");

const workbook = Workbook.create();
const inventory = workbook.worksheets.add("Content Inventory");
const eventSchema = workbook.worksheets.add("Event Content Schema");
const globalContent = workbook.worksheets.add("Global Content");

for (const sheet of [inventory, eventSchema, globalContent]) {
  sheet.showGridLines = false;
}

const inventoryHeaders = [[
  "Page",
  "URL",
  "Component/Section",
  "Content Item",
  "Content Type",
  "Required",
  "Guidance / Format",
  "Remarks",
]];

const inventoryRows = [
  ["Home", "/", "Hero Section", "Main headline", "Text", "Yes", "Short, high-impact homepage headline; ideally 6-14 words.", "Primary brand statement."],
  ["Home", "/", "Hero Section", "Supporting paragraph", "Text", "Yes", "1-2 sentence intro explaining what PVE does and what visitors can do next.", "Keep concise and conversion-focused."],
  ["Home", "/", "Hero Section", "Primary CTA label and target", "Text + Link", "Yes", "Example: View Events, Buy Tickets, Explore Events.", "Need final CTA destination."],
  ["Home", "/", "Hero Section", "Secondary CTA label and target", "Text + Link", "Optional", "Example: Latest Updates, About Us, Sponsor With Us.", "Optional but recommended."],
  ["Home", "/", "Hero Section", "Hero background image/video", "Image / Video", "Yes", "High-quality event crowd or stage visual representing the brand.", "Should feel premium and current."],
  ["Home", "/", "Upcoming Events Section", "Section title and description", "Text", "Yes", "Intro copy for the upcoming events block.", "Can remain static if approved once."],
  ["Home", "/", "Upcoming Events Section", "Featured upcoming event records", "Structured Data", "Yes", "Pulled from event entries: title, date, time, location, description, image, ticket status.", "See Event Content Schema sheet."],
  ["Home", "/", "Featured Event Block", "Featured event selection", "Structured Data", "Yes", "Choose which upcoming event should be highlighted on the homepage.", "One event marked as featured."],
  ["Home", "/", "Why PVE", "Key proof points / stats", "Text", "Yes", "4 short stats or credibility statements such as events count, cities, reach, production strength.", "Needs client-approved numbers."],
  ["Home", "/", "Past Events Preview", "Selected past event entries", "Structured Data", "Yes", "At least 2 archived events with image, title, date, city, and short description.", "Can be expanded later."],
  ["Home", "/", "News Preview", "Latest news/article entries", "Structured Data", "Optional", "3 recent stories with title, category, date, excerpt, and image.", "If no newsroom at launch, can hide."],
  ["Home", "/", "Newsletter CTA", "Signup heading, supporting text, and disclaimer", "Text", "Optional", "Short CTA plus any consent/privacy line if newsletter is active.", "Needed only if newsletter feature is used."],

  ["About", "/about", "Intro Section", "About headline and introduction", "Text", "Yes", "Summary of the company, its background, and positioning.", "Core brand/about copy."],
  ["About", "/about", "Intro Section", "Milestones / timeline points", "Text", "Yes", "3-5 concise milestone statements.", "Use actual business history."],
  ["About", "/about", "Intro Section", "Main about image", "Image", "Yes", "Strong brand or event image that supports the about story.", "Landscape preferred."],
  ["About", "/about#portfolio", "Portfolio Section", "Portfolio credibility points", "Text", "Yes", "Examples: events count, markets served, service breadth.", "Needs verified figures."],
  ["About", "/about#services", "Services Section", "Service list", "Text", "Yes", "4-8 services the company wants to promote.", "Use business-approved naming."],
  ["About", "/about#faq", "FAQ Section", "FAQs and answers", "Text", "Yes", "3-6 short FAQs about the company, audience, and next steps.", "Can grow over time."],

  ["Upcoming Events", "/events", "Hero Section", "Page heading and intro", "Text", "Yes", "Overview copy for the upcoming events page.", "Can be static once approved."],
  ["Upcoming Events", "/events", "Hero Section", "Hero background image", "Image", "Yes", "Upcoming-events themed banner visual.", "Should match brand visual direction."],
  ["Upcoming Events", "/events", "Event Listing", "Upcoming event entries", "Structured Data", "Yes", "Each event needs title, slug, date, time, startsAt, location, city, country, category, ticket status/price, description, image.", "See Event Content Schema sheet."],
  ["Upcoming Events", "/events", "Event Type Sections", "Category names and descriptions", "Text", "Optional", "Concerts, Festivals, International, etc.", "Can use defaults unless client wants custom wording."],

  ["Event Detail Template", "/events/[slug]", "Hero Section", "Event title, category, description, date, time, location", "Structured Data", "Yes", "Core event record fields populate the hero.", "One set required per event."],
  ["Event Detail Template", "/events/[slug]", "Hero Section", "Event hero image", "Image", "Yes", "Primary artwork/poster/cover image for the event.", "High-quality, text-safe crop."],
  ["Event Detail Template", "/events/[slug]", "Event Workflow", "Ticket status / pricing", "Text", "Yes", "Examples: Tickets available soon, From NPR 1,500, Sold out.", "Keep buyer-facing wording simple."],
  ["Event Detail Template", "/events/[slug]", "Event Workflow", "Show timeline", "Structured Data", "Optional", "Doors open, show starts, expected end, etc.", "Recommended for larger events."],
  ["Event Detail Template", "/events/[slug]", "Things To Know", "Attendee information", "Text", "Optional", "Entry rules, ID requirement, age restriction, venue notes, arrival guidance.", "3-6 bullet points recommended."],
  ["Event Detail Template", "/events/[slug]", "Event Essentials", "Venue map / Google Maps link", "Link", "Optional", "Direct map link or exact venue address.", "Useful for attendees."],
  ["Event Detail Template", "/events/[slug]", "Artist Spotlight", "Artist bio / story", "Text", "Optional", "Short biography or context about performer(s).", "Recommended if artist-led events."],
  ["Event Detail Template", "/events/[slug]", "Artist Spotlight", "Listening / social links", "Links", "Optional", "Spotify, YouTube, Instagram, etc.", "Optional enhancement."],
  ["Event Detail Template", "/events/[slug]", "FAQ Section", "Event-specific FAQs", "Text", "Optional", "Ticketing, venue, support, timing, entry questions.", "3-5 FAQs recommended."],

  ["Past Events", "/events/past", "Hero Section", "Archive heading and intro", "Text", "Yes", "Intro copy for the past events archive.", "Can be static once approved."],
  ["Past Events", "/events/past", "Hero Section", "Hero background image", "Image", "Yes", "Banner image for archive/past events.", "Should feel historic but polished."],
  ["Past Events", "/events/past", "Event Archive", "Past event entries", "Structured Data", "Yes", "Same event fields as upcoming events, with completed status and archive image.", "See Event Content Schema sheet."],

  ["Gallery", "/gallery", "Hero Section", "Gallery heading and intro", "Text", "Yes", "Overview of photos, videos, behind-the-scenes, media, and archive content.", "Can be static once approved."],
  ["Gallery", "/gallery", "Hero Section", "Hero background image", "Image", "Yes", "Strong gallery banner visual.", "Prefer immersive event/crowd image."],
  ["Gallery", "/gallery", "Filter Labels", "Gallery categories", "Text", "Optional", "Photos, Videos, Drone, BTS, Media, By Artist, By Event.", "Can use defaults."],
  ["Gallery", "/gallery", "Gallery Cards", "Gallery category cards", "Text + Image", "Yes", "Each card needs title, short description, and representative image.", "Current layout uses 6 category cards."],

  ["News", "/news", "Newsroom Intro", "Page title and intro", "Text", "Yes", "Short newsroom intro copy.", "Can be static once approved."],
  ["News", "/news", "Article Listing", "News/article entries", "Structured Data", "Optional", "Each story needs title, category, published date, excerpt, image, and slug.", "If no active content plan, can hide this page."],

  ["Sponsorships", "/sponsorships", "Intro Section", "Page title and description", "Text", "Yes", "Overview of sponsorship opportunity and brand value.", "Core partnership page copy."],
  ["Sponsorships", "/sponsorships", "Pillars Section", "Sponsorship pillars", "Text", "Yes", "3 short value propositions such as visibility, audience access, experience design.", "Can be revised by sales team."],
  ["Sponsorships", "/sponsorships", "Opportunity Flow", "Flyer / event showcase asset", "Image / PDF / Link", "Optional", "Event-specific sponsorship teaser or flyer.", "Useful if selling event-wise sponsorships."],
  ["Sponsorships", "/sponsorships", "Opportunity Flow", "Sponsorship deck", "PDF", "Optional", "Downloadable pitch deck with packages and deliverables.", "Recommended for sponsor outreach."],
  ["Sponsorships", "/sponsorships", "Enquiry Form", "Recipient email / process owner", "Contact Detail", "Yes", "Where sponsorship enquiries should be sent or routed.", "Needed for form setup."],

  ["Contact", "/contact", "Contact Intro", "Page title and description", "Text", "Yes", "Simple contact page intro.", "Can be static once approved."],
  ["Contact", "/contact", "Contact Details", "Primary email address", "Contact Detail", "Yes", "Public-facing contact email.", "Needs monitored inbox."],
  ["Contact", "/contact", "Contact Details", "Primary phone number", "Contact Detail", "Yes", "Public-facing contact phone or WhatsApp number.", "Add country code."],
  ["Contact", "/contact", "Contact Details", "Office/city address", "Contact Detail", "Yes", "Physical address or city-level contact location.", "Can be city only if preferred."],
  ["Contact", "/contact#organizer-enquiry", "Support Blocks", "Organizer enquiry text", "Text", "Yes", "Short description for event partners/organizers.", "Can use current placeholder as base."],
  ["Contact", "/contact", "Support Blocks", "Audience support text", "Text", "Yes", "Short description for ticket buyers/attendees.", "Can use current placeholder as base."],
  ["Contact", "/contact", "Enquiry Form", "Recipient email / CRM destination", "Contact Detail", "Yes", "Where general enquiries should be sent or stored.", "Needed for form integration."],

  ["Global", "Site-wide", "Navigation", "Menu labels and final destinations", "Text + Links", "Yes", "Final navigation structure and link destinations.", "Needed before launch."],
  ["Global", "Site-wide", "Footer", "Footer text, quick links, and contact details", "Text + Links", "Yes", "Company summary, links, copyright, email, phone, socials.", "Should match contact page."],
  ["Global", "Site-wide", "Brand Assets", "Logo files", "Image / SVG", "Yes", "Primary logo, alternate logo if needed, favicon.", "Provide web-ready source files."],
  ["Global", "Site-wide", "Brand Assets", "Social media links", "Links", "Optional", "Instagram, Facebook, YouTube, TikTok, LinkedIn, etc.", "Needed if icons/links are shown."],
  ["Global", "Site-wide", "Legal", "Privacy policy / terms / disclaimers", "Document / Text", "Optional", "Needed if forms, newsletter, or user data collection is live.", "Recommended before production launch."],
];

inventory.getRange("A1:H2").merge();
inventory.getRange("A1").values = [["WEBSITE CONTENT REQUIREMENTS"]];
inventory.getRange("A3:H3").merge();
inventory.getRange("A3").values = [[
  "Fill this sheet with the final content, assets, and data needed for the current website pages. Structured data rows should follow the supporting schema sheets.",
]];
inventory.getRange("A5:H5").values = inventoryHeaders;
inventory.getRange(`A6:H${inventoryRows.length + 5}`).values = inventoryRows;

eventSchema.getRange("A1:H2").merge();
eventSchema.getRange("A1").values = [["EVENT CONTENT SCHEMA"]];
eventSchema.getRange("A4:H4").values = [[
  "Field",
  "Content Type",
  "Required",
  "Example / Expected Format",
  "Used On",
  "Guidance",
  "Sample Value",
  "Remarks",
]];
const eventRows = [
  ["slug", "Text", "Yes", "URL-safe text", "/events and /events/[slug]", "Unique per event. Lowercase with hyphens.", "lets-get-loud-india", "Used in the page URL."],
  ["title", "Text", "Yes", "Event name", "Cards + detail pages", "Official event title.", "Let's Get Loud India", ""],
  ["category", "Text", "Yes", "Concert / Festival / International / Cultural", "Cards + detail pages", "Use approved event type naming.", "International", ""],
  ["date", "Text", "Yes", "DD Month YYYY", "Cards + detail pages", "User-facing formatted date.", "18 September 2026", ""],
  ["shortDate", "Text", "Optional", "DD MON", "Cards / badges", "Optional shorthand for design use.", "18 SEP", ""],
  ["time", "Text", "Yes", "H:MM AM/PM", "Cards + detail pages", "User-facing event time.", "6:00 PM", ""],
  ["startsAt", "Datetime", "Yes", "ISO 8601 datetime", "Countdown / scheduling", "Needed for accurate event timing logic.", "2026-09-18T18:00:00+05:30", ""],
  ["location", "Text", "Yes", "Venue, City, Country", "Cards + detail pages", "Full display location.", "New Delhi, India", ""],
  ["city", "Text", "Optional", "City", "Homepage featured block / cards", "Useful for cards and highlights.", "New Delhi", ""],
  ["country", "Text", "Optional", "Country", "Homepage featured block / cards", "Useful for cards and highlights.", "India", ""],
  ["image", "Image", "Yes", "Poster / cover image", "Cards + hero", "Main event artwork or cover visual.", "/images/event-1.jpg", "Need a web-ready file."],
  ["description", "Text", "Yes", "1-3 sentence summary", "Cards + detail hero", "Short event summary for visitors.", "A major international live-music experience...", ""],
  ["price", "Text", "Yes", "Buyer-facing status/price line", "Cards + detail page", "Examples: From NPR 1,500, Sold out, Tickets available soon.", "Tickets available soon", ""],
  ["featured", "Boolean", "Optional", "true / false", "Homepage featured block", "Only one homepage-featured event is recommended.", "true", ""],
  ["soldOut", "Boolean", "Optional", "true / false", "Cards", "Used to display a sold-out badge.", "false", ""],
  ["venueMapLink", "Link", "Optional", "Google Maps or exact venue URL", "Event detail", "Recommended for attendee convenience.", "https://www.google.com/maps/...", ""],
  ["schedule", "Structured Data", "Optional", "Label + time pairs", "Event detail", "Examples: Doors open, Show starts, Expected end.", "Doors open - 4:30 PM", "3 rows recommended."],
  ["thingsToKnow", "Text List", "Optional", "3-6 bullet points", "Event detail", "Entry rules, age policy, ID, venue instructions.", "Carry valid ticket confirmation...", ""],
  ["artistBio", "Text", "Optional", "Short bio", "Event detail", "Useful for artist-led events.", "", ""],
  ["artistLinks", "Links", "Optional", "Spotify / YouTube / Instagram etc.", "Event detail", "Optional enhancement.", "", ""],
  ["faq", "Q&A", "Optional", "Question + Answer", "Event detail", "3-5 attendee questions if available.", "", ""],
];
eventSchema.getRange(`A5:H${eventRows.length + 4}`).values = eventRows;

globalContent.getRange("A1:G2").merge();
globalContent.getRange("A1").values = [["GLOBAL CONTENT AND ASSETS"]];
globalContent.getRange("A4:G4").values = [[
  "Area",
  "Item",
  "Required",
  "What To Provide",
  "Format",
  "Used On",
  "Remarks",
]];
const globalRows = [
  ["Brand", "Primary logo", "Yes", "Main approved website logo.", "SVG / PNG", "Header + footer", "Prefer vector if available."],
  ["Brand", "Favicon", "Yes", "Browser/site icon.", "PNG / ICO / SVG", "Browser tab", ""],
  ["Brand", "Brand description", "Yes", "1-2 sentence company summary.", "Text", "Footer / meta / profile areas", ""],
  ["Navigation", "Main menu items", "Yes", "Approved labels and destinations for top navigation.", "Text + Links", "Header", ""],
  ["Footer", "Quick links", "Yes", "Footer navigation links.", "Text + Links", "Footer", ""],
  ["Footer", "Contact details", "Yes", "Email, phone, location.", "Text", "Footer + contact page", "Should match contact page."],
  ["Social", "Social profile links", "Optional", "Instagram, Facebook, YouTube, TikTok, LinkedIn, etc.", "Links", "Header/footer/contact", ""],
  ["Legal", "Privacy policy", "Optional", "Approved privacy policy content or URL.", "Document / Link", "Footer / forms", "Recommended if forms are live."],
  ["Legal", "Terms / disclaimers", "Optional", "Terms page or legal disclaimers as needed.", "Document / Link", "Footer / forms", ""],
  ["Forms", "Enquiry recipient", "Yes", "Email/CRM destination for contact form.", "Email / Workflow", "Contact page", ""],
  ["Forms", "Sponsorship recipient", "Yes", "Email/CRM destination for sponsor form.", "Email / Workflow", "Sponsorship page", ""],
  ["Newsroom", "Publishing owner", "Optional", "Who will create and approve news posts.", "Name / Team", "News page", "Helps with ongoing content management."],
  ["Newsletter", "Consent text", "Optional", "Signup disclosure/privacy note.", "Text", "Homepage newsletter block", "Needed if newsletter is active."],
  ["Downloads", "Sponsorship deck", "Optional", "PDF deck for sponsor outreach.", "PDF", "Sponsorship page", "Recommended."],
];
globalContent.getRange(`A5:G${globalRows.length + 4}`).values = globalRows;

function styleTitle(sheet, range) {
  sheet.getRange(range).format.fill.color = "#1F5FBF";
  sheet.getRange(range).format.font.color = "#FFFFFF";
  sheet.getRange(range).format.font.bold = true;
  sheet.getRange(range).format.font.size = 15;
  sheet.getRange(range).format.horizontalAlignment = "center";
  sheet.getRange(range).format.verticalAlignment = "center";
}

styleTitle(inventory, "A1:H2");
inventory.getRange("A3:H3").format.fill.color = "#EAF2FF";
inventory.getRange("A3:H3").format.font.italic = true;
inventory.getRange("A3:H3").format.wrapText = true;
inventory.getRange("A5:H5").format.fill.color = "#4F81BD";
inventory.getRange("A5:H5").format.font.color = "#FFFFFF";
inventory.getRange("A5:H5").format.font.bold = true;
inventory.getRange("A5:H5").format.horizontalAlignment = "center";
inventory.getRange("A5:H5").format.verticalAlignment = "center";
inventory.getRange("A5:H5").format.wrapText = true;
inventory.getRange(`A5:H${inventoryRows.length + 5}`).format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
inventory.getRange(`A6:H${inventoryRows.length + 5}`).format.wrapText = true;
inventory.getRange(`A6:H${inventoryRows.length + 5}`).format.verticalAlignment = "top";
inventory.getRange("F6:F60").format.horizontalAlignment = "center";
inventory.getRange("A:A").format.columnWidth = 18;
inventory.getRange("B:B").format.columnWidth = 18;
inventory.getRange("C:C").format.columnWidth = 24;
inventory.getRange("D:D").format.columnWidth = 28;
inventory.getRange("E:E").format.columnWidth = 16;
inventory.getRange("F:F").format.columnWidth = 11;
inventory.getRange("G:G").format.columnWidth = 34;
inventory.getRange("H:H").format.columnWidth = 26;
inventory.getRange(`A6:H${inventoryRows.length + 5}`).format.rowHeight = 44;
inventory.freezePanes.freezeRows(5);

styleTitle(eventSchema, "A1:H2");
eventSchema.getRange("A4:H4").format.fill.color = "#4F81BD";
eventSchema.getRange("A4:H4").format.font.color = "#FFFFFF";
eventSchema.getRange("A4:H4").format.font.bold = true;
eventSchema.getRange("A4:H4").format.horizontalAlignment = "center";
eventSchema.getRange("A4:H4").format.verticalAlignment = "center";
eventSchema.getRange(`A4:H${eventRows.length + 4}`).format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
eventSchema.getRange(`A5:H${eventRows.length + 4}`).format.wrapText = true;
eventSchema.getRange(`A5:H${eventRows.length + 4}`).format.verticalAlignment = "top";
eventSchema.getRange("A:A").format.columnWidth = 18;
eventSchema.getRange("B:B").format.columnWidth = 14;
eventSchema.getRange("C:C").format.columnWidth = 10;
eventSchema.getRange("D:D").format.columnWidth = 22;
eventSchema.getRange("E:E").format.columnWidth = 20;
eventSchema.getRange("F:F").format.columnWidth = 26;
eventSchema.getRange("G:G").format.columnWidth = 24;
eventSchema.getRange("H:H").format.columnWidth = 20;
eventSchema.getRange(`A5:H${eventRows.length + 4}`).format.rowHeight = 38;
eventSchema.freezePanes.freezeRows(4);

styleTitle(globalContent, "A1:G2");
globalContent.getRange("A4:G4").format.fill.color = "#4F81BD";
globalContent.getRange("A4:G4").format.font.color = "#FFFFFF";
globalContent.getRange("A4:G4").format.font.bold = true;
globalContent.getRange("A4:G4").format.horizontalAlignment = "center";
globalContent.getRange("A4:G4").format.verticalAlignment = "center";
globalContent.getRange(`A4:G${globalRows.length + 4}`).format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
globalContent.getRange(`A5:G${globalRows.length + 4}`).format.wrapText = true;
globalContent.getRange(`A5:G${globalRows.length + 4}`).format.verticalAlignment = "top";
globalContent.getRange("A:A").format.columnWidth = 16;
globalContent.getRange("B:B").format.columnWidth = 18;
globalContent.getRange("C:C").format.columnWidth = 10;
globalContent.getRange("D:D").format.columnWidth = 28;
globalContent.getRange("E:E").format.columnWidth = 16;
globalContent.getRange("F:F").format.columnWidth = 20;
globalContent.getRange("G:G").format.columnWidth = 22;
globalContent.getRange(`A5:G${globalRows.length + 4}`).format.rowHeight = 36;
globalContent.freezePanes.freezeRows(4);

const check = await workbook.inspect({
  kind: "table",
  sheetId: "Content Inventory",
  range: "A1:H24",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 8,
  maxChars: 5000,
});
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({
  sheetName: "Content Inventory",
  range: "A1:H30",
  scale: 1.4,
  format: "png",
  autoCrop: "all",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

console.log(JSON.stringify({ outputPath, previewPath }));
