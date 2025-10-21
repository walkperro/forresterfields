"use client";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const RAW = [
  "/media/forresterfields/cupcake1.jpg",
  "/media/forresterfields/cupcake2.jpg",
  "/media/forresterfields/cupcake3.jpg",
  "/media/forresterfields/cupcake4.jpg",
  "/media/forresterfields/FB_IMG_1760900897404.jpg",
  "/media/forresterfields/FB_IMG_1760900901760.jpg",
  "/media/forresterfields/FB_IMG_1760900952547.jpg",
  "/media/forresterfields/FB_IMG_1760900958514.jpg",
  "/media/forresterfields/FB_IMG_1760900959829.jpg",
  "/media/forresterfields/FB_IMG_1760900964594.jpg",
  "/media/forresterfields/FB_IMG_1760900978015.jpg",
  "/media/forresterfields/FB_IMG_1760900981941.jpg",
  "/media/forresterfields/FB_IMG_1760900987066.jpg",
  "/media/forresterfields/FB_IMG_1760900989971.jpg",
  "/media/forresterfields/FB_IMG_1760900993463.jpg",
  "/media/forresterfields/FB_IMG_1760901002425.jpg",
  "/media/forresterfields/FB_IMG_1760901005860.jpg",
  "/media/forresterfields/FB_IMG_1760901008233.jpg",
  "/media/forresterfields/FB_IMG_1760901011298.jpg",
  "/media/forresterfields/FB_IMG_1760901014744.jpg",
  "/media/forresterfields/FB_IMG_1760901017102.jpg",
  "/media/forresterfields/FB_IMG_1760901019240.jpg",
  "/media/forresterfields/FB_IMG_1760901027010.jpg",
  "/media/forresterfields/FB_IMG_1760901028874.jpg",
  "/media/forresterfields/FB_IMG_1760901032241.jpg",
  "/media/forresterfields/FB_IMG_1760901040620.jpg",
  "/media/forresterfields/IMG-20251019-WA0001(1).jpg",
  "/media/forresterfields/IMG-20251019-WA0002.jpg",
  "/media/forresterfields/IMG-20251019-WA0002(1).jpg",
  "/media/forresterfields/IMG-20251019-WA0003.jpg",
  "/media/forresterfields/IMG-20251019-WA0004.jpg",
  "/media/forresterfields/IMG-20251019-WA0005.jpg",
  "/media/forresterfields/IMG-20251019-WA0006.jpg",
  "/media/forresterfields/IMG-20251019-WA0007.jpg",
  "/media/forresterfields/IMG-20251019-WA0008.jpg",
  "/media/forresterfields/IMG-20251019-WA0009.jpg",
  "/media/forresterfields/IMG-20251019-WA0010.jpg",
  "/media/forresterfields/IMG-20251019-WA0011.jpg",
  "/media/forresterfields/IMG-20251019-WA0012.jpg",
  "/media/forresterfields/IMG-20251019-WA0014.jpg",
  "/media/forresterfields/IMG-20251019-WA0017.jpg",
  "/media/forresterfields/rs=w_403,h_537 (1).jpeg",
  "/media/forresterfields/rs=w_403,h_537 (2).jpeg",
  "/media/forresterfields/rs=w_403,h_537 (2)(1).jpeg",
  "/media/forresterfields/rs=w_403,h_537 (3).jpeg",
  "/media/forresterfields/rs=w_403,h_537 (4).jpeg",
  "/media/forresterfields/rs=w_403,h_537.jpeg",
  "/media/forresterfields/rs=w_806,h_453.jpeg",
  "/media/forresterfields/rs=w_806,h_520 (1).jpeg",
  "/media/forresterfields/rs=w_806,h_537.jpeg",
  "/media/forresterfields/rs=w_806,h_540.jpeg",
  "/media/forresterfields/rs=w_806,h_605 (1)(1).jpeg",
  "/media/forresterfields/rs=w_806,h_605.jpeg",
  "/media/forresterfields/rs=w_806,h_606.jpeg",
  "/media/forresterfields/rs=w_806,h_1148.jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (1).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (2).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (3).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (4).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (5).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (6).jpeg",
  "/media/forresterfields/rs=w_806,h_1209 (7).jpeg",
  "/media/forresterfields/rs=w_806,h_1209.jpeg",
  "/media/forresterfields/rs=w_806,h_1721.jpeg",
  "/media/forresterfields/theforresters-0185.jpg",
  "/media/forresterfields/theforresters-0193.jpg",
  "/media/forresterfields/theforresters-0249.jpg",
  "/media/forresterfields/theforresters-0305.jpg",
  "/media/forresterfields/theforresters-0310.jpg",
  "/media/forresterfields/theforresters-0445.jpg",
  "/media/forresterfields/theforresters-0470.jpg",
  "/media/forresterfields/theforresters-0518.jpg",
  "/media/forresterfields/theforresters-0669.jpg",
  "/media/forresterfields/theforresters-0960.jpg",
  "/media/forresterfields/theforresters-1434.jpg",
  "/media/forresterfields/theforresters-1724.jpg",
  "/media/forresterfields/theforresters-8647 (1).jpg",
  "/media/forresterfields/theforresters-8738.jpg",
  "/media/forresterfields/theforresters-8902.jpg",
  "/media/forresterfields/theforresters-8956.jpg",
  "/media/forresterfields/theforresters-9043.jpg",
  "/media/forresterfields/theforresters-9226.jpg",
  "/media/forresterfields/theforresters-9289.jpg",
  "/media/forresterfields/theforresters-9458.jpg",
  "/media/forresterfields/theforresters-9621.jpg",
  "/media/forresterfields/theforrestersfireworks.jpg",
  "/media/forresterfields/theforrestersfireworks2.jpg"
];
  // Encode spaces, commas, parentheses, etc.
  const FILES = RAW.map((s) => encodeURI(s));

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const show = (i:number)=>{ setIndex(i); setOpen(true); };
  const close = ()=> setOpen(false);
  const prev = useCallback(()=> setIndex(i => (i - 1 + FILES.length) % FILES.length), [FILES.length]);
  const next = useCallback(()=> setIndex(i => (i + 1) % FILES.length), [FILES.length]);

  useEffect(()=>{
    if(!open) return;
    const onKey = (e: KeyboardEvent) => {
      if(e.key === "Escape") close();
      else if(e.key === "ArrowLeft") prev();
      else if(e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  return (
    <main>
      <section className="section bg-brand-cream/50">
        <div className="container">
          <h1 className="font-display text-4xl">Gallery</h1>
          <p className="text-gray-600 mt-2">A peek at recent weddings at Forrester Fields.</p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {FILES.map((src, i) => (
              <motion.button
                key={src}
                onClick={() => show(i)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.02 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-black/5 focus:outline-none focus:ring-2 focus:ring-brand-emerald/50"
                aria-label={"Open photo " + (i + 1)}
              >
                <Image
                  src={src}
                  alt={"Forrester Fields photo " + (i + 1)}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  priority={i < 4}
                />
                <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            key="lb"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={close}
            role="dialog" aria-modal="true"
          >
            <motion.div className="relative w-full max-w-6xl" onClick={(e)=>e.stopPropagation()}>
              <motion.div
                key={FILES[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-[70vh] md:h-[80vh]"
              >
                <Image
                  src={FILES[index]}
                  alt={"Forrester Fields photo " + (index + 1)}
                  fill sizes="100vw"
                  className="object-contain select-none rounded-xl"
                  priority
                />
              </motion.div>

              <button onClick={close} aria-label="Close"
                className="absolute -top-4 -right-4 md:top-2 md:right-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2 transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <button onClick={prev} aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-3 transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button onClick={next} aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-3 transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-xs md:text-sm text-white/80 tracking-wide">
                {index + 1} / {FILES.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
