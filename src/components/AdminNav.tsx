
"use client";
import Link from "next/link";

type Tab = "home" | "requests" | "workers" | "jobs";

export default function AdminNav({ active }: { active?: Tab }) {
  const base = "border rounded-md px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-0";
  const activeCls = "bg-slate-100 border-slate-300 text-slate-900";
  const idleCls = "border-slate-300";

  const Item = ({ href, label, tab }: { href: string; label: string; tab: Tab }) => (
    <Link
      href={href}
      aria-current={active === tab ? "page" : undefined}
      className={[base, active === tab ? activeCls : idleCls].join(" ")}
    >
      {label}
    </Link>
  );

  return (
    <div className="admin-nav flex flex-wrap gap-2 mt-4 mb-8">
      <Item href="/admin" label="Admin Home" tab="home" />
      <Item href="/admin/requests" label="Planner Requests" tab="requests" />
      <Item href="/admin/workers" label="Workers" tab="workers" />
      <Item href="/admin/jobs" label="Job Posts" tab="jobs" />
    </div>
  );
}
