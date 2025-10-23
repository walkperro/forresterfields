import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: Request) {
  try {
    const { id } = (await req.json()) as { id?: string };
    if (!id) {
      return NextResponse.json({ ok:false, error:"missing id" }, { status:400 });
    }
    const supa = admin();
    const { error } = await supa.from("inquiries").delete().eq("id", id);
    if (error) return NextResponse.json({ ok:false, error:error.message }, { status:500 });
    return NextResponse.json({ ok:true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok:false, error: msg }, { status:500 });
  }
}
