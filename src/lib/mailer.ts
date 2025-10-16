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

export function buildPlannerEmailHTML(d: PlannerEmailData) {
  const safe = (s: string) => (s || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const noteHTML = safe(d.notes).replace(/\n/g, "<br/>");
  const btnUrl = `${d.siteUrl}/admin/requests`;

  return `<!doctype html>
<html>
  <head><meta charset="utf-8" />
    <meta name="viewport" content="width=device-width"/>
    <style>
      body{margin:0;background:#f6f7fb;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111}
      .wrap{max-width:640px;margin:24px auto;padding:0 16px}
      .card{background:#fff;border:1px solid #e6e8ee;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(16,24,40,.04)}
      .hdr{background:#123524;color:#fff;padding:20px 22px}
      .hdr h1{font-size:18px;line-height:1.2;margin:0}
      .body{padding:22px}
      .row{display:flex;gap:12px;margin:10px 0}
      .key{width:140px;color:#475467}
      .val{flex:1;color:#101828}
      .btn{display:inline-block;margin-top:16px;background:#184A2C;color:#fff;text-decoration:none;padding:12px 18px;border-radius:10px;font-weight:600}
      .muted{color:#667085;font-size:12px;margin-top:18px}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <div class="hdr"><h1>New Planner Request</h1></div>
        <div class="body">
          <div class="row"><div class="key">Planner</div><div class="val">${safe(d.planner)}</div></div>
          <div class="row"><div class="key">Email</div><div class="val">${safe(d.email)}</div></div>
          <div class="row"><div class="key">Phone</div><div class="val">${safe(d.phone)}</div></div>
          <div class="row"><div class="key">Event date</div><div class="val">${safe(d.event_date)}</div></div>
          <div class="row"><div class="key">City / Venue</div><div class="val">${safe(d.city_venue)}</div></div>
          <div class="row"><div class="key">Roles needed</div><div class="val">${safe(d.roles_needed)}</div></div>
          <div class="row" style="align-items:flex-start"><div class="key">Notes</div><div class="val">${noteHTML || "—"}</div></div>
          <a class="btn" href="${btnUrl}">View in Admin</a>
          <div class="muted">Sent from ${safe(d.siteUrl.replace(/^https?:\/\//,""))}</div>
        </div>
      </div>
    </div>
  </body>
</html>`;
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
