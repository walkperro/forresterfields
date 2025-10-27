import ServicesAndPackages from "@/components/ServicesAndPackages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ServicesPage() {
  return (
    <main className="relative overflow-hidden scroll-smooth">
      {/* Pastel background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-100 blur-3xl opacity-70" />
        <div className="absolute top-10 right-[-6rem] h-80 w-80 rounded-full bg-sky-100 blur-3xl opacity-70" />
        <div className="absolute bottom-[-6rem] left-1/3 h-72 w-72 rounded-full bg-emerald-100 blur-3xl opacity-60" />
      </div>

      {/* Content wrapper (glass) */}
      <section className="container py-12">
        <div className="rounded-2xl border border-white/60 bg-white/80 shadow-xl backdrop-blur-md">
          <header className="border-b border-white/60 bg-gradient-to-r from-pink-50 via-rose-50 to-sky-50 rounded-t-2xl px-6 py-8">
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
