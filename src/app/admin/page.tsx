import "./admin.css";
import "./admin-ui.css";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminHome() {
  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl">Admin</h1>
      <p className="text-gray-600 mt-2">Choose a section:</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/admin/requests" className="rounded-xl border p-6 hover:bg-gray-50 block">
          <div className="text-lg font-semibold">Planner Requests</div>
          <div className="text-gray-600">Review & track inbound planner requests.</div>
        </Link>

        <Link href="/admin/workers" className="rounded-xl border p-6 hover:bg-gray-50 block">
          <div className="text-lg font-semibold">Workers</div>
          <div className="text-gray-600">Review applications and manage status.</div>
        </Link>
      </div>
    </div>
  );
}
