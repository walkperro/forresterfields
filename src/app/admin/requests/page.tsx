import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import ClientTable from "./ClientTable";
import type { PlannerRequest } from "./types";

async function getData(): Promise<PlannerRequest[]> {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("planner_requests")
    .select(
      "id, created_at, planner_name, email, phone, event_date, city_venue, roles_needed, status"
    )
    .order("created_at", { ascending: false });
  return (data ?? []) as PlannerRequest[];
}

export default async function Page() {
  const rows = await getData();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">Planner Requests</h1>

      <div className="mb-4">
        <a
          href="/api/requests/export"
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Export CSV
        </a>
      </div>

      {/* Client table */}
      <ClientTable initialRows={rows} />
    </div>
  );
}
