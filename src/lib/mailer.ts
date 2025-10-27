/* eslint-disable */
type InquiryEmailData = {
  name: string; email: string; phone: string;
  event_date: string; type_of_event: string; type_of_event_other?: string;
  inquiry_about: string; message: string; siteUrl: string;
};
type WorkerEmailData = {
  name: string; email: string; phone: string; city: string; age: string;
  availability: string; roles: string; references_text: string; experience: string; siteUrl: string;
};
type PlannerEmailData = {
  planner: string; email: string; phone: string; event_date: string;
  city_venue: string; roles_needed: string; notes: string; siteUrl: string;
};

const PINK = "#f472b6";         // lighter pink
const PINK_DIVIDER = "#fbcfe8"; // very light divider
const KEY = "#64748b";          // slate-500
const CARD_BG = "#111315";      // dark card (works in light/dark Gmail)
const CARD_BORDER = "#2a2d35";

function esc(t: string) {
  return String(t ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
function br(t: string) {
  return esc(t).replace(/\n/g, "<br/>");
}

function shell(title: string, rowsHtml: string, adminHref: string, siteUrl: string): string {
  const logoUrl = `${siteUrl.replace(/\/$/,'')}/media/forresterfields/logo.png`; // place your logo here: public/logo-email.png

  const CSS = `
    body{margin:0;background:#0b0b0b;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
    .wrap{max-width:640px;margin:24px auto;padding:0 16px}
    .card{background:${CARD_BG};border:1px solid ${CARD_BORDER};border-radius:16px;overflow:hidden}
    /* White header (force white even in dark-mode) */
    .hdr{background:#ffffff!important;color:${PINK};padding:22px 24px;display:flex;align-items:center;gap:14px}
    .hdr img{display:block;height:44px;width:auto;margin-right:8px;border-radius:6px}
    .hdr h1{margin:0;font-size:24px;line-height:1.15;color:${PINK}}
    .divider{height:3px;background:${PINK_DIVIDER}}
    .body{padding:22px}
    .row{display:flex;gap:12px;margin:10px 0}
    .key{width:170px;color:${KEY}}
    .val{flex:1;color:${PINK}}
    .btn{display:inline-block;margin-top:18px;background:#ffffff;color:${PINK};text-decoration:none;padding:12px 18px;border-radius:12px;font-weight:700;border:1px solid ${PINK_DIVIDER}}
  `;

  return `<!doctype html>
  <html><head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width"/>
    <meta name="color-scheme" content="light dark"/>
    <style>${CSS}</style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="hdr">
          <img src="${esc(logoUrl)}" alt="Forrester Fields logo"/>
          <h1>${esc(title)}</h1>
        </div>
        <div class="divider"></div>
        <div class="body">
          ${rowsHtml}
          <a class="btn" href="${esc(adminHref)}">View in Admin</a>
        </div>
      </div>
    </div>
  </body></html>`;
}

/* ---------- Inquiry ---------- */

export function buildInquiryEmailHTML(d: InquiryEmailData) {
  const rows = [
    ["Name", esc(d.name)],
    ["Email", esc(d.email)],
    ["Phone", esc(d.phone)],
    ["Event date", esc(d.event_date)],
    ["Type of event", esc(d.type_of_event) + (d.type_of_event_other ? ` ( ${esc(d.type_of_event_other)} )` : "")],
    ["Inquiring about", esc(d.inquiry_about)],
    ["Message", br(d.message) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return shell("New Inquiry", rows, `${d.siteUrl}/admin/inquiries`, d.siteUrl);
}

export function buildInquiryEmailText(d: InquiryEmailData) {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Event date: ${d.event_date}`,
    `Type of event: ${d.type_of_event}${d.type_of_event_other ? ` (${d.type_of_event_other})` : ""}`,
    `Inquiring about: ${d.inquiry_about}`,
    `Message:`,
    d.message || "—",
    ``,
    `View: ${d.siteUrl}/admin/inquiries`,
  ].join("\n");
}

/* ---------- Worker ---------- */

export function buildWorkerEmailHTML(d: WorkerEmailData) {
  const rows = [
    ["Name", esc(d.name)],
    ["Email", esc(d.email)],
    ["Phone", esc(d.phone)],
    ["City", esc(d.city)],
    ["Age", esc(d.age)],
    ["Availability", esc(d.availability)],
    ["Roles", esc(d.roles)],
    ["References", br(d.references_text) || "—"],
    ["Experience", br(d.experience) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return shell("New Worker Application", rows, `${d.siteUrl}/admin/workers`, d.siteUrl);
}

export function buildWorkerEmailText(d: WorkerEmailData) {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `City: ${d.city}`,
    `Age: ${d.age}`,
    `Availability: ${d.availability}`,
    `Roles: ${d.roles}`,
    ``,
    `References:`,
    d.references_text || "—",
    ``,
    `Experience:`,
    d.experience || "—",
    ``,
    `View: ${d.siteUrl}/admin/workers`,
  ].join("\n");
}

/* ---------- Planner ---------- */

export function buildPlannerEmailHTML(d: PlannerEmailData) {
  const rows = [
    ["Planner", esc(d.planner)],
    ["Email", esc(d.email)],
    ["Phone", esc(d.phone)],
    ["Event date", esc(d.event_date)],
    ["City / Venue", esc(d.city_venue)],
    ["Roles needed", esc(d.roles_needed)],
    ["Notes", br(d.notes) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return shell("New Planner Request", rows, `${d.siteUrl}/admin/requests`, d.siteUrl);
}

export function buildPlannerEmailText(d: PlannerEmailData) {
  return [
    `Planner: ${d.planner}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Event date: ${d.event_date}`,
    `City/Venue: ${d.city_venue}`,
    `Roles needed: ${d.roles_needed}`,
    `Notes:`,
    d.notes || "—",
    ``,
    `View: ${d.siteUrl}/admin/requests`,
  ].join("\n");
}
