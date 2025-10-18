import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Canonical statuses we accept/store now
const CANONICAL = ["new","contacted","booked","denied","available","unavailable"] as const;
type Status = typeof CANONICAL[number];

// Also accept legacy "archived" and map -> "denied"
const LEGACY = ["archived"] as const;

function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE || "";
  if (!url || !key) throw new Error("Supabase admin env vars missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

function normalizeStatus(s: unknown): Status | null {
  const v = String(s ?? "").trim().toLowerCase();
  if ((CANONICAL as readonly string[]).includes(v)) return v as Status;
  if ((LEGACY as readonly string[]).includes(v)) return "denied"; // archived -> denied
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const supa = admin();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const id = String(body.id ?? "").trim();
    if (!id) return NextResponse.json({ ok: false, error: "Missing id" }, { status: 400 });

    // Support either `status` or legacy `decision: accept|deny`
    const decision = String(body.decision ?? "").trim().toLowerCase();
    let status = normalizeStatus(body.status);
    if (!status && (decision === "accept" || decision === "deny")) {
      status = decision === "accept" ? "booked" : "denied";
    }
    if (!status) {
      return NextResponse.json({ ok: false, error: "Invalid or missing status" }, { status: 400 });
    }

    const { data, error } = await supa
      .from("workers")
      .update({ status })
      .eq("id", id)
      .select("id,status")
      .maybeSingle();

    if (error)   return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    if (!data)   return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
