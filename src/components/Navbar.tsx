import Link from "next/link";

export default function Navbar(){
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-brand-green text-lg">Forrester Fields</Link>
        <div className="flex gap-5 text-sm">
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/event-pool">Event Pool</Link>
          <Link href="/contact" className="btn btn-primary">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
