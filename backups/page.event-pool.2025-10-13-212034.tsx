import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic'; // fetch on each request (fixes empty on Vercel)
export const revalidate = 0;

type Job = {
  id: string;
  title: string | null;
  event_date: string | null;
  location: string | null;
  roles: string[] | null;
  pay: string | null;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  status: string | null;
};

export default async function EventPoolPage() {
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('event_date', { ascending: true });

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-serif font-semibold tracking-tight">The Event Pool by Forrester Fields</h1>

      <div className="mt-6 space-y-4 text-lg leading-8 text-slate-700">
        <p className="font-semibold text-slate-900">
          Are you a dependable worker looking to earn extra money on weekends you choose?
          <br />Or a special events planner scrambling for dependable workers?
        </p>
        <p>This is the place for you. Let’s help each other in the special-events community of Walton County and the greater Atlanta area.</p>
        <p>As a special events planner, my job is to handle the behind-the-scenes hustle and make sure the big day goes off without a hitch. That requires a reliable, efficient team with great references, communication, and transportation.</p>
        <p>If a change arises, workers can log in and swap with another approved member so staffing stays full. If a contracted worker can’t get a replacement, they’re removed from the pool and forfeit future jobs with Forrester Fields or its partners.</p>
      </div>

      <h2 className="mt-12 text-2xl font-semibold">Current Open Roles</h2>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">
          Failed to load jobs: {error.message}
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <article key={job.id} className="rounded-xl border border-slate-200 p-5 shadow-sm bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">{job.title ?? 'Event role'}</h3>
                <span className="text-sm px-2 py-1 rounded-full border border-slate-200">{job.status ?? 'Open'}</span>
              </div>
              <dl className="mt-3 space-y-1 text-sm text-slate-700">
                <div className="flex gap-2"><dt className="w-28 font-medium">Date</dt><dd>{job.event_date ?? 'TBD'}</dd></div>
                <div className="flex gap-2"><dt className="w-28 font-medium">Location</dt><dd>{job.location ?? 'TBD'}</dd></div>
                <div className="flex gap-2">
                  <dt className="w-28 font-medium">Roles</dt>
                  <dd>{Array.isArray(job.roles) ? job.roles.join(', ') : (job.roles as any)?.toString?.() ?? '—'}</dd>
                </div>
                <div className="flex gap-2"><dt className="w-28 font-medium">Pay</dt><dd>{job.pay ?? '—'}</dd></div>
                <div className="flex gap-2"><dt className="w-28 font-medium">Time</dt><dd>{[job.start_time, job.end_time].filter(Boolean).join(' – ') || '—'}</dd></div>
              </dl>
              {job.notes && <p className="mt-3 text-sm text-slate-600">{job.notes}</p>}
              <a href="#apply" className="mt-4 inline-flex items-center rounded-lg border px-3 py-2 text-sm hover:bg-slate-50">
                Request to work
              </a>
            </article>
          ))
        ) : (
          <p className="text-slate-600">No open roles yet. Check back soon!</p>
        )}
      </div>

      <h2 id="apply" className="mt-14 text-2xl font-semibold">Apply to Join the Pool</h2>
      <form className="mt-6 grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Full name" className="rounded-lg border p-3" />
        <input required type="email" name="email" placeholder="Email" className="rounded-lg border p-3" />
        <input name="phone" placeholder="Phone" className="rounded-lg border p-3 sm:col-span-2" />
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-2">Roles you can do</label>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {['Setup', 'Cleanup', 'Decorating', 'Greeting guests', 'Parking', 'Passing drinks & apps', 'Serving food', 'Bartending', 'Bathroom attendant', 'Driver'].map(r => (
              <label key={r} className="inline-flex items-center gap-2">
                <input type="checkbox" name="roles" value={r} className="h-4 w-4" /> {r}
              </label>
            ))}
          </div>
        </div>
        <textarea name="notes" placeholder="Anything we should know?" className="rounded-lg border p-3 sm:col-span-2" rows={4} />
        <button type="button" className="rounded-lg bg-emerald-700 text-white px-4 py-2 text-sm sm:col-span-2">
          Submit (coming soon)
        </button>
      </form>
    </main>
  );
}
