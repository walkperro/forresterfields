import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Age threshold: default 48h; override with env AGE_NEW_TO_CONTACTED_HOURS
const AGE_HOURS = Number(process.env.AGE_NEW_TO_CONTACTED_HOURS ?? 48);

export async function GET() {
  try {
    const supa = admin();
    const cutoff = new Date(Date.now() - AGE_HOURS * 60 * 60 * 1000).toISOString();

    // status is null or 'new' AND created_at older than cutoff -> set to 'contacted'
    const { data, error } = await supa
      .from("planner_requests")
      .update({ status: "contacted" })
      .lte("created_at", cutoff)
      .or("status.is.null,status.eq.new")
      .select(); // return updated rows so we can count them

    if (error) throw error;

    const updated = data?.length ?? 0;
    return NextResponse.json({ ok: true, updated, cutoff, hours: AGE_HOURS });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
