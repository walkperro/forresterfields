"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed, autoplaying, muted, looped hero video with a soft overlay
 * and your existing headline, subhead, and CTAs.
 *
 * Video source: /media/forresterfields/hero.mp4
 * Optional poster image: /media/forresterfields/hero-poster.jpg (add later if you want)
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // try to nudge autoplay on some mobile browsers
    const play = async () => {
      try {
        await v.play();
        setCanPlay(true);
      } catch {
        // ignored — the overlay still looks fine if it doesn’t autoplay
      }
    };
    play();
  }, []);

  return (
    <section className="relative w-full min-h-[68vh] sm:min-h-[75vh] lg:min-h-[82vh] overflow-hidden">
      {/* Video background */}
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src="/media/forresterfields/hero.mp4"
        // uncomment if you add a poster image:
        // poster="/media/forresterfields/hero-poster.jpg"
        playsInline
        muted
        loop
        autoPlay
      />

      {/* Soft dark gradient for readable text */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.35))]" />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 lg:py-28">
        <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight text-balance">
          Unforgettable Lakeside Weddings
        </h1>

        <p className="mt-4 sm:mt-5 text-white/90 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Private venue in Loganville serving Walton County &amp; the Greater Atlanta area — full
          planning, month-of, and day-of coordination.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-[#2D5A3F] text-white px-5 py-3 text-base font-medium hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Schedule a Tour
          </Link>

          <Link
            href="/services"
            className="rounded-md border border-white/70 bg-white/10 text-white px-5 py-3 text-base font-medium backdrop-blur-sm hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            View Packages
          </Link>
        </div>
      </div>
    </section>
  );
}
