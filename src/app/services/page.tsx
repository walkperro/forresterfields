import ServicesAndPackages from "@/components/ServicesAndPackages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Light pastel background (no heavy blur) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-100 opacity-50" />
        <div className="absolute top-10 right-[-5rem] h-64 w-64 rounded-full bg-sky-100 opacity-50" />
        <div className="absolute bottom-[-5rem] left-1/3 h-56 w-56 rounded-full bg-emerald-100 opacity-40" />
      </div>

      {/* Content wrapper (no backdrop-blur) */}
      <section className="container py-12">
        <div className="rounded-2xl border border-white/70 bg-white shadow-xl">
          <header className="border-b border-white/70 bg-gradient-to-r from-pink-50 via-rose-50 to-sky-50 rounded-t-2xl px-6 py-8">
            <h1 className="font-display text-4xl text-slate-900">Services &amp; Packages</h1>
            <p className="mt-2 text-slate-600">Transparent options for stress-free planning.</p>
          </header>
          <div className="px-6 py-8">
            <ServicesAndPackages />
          </div>
        </div>
      </section>
    </main>
  );
}
