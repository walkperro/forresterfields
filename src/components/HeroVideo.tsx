"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setReady(true);
    v.addEventListener("canplaythrough", onReady, { once: true });
    v.addEventListener("loadeddata", onReady, { once: true });
    return () => {
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
    };
  }, []);

  const poster = "/media/forresterfields/venue.png";

  return (
    <section
      className="relative bg-black"
      style={{
        backgroundImage: `url(${poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <video
          ref={videoRef}
          className={`block w-full mx-auto object-contain max-h-[78vh] md:max-h-[82vh] transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay={!prefersReduced}
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          src="/media/forresterfields/hero_21s_streamcopy.mp4"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-left">
        <div className="pointer-events-auto text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] max-w-3xl translate-y-[2vh] md:translate-y-[3vh]">
          <h1 className="font-['Playfair_Display'] text-[2rem] sm:text-[2.75rem] md:text-[3.25rem] leading-snug mb-3">
            Unforgettable Lakeside Weddings
          </h1>
          <p className="text-[0.95rem] sm:text-[1.05rem] md:text-lg text-white/90 mb-6">
            Private venue in Loganville serving Walton County &amp; the Greater Atlanta area — full planning, month-of, and day-of coordination.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-emerald-800 hover:bg-emerald-700 px-5 py-3 font-medium text-white shadow-md hover:shadow-lg transition-all"
            >
              Schedule a Tour
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
