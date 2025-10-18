import PlannerRequestFormClient from "../PlannerRequestFormClient";

export const dynamic = 'force-dynamic';

export default function PlannersPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-semibold tracking-tight">Event Pool — Planners</h1>
      <p className="mt-2 text-slate-600">
        Need staff for an upcoming event? Send us the details and we’ll get back to you quickly.
      </p>

      <div className="mt-6">
        <PlannerRequestFormClient />
      </div>
    </main>
  );
}
