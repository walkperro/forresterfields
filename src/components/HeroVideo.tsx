'use client';

import { useEffect, useRef, useState } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadeToBlack, setFadeToBlack] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Fade out just before the loop ends, fade back in at the start.
    const onTimeUpdate = () => {
      if (!v.duration) return;
      const remaining = v.duration - v.currentTime;
      // Show black overlay for the last ~0.7s of each loop
      setFadeToBlack(remaining <= 0.7);
    };

    v.addEventListener('timeupdate', onTimeUpdate);
    return () => v.removeEventListener('timeupdate', onTimeUpdate);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[78vh] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover [object-position:50%_35%]" 
        // object-position nudges the focal point up a bit so faces stay in frame
        src="/media/forresterfields/hero.mp4"
        autoPlay
        muted
        playsInline
        loop
      />

      {/* Readability overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* Soft vignette (edge fade) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            'radial-gradient(120% 80% at 50% 40%, #000 55%, transparent 100%)',
          maskImage:
            'radial-gradient(120% 80% at 50% 40%, #000 55%, transparent 100%)',
        }}
      />

      {/* Loop crossfade to black, then back in */}
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-700 ${
          fadeToBlack ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Copy */}
      <div className="relative z-10 mx-auto h-full max-w-5xl px-4">
        <div className="flex h-full items-center">
          <div className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
            <h1 className="font-['Playfair_Display'] leading-tight text-4xl sm:text-5xl md:text-6xl">
              Unforgettable<br />Lakeside Weddings
            </h1>
            <p className="mt-4 max-w-2xl text-base md:text-lg">
              Private venue in Loganville serving Walton County &amp; the
              Greater Atlanta area — full planning, month-of, and day-of
              coordination.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="/contact"
                className="rounded-md bg-emerald-800 px-5 py-3 text-white hover:bg-emerald-700"
              >
                Schedule a Tour
              </a>
              <a
                href="/services"
                className="rounded-md px-5 py-3 text-white/95 ring-1 ring-white/70 hover:bg-white/10"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
