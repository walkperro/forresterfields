import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const ALLOWED = ["new","contacted","booked","archived"] as const;
type Status = (typeof ALLOWED)[number];

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) return false;
  const decoded = Buffer.from(auth.slice(6), "base64").toString("utf8");
  const [user, pass] = decoded.split(":");
  return (
    user === (process.env.ADMIN_USER || "") &&
    pass === (process.env.ADMIN_PASS || "")
  );
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as { id?: string; status?: Status };
  const id = body.id ?? "";
  const status = body.status ?? "new";

  if (!id || !ALLOWED.includes(status)) {
    return NextResponse.json(
      { ok: false, error: "invalid id or status" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("planner_requests")
    .update({ status })
    .eq("id", id)
    .select("id, status")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
