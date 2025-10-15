/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("planner_requests")
    .select("created_at,planner_name,email,phone,event_date,city_venue,roles_needed,status,id")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data ?? [];
  const header = ["created_at","planner_name","email","phone","event_date","city_venue","roles_needed","status","id"];
  const csv = [
    header.join(","),
    ...rows.map(r => header.map(k => {
      const v = (r as any)[k] ?? "";
      const s = String(v).replace(/"/g,'""');
      return /[",\n]/.test(s) ? `"${s}"` : s;
    }).join(","))
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="planner_requests.csv"`,
    },
  });
}
