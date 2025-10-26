import type { } from "react"; // keep TS happy for isolatedModules if enabled

export type PlannerEmailData = {
  planner: string;
  email: string;
  phone: string;
  event_date: string;
  city_venue: string;
  roles_needed: string;
  notes: string;
  siteUrl: string; // e.g. https://forresterfields.vercel.app
};

export type InquiryEmailData = {
  name: string;
  email: string;
  phone: string;
  event_date: string;
  type_of_event: string;
  type_of_event_other: string;
  inquiry_about: string;
  message: string;
  siteUrl: string;
};

export type WorkerEmailData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  age: string;
  availability: string;
  roles: string;             // already joined as comma string
  references_text: string;
  experience: string;
  siteUrl: string;
};

// ---------- shared helpers ----------
function safe(s: string) {
  return (s || "").replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}
function br(s: string) {
  return safe(s).replace(/\n/g, "<br/>");
}
function logoUrl(siteUrl: string) {
  return siteUrl.replace(/\/$/, "") + "/media/forresterfields/logo.png";
}
function cardHTML(opts: { title: string; rowsHTML: string; btnHref: string; siteUrl: string }) {
  const LOGO = logoUrl(opts.siteUrl);
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <meta name="viewport" content="width=device-width"/>
    <style>
      :root { color-scheme: light only; }
      body{margin:0;background:#fdf2f8;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827}
      .wrap{max-width:640px;margin:24px auto;padding:0 16px}
      .card{background:#ffffff;border:1px solid #f5d0ea;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(16,24,40,.04)}
      .hdr{background:#e11d48;color:#fff;padding:18px 20px;display:flex;align-items:center;gap:10px}
      .hdr img{display:block;height:28px}
      .hdr h1{font-size:18px;line-height:1.2;margin:0}
      .body{padding:22px;background:#fff}
      .row{display:flex;gap:12px;margin:10px 0}
      .key{width:160px;color:#6b7280;font-weight:500}
      .val{flex:1;color:#111827}
      .btn{display:inline-block;margin-top:16px;background:#9f1239;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:700}
      .muted{color:#9ca3af;font-size:12px;margin-top:18px}
      a{color:#9f1239}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="hdr">
          <img src="${LOGO}" alt="Forrester Fields logo" height="28" />
          <h1>${opts.title}</h1>
        </div>
        <div style="height:4px;background:#fda4af;"></div>
        <div class="body">
          ${opts.rowsHTML}
          <a class="btn" href="${opts.btnHref}">View in Admin</a>
          <div class="muted">Sent from ${safe(opts.siteUrl.replace(/^https?:\/\//,""))}</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
}

// ---------- Planner ----------
export function buildPlannerEmailHTML(d: PlannerEmailData) {
  const rows = [
    ["Planner", safe(d.planner)],
    ["Email", safe(d.email)],
    ["Phone", safe(d.phone)],
    ["Event date", safe(d.event_date)],
    ["City / Venue", safe(d.city_venue)],
    ["Roles needed", safe(d.roles_needed)],
    ["Notes", br(d.notes) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return cardHTML({ title: "New Planner Request", rowsHTML: rows, btnHref: `${d.siteUrl}/admin/requests`, siteUrl: d.siteUrl });
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
    "",
    `View: ${d.siteUrl}/admin/requests`,
  ].join("\n");
}

// ---------- Inquiry ----------
export function buildInquiryEmailHTML(d: InquiryEmailData) {
  const rows = [
    ["Name", safe(d.name)],
    ["Email", safe(d.email)],
    ["Phone", safe(d.phone)],
    ["Event date", safe(d.event_date)],
    ["Type of event", safe(d.type_of_event) + (d.type_of_event_other ? ` (${safe(d.type_of_event_other)})` : "")],
    ["Inquiring about", safe(d.inquiry_about)],
    ["Message", br(d.message) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return cardHTML({ title: "New Inquiry", rowsHTML: rows, btnHref: `${d.siteUrl}/admin/inquiries`, siteUrl: d.siteUrl });
}
export function buildInquiryEmailText(d: InquiryEmailData) {
  return [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Event date: ${d.event_date}`,
    `Type of event: ${d.type_of_event}${d.type_of_event_other ? " ("+d.type_of_event_other+")" : ""}`,
    `Inquiring about: ${d.inquiry_about}`,
    `Message:`,
    d.message || "—",
    "",
    `View: ${d.siteUrl}/admin/inquiries`,
  ].join("\n");
}

// ---------- Worker ----------
export function buildWorkerEmailHTML(d: WorkerEmailData) {
  const rows = [
    ["Name", safe(d.name)],
    ["Email", safe(d.email)],
    ["Phone", safe(d.phone)],
    ["City", safe(d.city)],
    ["Age", safe(d.age)],
    ["Availability", safe(d.availability)],
    ["Roles", safe(d.roles)],
    ["References", br(d.references_text) || "—"],
    ["Experience", br(d.experience) || "—"],
  ].map(([k,v]) => `<div class="row"><div class="key">${k}</div><div class="val">${v}</div></div>`).join("");
  return cardHTML({ title: "New Worker Application", rowsHTML: rows, btnHref: `${d.siteUrl}/admin/workers`, siteUrl: d.siteUrl });
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
    "",
    "References:",
    d.references_text || "—",
    "",
    "Experience:",
    d.experience || "—",
    "",
    `View: ${d.siteUrl}/admin/workers`,
  ].join("\n");
}
