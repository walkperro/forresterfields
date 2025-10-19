import HeroVideo from "@/components/HeroVideo";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const PREVIEW = [
    "https://picsum.photos/seed/ff1/1200/800",
    "https://picsum.photos/seed/ff2/1200/800",
    "https://picsum.photos/seed/ff3/1200/800",
    "https://picsum.photos/seed/ff4/1200/800",
    "https://picsum.photos/seed/ff5/1200/800",
    "https://picsum.photos/seed/ff6/1200/800",
    "https://picsum.photos/seed/ff7/1200/800",
    "https://picsum.photos/seed/ff8/1200/800",
  ];

  return (
    <main>
      {/* HERO */}
      <HeroVideo />

      {/* VALUE PROPS */}
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-3">
          {[
            ["Lakeside Ceremony", "Say “I do” beside the water under market lights."],
            ["Planning to Day-Of", "From full planning to month-of and day-of coordination."],
            ["Stress-free Logistics", "Parking, dressing suites, decor, lighting, and more."]
          ].map(([t, d]) => (
            <div key={t as string} className="card p-6">
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
            {PREVIEW.map((f,i)=>(
              <Image key={i} src={f} alt={`Wedding ${i+1}`} width={900} height={700}
                className="h-40 w-full object-cover rounded-md" />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/gallery" className="underline">See full gallery →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-display">Check your date & plan a tour</h3>
            <p className="text-gray-600 mt-1">Serving Walton County and the surrounding Greater Atlanta area.</p>
          </div>
          <Link href="/contact" className="btn btn-primary">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
