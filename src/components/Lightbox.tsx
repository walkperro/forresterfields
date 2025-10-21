"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
  onIndexChange: (n: number) => void;
};

export default function Lightbox({ images, startIndex, onClose, onIndexChange }: Props) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => setIndex(startIndex), [startIndex]);

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
    setIndex(n); onIndexChange(n);
  };
  const goNext = () => {
    const n = (index + 1) % images.length;
    setIndex(n); onIndexChange(n);
  };

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <m.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.16, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeOut' } }}
          role="dialog"
          aria-modal="true"
        >
          {/* Image container (no inner bg layer at all) */}
          <m.div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[92vw] max-w-[1100px] h-[calc(100vh-112px)] max-h-[calc(100vh-112px)] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.992 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.18, ease: 'easeOut' } }}
            exit={{ opacity: 0, scale: 0.992, transition: { duration: 0.12, ease: 'easeOut' } }}
          >
            {/* Cross-fade image */}
            <div className="absolute inset-0">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={images[index].src}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
                  exit={{ opacity: 0, transition: { duration: 0.16, ease: 'easeOut' } }}
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt || `Forrester Fields photo ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain select-none"
                    priority
                  />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-2 right-2 rounded-full bg-white/85 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            {/* Prev / Next */}
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
          </m.div>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
