"use client";

import { useMemo } from "react";

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
  age: string; // keep as string for easy display
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

export default function ClientWorkersTable({ data }: { data: WorkerRow[] }) {
  const rows = useMemo(() => data, [data]);

  return (
    <div className="rounded-xl border bg-white overflow-x-auto">
      <table className="w-full text-sm min-w-[1000px]">
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
              <td className="px-4 py-3">{statusBadge(r.status)}</td>
              <td className="px-4 py-3">
                {new Date(r.created_at).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
