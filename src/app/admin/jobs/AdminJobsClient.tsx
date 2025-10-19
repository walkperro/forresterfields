"use client";

import { useState } from "react";

export type JobRow = {
  id: string;
  created_at?: string | null;
  title: string | null;
  event_date: string | null;
  location: string | null;
  roles: string[];            // text[] in supabase
  pay: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  status: "open" | "closed";
};

type Props = { initialJobs: JobRow[] };

export default function AdminJobsClient({ initialJobs }: Props) {
  const [jobs, setJobs] = useState<JobRow[]>(Array.isArray(initialJobs) ? initialJobs : []);
  const [busy, setBusy] = useState(false);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/jobs/create", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok || !j?.ok) throw new Error(j?.error || `Create failed (${res.status})`);
      const newJob: JobRow = j.job;
      setJobs(prev => [newJob, ...prev]);          // show immediately
      e.currentTarget.reset();
    } catch (err) {
      alert((err as Error).message || "Create failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this job?")) return;
    const prev = jobs;
    setJobs(prev.filter(j => j.id !== id));        // optimistic UI
    try {
      const res = await fetch("/api/jobs/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) throw new Error(j?.error || `Delete failed (${res.status})`);
    } catch (err) {
      setJobs(prev); // revert on failure
      alert((err as Error).message || "Delete failed");
    }
  }

  async function handleStatus(id: string, status: JobRow["status"]) {
    const prev = jobs;
    setJobs(prev.map(j => (j.id === id ? { ...j, status } : j)));
    try {
      const res = await fetch("/api/jobs/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) throw new Error(j?.error || `Update failed (${res.status})`);
    } catch (err) {
      setJobs(prev); // revert
      alert((err as Error).message || "Update failed");
    }
  }

  return (
    <div className="space-y-8">
      {/* Create form */}
      <form onSubmit={handleCreate} className="rounded-xl border p-4 space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="title" placeholder="Title" className="border rounded-lg px-3 py-2" />
          <input name="event_date" type="date" className="border rounded-lg px-3 py-2" />
          <input name="location" placeholder="Location" className="border rounded-lg px-3 py-2" />
          <input name="roles" placeholder="Roles (comma separated)" className="border rounded-lg px-3 py-2" />
          <input name="pay" placeholder="Pay (e.g., $20/hr)" className="border rounded-lg px-3 py-2" />
          <input name="start_time" placeholder="Start time (e.g., 3:00 PM)" className="border rounded-lg px-3 py-2" />
          <input name="end_time" placeholder="End time (e.g., 10:00 PM)" className="border rounded-lg px-3 py-2" />
        </div>
        <textarea name="notes" placeholder="Notes" className="w-full border rounded-lg px-3 py-2 min-h-24" />
        <div className="flex items-center gap-3">
          <select name="status" defaultValue="open" className="border rounded-lg px-3 py-2">
            <option value="open">open</option>
            <option value="closed">closed</option>
          </select>
          <button disabled={busy} className="rounded-lg border px-4 py-2 hover:bg-slate-50">
            {busy ? "Creating..." : "Create job"}
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Roles</th>
              <th className="px-3 py-2">Pay</th>
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2 hidden md:table-cell">Notes</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-gray-500" colSpan={9}>No jobs yet.</td>
              </tr>
            )}
            {jobs.map(j => {
              const time =
                [j.start_time, j.end_time].filter(Boolean).join(" – ") || "—";
              const roles = Array.isArray(j.roles) ? j.roles.join(", ") : "—";
              return (
                <tr key={j.id} className="border-t">
                  <td className="px-3 py-2">{j.title ?? "—"}</td>
                  <td className="px-3 py-2">{j.event_date ?? "—"}</td>
                  <td className="px-3 py-2">{j.location ?? "—"}</td>
                  <td className="px-3 py-2">{roles}</td>
                  <td className="px-3 py-2">{j.pay ?? "—"}</td>
                  <td className="px-3 py-2">{time}</td>
                  <td className="px-3 py-2 hidden md:table-cell max-w-[18rem]">
                    <span className="line-clamp-2">{j.notes ?? "—"}</span>
                  </td>
                  <td className="px-3 py-2">
                    <select
                      value={j.status}
                      onChange={(e) => handleStatus(j.id, e.target.value as JobRow["status"])}
                      className="border rounded px-2 py-1"
                    >
                      <option value="open">open</option>
                      <option value="closed">closed</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => handleDelete(j.id)}
                      className="px-3 py-1 rounded-md border border-red-700 text-red-800 text-xs hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
