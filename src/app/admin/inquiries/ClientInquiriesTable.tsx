"use client";
import { useMemo, useState } from "react";

export type InquiryRow = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  event_date: string | null;
  type_of_event: string | null;
  type_of_event_other: string | null;
  inquiry_about: string | null;
  message: string | null;
};

export default function ClientInquiriesTable({ rows: initial }: { rows: InquiryRow[] }) {
  const [q, setQ] = useState("");
  const rows = initial;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(r =>
      [
        r.name, r.email, r.phone, r.event_date, r.type_of_event, r.type_of_event_other,
        r.inquiry_about, r.message,
      ].join(" ").toLowerCase().includes(needle)
    );
  }, [rows, q]);

  return (
    <div className="space-y-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search name, email, phone, event type…"
        className="w-full md:w-96 rounded-md border px-3 py-2"
      />

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Type of Event</th>
              <th className="px-3 py-2">Inquiring About</th>
              <th className="px-3 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td className="px-3 py-6 text-gray-500" colSpan={8}>No results</td></tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                <td className="px-3 py-2">{r.name || "—"}</td>
                <td className="px-3 py-2">
                  {r.email ? <a className="underline" href={`mailto:${r.email}`}>{r.email}</a> : "—"}
                </td>
                <td className="px-3 py-2">{r.phone || "—"}</td>
                <td className="px-3 py-2">{r.event_date || "—"}</td>
                <td className="px-3 py-2">{[r.type_of_event, r.type_of_event_other].filter(Boolean).join(" — ") || "—"}</td>
                <td className="px-3 py-2">{r.inquiry_about || "—"}</td>
                <td className="px-3 py-2 max-w-[18rem]"><span className="line-clamp-2">{r.message || "—"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
