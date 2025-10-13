import Lightbox from "@/components/Lightbox";

export const metadata = {
  title: "Gallery – Forrester Fields",
  description: "A look at weddings and events at our lakeside venue.",
};

const IMGS = [
  "https://picsum.photos/seed/ff1/2000/1300",
  "https://picsum.photos/seed/ff2/2000/1300",
  "https://picsum.photos/seed/ff3/2000/1300",
  "https://picsum.photos/seed/ff4/2000/1300",
  "https://picsum.photos/seed/ff5/2000/1300",
  "https://picsum.photos/seed/ff6/2000/1300",
  "https://picsum.photos/seed/ff7/2000/1300",
  "https://picsum.photos/seed/ff8/2000/1300",
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
