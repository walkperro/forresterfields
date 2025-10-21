"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ open, src, alt, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-2 text-white"
            onClick={onClose}
          >✕</button>
          <button
            aria-label="Prev"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
            onClick={onPrev}
          >‹</button>
          <motion.img
            key={src}
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          />
          <button
            aria-label="Next"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white"
            onClick={onNext}
          >›</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
