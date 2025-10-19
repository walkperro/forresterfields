"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ClientContactForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const event_date = String(fd.get("event_date") || "").trim();
    const guestCount = String(fd.get("guestCount") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email) {
      setErr("Please enter your name and email.");
      return;
    }

    // We’ll use planner_requests. Pack guest count + message into roles_needed free text.
    const payload = {
      planner_name: name,
      email,
      phone,
      event_date: event_date || null,
      city_venue: null,
      roles_needed: [
        guestCount ? `Guests: ${guestCount}` : null,
        message ? `Notes: ${message}` : null,
      ].filter(Boolean).join(" — "),
      status: "new",
    };

    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/planner-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) {
        throw new Error(j?.error || `Submit failed (${res.status})`);
      }
      router.push("/thanks");
    } catch (error) {
      setErr((error as Error).message || "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <>
      {err && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          {err}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
        <input className="border p-3 rounded-md" name="name" placeholder="Your name" required />
        <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
        <input className="border p-3 rounded-md" name="phone" placeholder="Phone" />
        <input className="border p-3 rounded-md" name="event_date" placeholder="Event date" />
        <input className="border p-3 rounded-md" name="guestCount" placeholder="Guest count" />
        <textarea className="border p-3 rounded-md" name="message" rows={5} placeholder="Tell us about your event"></textarea>
        <button className="btn btn-primary" disabled={busy}>{busy ? "Sending..." : "Send"}</button>
      </form>
    </>
  );
}
