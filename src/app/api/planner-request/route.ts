/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import resend from "@/lib/resend";
import { buildPlannerEmailHTML, buildPlannerEmailText } from "@/lib/mailer";

function norm(v: unknown) { return String(v ?? "").trim(); }

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createSupabaseClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    // ---- Parse body (JSON or form-data) ----
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let raw: Record<string, unknown> = {};
    if (ct.includes("application/json")) {
      raw = (await req.json()) as Record<string, unknown>;
    } else {
      const fd = await req.formData();
      raw = Object.fromEntries(fd.entries());
    }

    const planner      = norm(raw.planner ?? raw.name);
    const email        = norm(raw.email);
    const phone        = norm(raw.phone);
    const event_date   = norm(raw.event_date ?? raw.date ?? "");
    const city_venue   = norm(raw.city_venue ?? raw.venue ?? raw.city);
    const roles_needed = norm(raw.roles_needed ?? raw.roles);
    const notes        = norm(raw.notes ?? raw.description ?? raw.brief_description);

    if (!planner || !email) {
      return NextResponse.json({ ok:false, error:"Planner and Email are required." }, { status: 400 });
    }

    // ---- Insert into Supabase ----
    const db = admin();
    const row: Record<string, unknown> = {
      planner_name: planner,
      email,
      phone,
      city_venue,
      roles_needed,
      notes,
      status: "new",
    };
    if (event_date) row.event_date = event_date;

    const { data, error } = await db.from("planner_requests").insert(row).select("id").single();
    if (error) {
      return NextResponse.json({ ok:false, error: error.message }, { status: 500 });
    }

    // ---- Email notify ----
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "https://forresterfields.vercel.app";
    const html = buildPlannerEmailHTML({
      planner, email, phone,
      event_date: event_date || "(TBD)",
      city_venue, roles_needed, notes,
      siteUrl: origin,
    } as any);
    const text = buildPlannerEmailText({
      planner, email, phone,
      event_date: event_date || "(TBD)",
      city_venue, roles_needed, notes,
      siteUrl: origin,
    } as any);

    await resend.emails.send({
      from: process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@walkperro.com>",
      to:   process.env.NOTIFY_TO_EMAIL   || "forresterfieldsweddings@gmail.com",
      subject: "New Planner Request",
      html,
      text,
    });

    return NextResponse.json({ ok:true, id: data?.id ?? null });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok:false, error: msg }, { status: 500 });
  }
}
