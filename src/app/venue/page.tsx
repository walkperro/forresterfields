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
      <h1 className="font-display text-4xl">The Venue</h1>
      <p className="text-gray-600 mt-2">
        A private lakeside property in Loganville serving Walton County and the Greater Atlanta area.
      </p>

      <div className="grid gap-6 md:grid-cols-2 mt-8">
        <Image
          src="/hero/hero.jpg"
          alt="Forrester Fields lakeside venue"
          width={1600} height={1100}
          className="w-full h-72 object-cover rounded-xl"
        />
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Amenities</h2>
          <ul className="mt-3 space-y-2">
            {features.map(([t,d]) => (
              <li key={String(t)} className="flex gap-3">
                <span className="mt-1 h-2 w-2 bg-brand-green rounded-full"></span>
                <div>
                  <div className="font-medium">{t}</div>
                  <div className="text-gray-600">{d}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <a href="/services" className="btn btn-outline">View Packages</a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12">Find Us</h2>
      <p className="text-gray-600">Loganville, GA • easy access from Monroe, Snellville, and East Atlanta.</p>
      <div className="mt-4 rounded-xl overflow-hidden border" style={{height: "380px"}}>
        <iframe
          title="Google Map"
          width="100%" height="100%" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Loganville,+GA&hl=en&z=12&output=embed">
        </iframe>
      </div>
    </main>
  );
}
