"use client";
import Link from "next/link";

export default function HeroVideo() {
  return (
    <section className="relative bg-black">
      {/* Video */}
      <div className="mx-auto max-w-7xl">
        <video
          className="block w-full mx-auto object-contain max-h-[78vh] md:max-h-[82vh] transition-opacity duration-500"
          autoPlay
          muted
          loop
          playsInline
          src="/media/forresterfields/hero.mp4"
        />
      </div>

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

      {/* Text overlay (slightly lower) */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-left mt-6 md:mt-10">
        <div className="pointer-events-auto text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] max-w-3xl">
          <h1 className="font-['Playfair_Display'] text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] leading-snug mb-3">
            Unforgettable Lakeside Weddings
          </h1>

          <p className="text-[0.95rem] sm:text-[1.05rem] md:text-lg text-slate-100/90 mb-6 leading-relaxed max-w-xl">
            Private venue in Loganville serving Walton County &amp; the Greater
            Atlanta area — full planning, month-of, and day-of coordination.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-emerald-800 hover:bg-emerald-700 px-6 py-3 text-base font-medium text-white shadow-md hover:shadow-lg transition-all"
            >
              Schedule a Tour
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-white/80 hover:bg-white/10 px-6 py-3 text-base font-medium text-white backdrop-blur-[1px] transition-all"
            >
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
