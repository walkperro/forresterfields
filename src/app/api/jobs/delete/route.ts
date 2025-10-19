import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

const s = (v: unknown) => String(v ?? "").trim();

export async function POST(req: NextRequest) {
  try {
    const supa = admin();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const id = s(body.id);
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

    const { error } = await supa.from("jobs").delete().eq("id", id).limit(1);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
