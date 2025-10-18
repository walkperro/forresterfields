"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function PlannerRequestFormClient() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle"|"loading"|"error"|"ok">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErr(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      const res = await fetch("/api/planner-request", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Request failed (${res.status})`);
      }

      setStatus("ok");
      router.push("/thanks");
    } catch (e) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6">
      {status === "error" && (
        <div className="mb-4 border border-red-300 bg-red-100 text-red-800 rounded-md px-3 py-2">
          {err || "There was a problem submitting your request."}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
        {/* honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Planner name</label>
            <input name="planner" required placeholder="Your name" className="border rounded-md px-3 py-2" />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Email</label>
            <input name="email" type="email" required placeholder="name@email.com" className="border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Phone</label>
            <input name="phone" placeholder="(###) ###-####" className="border rounded-md px-3 py-2" />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Date of wedding</label>
            <input name="event_date" type="date" className="border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">City / Venue</label>
          <input name="venue" placeholder="City or venue name" className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Roles needed</label>
          <input name="roles_needed" placeholder="e.g., Setup, Serving, Bartending" className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Brief description</label>
          <textarea name="notes" rows={5} placeholder="Tell us about your event (timeline, headcount, special needs, etc.)" className="border rounded-md px-3 py-2" />
        </div>

        <div className="pt-1">
          <button type="submit" disabled={status === "loading"} className="btn btn-primary">
            {status === "loading" ? "Submitting..." : "Send request"}
          </button>
        </div>
      </form>
    </div>
  );
}
