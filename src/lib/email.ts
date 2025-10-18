import { resend } from "@/lib/resend";

export type WorkerPayload = {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  age?: string;
  availability?: string;
  roles?: string[];
  references_text?: string;
  experience?: string;
};

export async function sendWorkerApplicationEmail(to: string, payload: WorkerPayload) {
  const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@forresterfields.com>";
  const subject = `New Worker Application – ${payload.name || "Unknown"}`;
  const html = buildWorkerHTML(payload);
  const text = buildWorkerText(payload);
  try { await resend.emails.send({ from, to, subject, html, text }); } catch (err) { console.error("[resend] worker email send failed:", err); }

  if (payload.email && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(payload.email) && payload.email.toLowerCase() !== to.toLowerCase()) {
    try {
      await resend.emails.send({
        from, to: payload.email,
        subject: "We received your application – Forrester Fields",
        html: `<p>Hi ${payload.name || "there"},</p><p>Thank you for applying to join our Event Pool at <b>Forrester Fields</b>.</p><p>We’ll review your application and get back to you if there’s a good fit for upcoming events.</p><p>Warm regards,<br/>The Forrester Fields Team</p>`,
        text: `Hi ${payload.name || "there"},\n\nThank you for applying to join our Event Pool at Forrester Fields.\nWe’ll review your application and reach out if there’s a good fit for upcoming events.\n\nWarm regards,\nThe Forrester Fields Team`
      });
    } catch (err) { console.warn("[resend] applicant confirmation failed:", err); }
  }
}

export async function sendWorkerDecisionEmail(to: string, payload: WorkerPayload, decision: "accept" | "deny", note?: string) {
  const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@forresterfields.com>";
  if (!payload.email) return;
  const subj = decision === "accept" ? "Welcome to the Event Pool – Forrester Fields" : "Thank you for your application – Forrester Fields";
  const html = decision === "accept"
    ? `<p>Hi ${payload.name || "there"},</p><p>We’re excited to let you know that you’ve been <b>accepted</b> into our Event Pool at Forrester Fields!</p><p>We’ll be in touch soon with event details and next steps.</p>${note ? `<p><i>Note from coordinator:</i><br/>${note}</p>` : ""}<p>Welcome aboard,<br/>The Forrester Fields Team</p>`
    : `<p>Hi ${payload.name || "there"},</p><p>Thank you so much for applying to join our Event Pool.</p><p>After review, we won’t be moving forward at this time, but we appreciate your interest and wish you the best in future opportunities.</p>${note ? `<p><i>Note from coordinator:</i><br/>${note}</p>` : ""}<p>Warm regards,<br/>The Forrester Fields Team</p>`;
  const text = html.replace(/<[^>]+>/g, "").replace(/\\s+/g, " ").trim();
  try { await resend.emails.send({ from, to: payload.email, subject: subj, html, text }); } catch (err) { console.error("[resend] decision email failed:", err); }
}

function safe(v: unknown) { return String(v ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function join(a?: string[]) { return Array.isArray(a) ? a.join(", ") : safe(a); }

function buildWorkerHTML(d: WorkerPayload): string {
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/><style>
  body{background:#f9fafb;margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1f1f1f;}
  .wrap{max-width:640px;margin:32px auto;padding:0 16px;}
  .card{background:white;border-radius:16px;box-shadow:0 2px 4px rgba(0,0,0,0.06);border:1px solid #e5e7eb;overflow:hidden;}
  .hdr{background:#123524;color:white;padding:24px 28px;}
  .hdr h1{margin:0;font-size:20px;font-weight:600;}
  .body{padding:28px;}
  .row{margin:8px 0;}
  .key{font-weight:600;color:#475467;width:130px;display:inline-block;}
  .val{color:#101828;}
  .btn{display:inline-block;margin-top:20px;background:#184A2C;color:white;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;}
  .muted{margin-top:20px;color:#667085;font-size:12px;}
  </style></head><body><div class="wrap"><div class="card"><div class="hdr"><h1>New Worker Application</h1></div>
  <div class="body"><p>You’ve received a new worker application from <b>${safe(d.name) || "—"}</b>.</p>
  <div class="row"><span class="key">Email:</span><span class="val">${safe(d.email) || "—"}</span></div>
  <div class="row"><span class="key">Phone:</span><span class="val">${safe(d.phone) || "—"}</span></div>
  <div class="row"><span class="key">City:</span><span class="val">${safe(d.city) || "—"}</span></div>
  <div class="row"><span class="key">Age:</span><span class="val">${safe(d.age) || "—"}</span></div>
  <div class="row"><span class="key">Availability:</span><span class="val">${safe(d.availability) || "—"}</span></div>
  <div class="row"><span class="key">Roles:</span><span class="val">${join(d.roles) || "—"}</span></div>
  <div class="row"><span class="key">References:</span><span class="val">${safe(d.references_text) || "—"}</span></div>
  <div class="row"><span class="key">Experience:</span><span class="val">${safe(d.experience) || "—"}</span></div>
  ${d.email ? `<a class="btn" href="mailto:${encodeURIComponent(d.email)}?subject=Regarding your Forrester Fields application">Reply to Applicant</a>` : ""}
  <div class="muted">Forrester Fields • Loganville, GA</div></div></div></div></body></html>`;
}

function buildWorkerText(d: WorkerPayload): string {
  return [
    `New worker application:`,
    `Name: ${d.name || "—"}`,
    `Email: ${d.email || "—"}`,
    `Phone: ${d.phone || "—"}`,
    `City: ${d.city || "—"}`,
    `Age: ${d.age || "—"}`,
    `Availability: ${d.availability || "—"}`,
    `Roles: ${(d.roles || []).join(", ") || "—"}`,
    `References: ${d.references_text || "—"}`,
    `Experience: ${d.experience || "—"}`,
  ].join("\\n");
}
