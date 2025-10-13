import Link from "next/link";

export default function Thanks(){
  return (
    <main className="container py-16 text-center">
      <h1 className="font-display text-4xl">Thank you!</h1>
      <p className="text-gray-600 mt-3">We received your submission and will get back to you shortly.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <Link href="/" className="btn btn-outline">Back Home</Link>
        <Link href="/gallery" className="btn btn-primary text-white">View Gallery</Link>
      </div>
    </main>
  );
}
