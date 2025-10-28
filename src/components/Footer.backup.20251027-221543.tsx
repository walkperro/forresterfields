import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm text-gray-600 text-center">
        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          <Link className="hover:underline" href="/services">Services</Link>
          <Link className="hover:underline" href="/venue">Venue</Link>
          <Link className="hover:underline" href="/gallery">Gallery</Link>
          <Link className="hover:underline" href="/event-pool">Event Pool</Link>
          <Link className="hover:underline" href="/contact">Contact</Link>
        </nav>

        {/* Divider */}
        <div className="mx-auto w-24 h-px bg-gray-200 my-5" />

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-8 mb-4 leading-none">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/17JTsuUQdF/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="group text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 block transform transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-105"
            >
              <path d="M22.675 0H1.325C.593 0 0 .594 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.316h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
            </svg>
          </a>

          {/* Instagram (clean outline) */}
          <a
            href="https://www.instagram.com/forresterfields?igsh=MTVwMXB5dTkzZ3ZlNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 block transform transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-105"
            >
              <rect x="2.75" y="2.75" width="18.5" height="18.5" rx="5" />
              <circle cx="12" cy="12" r="4.25" />
              <path d="M16.5 7.5h.01" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <div>© {new Date().getFullYear()} Forrester Fields • Loganville, GA</div>
        <div className="mt-2">Lakeside Weddings &amp; Special Events</div>
      </div>
    </footer>
  );
}
