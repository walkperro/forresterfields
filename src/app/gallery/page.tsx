import { getGalleryImages } from "@/lib/gallery";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = {
  title: "Gallery | Forrester Fields",
  description: "A peek at recent weddings at Forrester Fields.",
};

export default async function GalleryPage() {
  const images = getGalleryImages();
  return (
    <main className="pb-16">
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Gallery</h1>
        <p className="mt-3 text-lg text-neutral-600">
          A peek at recent weddings at Forrester Fields.
        </p>
      </section>
      <GalleryGrid images={images}/>
    </main>
  );
}
