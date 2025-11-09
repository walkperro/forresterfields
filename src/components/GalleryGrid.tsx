"use client";
import { useEffect, useRef } from "react";

type GalleryItem = string | { src: string; alt?: string };
type Props = { images: GalleryItem[] };

// ✅ Masonry layout using columns (simpler, smooth scroll, no flicker)
export default function GalleryGrid({ images }: Props) {
  const normalized = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Soft fade-in on scroll for smoothness
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll("[data-fade]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="columns-2 md:columns-3 lg:columns-4 gap-4"
    >
      {normalized.map((item, i) => (
        <figure
          key={i}
          data-fade
          className="
            mb-4 break-inside-avoid overflow-hidden rounded-lg bg-neutral-100
            shadow-sm hover:shadow-md transition-all duration-500
            opacity-0 translate-y-4
          "
        >
          <img
            src={item.src}
            alt={item.alt || `Gallery image ${i + 1}`}
            className="w-full h-auto object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
            loading={i < 4 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </figure>
      ))}
    </div>
  );
}
