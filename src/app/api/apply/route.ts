/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

function toArray(val: unknown): string[] | null {
  if (!val) return null;
  if (Array.isArray(val)) return val as string[];
  if (typeof val === "string") {
    return val.split(",").map(s => s.trim()).filter(Boolean);
  }
  return null;
}

export async function POST(req: Request) {
  try {
    // Accept both JSON and form submissions
    let body: any;
    const ctype = req.headers.get("content-type") || "";
    if (ctype.includes("application/json")) {
      body = await req.json();
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd as any);
    }

    // Honeypot — silently succeed for bots
    if (body.company || body.website || body._hp) {
      return NextResponse.json({ ok: true });
    }

    const name = (body.name ?? body.full_name ?? "").toString().trim();
    const email = (body.email ?? "").toString().trim() || null;
    const phone = (body.phone ?? "").toString().trim() || null;
    const availability = (body.availability ?? "").toString().trim() || null;
    const city = (body.city ?? "").toString().trim() || null;
    const experience = (body.experience ?? "").toString().trim() || null;
    const references = (body.references ?? body.refs ?? "").toString().trim() || null;
    const roles = toArray(body.roles);

    const { error } = await supabase.from("workers").insert({
      name: name || null,
      email,
      phone,
      availability,
      city,
      experience,
      references,
      roles,
      status: "pending",
      full_name: name || null,
    });

    if (error) {
      console.error("supabase insert error", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const msg = err?.message ?? "Unknown error";
    console.error("apply route error", err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
