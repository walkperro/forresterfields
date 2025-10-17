"use client";

import { useMemo, useState } from "react";
import type React from "react";

export type WorkerRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  availability: string;
  roles: string;
  references_text: string;
  experience: string;
  city: string;
  age: string;
  status: "new" | "contacted" | "booked" | "archived";
};

const ALL_STATUSES = ["new", "contacted", "booked", "archived"] as const;
type Status = WorkerRow["status"];

function rowBg(status: Status) {
  switch (status) {
    case "booked":
      return "bg-green-50";
    case "contacted":
      return "bg-blue-50";
    case "archived":
      return "bg-red-50";
    default:
      return "bg-yellow-50";
  }
}

export default function ClientWorkersTable({ data }: { data: WorkerRow[] }) {
  const [rows, setRows] = useState<WorkerRow[]>(useMemo(() => data, [data]));
  const [busyId, setBusyId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | Status>("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      const okStatus = status === "all" ? true : r.status === status;
      if (!needle) return okStatus;
      const hay = [
        r.name,
        r.email,
        r.phone,
        r.city,
        r.roles,
        r.references_text,
        r.experience,
        r.availability,
      ]
        .join(" ")
        .toLowerCase();
      return okStatus && hay.includes(needle);
    });
  }, [rows, q, status]);

  async function postUpdate(payload: {
    id: string;
    status?: Status;
    decision?: "accept" | "deny";
    note?: string;
  }) {
    const res = await fetch("/api/workers/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(j?.error || `Update failed (${res.status})`);
    }
  }

  async function changeStatus(id: string, newStatus: Status) {
    setBusyId(id);
    const prev = rows;
    try {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      await postUpdate({ id, status: newStatus });
    } catch (e) {
      setRows(prev);
      alert((e as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  async function decide(id: string, decision: "accept" | "deny") {
    const note = window.prompt(`Optional note to include in the ${decision} email:`) || "";
    setBusyId(id);
    const prev = rows;
    try {
      const mapped: Status = decision === "accept" ? "booked" : "archived";
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: mapped } : r)));
      await postUpdate({ id, decision, status: mapped, note });
    } catch (e) {
      setRows(prev);
      alert((e as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, email, phone, city, roles..."
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as Status)}
          className="border rounded-lg px-3 py-2 w-full sm:w-56"
        >
          <option value="all">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">City</th>
              <th className="text-left px-4 py-3">Age</th>
              <th className="text-left px-4 py-3">Availability</th>
              <th className="text-left px-4 py-3">Roles</th>
              <th className="text-left px-4 py-3">References</th>
              <th className="text-left px-4 py-3">Experience</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Applied</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className={`${rowBg(r.status)} border-t align-top`}>
                <td className="px-4 py-3">{r.name || "—"}</td>
                <td className="px-4 py-3">{r.email || "—"}</td>
                <td className="px-4 py-3">{r.phone || "—"}</td>
                <td className="px-4 py-3">{r.city || "—"}</td>
                <td className="px-4 py-3">{r.age || "—"}</td>
                <td className="px-4 py-3">{r.availability || "—"}</td>
                <td className="px-4 py-3">{r.roles || "—"}</td>
                <td className="px-4 py-3 whitespace-pre-wrap">{r.references_text || "—"}</td>
                <td className="px-4 py-3 whitespace-pre-wrap">{r.experience || "—"}</td>
                <td className="px-4 py-3">
                  <select
                    disabled={busyId === r.id}
                    className="border rounded-md px-2 py-1 text-xs bg-white"
                    value={r.status}
                    onChange={(e) => changeStatus(r.id, e.target.value as Status)}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {new Date(r.created_at).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      disabled={busyId === r.id}
                      className="px-3 py-1 rounded-md border border-green-700 text-green-800 text-xs hover:bg-green-50"
                      onClick={() => decide(r.id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      disabled={busyId === r.id}
                      className="px-3 py-1 rounded-md border border-red-700 text-red-800 text-xs hover:bg-red-50"
                      onClick={() => decide(r.id, "deny")}
                    >
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-12 text-gray-500" colSpan={12}>
                  No worker applications match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
