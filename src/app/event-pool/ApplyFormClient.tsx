"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

const ROLES = [
  "Setup","Cleanup","Decorating","Greeting guests","Parking",
  "Passing drinks & apps","Serving food","Bartending",
  "Bathroom attendant","Driver",
];

export default function ApplyFormClient() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle"|"loading"|"error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const roles = fd.getAll("roles").map(String);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      city: String(fd.get("city") || "").trim(),
      age: String(fd.get("age") || "").trim(),
      availability: String(fd.get("availability") || "").trim(),
      references_text: String(fd.get("references_text") || "").trim(),
      experience: String(fd.get("experience") || "").trim(),
      roles,
    };

    try {
      const res = await fetch("/api/workers/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Request failed (${res.status})`);
      }

      router.push("/event-pool/thanks");
    } catch (e) {
      setStatus("error");
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    }
  }

  return (
    <div className="mt-6">
      {status === "error" && (
        <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4">
          {err || "There was a problem submitting your application."}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" required placeholder="Full name" className="w-full border rounded-lg px-3 py-2" />
        <input name="email" type="email" required placeholder="Email" className="w-full border rounded-lg px-3 py-2" />
        <input name="phone" placeholder="Phone" className="w-full border rounded-lg px-3 py-2" />
        <input name="city" placeholder="City" className="w-full border rounded-lg px-3 py-2" />
        <input name="age" placeholder="Age" className="w-full border rounded-lg px-3 py-2" />

        <div>
          <p className="font-medium mb-2">Roles you can do</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ROLES.map((r) => (
              <label key={r} className="flex items-center gap-2">
                <input type="checkbox" name="roles" value={r} />
                <span>{r}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea name="availability" placeholder="Availability" className="w-full border rounded-lg px-3 py-2 min-h-[64px]" />
        <textarea name="references_text" placeholder="References" className="w-full border rounded-lg px-3 py-2 min-h-[64px]" />
        <textarea name="experience" placeholder="Experience" className="w-full border rounded-lg px-3 py-2 min-h-[64px]" />

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-emerald-700 text-white px-4 py-2 disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
