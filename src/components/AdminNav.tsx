"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkBase =
  "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium border";
const active =
  "border-gray-900 text-gray-900 bg-gray-100";
const inactive =
  "border-gray-300 text-gray-700 hover:bg-gray-50";

export default function AdminNav() {
  const pathname = usePathname();
  const isReq = pathname?.startsWith("/admin/requests");
  const isWorkers = pathname?.startsWith("/admin/workers");
  const isHome = pathname === "/admin";

  return (
    <nav className="flex gap-3">
      <Link
        href="/admin"
        className={`${linkBase} ${isHome ? active : inactive}`}
      >
        Admin Home
      </Link>
      <Link
        href="/admin/requests"
        className={`${linkBase} ${isReq ? active : inactive}`}
      >
        Planner Requests
      </Link>
      <Link
        href="/admin/workers"
        className={`${linkBase} ${isWorkers ? active : inactive}`}
      >
        Workers
      </Link>
    </nav>
  );
}
