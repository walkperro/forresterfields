import { NextResponse } from "next/server";
import { sendWorkerDecisionEmail } from "@/lib/email";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(url, key, { auth: { persistSession: false } });

export async function POST(req: Request) {
  try {
    const { id, decision, note } = await req.json();
    if (!id || !decision) return NextResponse.json({ error: "missing id/decision" }, { status: 400 });

    const { data, error } = await supabase.from("workers").select("*").eq("id", id).single();
    if (error || !data) throw new Error(error?.message || "Not found");

    await sendWorkerDecisionEmail("forresterfieldsweddings@gmail.com", data, decision, note);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("send-decision error:", err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
