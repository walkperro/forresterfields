import Link from "next/link";

export default function EventPoolIndex() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-serif font-semibold tracking-tight">The Event Pool by Forrester Fields</h1>

      <div className="mt-6 space-y-4 text-lg leading-8 text-slate-700">
        <p className="font-semibold text-slate-900">
          Are you a dependable worker looking to earn extra money on weekends you choose?
          <br />Or a special events planner scrambling for dependable workers?
        </p>
        <p>This is the place for you. Let’s help each other in the special-events community of Walton County and the greater Atlanta area.</p>
      </div>

      {/* Submenu */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/event-pool/workers" className="block rounded-xl border p-6 hover:bg-gray-50">
          <div className="text-xl font-semibold">For Workers</div>
          <div className="text-gray-600 mt-1">See open roles and apply to join the pool.</div>
        </Link>

        <Link href="/event-pool/planners" className="block rounded-xl border p-6 hover:bg-gray-50">
          <div className="text-xl font-semibold">For Planners</div>
          <div className="text-gray-600 mt-1">Request staff for your upcoming event.</div>
        </Link>
      </div>
    </main>
  );
}
