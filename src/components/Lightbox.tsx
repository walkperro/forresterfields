"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

type ImgLike = string | { src: string; alt?: string };
type Props = {
  images: ImgLike[];
  startIndex: number;
  onClose: () => void;
  onIndexChange: (nextIndex: number) => void; // accept a number (not a setter fn)
};

function toSrc(img: ImgLike) {
  return typeof img === "string" ? img : img.src;
}
function toAlt(img: ImgLike, i: number) {
  return typeof img === "string" ? `Forrester Fields photo ${i + 1}` : img.alt || `Forrester Fields photo ${i + 1}`;
}

const easeCubic: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeSlide: Variants = {
  initial: { opacity: 0, x: 40 },
  enter:   { opacity: 1, x: 0, transition: { duration: 0.32, ease: easeCubic } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.26, ease: easeCubic } },
} as const;
export default function Lightbox({ images, startIndex, onClose, onIndexChange }: Props) {
  const [index, setIndex] = useState(startIndex);

  // keyboard navigation (top-level effect)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const next = (index - 1 + images.length) % images.length;
        setIndex(next);
        onIndexChange(next);
      }
      if (e.key === "ArrowRight") {
        const next = (index + 1) % images.length;
        setIndex(next);
        onIndexChange(next);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, onClose, onIndexChange]);

  // prefetch neighbors (top-level effect)
  useEffect(() => {
    const left = (index - 1 + images.length) % images.length;
    const right = (index + 1) % images.length;
    [left, right].forEach((i) => {
      const s = toSrc(images[i]);
      const img = new window.Image();
      img.src = s;
    });
  }, [index, images]);

  const goPrev = () => {
    const next = (index - 1 + images.length) % images.length;
    setIndex(next);
    onIndexChange(next);
  };
  const goNext = () => {
    const next = (index + 1) % images.length;
    setIndex(next);
    onIndexChange(next);
  };

  const src = toSrc(images[index]);
  const alt = toAlt(images[index], index);

  return (
    <LazyMotion features={domAnimation}>
      {/* single global dim background, no inner backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
          <div className="relative w-full h-[70vh] md:h-[80vh]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={src}
                variants={fadeSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={alt}
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
            className="absolute -top-4 -right-4 md:top-2 md:right-2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Prev */}
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Next */}
          <button
            onClick={goNext}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-lg ring-1 ring-black/10 p-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 text-xs md:text-sm text-white/80">
            {index + 1} / {images.length}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
