import { supabase } from "@/lib/supabase";
import AdminJobsClient from "./AdminJobsClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type JobRow = {
  id: string;
  created_at: string | null;
  title: string | null;
  event_date: string | null;   // yyyy-mm-dd
  location: string | null;
  roles: string[];             // normalized to array here
  pay: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  status: "open" | "closed";
};

// helpers to safely coerce unknown -> desired shapes
function s(v: unknown): string | null {
  const out = String(v ?? "").trim();
  return out ? out : null;
}

function rolesToArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v
      .filter((x): x is string => typeof x === "string")
      .map((x) => x.trim())
      .filter(Boolean);
  }
  if (typeof v === "string") {
    return v
      .split(/,|\s+/)
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return [];
}

function statusFrom(v: unknown): "open" | "closed" {
  const val = String(v ?? "").toLowerCase();
  return val === "closed" ? "closed" : "open";
}

export default async function AdminJobsPage() {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .order("event_date", { ascending: true });

  const normalizedRows: JobRow[] = (data as unknown[] | null ?? []).map((raw) => {
    const r = raw as Record<string, unknown>;
    return {
      id: String(r.id ?? ""),
      created_at: s(r.created_at),
      title: s(r.title),
      event_date: s(r.event_date),
      location: s(r.location),
      roles: rolesToArray(r.roles),
      pay: s(r.pay),
      start_time: s(r.start_time),
      end_time: s(r.end_time),
      notes: s(r.notes),
      status: statusFrom(r.status),
    };
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Job Posts</h1>
      <p className="mt-2 text-slate-600">Create and manage roles that appear on the Workers page.</p>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          Failed to load jobs: {error.message}
        </div>
      )}

      <div className="mt-8">
        <AdminJobsClient initialJobs={normalizedRows} />
      </div>
    </main>
  );
}
