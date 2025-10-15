/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type InsertRow = {
  planner_name: string | null;
  email: string | null;
  phone: string | null;
  event_date: string | null;
  city_venue: string | null;
  roles_needed: string | null;
  notes: string | null;
  status?: string | null;
};

function brandWrap(title: string, bodyHtml: string) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      .card{max-width:640px;margin:24px auto;padding:24px;border-radius:16px;border:1px solid #e5e7eb;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#fff}
      h1{margin:0 0 12px 0;font-size:22px}
      .muted{color:#6b7280;font-size:13px}
      .row b{display:inline-block;min-width:120px}
      .footer{margin-top:24px;padding-top:12px;border-top:1px solid #eee}
      .btn{display:inline-block;padding:10px 14px;border-radius:10px;border:1px solid #111;text-decoration:none;color:#111}
    </style>
  </head>
  <body style="background:#0b0b0b;padding:16px">
    <div class="card">
      <h1>${title}</h1>
      ${bodyHtml}
      <div class="footer muted">
        Request ID: {{REQUEST_ID}} • Sent by Forrester Fields via WalkPerro
      </div>
    </div>
  </body>
  </html>`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const planner      = (form.get("planner") ?? form.get("planner_name") ?? "").toString().trim() || null;
    const email        = (form.get("email") ?? "").toString().trim() || null;
    const phone        = (form.get("phone") ?? "").toString().trim() || null;
    const event_date   = (form.get("event_date") ?? "").toString().trim() || null;
    const city_venue   = (form.get("city_venue") ?? form.get("venue") ?? "").toString().trim() || null;
    const roles_needed = (form.get("roles_needed") ?? "").toString().trim() || null;
    const notes        = (form.get("notes") ?? "").toString() || null;

    // --- 1) Insert row ------------------------------------------------------
    const supabase = getSupabaseAdmin();
    const { data: inserted, error } = await supabase
      .from("planner_requests")
      .insert<InsertRow>({
        planner_name: planner,
        email,
        phone,
        event_date,
        city_venue,
        roles_needed,
        notes,
        status: "new",
      })
      .select("id")
      .single();

    const rowId = (inserted as any)?.id ?? null;
    if (error) console.error("Supabase insert error:", error);

    // --- Email content -------------------------------------------------------
    const adminFrom = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@walkperro.com>";
    const adminTo   = process.env.NOTIFY_TO_EMAIL   || "forresterfieldsweddings@gmail.com";
    const replyTo   = process.env.REPLY_TO_EMAIL    || "forresterfieldsweddings@gmail.com";

    const subject = `Planner request: ${planner ?? "Unknown"} – ${event_date ?? "TBD"}`;

    const internalHtml = brandWrap("Planner request", `
      <div class="row"><b>Planner:</b> ${planner ?? "-"}</div>
      <div class="row"><b>Email:</b> ${email ?? "-"}</div>
      <div class="row"><b>Phone:</b> ${phone ?? "-"}</div>
      <div class="row"><b>Event date:</b> ${event_date ?? "-"}</div>
      <div class="row"><b>City/Venue:</b> ${city_venue ?? "-"}</div>
      <div class="row"><b>Roles needed:</b> ${roles_needed ?? "-"}</div>
      <div style="margin-top:12px"><b>Notes:</b><br/>${(notes ?? "").replace(/\n/g,"<br/>")}</div>
      <div style="margin-top:16px"><a class="btn" href="mailto:${email ?? replyTo}?subject=Re:%20Forrester%20Fields%20planner%20request">Reply</a></div>
    `).replace("{{REQUEST_ID}}", rowId ?? "—");

    const textBlock = `Planner: ${planner ?? "-"}
Email: ${email ?? "-"}
Phone: ${phone ?? "-"}
Event date: ${event_date ?? "-"}
City/Venue: ${city_venue ?? "-"}
Roles needed: ${roles_needed ?? "-"}
Notes:
${notes ?? "-"}

Request ID: ${rowId ?? "—"}`;

    // Send to Marisol (internal notification)
    try {
      await resend.emails.send({
        from: adminFrom,
        to: adminTo,
        replyTo,
        subject,
        text: textBlock,
        html: internalHtml,
      });
    } catch (e) {
      console.error("Resend internal email error:", e);
    }

    // Auto-reply to the planner (if they provided an email)
    if (email) {
      const confirmHtml = brandWrap("Thanks for reaching out to Forrester Fields!", `
        <p>Hi ${planner ?? "there"},</p>
        <p>We received your planner request and will get back to you shortly.</p>
        <div class="row"><b>Event date:</b> ${event_date ?? "-"}</div>
        <div class="row"><b>City/Venue:</b> ${city_venue ?? "-"}</div>
        <p class="muted" style="margin-top:12px">If any details change, just reply to this email.</p>
      `).replace("{{REQUEST_ID}}", rowId ?? "—");

      try {
        await resend.emails.send({
          from: adminFrom,         // must be a verified sender/domain
          to: email,
          replyTo,
          subject: "We received your request – Forrester Fields",
          text: `Thanks for reaching out! We received your request and will respond shortly.\n\nRequest ID: ${rowId ?? "—"}`,
          html: confirmHtml,
        });
      } catch (e) {
        console.error("Resend confirmation email error:", e);
      }
    }

    return NextResponse.json({ ok: true, id: rowId });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok:false, error: String(err) }, { status: 500 });
  }
}
