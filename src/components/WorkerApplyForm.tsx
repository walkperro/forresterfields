"use client";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WorkerApplyForm() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    const fd = new FormData(e.currentTarget);
    const roles = fd.getAll("roles") as string[];
    const { error } = await supabase.from("applications").insert({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      city: fd.get("city"),
      roles,
      notes: fd.get("notes"),
    });
    if (error) setErr(error.message);
    else setSent(true);
  }

  if (sent)
    return (
      <p className="mt-4 text-green-700">
        Thanks! We’ll review and email you if approved.
      </p>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <input name="name" required className="input" placeholder="Full name" />
      <input name="email" type="email" className="input" placeholder="Email" />
      <input name="phone" className="input" placeholder="Phone" />
      <input name="city" className="input" placeholder="City / ZIP" />
      <fieldset>
        <legend className="font-medium">Roles</legend>
        {[
          "Set-up",
          "Clean-up",
          "Decorating",
          "Greeting",
          "Parking",
          "Passing drinks & apps",
          "Serving",
          "Bartending",
          "Bathroom attendant",
          "Driver",
        ].map((r) => (
          <label key={r} className="block">
            <input type="checkbox" name="roles" value={r} className="mr-2" />
            {r}
          </label>
        ))}
      </fieldset>
      <textarea
        name="notes"
        className="input"
        placeholder="Availability, transport, refs, etc."
      />
      <button className="btn-primary" type="submit">
        Apply
      </button>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  );
}
