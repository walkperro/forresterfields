import Link from "next/link";

export const metadata = { title: "Thanks — We’ll be in touch" };

export default function ContactThanks() {
  return (
    <main className="px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border bg-white p-8 md:p-12 text-center shadow-sm">
        {/* Subtle check icon */}
        <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-700">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl tracking-tight text-slate-800">
          Thank you! We’ll be in touch shortly.
        </h1>

        <p className="mt-3 text-slate-600">
          While you wait, take a quick look at our services and packages.
        </p>

        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-5 py-3 text-white hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Explore Services &amp; Packages
          </Link>
        </div>
      </div>
    </main>
  );
}
