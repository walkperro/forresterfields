import ClientContactForm from "./ClientContactForm";

export default function Contact() {
  return (
    <main className="relative overflow-hidden">
      {/* Soft pastel background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-pink-100 opacity-50" />
        <div className="absolute top-10 right-[-5rem] h-64 w-64 rounded-full bg-sky-100 opacity-50" />
        <div className="absolute bottom-[-5rem] left-1/3 h-56 w-56 rounded-full bg-emerald-100 opacity-40" />
      </div>

      <section className="container py-12 flex justify-center">
        <div className="w-full max-w-2xl rounded-2xl border border-white/70 bg-white shadow-xl">
          <header className="rounded-t-2xl border-b border-white/70 bg-gradient-to-r from-pink-50 via-rose-50 to-sky-50 px-6 py-8 text-center">
            <h1 className="font-display text-4xl text-slate-900">
              Schedule a Tour / Check Your Date
            </h1>
            <p className="mt-2 text-slate-600">
              We’ll reply quickly with availability and next steps.
            </p>
          </header>

          <div className="px-6 py-8">
            <ClientContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
