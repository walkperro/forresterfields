import Lightbox from "@/components/Lightbox";

export const metadata = {
  title: "Gallery – Forrester Fields",
  description: "A look at weddings and events at our lakeside venue.",
};

const IMGS = [
  "/gallery/g1.webp","/gallery/g2.webp","/gallery/g3.webp","/gallery/g4.webp",
  "/gallery/g5.webp","/gallery/g6.webp","/gallery/g7.webp","/gallery/g8.webp",
];

export default function Gallery() {
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">Gallery</h1>
      <p className="text-gray-600 mt-2">Tap any photo to view full size.</p>
      <div className="mt-6">
        <Lightbox images={IMGS} />
      </div>
    </main>
  );
}
