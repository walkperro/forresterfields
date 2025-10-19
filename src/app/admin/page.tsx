import Link from "next/link";

export default function AdminIndex() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-['Playfair_Display'] text-[2rem] font-light tracking-tight text-slate-800 mb-6">Admin</h1>
      <p className="mt-2 text-slate-600">Choose a section:</p>

      <div className="mt-6 grid gap-4">
        <Link href="/admin/requests" className="block rounded-xl border p-6 bg-white hover:bg-gray-50">
          <div className="text-xl font-semibold">Planner Requests</div>
          <div className="text-gray-600 mt-1">Review & track inbound planner requests.</div>
        </Link>

        <Link href="/admin/workers" className="block rounded-xl border p-6 bg-white hover:bg-gray-50">
          <div className="text-xl font-semibold">Workers</div>
          <div className="text-gray-600 mt-1">Review applications and manage status.</div>
        </Link>

        <Link href="/admin/jobs" className="block rounded-xl border p-6 bg-white hover:bg-gray-50">
          <div className="text-xl font-semibold">Job Posts</div>
          <div className="text-gray-600 mt-1">Create, open/close, and delete worker roles.</div>
        </Link>
      </div>
    </main>
  );
}
