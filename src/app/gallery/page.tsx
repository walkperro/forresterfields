import Image from "next/image";
export default function Gallery() {
  const imgs = ["g1.webp","g2.webp","g3.webp","g4.webp","g5.webp","g6.webp","g7.webp","g8.webp"];
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">Gallery</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {imgs.map((f,i)=>(
          <Image key={i} src={`/gallery/${f}`} alt={`Gallery ${i+1}`} width={1200} height={900}
            className="h-48 w-full object-cover rounded-md" />
        ))}
      </div>
    </main>
  );
}
