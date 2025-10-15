import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type InsertRow = {
  planner_name: string | null;
  email: string | null;
  phone: string | null;
  event_date: string | null;   // send as YYYY-MM-DD (Supabase will coerce to date)
  city_venue: string | null;
  roles_needed: string | null;
  notes: string | null;
  status?: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // raw fields (from form or cURL)
    const planner      = (form.get("planner") ?? "").toString().trim();
    const email        = (form.get("email") ?? "").toString().trim();
    const phone        = (form.get("phone") ?? "").toString().trim();
    const eventRaw     = (form.get("event_date") ?? "").toString().trim();
    const city_venue   = (form.get("city_venue") ?? form.get("venue") ?? "").toString().trim();
    const roles_needed = (form.get("roles_needed") ?? "").toString().trim();
    const notes        = (form.get("notes") ?? "").toString().trim();

    // normalize date to YYYY-MM-DD if user sent 10/20/2025
    const event_date = eventRaw.includes("/")
      ? eventRaw.split("/").reverse().join("-")
      : eventRaw || null;

    // --- 1) Insert into Supabase ---
    let insertedId: string | null = null;
    try {
      const supabase = getSupabaseAdmin();

      const payload: InsertRow = {
        planner_name: planner || null,
        email: email || null,
        phone: phone || null,
        event_date,
        city_venue: city_venue || null,
        roles_needed: roles_needed || null,
        notes: notes || null,
        status: "new",
      };

      const { data, error } = await supabase
        .from("planner_requests")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        insertedId = data?.id ?? null;
      }
    } catch (e) {
      console.error("Supabase insert threw:", e);
    }

    // --- 2) Email notification (best effort) ---
    const from = process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@forresterfields.com>";
    const to   = process.env.NOTIFY_TO_EMAIL   || "forresterfieldsweddings@gmail.com";

    const subject = `Planner request: ${planner || "Unknown"} – ${eventRaw || "TBD"}`;
    const html = `<h2>Planner request</h2>
      <p><b>Planner:</b> ${planner || "(n/a)"}<br/>
      <b>Email:</b> ${email || "(n/a)"}<br/>
      <b>Phone:</b> ${phone || "(n/a)"}<br/>
      <b>Event date:</b> ${eventRaw || "(n/a)"}<br/>
      <b>City/Venue:</b> ${city_venue || "(n/a)"}</p>
      <p><b>Roles needed:</b> ${roles_needed || "(n/a)"}</p>
      <p><b>Notes:</b><br/>${(notes || "").replace(/\n/g, "<br/>")}</p>
      <p><i>Request ID:</i> ${insertedId ?? "(none)"}</p>`;

    try {
      await resend.emails.send({
        from,
        to,
        subject,
        replyTo: email || undefined,
        text: `Planner: ${planner}
Email: ${email}
Phone: ${phone}
Event date: ${eventRaw}
City/Venue: ${city_venue}
Roles needed: ${roles_needed}
Notes:
${notes}

Request ID: ${insertedId ?? "(none)"}`,
        html,
      });
    } catch (e) {
      console.error("Resend send threw:", e);
    }

    return NextResponse.json({ ok: true, id: insertedId });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("planner-request POST error:", err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
