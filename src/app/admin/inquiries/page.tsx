"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */


import "../admin-ui.css";
import "../admin.css";
import { useEffect, useMemo, useState } from "react";
import AdminNav from "@/components/AdminNav";
import { supabase } from "@/lib/supabaseClient";
import CsvButton from "@/components/CsvButton";

type Row = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  type_of_event: string | null;
  inquiry_about: string | null;
  message: string | null;
  status: string | null;
};

const STATUS = ["new","contacted","booked","archived"] as const;
type StatusKey = typeof STATUS[number];

const ROW_BG: Record<StatusKey, string> = {
  new:       "bg-yellow-50",
  contacted: "bg-blue-50",
  booked:    "bg-green-50",
  archived:  "bg-rose-50",
};

async function apiUpdateStatus(id: string, status: StatusKey) {
  const res = await fetch("/api/inquiries/update", {
    method: "POST", headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ id, status }),
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({})))?.error || "Update failed");
}

async function apiDelete(id: string) {
  const res = await fetch("/api/inquiries/delete", {
    method: "POST", headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error((await res.json().catch(()=>({})))?.error || "Delete failed");
}

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string|null>(null);
  const [busyId, setBusyId] = useState<string|null>(null);

  useEffect(() => {
    supabase
      .from("inquiries")
      .select("id,created_at,name,email,phone,type_of_event,inquiry_about,message,status")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => error ? setErr(error.message) : setRows((data || []) as Row[]));
  }, []);

  const filtered = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return rows;
    return rows.filter(r =>
      [r.name, r.email, r.phone, r.type_of_event, r.inquiry_about, r.message]
        .some(x => (x || "").toLowerCase().includes(v))
    );
  }, [rows, q]);

  const copy = async (text?: string|null) => { if (text) try { await navigator.clipboard.writeText(text); } catch {} };

  const setStatus = async (id: string, next: StatusKey) => {
    setBusyId(id);
    try {
      await apiUpdateStatus(id, next);
      setRows(prev => prev.map(r => r.id === id ? { ...r, status: next } : r));
    } catch (e) { alert((e as Error).message); }
    finally { setBusyId(null); }
  };

  const doDelete = async (id: string) => {
    if (!confirm("Delete this inquiry?")) return;
    setBusyId(id);
    try {
      await apiDelete(id);
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (e) { alert((e as Error).message); }
    finally { setBusyId(null); }
  };

  // CSV
  const csvCols: { key: string; label: string }[] = [
    { key: "created_at",   label: "Created" },
    { key: "name",         label: "Name" },
    { key: "email",        label: "Email" },
    { key: "phone",        label: "Phone" },
    { key: "type_of_event",label: "Type of Event" },
    { key: "inquiry_about",label: "Inquiring About" },
    { key: "message",      label: "Notes" },
    { key: "status",       label: "Status" },
  ];
  const csvRows = filtered.map(r => ({
    created_at: new Date(r.created_at).toLocaleString(),
    name: r.name || "",
    email: r.email || "",
    phone: r.phone || "",
    type_of_event: r.type_of_event || "",
    inquiry_about: r.inquiry_about || "",
    message: r.message || "",
    status: (r.status || "new").toLowerCase(),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-['Playfair_Display'] text-[2rem] font-light tracking-tight text-slate-800"><span className="block mb-6">Inquiries</span></h1>
      <AdminNav active="inquiries" />

      {/* Download CSV (same placement as other admin pages) */}
      <div className="mt-4">
        <CsvButton
          rows={csvRows}
          columns={csvCols}
          filename="inquiries.csv"
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          label="Download CSV"
        />
      </div>

      {/* Search */}
      <input
        className="mt-4 w-full max-w-xl rounded-md border px-3 py-2"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder="Search name, email, phone, event type..."
      />

      {err && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          {err}
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">Event</th>
              <th className="py-2 pr-4">Inquiring</th>
              <th className="py-2 pr-4">Notes</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const status = ((r.status || "new").toLowerCase() as StatusKey);
              const bg = ROW_BG[status] || ROW_BG.new;

              return (
                <tr key={r.id} className={`${bg} border-b last:border-0 align-top`}>
                  <td className="py-2 pr-4 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-2 pr-4">{r.name || "—"}</td>
                  <td className="py-2 pr-4">
                    {r.email ? (
                      <div className="flex items-center gap-2">
                        <a className="underline" href={`mailto:${r.email}`}>{r.email}</a>
                        <button
                          className="rounded border px-2 py-0.5 text-xs hover:bg-slate-50"
                          onClick={()=>copy(r.email)}
                          title="Copy email"
                        >Copy</button>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    {r.phone ? (
                      <div className="flex items-center gap-2">
                        <a className="underline" href={`tel:${r.phone}`}>{r.phone}</a>
                        <button
                          className="rounded border px-2 py-0.5 text-xs hover:bg-slate-50"
                          onClick={()=>copy(r.phone)}
                          title="Copy phone"
                        >Copy</button>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="py-2 pr-4">{r.type_of_event || "—"}</td>
                  <td className="py-2 pr-4">{r.inquiry_about || "—"}</td>
                  <td className="py-2 pr-4 max-w-[22rem]">
                    <div className="line-clamp-3 whitespace-pre-wrap">
                      {r.message || "—"}
                    </div>
                  </td>
                  <td className="py-2 pr-4">
                    {/* Match Planner Requests select styling (compact, bordered) */}
                    <select
                      className="rounded-md border px-3 py-2 text-sm bg-white"
                      value={status}
                      onChange={(e)=>setStatus(r.id, e.target.value as StatusKey)}
                      disabled={busyId === r.id}
                    >
                      {STATUS.map(s => <option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}
                    </select>
                  </td>
                  <td className="py-2 pr-4">
                    {/* Match Planner Requests delete style (red outline, subtle bg) */}
                    <button
                      onClick={()=>doDelete(r.id)}
                      disabled={busyId === r.id}
                      className="rounded-md border border-red-300 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td className="py-6 text-slate-500" colSpan={9}>No inquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
