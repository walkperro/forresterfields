"use client";

import { useMemo, useState } from "react";

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

function statusBg(status: WorkerRow["status"]) {
  switch (status) {
    case "booked":
      return "bg-green-50";
    case "contacted":
      return "bg-blue-50";
    case "archived":
      return "bg-red-50";
    default:
      return "bg-yellow-50"; // new
  }
}

function statusBadge(status: WorkerRow["status"]) {
  const base = "text-xs px-2 py-1 rounded-md border bg-white";
  switch (status) {
    case "booked":
      return <span className={`${base} border-green-300 text-green-800`}>booked</span>;
    case "contacted":
      return <span className={`${base} border-blue-300 text-blue-800`}>contacted</span>;
    case "archived":
      return <span className={`${base} border-red-300 text-red-800`}>archived</span>;
    default:
      return <span className={`${base} border-yellow-300 text-yellow-800`}>new</span>;
  }
}

const STATUS_VALUES: WorkerRow["status"][] = ["new", "contacted", "booked", "archived"];

export default function ClientWorkersTable({ data }: { data: WorkerRow[] }) {
  const [rows, setRows] = useState<WorkerRow[]>(useMemo(() => data, [data]));
  const [busyId, setBusyId] = useState<string | null>(null);

  async function postUpdate(payload: {
    id: string;
    status?: WorkerRow["status"];
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

  async function changeStatus(id: string, newStatus: WorkerRow["status"]) {
    setBusyId(id);
    const prev = rows;
    try {
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      await postUpdate({ id, status: newStatus });
    } catch (e) {
      // revert on error
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
      // If accept, also mark booked; if deny, mark archived
      const mappedStatus: WorkerRow["status"] = decision === "accept" ? "booked" : "archived";
      setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status: mappedStatus } : r)));
      await postUpdate({ id, decision, status: mappedStatus, note });
    } catch (e) {
      setRows(prev);
      alert((e as Error).message);
    } finally {
      setBusyId(null);
    }
  }

  return (
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
          {rows.map((r) => (
            <tr key={r.id} className={`${statusBg(r.status)} border-t align-top`}>
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
                <div className="flex items-center gap-2">
                  {statusBadge(r.status)}
                  <select
                    disabled={busyId === r.id}
                    className="border rounded-md px-2 py-1 text-xs bg-white"
                    value={r.status}
                    onChange={(e) => changeStatus(r.id, e.target.value as WorkerRow["status"])}
                  >
                    {STATUS_VALUES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
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
        </tbody>
      </table>
    </div>
  );
}
