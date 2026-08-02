import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/ayushpradhanang/Documents/pve/outputs/section4-security-20260802";
const outputPath = path.join(outputDir, "section-4-data-protection-security.xlsx");
const previewPath = path.join(outputDir, "section-4-data-protection-security.png");

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Section 4 Responses");
const assumptions = workbook.worksheets.add("Assumptions");
const references = workbook.worksheets.add("References");

sheet.showGridLines = false;
assumptions.showGridLines = false;
references.showGridLines = false;

const headers = [[
  "Section",
  "Item",
  "Client Question",
  "Proposed Response",
  "Included in Package",
  "Not Included / Client Responsibility",
  "Timing / SLA",
  "Remarks",
]];

const rows = [
  [
    "Section 4",
    "1",
    "What level of data protection and security is provided in this package? What is included?",
    "The package includes baseline application and hosting security appropriate for a production website handling customer enquiries and user data. This includes secure configuration of the application environment, HTTPS/TLS in transit, encryption at rest where supported by the hosting stack, role-based admin access, least-privilege access controls, strong password policy and MFA for admin accounts where supported, security patches for managed application components, logging for operational visibility, periodic backups, and incident-response coordination for confirmed security events affecting the solution.",
    "Application hardening; secure deployment configuration; HTTPS/TLS; encryption-at-rest support where available; access controls; backups; logging; incident coordination.",
    "Formal ISO/SOC certification, 24x7 SOC/SIEM, managed detection and response, cyber insurance, and external audit/attestation unless separately contracted.",
    "Applied during build, deployment, and handover; ongoing tasks depend on support scope.",
    "Safe draft for proposal use.",
  ],
  [
    "Section 4",
    "2",
    "What is NOT included in the package? What would we be responsible for separately?",
    "Items not included by default are legal compliance advisory, Data Protection Officer services, regulator filings, independent penetration testing, continuous security monitoring, cloud subscription costs, and third-party vendor audits. The client remains responsible for internal policy decisions, user-access approvals, lawful basis for processing, privacy notice text approval, retention policy approval, and any compliance sign-offs unless these are explicitly added to the statement of work.",
    "Implementation support and practical security controls within the agreed project scope.",
    "Legal advice, compliance certification, DPO services, managed SOC, independent pentest, cloud subscriptions, and vendor due diligence unless added separately.",
    "To be defined in the final statement of work.",
    "Good to keep as-is unless you are also selling managed support.",
  ],
  [
    "Section 4",
    "3",
    "Will you provide breach notifications? At what intervals?",
    "Yes. For any confirmed incident affecting customer personal data in the delivered solution and under our control, we will notify the client without undue delay after validation. Our proposed service level is an initial notification within 24 hours of confirming a reportable incident, followed by status updates every 24 hours until containment, and a final root-cause/remediation summary within 5 business days where reasonably possible. Separately, reportable cyber incidents that fall under CERT-In directions must be escalated to CERT-In within 6 hours of noticing the incident, where applicable.",
    "Client notification, containment updates, and incident summary for confirmed incidents within scope.",
    "Notifications for third-party systems outside scope unless they directly affect the delivered solution and we are engaged to manage them.",
    "Initial notice: target within 24 hours of confirmation. Updates: every 24 hours. Final summary: target within 5 business days.",
    "Combines contractual SLA language with the official CERT-In requirement.",
  ],
  [
    "Section 4",
    "4",
    "What would be the process if a breach occurs?",
    "The incident process is: detect and validate the event; contain the issue by isolating impacted systems and rotating credentials if needed; preserve logs and evidence; assess the nature, scope, and affected data; notify the client promptly; coordinate any required notices to affected individuals or regulators; remediate the vulnerability; restore services safely; and complete a post-incident review with corrective actions to reduce recurrence.",
    "Operational coordination, triage, containment support, evidence preservation, remediation support, and post-incident review for in-scope systems.",
    "External legal counsel, cyber-forensics retainer, public relations handling, and regulator representation unless separately engaged.",
    "Immediate response on confirmation; follow-up through closure.",
    "Safe draft for proposal use.",
  ],
  [
    "Section 4",
    "5",
    "Are you fully aware of the compliance requirements under the DPDP Act? Have you worked on other projects that required DPDP compliance?",
    "We are aware that the Digital Personal Data Protection Act, 2023 applies to digital personal data processed in India and can also apply to processing connected to offering goods or services to individuals in India. We can design the solution to support DPDP-aligned practices such as clear notices, consent capture where required, access controls, data minimisation, retention handling, and breach-response workflows. However, we do not provide legal certification and recommend that final legal review and compliance sign-off remain with the client or external counsel.",
    "DPDP-aware implementation support for product features and operational controls.",
    "Legal opinion, statutory interpretation, and formal compliance certification unless separately contracted.",
    "During requirements, build, UAT, and go-live preparation.",
    "Replace any experience claim with your real track record only. Do not state prior DPDP project experience unless true.",
  ],
  [
    "Section 4",
    "6",
    "Where will customer data be stored? Will it stay in India?",
    "Customer data will be stored in the production hosting environment selected for the project. If India-only data residency is a requirement, we can provision the application, database, storage, and backups in an India region or with an India-based hosting provider, subject to final vendor selection and service availability. Data residency in India should be treated as a contractual architecture decision and not assumed by default unless explicitly included in the final hosting scope.",
    "Ability to architect for India-resident hosting if included in scope and supported by the selected platform.",
    "Automatic India-only residency without an agreed hosting architecture and vendor selection.",
    "Confirmed during infrastructure design before production deployment.",
    "This answer should be tailored after you choose the host.",
  ],
  [
    "Section 4",
    "7",
    "Will data be encrypted in transit and at rest?",
    "Yes. Data will be encrypted in transit using HTTPS/TLS. Data at rest will be encrypted using hosting-platform and database encryption features where supported by the chosen infrastructure. Secrets and credentials will be stored using secure environment management rather than hard-coded in the application.",
    "TLS in transit; encryption-at-rest support; secure secret handling.",
    "Custom client-managed key management or HSM-based encryption unless specifically required and scoped.",
    "Enabled at deployment and maintained through the hosting environment.",
    "Safe draft for proposal use.",
  ],
  [
    "Section 4",
    "8",
    "Who is responsible for hosting security, and what measures will be taken?",
    "Hosting security follows a shared-responsibility model. The hosting provider is responsible for physical security, core infrastructure, and platform-level resilience. We are responsible for secure deployment configuration, application hardening, patching of application dependencies within scope, access-control configuration, backup setup, logging, and security best practices for the delivered solution. The client remains responsible for account ownership, approval of privileged users, business process controls, and any third-party systems that it operates directly.",
    "Secure configuration of the delivered stack and application-level controls.",
    "Physical datacentre security, cloud-provider core infrastructure, and client-managed third-party platforms.",
    "Applies throughout deployment and any active support period.",
    "Safe draft for proposal use.",
  ],
];

sheet.getRange("A1:H2").merge();
sheet.getRange("A1").values = [["SECTION 4: DATA PROTECTION AND SECURITY"]];
sheet.getRange("A3:H3").merge();
sheet.getRange("A3").values = [[
  "Draft client response matrix. Review Item 5 for your actual prior experience and Item 6 once hosting/data residency are confirmed.",
]];
sheet.getRange("A5:H5").values = headers;
sheet.getRange(`A6:H${rows.length + 5}`).values = rows;

sheet.getRange("A1:H2").format.fill.color = "#1F5FBF";
sheet.getRange("A1:H2").format.font.color = "#FFFFFF";
sheet.getRange("A1:H2").format.font.bold = true;
sheet.getRange("A1:H2").format.font.size = 16;
sheet.getRange("A1:H2").format.horizontalAlignment = "center";
sheet.getRange("A1:H2").format.verticalAlignment = "center";

sheet.getRange("A3:H3").format.fill.color = "#EAF2FF";
sheet.getRange("A3:H3").format.font.italic = true;
sheet.getRange("A3:H3").format.wrapText = true;
sheet.getRange("A3:H3").format.rowHeight = 36;

sheet.getRange("A5:H5").format.fill.color = "#4F81BD";
sheet.getRange("A5:H5").format.font.color = "#FFFFFF";
sheet.getRange("A5:H5").format.font.bold = true;
sheet.getRange("A5:H5").format.horizontalAlignment = "center";
sheet.getRange("A5:H5").format.verticalAlignment = "center";
sheet.getRange("A5:H5").format.wrapText = true;

const dataRange = sheet.getRange(`A6:H${rows.length + 5}`);
dataRange.format.wrapText = true;
dataRange.format.verticalAlignment = "top";
dataRange.format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
sheet.getRange("A5:H5").format.borders = { preset: "all", style: "thin", color: "#2F5597" };
sheet.getRange("A1:H3").format.borders = { preset: "outside", style: "thin", color: "#2F5597" };

sheet.getRange("A6:H13").format.rowHeight = 84;
sheet.getRange("A5:H13").format.font.size = 10;
sheet.getRange("A6:A13").format.horizontalAlignment = "center";
sheet.getRange("B6:B13").format.horizontalAlignment = "center";
sheet.getRange("G6:G13").format.horizontalAlignment = "center";

sheet.getRange("F6:F13").format.fill.color = "#FFF2CC";
sheet.getRange("H10:H11").format.fill.color = "#FCE4D6";

const widths = {
  A: 12,
  B: 8,
  C: 34,
  D: 52,
  E: 30,
  F: 34,
  G: 24,
  H: 26,
};
for (const [col, width] of Object.entries(widths)) {
  sheet.getRange(`${col}:${col}`).format.columnWidth = width;
}
sheet.freezePanes.freezeRows(5);

assumptions.getRange("A1:E2").merge();
assumptions.getRange("A1").values = [["Assumptions and Tailoring Notes"]];
assumptions.getRange("A4:E4").values = [[
  "Area",
  "Current Draft Position",
  "Why It Matters",
  "What To Confirm",
  "Send As-Is?",
]];
assumptions.getRange("A5:E9").values = [[
  "Hosting vendor",
  "Not yet specified in the repository or brief.",
  "Affects responsibility split, encryption features, backups, and support model.",
  "Choose hosting provider and support ownership.",
  "No - confirm first if the client expects named infrastructure."
],[
  "Data residency",
  "Draft says India-only hosting can be configured if required.",
  "India residency should be contractual if the client requires it.",
  "Confirm whether the proposal must guarantee in-country app, DB, object storage, and backups.",
  "Yes, but ideally confirm before final send."
],[
  "DPDP project experience",
  "Draft avoids making factual claims about prior projects.",
  "You should only state prior DPDP experience if it is true and defensible.",
  "Insert your actual project experience or leave as general capability.",
  "No - personalize this item."
],[
  "Managed support scope",
  "Draft assumes project delivery plus reasonable incident coordination, not a full MSSP/SOC service.",
  "This changes breach SLAs and ongoing obligations.",
  "Confirm whether you are also selling maintenance/monitoring.",
  "Yes, if this matches your commercial scope."
],[
  "Legal review",
  "Draft states legal compliance sign-off stays with client/external counsel.",
  "Important to avoid implying legal certification.",
  "Keep unless you have formal legal/compliance advisory scope.",
  "Yes."
]];

assumptions.getRange("A1:E2").format.fill.color = "#1F5FBF";
assumptions.getRange("A1:E2").format.font.color = "#FFFFFF";
assumptions.getRange("A1:E2").format.font.bold = true;
assumptions.getRange("A1:E2").format.font.size = 14;
assumptions.getRange("A4:E4").format.fill.color = "#4F81BD";
assumptions.getRange("A4:E4").format.font.color = "#FFFFFF";
assumptions.getRange("A4:E4").format.font.bold = true;
assumptions.getRange("A4:E9").format.wrapText = true;
assumptions.getRange("A4:E9").format.verticalAlignment = "top";
assumptions.getRange("A4:E9").format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
assumptions.getRange("A5:E9").format.rowHeight = 48;
for (const [col, width] of Object.entries({ A: 20, B: 34, C: 28, D: 28, E: 16 })) {
  assumptions.getRange(`${col}:${col}`).format.columnWidth = width;
}
assumptions.freezePanes.freezeRows(4);

references.getRange("A1:D2").merge();
references.getRange("A1").values = [["Official References Used For Drafting"]];
references.getRange("A4:D4").values = [[
  "Source",
  "URL",
  "Point Used",
  "Notes",
]];
references.getRange("A5:D8").values = [[
  "Digital Personal Data Protection Act, 2023",
  "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf",
  "Defines personal data breach; Act applies to digital personal data in India and certain processing connected to offering goods/services in India; transfer restrictions depend on notified countries/territories.",
  "Primary statute."
],[
  "Digital Personal Data Protection Rules, 2025",
  "https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf",
  "Rule 6 security safeguards include measures such as encryption, access control, logging, and business continuity; Rule 7 requires intimation of affected data principals without delay.",
  "Official rules; some provisions came into force in phases."
],[
  "CERT-In Directions dated 28.04.2022",
  "https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf",
  "Reportable cyber incidents must be reported to CERT-In within 6 hours of noticing such incidents or being informed about them.",
  "Official cyber incident reporting direction."
],[
  "CERT-In incident reporting page",
  "https://www.cert-in.org.in/SecurityIncident.jsp",
  "Operational reporting channel for incidents.",
  "Useful as an implementation reference."
]];

references.getRange("A1:D2").format.fill.color = "#1F5FBF";
references.getRange("A1:D2").format.font.color = "#FFFFFF";
references.getRange("A1:D2").format.font.bold = true;
references.getRange("A1:D2").format.font.size = 14;
references.getRange("A4:D4").format.fill.color = "#4F81BD";
references.getRange("A4:D4").format.font.color = "#FFFFFF";
references.getRange("A4:D4").format.font.bold = true;
references.getRange("A4:D8").format.wrapText = true;
references.getRange("A4:D8").format.verticalAlignment = "top";
references.getRange("A4:D8").format.borders = { preset: "all", style: "thin", color: "#C9D2E3" };
references.getRange("A5:D8").format.rowHeight = 56;
for (const [col, width] of Object.entries({ A: 28, B: 48, C: 44, D: 20 })) {
  references.getRange(`${col}:${col}`).format.columnWidth = width;
}

const inspection = await workbook.inspect({
  kind: "table",
  sheetId: "Section 4 Responses",
  range: "A1:H13",
  include: "values,formulas",
  tableMaxRows: 13,
  tableMaxCols: 8,
  maxChars: 5000,
});
console.log(inspection.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

await fs.mkdir(outputDir, { recursive: true });
const preview = await workbook.render({
  sheetName: "Section 4 Responses",
  range: "A1:H13",
  scale: 1.5,
  format: "png",
  autoCrop: "all",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(JSON.stringify({ outputPath, previewPath }));
