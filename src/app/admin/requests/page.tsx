import "../admin.css";
import CsvButton from "@/components/CsvButton";
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
      <h1 className="font-['Playfair_Display'] text-[2rem] font-light tracking-tight text-slate-800"><span className="block mb-6">Planner Requests</span></h1>
      <AdminNav active="requests" />

      <div className="mb-4 flex items-center gap-3">
        <CsvButton
          rows={rows as unknown as Record<string, unknown>[]}
          columns={[
            { key: "created_at",  label: "Created" },
            { key: "planner_name", label: "Planner" },
            { key: "email",        label: "Email" },
            { key: "phone",        label: "Phone" },
            { key: "event_date",   label: "Event Date" },
            { key: "city_venue",   label: "City/Venue" },
            { key: "roles_needed", label: "Roles Needed" },
            { key: "status",       label: "Status" }
          ]}
          filename={`planner-requests-${new Date().toISOString().slice(0,10)}.csv`}
          label="Download CSV"
        />
      </div>

      <div className="mt-6">
        <ClientTable initialRows={rows} />
      </div>
    </div>
  );
}
