import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 text-sm text-gray-600 text-center">
        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
          <Link className="hover:underline" href="/services">Services</Link>
          <Link className="hover:underline" href="/venue">Venue</Link>
          <Link className="hover:underline" href="/gallery">Gallery</Link>
          <Link className="hover:underline" href="/event-pool">Event Pool</Link>
          <Link className="hover:underline" href="/contact">Contact</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-4 mb-2">
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
              className="w-6 h-6"
            >
              <path d="M22.675 0H1.325C.593 0 0 .594 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.316h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .594 23.406 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/forresterfields?igsh=MTVwMXB5dTkzZ3ZlNw=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-gray-500 hover:text-emerald-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.848s-.012 3.583-.07 4.849c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.583.07-4.849c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.578.422 3.545 1.455 2.513 2.487 2.222 3.684 2.163 4.961.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.277.35 2.474 1.383 3.507 1.033 1.033 2.23 1.324 3.507 1.383C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.474-.35 3.507-1.383 1.033-1.033 1.324-2.23 1.383-3.507.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.277-.35-2.474-1.383-3.507C19.422.422 18.225.131 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.2-11.913a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
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
