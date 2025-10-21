"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/lib/gallery";

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9Ijc1IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMWYxZWYiLz48L3N2Zz4=";

// ---- tiny one-time IntersectionObserver hook
function useInViewOnce<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, threshold, rootMargin]);

  return { ref, inView };
}

// ---- child tile component (hooks live here, not inside map)
function GalleryTile({
  img,
  index,
  onOpen,
}: {
  img: GalleryImage;
  index: number;
  onOpen: (i: number) => void;
}) {
  const { ref, inView } = useInViewOnce<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      onClick={() => onOpen(index)}
      aria-label={`Open photo ${index + 1}`}
      className={[
        "group relative aspect-square overflow-hidden rounded-2xl bg-white/40 ring-1 ring-black/5 transition-all hover:ring-brand-gold",
        "opacity-0 translate-y-3",
        inView && "opacity-100 translate-y-0",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transition: "opacity .22s ease-out, transform .22s ease-out",
        willChange: "opacity, transform",
        backfaceVisibility: "hidden",
      }}
    >
      <Image
        src={img.src}
        alt={img.alt || `Forrester Fields photo ${index + 1}`}
        fill
        placeholder="blur"
        blurDataURL={BLUR}
        className="object-cover transition-transform duration-300 ease-[cubic-bezier(.25,.8,.25,1)] group-hover:scale-[1.03]"
        sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        priority={index < 4}
      />
    </button>
  );
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((img, i) => (
            <GalleryTile key={img.src + i} img={img} index={i} onOpen={openAt} />
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
