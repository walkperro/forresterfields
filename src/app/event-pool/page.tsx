import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export default function EventPoolIndex() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Elegant title font */}
      <h1 className={`${playfair.className} text-4xl font-medium leading-snug text-slate-800`}>
        The Event Pool by Forrester Fields
      </h1>

      {/* Intro paragraphs */}
      <div className="mt-6 space-y-4 text-[1rem] leading-7 text-slate-700">
        <p className="font-semibold text-slate-900">
          Are you a dependable worker looking to earn extra money on weekends you choose?
          <br />Or a special events planner scrambling for dependable workers?
        </p>

        <p>
          This is the place for you. Let’s help each other in the special events community of Walton County
          and Greater Atlanta area.
        </p>

        <p>
          As a special events planner, my job is to handle the behind-the-scenes hustle and make sure the big day
          goes off without a hitch. A successful event hinges on the reliability and efficiency of a cohesive team.
          I look for hard-working, dependable, ethical workers with strong references, communication, and transportation.
        </p>

        <p>
          Even when you secure the best workers well in advance, life happens. To make sure that never leaves an event
          short-staffed, I created a vetted pool of event professionals. If a worker becomes unavailable, they simply
          contact me directly so I can match a qualified replacement from the pool. This ensures every event stays fully
          staffed, smooth, and stress-free for planners and clients alike.
        </p>

        <p>
          If you’re looking to work special events in Walton County and Greater Atlanta area, apply below. If you’re a
          planner who’d like access to dependable workers, send us your request.
        </p>

        <p className="italic text-slate-800">— Marisol Forrester</p>
      </div>

      {/* Roles list */}
      <h2 className="mt-10 text-xl font-semibold text-slate-900">Typical Roles</h2>
      <ul className="mt-3 list-disc pl-6 space-y-1 text-[1rem] leading-7 text-slate-700">
        <li>Set-up / Clean-up</li>
        <li>Decorating</li>
        <li>Greeting guests</li>
        <li>Parking</li>
        <li>Passing drinks &amp; apps</li>
        <li>Serving food</li>
        <li>Bartending</li>
        <li>Bathroom attendants</li>
        <li>Driver (bride &amp; groom departure)</li>
      </ul>

      {/* Navigation cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/event-pool/workers" className="block rounded-xl border p-6 hover:bg-gray-50">
          <div className="text-lg font-semibold">For Workers</div>
          <div className="text-gray-600 mt-1 text-sm">See open roles and apply to join the pool.</div>
        </Link>

        <Link href="/event-pool/planners" className="block rounded-xl border p-6 hover:bg-gray-50">
          <div className="text-lg font-semibold">For Planners</div>
          <div className="text-gray-600 mt-1 text-sm">Request staff for your upcoming event.</div>
        </Link>
      </div>
    </main>
  );
}
