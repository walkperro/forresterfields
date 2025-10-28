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

        {/* Divider line */}
        <div className="mx-auto w-24 h-px bg-gray-200 my-5" />

        {/* Social Icons */}
        <div className="flex justify-center gap-8 mb-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/17JTsuUQdF/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M22.675 0H1.325C.593 0 0 .594 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.316h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/forresterfields?igsh=MTVwMXB5dTkzZ3ZlNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 256 287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7S182.9 181.2 224.1 181.2 298.8 214.7 298.8 256s-33.5 74.6-74.7 74.6zm146.4-194.3c0 14.9-12 26.9-26.9 26.9-14.9 0-26.9-12-26.9-26.9s12-26.9 26.9-26.9c14.9 0 26.9 12 26.9 26.9zm76.1 27.2c-1.7-35.9-9.9-67.7-36.3-94.1S367.5 19.7 331.6 18C295.2 16.2 152.8 16.2 116.4 18 80.5 19.7 48.7 27.9 22.3 54.3S-1.7 116.1.1 152c1.8 36.4 1.8 178.8 0 215.2-1.7 35.9-9.9 67.7-36.3 94.1s-58.2 34.6-94.1 36.3C16.2 499.8 152.8 499.8 189.2 498c36.4-1.8 68.2-9.9 94.6-36.3s34.6-58.2 36.3-94.1c1.8-36.4 1.8-178.8 0-215.2zM398.8 388c-7.8 19.6-22.9 34.7-42.5 42.5-29.4 11.7-99.3 9-132.2 9s-102.9 2.6-132.2-9c-19.6-7.8-34.7-22.9-42.5-42.5-11.7-29.4-9-99.3-9-132.2s-2.6-102.9 9-132.2c7.8-19.6 22.9-34.7 42.5-42.5 29.4-11.7 99.3-9 132.2-9s102.9-2.6 132.2 9c19.6 7.8 34.7 22.9 42.5 42.5 11.7 29.4 9 99.3 9 132.2s2.7 102.9-9 132.2z" />
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
