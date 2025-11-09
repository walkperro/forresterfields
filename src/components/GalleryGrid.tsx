"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import type { FC } from "react";

type GalleryItem = string | { src: string; alt?: string };
type Props = { images: GalleryItem[] };

const GalleryGrid: FC<Props> = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {images.map((item, i) => {
        const src = typeof item === "string" ? item : item.src;
        const alt = typeof item === "string" ? `Gallery image ${i + 1}` : (item.alt ?? `Gallery image ${i + 1}`);
        return (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/3] overflow-hidden rounded-md bg-neutral-100 [content-visibility:auto] [contain:content]"
          >
            <Image
              src={src}
              alt={alt}
              width={900}
              height={675}
              className="h-full w-full object-cover"
              loading={i < 4 ? "eager" : "lazy"}
              priority={i < 4}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default GalleryGrid;
