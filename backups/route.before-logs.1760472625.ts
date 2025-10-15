import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

// Inline Supabase admin client (SERVICE ROLE; server-only)
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

    const planner      = (form.get("planner") ?? "").toString();
    const email        = (form.get("email") ?? "").toString();
    const phone        = (form.get("phone") ?? "").toString();
    const event_date   = (form.get("event_date") ?? "").toString();
    const venue        = (form.get("venue") ?? "").toString(); // <-- matches your form
    const roles_needed = (form.get("roles_needed") ?? "").toString();
    const notes        = (form.get("notes") ?? "").toString();

    // 1) Best-effort DB insert
    try {
      const supabaseAdmin = getSupabaseAdmin();
      await supabaseAdmin.from("planner_requests").insert({
        planner, email, phone, event_date, venue, roles_needed, notes,
      });
    } catch (e) {
      console.error("Supabase insert failed (continuing):", e);
    }

    // 2) Email
    const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <onboarding@resend.dev>";
    const to   = process.env.NOTIFY_TO_EMAIL   || "forresterfieldsweddings@gmail.com";

    console.log("EMAIL_ENV", { from, to });
    console.log("FORM_ENTRIES", { planner, email, phone, event_date, venue, roles_needed, notes });

    try {
      await resend.emails.send({
        from,
        to,
        subject: `Planner request: ${planner || "Unknown"} – ${event_date || "TBD"}`,
        text:
`Planner: ${planner}
Email: ${email}
Phone: ${phone}
Event date: ${event_date}
Venue: ${venue}
Roles needed: ${roles_needed}
Notes:
${notes}
`,
        html:
`<h2>Planner request</h2>
<p><b>Planner:</b> ${planner}<br/>
<b>Email:</b> ${email}<br/>
<b>Phone:</b> ${phone}</p>
<p><b>Event date:</b> ${event_date}<br/>
<b>Venue:</b> ${venue}</p>
<p><b>Roles needed:</b> ${roles_needed}</p>
<p><b>Notes:</b><br/>${(notes || "").replace(/\n/g,"<br/>")}</p>`
      });
      console.log("RESEND_OK");
    } catch (e: unknown) {
      const dump = (e && typeof e === "object")
        ? JSON.stringify(e, Object.getOwnPropertyNames(e as object))
        : String(e);
      console.error("RESEND_ERROR", dump);
      // Re-throw so the client gets a 500
      throw e;
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("API_ERROR", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
