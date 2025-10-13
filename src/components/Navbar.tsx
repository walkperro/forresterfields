import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="container h-16 flex items-center justify-between flex-wrap gap-y-2">
        <Link href="/" className="font-display text-2xl text-brand-green">
          Forrester <span className="text-brand-gold">Fields</span>
        </Link>
        <div className="flex flex-wrap gap-4 text-sm items-center">
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/event-pool">Event Pool</Link>
          <Link href="/contact" className="btn btn-primary text-white">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
