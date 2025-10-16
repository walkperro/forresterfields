import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { buildPlannerEmailHTML, buildPlannerEmailText } from "@/lib/mailer";

const resend = new Resend(process.env.RESEND_API_KEY);

// server-only Supabase admin client
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE;
  if (!url) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!service) throw new Error("Missing SUPABASE_SERVICE_ROLE");
  return createClient(url, service, { auth: { persistSession: false } });
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "planner-request" });
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // basic honeypot
    const gotcha = (form.get("_gotcha") ?? "").toString().trim();
    if (gotcha) return NextResponse.json({ ok: true, skipped: "honeypot" });

    const planner      = (form.get("planner") ?? "").toString();
    const email        = (form.get("email") ?? "").toString();
    const phone        = (form.get("phone") ?? "").toString();
    const event_date   = (form.get("event_date") ?? "").toString();
    // form uses "venue", older API used "city_venue" — accept both and normalize
    const venueInput   = (form.get("venue") ?? form.get("city_venue") ?? "").toString();
    const roles_needed = (form.get("roles_needed") ?? "").toString();
    const notes        = (form.get("notes") ?? "").toString();

    // --- 1) Insert (best effort)
    try {
      const supabase = getSupabaseAdmin();
      // Your table currently has a "venue" column (text)
      const { error } = await supabase.from("planner_requests").insert({
        planner,
        email,
        phone,
        event_date,
        venue: venueInput,
        roles_needed,
        notes,
        status: "new",
      });
      if (error) console.error("Supabase insert failed:", error.message);
    } catch (e) {
      console.error("Supabase insert threw (continuing):", e);
    }

    // --- 2) Email notifications
    const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@forresterfields.com>";
    const to   = process.env.NOTIFY_TO_EMAIL   || "forresterfieldsweddings@gmail.com";

    const subject = `Planner request: ${planner || "Unknown"} – ${event_date || "TBD"}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://forresterfields.vercel.app";

    const html = buildPlannerEmailHTML({
      planner,
      email,
      phone,
      event_date,
      city_venue: venueInput,
      roles_needed,
      notes,
      siteUrl,
    });
    const text = buildPlannerEmailText({
      planner,
      email,
      phone,
      event_date,
      city_venue: venueInput,
      roles_needed,
      notes,
      siteUrl,
    });

    // Send to Marisol
    try {
      const resp = await resend.emails.send({ from, to, subject, text, html });
      if (resp.error) console.error("Resend (admin) error:", resp.error);
    } catch (e) {
      console.error("Resend (admin) threw:", e);
    }

    // Optional: confirmation to planner if it looks like an email and isn’t Marisol’s
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (looksLikeEmail && email.toLowerCase() !== to.toLowerCase()) {
      try {
        const confSubject = "We got your request – Forrester Fields";
        const confText =
`Hi ${planner || "there"},

Thanks for your request! We’ll get back to you shortly.

Summary:
- Event date: ${event_date || "TBD"}
- City/Venue: ${venueInput || "—"}
- Roles needed: ${roles_needed || "—"}

— Forrester Fields`;
        const confHtml =
`<p>Hi ${planner || "there"},</p>
<p>Thanks for your request! We’ll get back to you shortly.</p>
<p><b>Summary</b><br/>
Event date: ${event_date || "TBD"}<br/>
City/Venue: ${venueInput || "—"}<br/>
Roles needed: ${roles_needed || "—"}</p>
<p>— Forrester Fields</p>`;

        const resp2 = await resend.emails.send({
          from,
          to: email,
          subject: confSubject,
          text: confText,
          html: confHtml,
        });
        if (resp2.error) console.error("Resend (confirm) error:", resp2.error);
      } catch (e) {
        console.error("Resend (confirm) threw:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
