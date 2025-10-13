import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HERO */}
      <section className="relative">
        <Image
          src="/hero/hero.jpg"
          alt="Lakeside wedding at Forrester Fields"
          width={2400}
          height={1400}
          priority
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-semibold">
              Lakeside Weddings in Loganville, Georgia
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              A serene private venue with full-service planning and on-call wedding staff.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link href="/contact" className="px-5 py-3 bg-white text-gray-900 rounded-md">
                Schedule a Tour
              </Link>
              <Link href="/services" className="px-5 py-3 border border-white/80 text-white rounded-md">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto max-w-6xl px-6 py-14 grid gap-6 md:grid-cols-3">
        {[
          ["Lakeside Ceremony", "Say “I do” beside the water under market lights."],
          ["Planning to Day-Of", "From full planning to month-of and day-of coordination."],
          ["Easy Booking", "Fast date checks and private tour scheduling."]
        ].map(([title, blurb]) => (
          <div key={title} className="rounded-xl border p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-gray-600">{blurb}</p>
          </div>
        ))}
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-2xl md:text-3xl font-semibold">Gallery</h2>
        <p className="text-gray-600 mt-2">A peek at recent weddings at Forrester Fields.</p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {["g1.webp","g2.webp","g3.webp","g4.webp","g5.webp","g6.webp","g7.webp","g8.webp"].map((f,i)=>(
            <Image key={i} src={`/gallery/${f}`} alt={`Wedding ${i+1}`} width={800} height={600}
              className="h-40 w-full object-cover rounded-md" />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/gallery" className="underline">See full gallery →</Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12 grid gap-6 md:grid-cols-3">
          {[
            ["“100% recommend. The lakeside setting is unreal.”","— K & J"],
            ["“Month-of coordination kept everything smooth.”","— A & T"],
            ["“Night lighting made the photos magical.”","— S & D"]
          ].map(([q, who]) => (
            <div key={q} className="rounded-xl border bg-white p-6">
              <p className="text-lg">{q}</p>
              <p className="mt-3 text-gray-600">{who}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">Check your date & plan a tour</h3>
            <p className="text-gray-600 mt-1">Serving Loganville, Monroe, Snellville & East Atlanta.</p>
          </div>
          <Link href="/contact" className="px-5 py-3 bg-black text-white rounded-md">Get in touch</Link>
        </div>
      </section>
    </main>
  );
}
