import "../admin.css";
import CsvButton from "@/components/CsvButton";
import "../admin-ui.css";
import AdminNav from "@/components/AdminNav";
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
  roles?: string[] | null;
  references_text?: string | null; // reserved-word safe
  experience?: string | null;
  city?: string | null;
  age?: number | null;
  status?: string | null; // may be legacy values like "archived"
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
    .select(
      "id, created_at, name, full_name, email, phone, availability, roles, references_text, experience, city, age, status"
    )
    .order("created_at", { ascending: false });

  const rows: WorkerDB[] = (data ?? []) as WorkerDB[];
  return rows.map((r) => {
    const displayName =
      (r.full_name ?? r.name ?? "").trim() ||
      [r.full_name, r.name].filter(Boolean).join(" ").trim();

    const rolesJoined = Array.isArray(r.roles)
      ? r.roles.join(", ")
      : ((r.roles as unknown as string) ?? "");

    // Accept the new set of statuses; remap legacy "archived" -> "denied"
    const rawStatus = (r.status === "archived" ? "denied" : r.status) ?? "new";
    const allowed = [
      "new",
      "contacted",
      "booked",
      "denied",
      "available",
      "unavailable",
    ] as const;

    const normalizedStatus: WorkerRow["status"] = (allowed as readonly string[]).includes(
      rawStatus
    )
      ? (rawStatus as WorkerRow["status"])
      : "new";

    return {
      id: r.id,
      created_at: r.created_at,
      name: displayName || "—",
      email: r.email ?? "",
      phone: r.phone ?? "",
      availability: r.availability ?? "",
      roles: rolesJoined,
      references_text: r.references_text ?? "",
      experience: r.experience ?? "",
      city: r.city ?? "",
      age: typeof r.age === "number" ? String(r.age) : ((r.age ?? "") as string),
      status: normalizedStatus,
    };
  });
}

export default async function WorkersPage() {
  const rows = await getWorkers();
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl mb-6">Workers</h1>

      <div className="mb-4 flex items-center gap-3">
        <CsvButton
          rows={rows as unknown as Record<string, unknown>[]}
          columns={[
            { key: "created_at", label: "Created" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "city", label: "City" },
            { key: "age", label: "Age" },
            { key: "availability", label: "Availability" },
            { key: "roles", label: "Roles" },
            { key: "status", label: "Status" },
          ]}
          filename={`workers-\${new Date().toISOString().slice(0, 10)}.csv`}
          label="Download CSV"
        />
      </div>

      <AdminNav />
      <div className="mt-6">
        <ClientWorkersTable data={rows} />
      </div>
    </div>
  );
}
