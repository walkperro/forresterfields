"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type AppRow = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  roles: string[] | null;
  status: string;
};

export default function ApprovedWorkers() {
  const [rows, setRows] = useState<AppRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("applications")
      .select("id,created_at,name,email,phone,city,roles,status")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .then(({ data, error }) =>
        error ? setErr(error.message) : setRows(data || [])
      );
  }, []);

  if (err) return <p className="text-red-600">Failed to load: {err}</p>;
  if (!rows.length) return <p>No approved workers yet.</p>;

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Roles</th>
            <th className="py-2 pr-4">City</th>
            <th className="py-2 pr-4">Contact</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b last:border-0">
              <td className="py-2 pr-4">{r.name}</td>
              <td className="py-2 pr-4">{(r.roles || []).join(", ")}</td>
              <td className="py-2 pr-4">{r.city || ""}</td>
              <td className="py-2 pr-4">
                {r.email && (
                  <a className="underline mr-2" href={`mailto:${r.email}`}>
                    {r.email}
                  </a>
                )}
                {r.phone && (
                  <a className="underline" href={`tel:${r.phone}`}>
                    {r.phone}
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 mt-2">
        Only “approved” entries are visible publicly (managed in Supabase).
      </p>
    </div>
  );
}
