"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/lib/gallery";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZWYiLz48L3N2Zz4=";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12">
        {/* Compact 2-col grid (square tiles) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => { setIndex(i); setOpen(true); }}
              aria-label={`Open photo ${i + 1}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 transition hover:ring-brand-gold"
            >
              <Image
                src={img.src}
                alt={img.alt || `Forrester Fields photo ${i + 1}`}
                fill
                placeholder="blur"
                blurDataURL={BLUR}
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                priority={i < 6}  /* show more above-the-fold instantly */
              />
            </button>
          ))}
        </div>
      </section>

      {open && (
        <Lightbox
          startIndex={index}
          images={images}
          onClose={() => setOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
