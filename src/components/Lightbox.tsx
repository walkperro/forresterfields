"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
  onIndexChange: (n: number) => void; // number only (no functional updates)
};

const easeLux = cubicBezier(0.22, 0.61, 0.36, 1);

export default function Lightbox({ images, startIndex, onClose, onIndexChange }: Props) {
  const [index, setIndex] = useState(startIndex);

  // keep internal index in sync when opened with a different startIndex
  useEffect(() => setIndex(startIndex), [startIndex]);

  // keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  const goPrev = () => {
    const n = (index - 1 + images.length) % images.length;
    setIndex(n);
    onIndexChange(n);
  };
  const goNext = () => {
    const n = (index + 1) % images.length;
    setIndex(n);
    onIndexChange(n);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.18, ease: easeLux } }}
        exit={{ opacity: 0, transition: { duration: 0.15, ease: easeLux } }}
        role="dialog"
        aria-modal="true"
      >
        {/* Wrapper that constrains the image and owns the edge vignette */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-[92vw] max-w-[1100px] h-[calc(100vh-112px)] max-h-[calc(100vh-112px)] rounded-2xl overflow-hidden"
          initial={{ scale: 0.985, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.22, ease: easeLux } }}
          exit={{ scale: 0.985, opacity: 0, transition: { duration: 0.15, ease: easeLux } }}
        >
          {/* Edge vignette hugging the photo */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />

          {/* The image */}
          <div className="absolute inset-0">
            <Image
              key={images[index].src}
              src={images[index].src}
              alt={images[index].alt || `Forrester Fields photo ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              priority
            />
          </div>

          {/* Close (lighter) */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Prev / Next (smaller) */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-xs md:text-sm text-white/85">
            {index + 1} / {images.length}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
