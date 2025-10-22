"use client";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export type GalleryImage = { src: string; alt?: string };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {/* 2-column masonry; smaller cards so ~3 rows show on load */}
        <div className="columns-2 md:columns-3 gap-3 [column-fill:_balance]">
          {images.map((img, i) => (
            <button
              key={(img.src || "") + i}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group mb-3 block w-full overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 hover:ring-brand-gold transition"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt || `Forrester Fields photo ${i + 1}`}
                width={900}
                height={700}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                priority={i < 2}
              />
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
