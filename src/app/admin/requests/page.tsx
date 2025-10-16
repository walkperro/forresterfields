import "../admin.css";
import "../admin-ui.css";
import AdminNav from "@/components/AdminNav";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import ClientTable from "./ClientTable";
import type { PlannerRequest } from "./types";

export const dynamic = "force-dynamic";

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
      <h1 className="font-display text-3xl mb-6">Planner Requests</h1>
      <AdminNav />
      <div className="mt-6">
        <ClientTable initialRows={rows} />
      </div>
    </div>
  );
}
