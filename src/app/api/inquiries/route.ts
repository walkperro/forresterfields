import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import resend from "@/lib/resend";
import { buildInquiryEmailHTML, buildInquiryEmailText } from "@/lib/mailer";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

function s(v: unknown) { return String(v ?? "").trim(); }

export async function POST(req: NextRequest) {
  try {
    // Accept JSON or FormData
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let body: Record<string, unknown> = {};
    if (ct.includes("application/json")) {
      body = await req.json();
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
    }

    const payload = {
      name: s(body.name),
      email: s(body.email),
      phone: s(body.phone),
      event_date: s(body.event_date), // yyyy-mm-dd from date input
      type_of_event: s(body.type_of_event),
      type_of_event_other: s(body.type_of_event_other),
      inquiry_about: s(body.inquiry_about),
      message: s(body.message),
      status: "new",
    };

    if (!payload.name || !payload.email) {
      return NextResponse.json({ ok: false, error: "Name and Email are required." }, { status: 400 });
    }

    const supa = admin();
    const { data, error } = await supa
      .from("inquiries")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    // Email notify Marisol
    try {
      const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://forresterfields.vercel.app";
      const html = buildInquiryEmailHTML({ ...payload, siteUrl: origin });
      const text = buildInquiryEmailText({ ...payload, siteUrl: origin });
      await resend.emails.send({
        from: "Forrester Fields <noreply@forresterfields.com>",
        to: [process.env.NOTIFY_TO_EMAIL || "forresterfieldsweddings@gmail.com"],
        subject: "New Inquiry",
        html,
        text,
      });
    } catch (e) {
      console.warn("[inquiries email] failed", e);
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
