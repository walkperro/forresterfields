"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PlannerRequestFormClient() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle"|"loading"|"error"|"ok">("idle");
  const [err, setErr] = useState<string | null>(null);

  // All fields we require
  const requiredSelectors = [
    'input[name="planner"]',
    'input[name="email"]',
    'input[name="phone"]',
    'input[name="venue"]',
    'input[name="roles_needed"]',
    'textarea[name="notes"]'];

  function isFilled(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    if (el instanceof HTMLInputElement) {
      if (el.type === "checkbox" || el.type === "radio") return el.checked;
      return el.value.trim().length > 0;
    }
    if (el instanceof HTMLTextAreaElement) return el.value.trim().length > 0;
    if (el instanceof HTMLSelectElement) return !!el.value;
    return true;
  }

  function mark(el: Element, bad: boolean) {
    if (!(el instanceof HTMLElement)) return;
    const classes = ["ring-2","ring-red-400","border-red-500","focus:ring-red-400"];
    if (bad) classes.forEach(c => el.classList.add(c));
    else classes.forEach(c => el.classList.remove(c));
    el.setAttribute("aria-invalid", bad ? "true" : "false");
  }

  function validateForm(root: HTMLElement) {
    const missing: HTMLElement[] = [];

    requiredSelectors.forEach(sel => {
      const el = root.querySelector(sel) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null);
      if (!el) return;
      const ok = isFilled(el);
      mark(el, !ok);
      if (!ok) missing.push(el as HTMLElement);
      const clear = () => mark(el, !isFilled(el));
      el.addEventListener("input", clear, { once: true });
      el.addEventListener("change", clear, { once: true });
    });

    return missing;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErr(null);

    const form = formRef.current;
    if (!form) return;

    // client-side validation (adds red rings)
    const missing = validateForm(form);
    if (missing.length) {
      setStatus("idle");
      // focus first error
      missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
      (missing[0] as HTMLElement).focus?.();
      return;
    }

    try {
      const fd = new FormData(form);
      // keep honeypot behavior identical
      const res = await fetch("/api/planner-request", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Request failed (${res.status})`);
      }
      setStatus("ok");
      router.push("/event-pool/thanks");
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

      <form
        ref={formRef}
        noValidate
        action="/api/planner-request"
        method="POST"
        onSubmit={onSubmit}
        className="grid gap-4"
      >
        {/* honeypot */}
        <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Planner name*</label>
            <input name="planner" placeholder="Your name" className="border rounded-md px-3 py-2" />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Email*</label>
            <input name="email" type="email" placeholder="name@email.com" className="border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Phone*</label>
            <input name="phone" placeholder="(###) ###-####" className="border rounded-md px-3 py-2" />
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Date of wedding (optional)</label>
            <input name="event_date" type="date" className="border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">City / Venue*</label>
          <input name="venue" placeholder="City or venue name" className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Roles needed*</label>
          <input name="roles_needed" placeholder="e.g., Setup, Serving, Bartending" className="border rounded-md px-3 py-2" />
        </div>

        <div className="grid gap-1">
          <label className="text-sm font-medium">Brief description*</label>
          <textarea name="notes" rows={5} placeholder="Tell us about your event (timeline, headcount, special needs, etc.)" className="border rounded-md px-3 py-2" />
        </div>

        <div className="pt-1">
          <button type="submit" disabled={status === "loading"} className="border border-gray-400 text-black bg-white px-4 py-2 rounded transition-colors duration-150 shadow-sm hover:bg-gray-100 hover:shadow-md">
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
