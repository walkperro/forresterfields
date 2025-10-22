const fs = require('fs');
const f = 'src/components/GalleryGrid.tsx';
const code = `\
"use client";

import Image from "next/image";
import { useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import Lightbox from "./Lightbox";

export type GalleryImage = string | { src: string; alt?: string };

function toSrc(img: GalleryImage) {
  return typeof img === "string" ? img : img.src;
}
function toAlt(img: GalleryImage, i: number) {
  return typeof img === "string"
    ? \`Forrester Fields photo \${i + 1}\`
    : img.alt || \`Forrester Fields photo \${i + 1}\`;
}

// Easing & variants (typed) for smooth scroll-in
const easeCubic: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.995 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easeCubic },
  },
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Exclude any file whose basename contains "mainbridge" or starts with "logo"
  const filtered = images.filter((img) => {
    const base = toSrc(img).split("/").pop()?.toLowerCase() || "";
    if (base.includes("mainbridge")) return false;
    if (base.startsWith("logo")) return false;
    return true;
  });

  return (
    <LazyMotion features={domAnimation}>
      <>
        <section className="mx-auto max-w-6xl px-4 pb-16">
          {/* 2–3 column masonry; smaller cards so ~3 rows show on load */}
          <m.div
            className="columns-2 md:columns-3 gap-3 [column-fill:_balance]"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2, margin: "0px 0px -10% 0px" }}
          >
            {filtered.map((img, i) => {
              const src = toSrc(img);
              const alt = toAlt(img, i);
              return (
                <m.div
                  key={src + i}
                  variants={item}
                  className="inline-block align-top w-full mb-3 [break-inside:avoid]"
                >
                  <m.button
                    onClick={() => { setIndex(i); setOpen(true); }}
                    className="group block w-full overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 hover:ring-brand-gold"
                    aria-label={\`Open photo \${i + 1}\`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={900}
                      height={700}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      priority={i < 2}
                    />
                  </m.button>
                </m.div>
              );
            })}
          </m.div>
        </section>

        {open && (
          <Lightbox
            images={filtered}
            startIndex={index}
            onClose={() => setOpen(false)}
            onIndexChange={setIndex}
          />
        )}
      </>
    </LazyMotion>
  );
}
`;
fs.writeFileSync(f, code, 'utf8');
console.log('✅ Fixed: src/components/GalleryGrid.tsx (typed Variants + easing array).');
