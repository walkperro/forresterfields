"use client";

import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

type Props = {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
  onIndexChange?: (i: number) => void;
};

export default function Lightbox({ images, startIndex, onClose, onIndexChange }: Props) {
  const [i, setI] = useState(startIndex);

  const next = useCallback(() => setI((i + 1) % images.length), [i, images.length]);
  const prev = useCallback(() => setI((i - 1 + images.length) % images.length), [i, images.length]);

  // key controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, next, prev, onClose]);

  // sync with parent
  useEffect(() => onIndexChange?.(i), [i, onIndexChange]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3"
      >
        {/* blurred gradient around image only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 200, damping: 24, duration: 0.25 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-800/80 to-neutral-900/80 shadow-2xl ring-1 ring-white/10"
          style={{
            width: "min(95vw, 1100px)",
            height: "min(85vh, 900px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full bg-black/60 backdrop-blur-sm">
            <Image
              src={images[i].src}
              alt={images[i].alt || `Forrester Fields photo ${i + 1}`}
              fill
              className="object-contain"
              sizes="(max-width:768px) 92vw, 1100px"
              priority
            />
          </div>

          {/* smaller refined arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 px-2 py-1.5 text-2xl font-light text-gray-900 shadow"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/70 hover:bg-white/90 px-2 py-1.5 text-2xl font-light text-gray-900 shadow"
          >
            ›
          </button>

          {/* lighter close “x” */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 rounded-full bg-white/60 hover:bg-white/80 px-2 py-1 text-base font-medium text-gray-800 shadow-sm"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
