/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const CANONICAL = ["new","contacted","booked","archived"] as const;
type Status = typeof CANONICAL[number];

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Supabase admin env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>;
    const id = String(body.id ?? "").trim();
    const status = String(body.status ?? "").trim().toLowerCase();

    if (!id)     return NextResponse.json({ ok:false, error:"Missing id" }, { status:400 });
    if (!(CANONICAL as readonly string[]).includes(status))
      return NextResponse.json({ ok:false, error:"Invalid status" }, { status:400 });

    const supa = admin();
    const { data, error } = await supa
      .from("inquiries")
      .update({ status })
      .eq("id", id)
      .select("id,status")
      .maybeSingle();

    if (error) return NextResponse.json({ ok:false, error:error.message }, { status:500 });
    if (!data) return NextResponse.json({ ok:false, error:"Not found" }, { status:404 });
    return NextResponse.json({ ok:true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok:false, error: msg }, { status:500 });
  }
}
