import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type JobStatus = "open" | "closed";

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Supabase env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

const s = (v: unknown) => String(v ?? "").trim();
function normalizeDate(v: unknown): string | null {
  const raw = s(v);
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const m = raw.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (m) {
    const mm = m[1].padStart(2, "0");
    const dd = m[2].padStart(2, "0");
    const yyyy = m[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  const d = new Date(raw);
  if (!isNaN(d.valueOf())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  return null;
}

function parseRoles(v: unknown): string[] | undefined {
  if (v === undefined) return undefined;
  if (Array.isArray(v)) return v.map(s).filter(Boolean);
  if (typeof v === "string") return v.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
}

export async function POST(req: NextRequest) {
  try {
    const supa = admin();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
    const id = s(body.id);
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

    const patch: Record<string, unknown> = {};
    if (body.title !== undefined) patch.title = s(body.title) || null;
    if (body.status !== undefined) {
      const val = s(body.status).toLowerCase();
      patch.status = (val === "closed" ? "closed" : "open") as JobStatus;
    }
    if (body.event_date !== undefined) patch.event_date = normalizeDate(body.event_date);
    if (body.location !== undefined) patch.location = s(body.location) || null;
    const roles = parseRoles(body.roles);
    if (roles !== undefined) patch.roles = roles;
    if (body.pay !== undefined) patch.pay = s(body.pay) || null;
    if (body.start_time !== undefined) patch.start_time = s(body.start_time) || null;
    if (body.end_time !== undefined) patch.end_time = s(body.end_time) || null;
    if (body.notes !== undefined) patch.notes = s(body.notes) || null;

    if (Object.keys(patch).length === 0)
      return NextResponse.json({ ok: false, error: "No fields to update" }, { status: 400 });

    const { error } = await supa.from("jobs").update(patch).eq("id", id).limit(1);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
