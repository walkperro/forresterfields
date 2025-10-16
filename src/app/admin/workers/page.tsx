import "../admin.css";
import "../admin-ui.css";
import AdminNav from "@/components/AdminNav";
import ClientWorkersTable, { WorkerRow } from "./ClientWorkersTable";
import { createClient } from "@supabase/supabase-js";

type WorkerDB = {
  id: string;
  created_at: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  availability?: string | null;
  roles?: string[] | null;
  references_text?: string | null; // avoid 'references' keyword
  status?: string | null;
};

function getAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!;
  return createClient(url, key, { auth: { persistSession: false } });
}

export const dynamic = "force-dynamic";

async function getWorkers(): Promise<WorkerRow[]> {
  const supabase = getAdmin();
  const { data } = await supabase
    .from("workers")
    .select("id, created_at, name, email, phone, availability, roles, references_text, status")
    .order("created_at", { ascending: false });

  const rows: WorkerDB[] = (data ?? []) as WorkerDB[];
  return rows.map((r) => ({
    id: r.id,
    created_at: r.created_at,
    name: r.name ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    availability: r.availability ?? "",
    roles: Array.isArray(r.roles) ? r.roles.join(", ") : ((r.roles ?? "") as string),
    references_text: r.references_text ?? "",
    status: (["new","contacted","booked","archived"].includes(r.status ?? "new"))
      ? (r.status as "new" | "contacted" | "booked" | "archived")
      : "new",
  })) as WorkerRow[];
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
