/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import resend from "@/lib/resend";
import { buildPlannerEmailHTML, buildPlannerEmailText } from "@/lib/mailer";

function norm(v: unknown) { return String(v ?? "").trim(); }

export async function POST(req: NextRequest) {
  try {
    // read body (JSON or form-data)
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let raw: Record<string, unknown> = {};
    if (ct.includes("application/json")) {
      raw = await req.json();
    } else {
      const fd = await req.formData();
      raw = Object.fromEntries(fd.entries());
    }

    const d = {
      planner:     norm(raw.planner ?? raw.name),
      email:       norm(raw.email),
      phone:       norm(raw.phone),
      event_date:  norm(raw.event_date ?? raw.date ?? raw.wedding_date),
      city_venue:  norm(raw.city_venue ?? raw.city ?? raw.venue),
      roles_needed:norm(raw.roles_needed ?? raw.roles),
      notes:       norm(raw.notes ?? raw.description ?? raw.brief_description),
      siteUrl:
        req.headers.get("origin") ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://forresterfields.vercel.app",
    };

    const html = buildPlannerEmailHTML(d as any);
    const text = buildPlannerEmailText(d as any);

    await resend.emails.send({
      from: process.env.NOTIFY_FROM_EMAIL || "Forrester Fields <noreply@walkperro.com>",
      to: process.env.NOTIFY_TO_EMAIL || "forresterfieldsweddings@gmail.com",
      subject: "New Planner Request",
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
