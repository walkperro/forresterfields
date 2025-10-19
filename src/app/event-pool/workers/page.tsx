import { Playfair_Display } from "next/font/google";
import { supabase } from "@/lib/supabase";
import ApplyFormClient from "../ApplyFormClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Narrow type for jobs returned by Supabase
type JobRow = {
  id: string;
  title?: string | null;
  status?: string | null;
  event_date?: string | null;
  location?: string | null;
  roles?: string[] | string | null;
  pay?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  notes?: string | null;
};

export default async function WorkersPage() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("event_date", { ascending: true });

  const rows = (jobs ?? []) as JobRow[];

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className={`${playfair.className} text-4xl font-medium leading-snug text-slate-800`}>
        Workers
      </h1>
      <p className="mt-2 text-slate-600">Browse open roles and apply to join our pool.</p>

      <h2 className="mt-8 text-2xl font-semibold">Current Open Roles</h2>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          Failed to load jobs: {error.message}
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {rows.length > 0 ? (
          rows.map((job) => {
            const rolesText = Array.isArray(job.roles)
              ? job.roles.join(", ")
              : (job.roles ?? "—");
            const timeText =
              [job.start_time, job.end_time].filter(Boolean).join(" – ") || "—";
            return (
              <article key={job.id} className="rounded-xl border border-slate-200 p-5 shadow-sm bg-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{job.title ?? "Event role"}</h3>
                  <span className="text-sm px-2 py-1 rounded-full border border-slate-200">
                    {job.status ?? "Open"}
                  </span>
                </div>
                <dl className="mt-3 space-y-1 text-sm text-slate-700">
                  <div className="flex gap-2">
                    <dt className="w-28 font-medium">Date</dt>
                    <dd>{job.event_date ?? "TBD"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 font-medium">Location</dt>
                    <dd>{job.location ?? "TBD"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 font-medium">Roles</dt>
                    <dd>{rolesText}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 font-medium">Pay</dt>
                    <dd>{job.pay ?? "—"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-28 font-medium">Time</dt>
                    <dd>{timeText}</dd>
                  </div>
                </dl>
                {job.notes && <p className="mt-3 text-sm text-slate-600">{job.notes}</p>}
                <a
                  href="#apply"
                  className="mt-4 inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
                >
                  Request to work
                </a>
              </article>
            );
          })
        ) : (
          <p className="text-slate-600">No open roles yet. Check back soon!</p>
        )}
      </div>

      <h2 id="apply" className="mt-14 text-2xl font-semibold">
        Apply to Join the Pool
      </h2>
      <div className="mt-6">
        <ApplyFormClient />
      </div>
    </main>
  );
}
