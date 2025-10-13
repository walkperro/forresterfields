import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative">
        <Image src="/hero/hero.jpg" alt="Lakeside ceremony" width={2400} height={1400}
               priority className="h-[70vh] w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container text-white text-center">
            <h1 className="font-display text-4xl md:text-6xl">Unforgettable Lakeside Weddings</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Private venue in Loganville with full planning, month-of, and day-of coordination.
            </p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary">Schedule a Tour</Link>
              <Link href="/services" className="btn btn-outline">View Packages</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ["Lakeside Ceremony", "Say “I do” beside the water under market lights."],
            ["Planning to Day-Of", "From full planning to month-of and day-of coordination."],
            ["Stress-free Logistics", "Parking, dressing suites, decor, lighting, and more."]
          ].map(([t, d]) => (
            <div key={t} className="card p-6">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="text-gray-600 mt-2">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="section bg-brand-cream/50">
        <div className="container">
          <h2 className="font-display text-3xl">Gallery</h2>
          <p className="text-gray-600 mt-2">A peek at recent weddings at Forrester Fields.</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {["g1.webp","g2.webp","g3.webp","g4.webp","g5.webp","g6.webp","g7.webp","g8.webp"].map((f,i)=>(
              <Image key={i} src={`/gallery/${f}`} alt={`Wedding ${i+1}`} width={900} height={700}
                className="h-40 w-full object-cover rounded-md" />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/gallery" className="underline">See full gallery →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ["“100% recommend. The lakeside setting is unreal.”","— K & J"],
            ["“Month-of coordination kept everything smooth.”","— A & T"],
            ["“Night lighting made the photos magical.”","— S & D"]
          ].map(([q,who])=>(
            <div key={q} className="card p-6">
              <p className="text-lg">{q}</p>
              <p className="mt-3 text-gray-600">{who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-display">Check your date & plan a tour</h3>
            <p className="text-gray-600 mt-1">Serving Loganville, Monroe, Snellville & East Atlanta.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
