"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";
import FadeInOnView from "./FadeInOnView";
import type { GalleryImage } from "@/lib/gallery";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZWYiLz48L3N2Zz4=";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {/* 2-column masonry (balanced) */}
        <div className="columns-1 sm:columns-2 gap-4 [column-fill:_balance]">
          {images.map((img, i) => (
            <FadeInOnView key={`${img.src || i}`} delay={(i % 6) * 0.03}>
              <button
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className="group mb-4 block w-full overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 transition-all hover:ring-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-emerald/40"
                aria-label={`Open photo ${i + 1}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `Forrester Fields photo ${i + 1}`}
                  width={900}
                  height={700}
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width:768px) 100vw, 50vw"
                  priority={i < 2}
                />
              </button>
            </FadeInOnView>
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
