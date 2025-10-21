"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "./Lightbox";

export type GalleryImage = {
  src: string;
  alt: string;
  w?: number;
  h?: number;
};

const BLUR =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='14'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3C/svg%3E";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const sizes =
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <figure
            key={img.src}
            className="group relative overflow-hidden rounded-2xl bg-white/60 shadow-sm ring-1 ring-black/5"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                placeholder="blur"
                blurDataURL={BLUR}
                sizes={sizes}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading={i < 4 ? "eager" : "lazy"}
                priority={i < 2}
              />
            </div>

            {/* Lightbox trigger overlay */}
            <Lightbox images={images} startIndex={i} />
          </figure>
        ))}
      </div>
    </section>
  );
}
