import Image from "next/image";

export const metadata = {
  title: "Venue & Amenities – Forrester Fields",
  description:
    "Lakeside ceremony site, market-light reception, dressing suites, golf cart shuttle, and flexible packages in Loganville, GA.",
};

export default function Venue() {
  const features = [
    ["Lakeside Ceremony", "Waterfront vows with cedar cross and pre-hung string lights."],
    ["Market-Light Reception", "Ambient lighting and power for DJ/band."],
    ["Dressing Suites", "Separate quarters for bridal party and groomsmen."],
    ["Parking & Shuttle", "On-site parking plus golf cart & driver for guest shuttle."],
    ["Tables & Chairs", "Available inventory included with packages."],
    ["Setup & Cleanup", "Add our team for stress-free turnaround."],
  ];

  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-gray-900">
        The Venue
      </h1>
      <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl">
        A private lakeside property in Loganville serving Walton County and the Greater Atlanta area.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mt-10 items-start">
        {/* Exact image, no cropping/zooming */}
        <div className="w-full">
          <Image
            src="/media/forresterfields/venue.png"
            alt="Forrester Fields lakeside venue"
            width={2000}
            height={1334}
            priority
            className="w-full h-auto rounded-2xl shadow-md"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Amenities */}
        <div className="card p-6 sm:p-8 rounded-2xl shadow-sm ring-1 ring-black/5 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
          <ul className="space-y-3">
            {features.map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-2 w-2 bg-neutral-700/80 rounded-full"></span>
                <div>
                  <div className="font-medium text-neutral-900">{t}</div>
                  <div className="text-neutral-500 text-sm sm:text-base">{d}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <a
              href="/services"
              className="inline-block border border-neutral-700/80 text-neutral-800 px-5 py-2.5 rounded-lg hover:bg-neutral-900 hover:text-white transition"
            >
              View Packages
            </a>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-display font-semibold mb-2">Find Us</h2>
        <p className="text-gray-600">
          Loganville, GA • easy access from Monroe, Snellville, and East Atlanta.
        </p>
        <div
          className="mt-6 rounded-2xl overflow-hidden shadow-md border border-gray-200"
          style={{ height: "380px" }}
        >
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Loganville,+GA&hl=en&z=12&output=embed"
          ></iframe>
        </div>
      </section>
    </main>
  );
}
