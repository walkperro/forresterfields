"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, type Variants, cubicBezier } from "framer-motion";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/lib/gallery";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZWYiLz48L3N2Zz4=";

const easeLux = cubicBezier(0.22, 0.61, 0.36, 1);

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.35, ease: easeLux } },
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {images.map((img, i) => (
            <motion.button
              key={img.src + i}
              variants={item}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 transition-all hover:ring-brand-gold"
              aria-label={`Open photo ${i + 1}`}
            >
              <Image
                src={img.src}
                alt={img.alt || `Forrester Fields photo ${i + 1}`}
                fill
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover transition-transform duration-300 ease-[cubic-bezier(.25,.8,.25,1)] group-hover:scale-[1.04]"
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                priority={i < 4}
              />
            </motion.button>
          ))}
        </motion.div>
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
