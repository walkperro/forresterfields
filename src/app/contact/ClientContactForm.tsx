"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EVENT_TYPES = [
  "Wedding (specify below)",
  "Birthday Party",
  "Photography Session Location",
  "Banquet",
  "Baby Shower",
  "Reunion",
  "Other",
] as const;

const INQUIRY_ABOUT = ["Planner services", "Venue booking", "Both"] as const;

export default function ClientContactForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [eventType, setEventType] = useState<string>(EVENT_TYPES[0]);
  const [inquire, setInquire] = useState<string>(INQUIRY_ABOUT[0]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true); setErr(null);

    const fd = new FormData(e.currentTarget);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      event_date: String(fd.get("event_date") || "").trim(),
      type_of_event: eventType,
      type_of_event_other: String(fd.get("type_of_event_other") || "").trim(),
      inquiry_about: inquire,
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email) {
      setErr("Please enter your name and email.");
      setBusy(false);
      return;
    }

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j?.ok) throw new Error(j?.error || `Submit failed (${res.status})`);
      router.push("/contact/thanks");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-xl">
      {err && <div className="rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{err}</div>}

      <input className="border p-3 rounded-md" name="name" placeholder="Your name" required />
      <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
      <input className="border p-3 rounded-md" name="phone" placeholder="Phone" />

      {/* Date picker */}
      <label className="text-sm text-slate-700">Event date</label>
      <input className="border p-3 rounded-md" name="event_date" type="date" />

      {/* Type of event (single choice, with "other" detail box) */}
      <fieldset className="border rounded-md p-3">
        <legend className="text-sm font-medium">Type of event (choose one)</legend>
        <div className="mt-2 grid gap-2">
          {EVENT_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input
                type="radio"
                name="type_of_event"
                value={t}
                checked={eventType === t}
                onChange={() => setEventType(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
        <input
          name="type_of_event_other"
          placeholder="If 'Other' or extra detail (e.g., Ceremony/Reception/Shower)…"
          className="mt-3 w-full border rounded-md px-3 py-2"
        />
      </fieldset>

      {/* Inquiring about (single choice) */}
      <fieldset className="border rounded-md p-3">
        <legend className="text-sm font-medium">Inquiring about</legend>
        <div className="mt-2 grid gap-2">
          {INQUIRY_ABOUT.map((t) => (
            <label key={t} className="flex items-center gap-2">
              <input
                type="radio"
                name="inquiry_about"
                value={t}
                checked={inquire === t}
                onChange={() => setInquire(t)}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <textarea className="border p-3 rounded-md" name="message" rows={5} placeholder="Anything else we should know?" />

      <button className="btn btn-primary" disabled={busy}>{busy ? "Sending..." : "Send"}</button>
    </form>
  );
}
