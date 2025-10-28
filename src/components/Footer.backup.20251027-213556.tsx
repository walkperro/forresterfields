import Link from "next/link";

export default function Footer(){
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm text-gray-600">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
          <Link className="hover:underline" href="/services">Services</Link>
          <Link className="hover:underline" href="/venue">Venue</Link>
          <Link className="hover:underline" href="/gallery">Gallery</Link>
          <Link className="hover:underline" href="/event-pool">Event Pool</Link>
          <Link className="hover:underline" href="/contact">Contact</Link>
        </nav>
        <div>© {new Date().getFullYear()} Forrester Fields • Loganville, GA</div>
        <div className="mt-2">Lakeside Weddings &amp; Special Events</div>
      </div>
    </footer>
  );
}
