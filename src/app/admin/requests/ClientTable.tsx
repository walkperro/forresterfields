"use client";

import { useMemo, useState } from "react";
import type { PlannerRequest } from "./types";

type ClientProps = { initialRows: PlannerRequest[] };

const STATUS_LABELS = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  archived: "Archived",
} as const;

const STATUS_OPTIONS = Object.keys(STATUS_LABELS) as Array<keyof typeof STATUS_LABELS>;

function rowClasses(status?: PlannerRequest["status"]) {
  const s = (status ?? "new") as NonNullable<PlannerRequest["status"]>;
  const base = "border-t transition-shadow";
  if (s === "booked") return `${base} bg-green-50`;
  if (s === "archived") return `${base} bg-red-50`;
  if (s === "contacted") return `${base} bg-blue-50`;
  // NEW: soft yellow bg + subtle glow ring
  return `${base} bg-yellow-50 ring-1 ring-yellow-300/70 shadow-[0_0_16px_rgba(234,179,8,0.25)]`;
}

export default function ClientTable({ initialRows }: ClientProps) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | keyof typeof STATUS_LABELS>("all");
  const [rows, setRows] = useState<PlannerRequest[]>(initialRows);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      const okStatus = status === "all" ? true : (r.status || "new") === status;
      if (!needle) return okStatus;
      const hay =
        [
          r.planner_name,
          r.email,
          r.phone,
          r.city_venue,
          r.roles_needed,
          r.event_date,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase() || "";
      return okStatus && hay.includes(needle);
    });
  }, [rows, q, status]);

  async function updateStatus(id: string, next: NonNullable<PlannerRequest["status"]>) {
    try {
      setBusyId(id);
      const basic = btoa(`${process.env.NEXT_PUBLIC_BASIC_USER ?? ""}:${process.env.NEXT_PUBLIC_BASIC_PASS ?? ""}`);
      const res = await fetch("/api/requests/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Basic ${basic}` },
        body: JSON.stringify({ id, status: next }),
      });
      const json = (await res.json()) as { ok: boolean };
      if (json.ok) setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
      else alert("Update failed");
    } catch {
      alert("Update failed");
    } finally {
      setBusyId(null);
    }
  }

  function copy(text: string | null) {
    if (!text) return;
    navigator.clipboard.writeText(text).catch(() => {});
  }

  function handleFilterChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const val = e.target.value as "all" | keyof typeof STATUS_LABELS;
    setStatus(val);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone, venue, roles…"
          className="w-full md:w-96 rounded-md border px-3 py-2"
        />
        <select value={status} onChange={handleFilterChange} className="w-full md:w-48 rounded-md border px-3 py-2">
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Planner</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Event</th>
              <th className="px-3 py-2">City/Venue</th>
              <th className="px-3 py-2">Roles</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className={rowClasses(r.status)}>
                <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">{r.planner_name || "-"}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <a href={r.email ? `mailto:${r.email}` : "#"} className="underline">
                      {r.email || "-"}
                    </a>
                    {r.email && (
                      <button onClick={() => copy(r.email)} className="rounded border px-2 py-0.5" title="Copy email">
                        Copy
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    {r.phone || "-"}
                    {r.phone && (
                      <button onClick={() => copy(r.phone)} className="rounded border px-2 py-0.5" title="Copy phone">
                        Copy
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-3 py-2">{r.event_date || "-"}</td>
                <td className="px-3 py-2">{r.city_venue || "-"}</td>
                <td className="px-3 py-2">{r.roles_needed || "-"}</td>
                <td className="px-3 py-2">
                  <select
                    disabled={busyId === r.id}
                    value={(r.status || "new") as string}
                    onChange={(e) => updateStatus(r.id, e.target.value as NonNullable<PlannerRequest["status"]>)}
                    className="rounded border px-2 py-1"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-center text-gray-500" colSpan={8}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
