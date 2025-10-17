"use client";

import { useState } from "react";

const ROLES = [
  "Setup","Cleanup","Decorating","Greeting guests","Parking",
  "Passing drinks & apps","Serving food","Bartending","Bathroom attendant","Driver",
];

export default function ApplyForm() {
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setOk(null); setErr(null);

    const fd = new FormData(e.currentTarget);
    const roles = ROLES.filter(r => fd.get(`role:${r}`) === "on");

    const payload = {
      full_name: fd.get("full_name")?.toString().trim(),
      email: fd.get("email")?.toString().trim(),
      phone: fd.get("phone")?.toString().trim(),
      city: fd.get("city")?.toString().trim(),
      age: fd.get("age")?.toString().trim(),
      availability: fd.get("availability")?.toString().trim(),
      references_text: fd.get("references")?.toString().trim(),
      experience: fd.get("experience")?.toString().trim(),
      roles,
    };

    const res = await fetch("/api/workers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setErr(j?.error ?? "Failed to submit. Please try again.");
    } else {
      setOk("Thanks! We received your application.");
      e.currentTarget.reset();
    }
    setBusy(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {ok && <div className="rounded-md bg-green-50 text-green-800 px-3 py-2">{ok}</div>}
      {err && <div className="rounded-md bg-red-50 text-red-800 px-3 py-2">{err}</div>}

      <input name="full_name" placeholder="Full name" className="w-full border rounded-md px-3 py-2" required />
      <input name="email" type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2" required />
      <input name="phone" placeholder="Phone" className="w-full border rounded-md px-3 py-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input name="city" placeholder="City" className="border rounded-md px-3 py-2" />
        <input name="age" placeholder="Age" className="border rounded-md px-3 py-2" />
      </div>

      <div>
        <div className="font-medium mb-2">Roles you can do</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {ROLES.map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input type="checkbox" name={`role:${r}`} /> <span>{r}</span>
            </label>
          ))}
        </div>
      </div>

      <textarea name="availability" placeholder="Availability (e.g., weeknights, weekends)"
        className="w-full border rounded-md px-3 py-2 min-h-[80px]" />

      <textarea name="references" placeholder="References (names, phones, emails)"
        className="w-full border rounded-md px-3 py-2 min-h-[80px]" />

      <textarea name="experience" placeholder="Tell us about yourself / experience"
        className="w-full border rounded-md px-3 py-2 min-h-[120px]" />

      <button disabled={busy}
        className="w-full rounded-md bg-emerald-700 text-white px-4 py-2 disabled:opacity-50">
        {busy ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
