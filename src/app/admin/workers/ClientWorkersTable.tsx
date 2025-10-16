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
  const common = "text-xs px-2 py-1 rounded-md border";
  switch (status) {
    case "booked":
      return (
        <span className={`${common} border-green-300 text-green-800 bg-white`}>
          booked
        </span>
      );
    case "contacted":
      return (
        <span className={`${common} border-blue-300 text-blue-800 bg-white`}>
          contacted
        </span>
      );
    case "archived":
      return (
        <span className={`${common} border-red-300 text-red-800 bg-white`}>
          archived
        </span>
      );
    default:
      return (
        <span className={`${common} border-yellow-300 text-yellow-800 bg-white`}>
          new
        </span>
      );
  }
}

export default function ClientWorkersTable({ data }: { data: WorkerRow[] }) {
  const rows = useMemo(() => data, [data]);

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="text-left px-4 py-3">Name</th>
            <th className="text-left px-4 py-3">Email</th>
            <th className="text-left px-4 py-3">Phone</th>
            <th className="text-left px-4 py-3">Availability</th>
            <th className="text-left px-4 py-3">Roles</th>
            <th className="text-left px-4 py-3">Status</th>
            <th className="text-left px-4 py-3">Applied</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className={`${statusBg(r.status)} border-t`}>
              <td className="px-4 py-3">{r.name || "—"}</td>
              <td className="px-4 py-3">{r.email || "—"}</td>
              <td className="px-4 py-3">{r.phone || "—"}</td>
              <td className="px-4 py-3">{r.availability || "—"}</td>
              <td className="px-4 py-3">{r.roles || "—"}</td>
              <td className="px-4 py-3">{statusBadge(r.status)}</td>
              <td className="px-4 py-3">
                {new Date(r.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                No worker applications yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
