import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type JobStatus = "open" | "closed";
type JobInsert = {
  title: string | null;
  event_date: string | null;
  location: string | null;
  roles: string[];
  pay: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  status?: JobStatus;
};

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Supabase env missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : String(v ?? "").trim();
}

export async function POST(req: NextRequest) {
  try {
    const supa = admin();

    // Accept JSON or FormData
    const ct = (req.headers.get("content-type") || "").toLowerCase();
    let body: Record<string, unknown> = {};
    if (ct.includes("application/json")) {
      body = (await req.json()) as Record<string, unknown>;
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
    }

    const rolesCsv = s(body.roles);
    const roles = rolesCsv ? rolesCsv.split(",").map(r => r.trim()).filter(Boolean) : [];

    const payload: JobInsert = {
      title: s(body.title) || null,
      event_date: s(body.event_date) || null,
      location: s(body.location) || null,
      roles,
      pay: s(body.pay) || null,
      start_time: s(body.start_time) || null,
      end_time: s(body.end_time) || null,
      notes: s(body.notes) || null,
      status: ((): JobStatus => (s(body.status).toLowerCase() === "closed" ? "closed" : "open"))(),
    };

    if (!payload.title || !payload.event_date) {
      return NextResponse.json({ ok: false, error: "Title and Date are required." }, { status: 400 });
    }

    const { data, error } = await supa
      .from("jobs")
      .insert(payload)
      .select("id,title,event_date,location,roles,pay,start_time,end_time,notes,status,created_at")
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, job: data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
