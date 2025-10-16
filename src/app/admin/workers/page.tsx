import "../admin.css";
import "../admin-ui.css";
import AdminNav from "../../../components/AdminNav";
import ClientWorkersTable, { WorkerRow } from "./ClientWorkersTable";
import { createClient } from "@supabase/supabase-js";

type WorkerDB = {
  id: string;
  created_at: string;
  name?: string | null;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  availability?: string | null;
  roles?: string[] | string | null;
  status?: string | null;
};

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export const dynamic = "force-dynamic";

function normalizeStatus(raw: string | null | undefined): WorkerRow["status"] {
  const s = (raw ?? "pending").toLowerCase().trim();
  if (s === "pending" || s === "new") return "new";
  if (s === "contacted" || s === "reached") return "contacted";
  if (s === "booked" || s === "hired") return "booked";
  if (s === "archived" || s === "rejected") return "archived";
  return "new";
}

async function getWorkers(): Promise<WorkerRow[]> {
  const supabase = getAdmin();
  const { data } = await supabase
    .from("workers")
    .select("id, created_at, name, full_name, email, phone, availability, roles, status")
    .order("created_at", { ascending: false });

  const rows: WorkerDB[] = (data ?? []) as WorkerDB[];

  return rows.map((r) => {
    const displayName = r.name ?? r.full_name ?? "";
    let rolesStr = "";
    if (Array.isArray(r.roles)) rolesStr = r.roles.join(", ");
    else if (typeof r.roles === "string") rolesStr = r.roles;

    return {
      id: r.id,
      created_at: r.created_at,
      name: displayName,
      email: r.email ?? "",
      phone: r.phone ?? "",
      availability: r.availability ?? "",
      roles: rolesStr,
      references_text: "", // not used right now
      status: normalizeStatus(r.status),
    } as WorkerRow;
  });
}

export default async function WorkersPage() {
  const rows = await getWorkers();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl mb-6">Workers</h1>
      <AdminNav />
      <div className="mt-6">
        <ClientWorkersTable data={rows} />
      </div>
    </div>
  );
}
