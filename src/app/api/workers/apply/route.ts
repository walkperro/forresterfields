import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function normalize(v: unknown): string {
  return String(v ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE || "";
    if (!url || !key) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 }
      );
    }

    const supabase = createSupabaseClient(url, key, { auth: { persistSession: false } });

    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let raw: Record<string, unknown> = {};

    if (ct.includes("application/json")) {
      raw = (await req.json()) as Record<string, unknown>;
    } else if (
      ct.includes("multipart/form-data") ||
      ct.includes("application/x-www-form-urlencoded")
    ) {
      const fd = await req.formData();
      raw = Object.fromEntries(fd.entries());
    }

    const rolesRaw = raw.roles;
    let roles: string[] = [];

    if (Array.isArray(rolesRaw)) {
      roles = rolesRaw.map((v) => normalize(v)).filter(Boolean);
    } else if (typeof rolesRaw === "string") {
      // Handle comma- or space-separated roles
      roles = rolesRaw
        .split(/,|\s+/)
        .map((r) => normalize(r))
        .filter(Boolean);
    }

    const payload = {
      name: normalize(raw.name),
      email: normalize(raw.email),
      phone: normalize(raw.phone),
      city: normalize(raw.city),
      age: normalize(raw.age),
      availability: normalize(raw.availability),
      roles,
      references_text: normalize(raw.references_text ?? raw.references),
      experience: normalize(raw.experience),
    };

    if (!payload.name && !payload.email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    const { error } = await supabase.from("workers").insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        city: payload.city,
        age: payload.age,
        availability: payload.availability,
        roles: payload.roles, // text[] column expects array
        references_text: payload.references_text,
        experience: payload.experience,
        status: "new",
      },
    ]);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
