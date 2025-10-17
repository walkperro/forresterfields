import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE!;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic sanitizing/shape
    const row = {
      full_name: (body.full_name ?? "").toString().slice(0, 200),
      email: (body.email ?? "").toString().slice(0, 200),
      phone: (body.phone ?? "").toString().slice(0, 100),
      city: (body.city ?? "").toString().slice(0, 120),
      age: (body.age ?? "").toString().slice(0, 20),
      availability: (body.availability ?? "").toString().slice(0, 1000),
      references_text: (body.references_text ?? "").toString().slice(0, 2000),
      experience: (body.experience ?? "").toString().slice(0, 4000),
      roles: Array.isArray(body.roles) ? body.roles.map(String).slice(0, 20) : [],
      status: "new" as const,
    };

    if (!row.full_name || !row.email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    const supabase = createClient(url, key);
    const { error } = await supabase.from("workers").insert(row);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ error: (typeof e === 'object' && e && 'message' in e ? (e as Error).message : (typeof e === 'string' ? e : 'Unknown error')) }, { status: 500 });
  }
}
