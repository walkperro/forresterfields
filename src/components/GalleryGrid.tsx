"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

type GalleryImage = { src: string; alt?: string };

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZWYiLz48L3N2Zz4=";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-4 pb-16">
        {/* 2-col grid; compact 4:3 tiles so at least ~3 rows are visible on load */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {images.map((img, i) => (
            <button
              key={(img.src ?? "") + i}
              onClick={() => { setIndex(i); setOpen(true); }}
              aria-label={`Open photo ${i + 1}`}
              className="group relative overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 transition-all hover:ring-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-emerald/40"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt || `Forrester Fields photo ${i + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width:768px) 45vw, (max-width:1024px) 30vw, 25vw"
                  priority={i < 6}
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {open && (
        <Lightbox
          images={images}
          startIndex={index}
          onClose={() => setOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
