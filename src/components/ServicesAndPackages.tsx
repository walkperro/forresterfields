"use client";
import Link from "next/link";

export default function ServicesAndPackages() {
  return (
    <section className="space-y-12">
      {/* What We Offer */}
      <div>
        <h2 className="font-['Playfair_Display'] text-xl font-light tracking-tight text-slate-800">
          What we offer
        </h2>
        <ul className="mt-3 list-disc pl-6 leading-7 text-slate-700">
          <li>
            <span className="font-medium text-slate-900">Event planning</span> — full, month-of, and day-of services.
          </li>
          <li>
            <span className="font-medium text-slate-900">Event hosting at our private venue</span> — flexible indoor/outdoor spaces with lake views.
          </li>
          <li>
            <span className="font-medium text-slate-900">Event Pool of workers</span> — staff your event with our vetted team.{" "}
            <Link href="/event-pool" className="underline decoration-pink-300 underline-offset-4 hover:opacity-80">
              Explore the Event Pool
            </Link>.
          </li>
        </ul>
      </div>

      {/* Venue Rental Prices */}
      <div>
        <h2 className="font-['Playfair_Display'] text-xl font-light tracking-tight text-slate-800">
          Venue Rental Prices
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {/* A */}
          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-sm uppercase tracking-wide text-slate-500">A. Pavilion &amp; Field</div>
            <h3 className="mt-1 text-base font-semibold text-slate-900">Overlooking the lake</h3>
            <p className="mt-1.5 text-lg font-semibold text-emerald-700">$1,500</p>
            <p className="mt-1.5 text-slate-700">Available on its own.</p>
          </article>

          {/* B */}
          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-sm uppercase tracking-wide text-slate-500">B. Front of House, Backyard &amp; Basement</div>
            <h3 className="mt-1 text-base font-semibold text-slate-900">Includes basement bathroom</h3>
            <p className="mt-1.5 text-lg font-semibold text-emerald-700">$3,000</p>
            <p className="mt-1.5 text-slate-700">Available on its own.</p>
          </article>

          {/* C */}
          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-sm uppercase tracking-wide text-slate-500">C. Interior (add-on)</div>
            <h3 className="mt-1 text-base font-semibold text-slate-900">Add to A or B</h3>
            <p className="mt-1.5 text-lg font-semibold text-emerald-700">$1,250</p>
            <p className="mt-1.5 text-slate-700">
              Most of the main floor (1 bathroom) &amp; all of the upstairs (2 bathrooms).
            </p>
          </article>

          {/* D */}
          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-sm uppercase tracking-wide text-slate-500">D. Overflow Parking</div>
            <h3 className="mt-1 text-base font-semibold text-slate-900">Shuttle convenience</h3>
            <p className="mt-1.5 text-lg font-semibold text-emerald-700">$500</p>
            <p className="mt-1.5 text-slate-700">
              Bring your own golf cart or use ours (1 driver included). Additional cart/driver available on request—pricing varies.
            </p>
          </article>

          {/* E */}
          <article className="rounded-xl border bg-white p-0 shadow-sm md:col-span-2 overflow-hidden transition-shadow hover:shadow-md">
            <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-rose-200 to-sky-200" />
            <div className="p-4">
              <div className="text-sm uppercase tracking-wide text-slate-500">E. All-Access Venue Package</div>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Everything above, bundled</h3>
              <p className="mt-1.5 text-lg font-semibold text-emerald-700">$6,000</p>
              <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                <li>Upper &amp; lower field parking with use of 1 golf cart to shuttle guests (1 cart &amp; driver included)</li>
                <li>Pavilion &amp; Field</li>
                <li>Front, Back &amp; Interior of Home (excluding owners’ private quarters)</li>
                <li>Up to 11 hours day-of access (8am–10pm)</li>
                <li>Access as needed for set-up week-of event</li>
                <li>Unlimited access for clean-up the day after event</li>
              </ul>
            </div>
          </article>
        </div>

        <div className="mt-5 rounded-lg border bg-slate-50 p-4 text-slate-700">
          <p className="font-medium text-slate-900">All packages include:</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-6">
            <li>Separate dressing areas for groomsmen &amp; bridal party</li>
            <li>Cedar cross</li>
            <li>One golf cart + driver</li>
            <li>Parking in adjacent field</li>
            <li>All available tables, chairs, tablecloths, decor</li>
            <li>Pre-hung string lighting</li>
            <li>Access 8am–10pm day-of for paid spaces; limited access week-of for set-up/rehearsal; day-after clean-up</li>
          </ul>
        </div>
      </div>

      {/* Planner Services */}
      <div>
        <h2 className="font-['Playfair_Display'] text-xl font-light tracking-tight text-slate-800">
          Wedding Planner Services
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="text-base font-semibold text-slate-900">Full Planner Services</h3>
            <p className="mt-1 text-lg font-semibold text-rose-700">10% of budget (min $2,500)</p>
            <p className="mt-1.5 text-slate-700">
              Cost is 10% of overall wedding budget (as determined by an online planner tool we’ll use together). Includes
              online &amp; in-person collaboration from engagement until your grand exit.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="text-base font-semibold text-slate-900">Month-of Planner / Coordinator</h3>
            <p className="mt-1 text-lg font-semibold text-rose-700">$1,500</p>
            <p className="mt-1.5 text-slate-700">
              We finalize your existing plans, tie up loose ends, and ensure everything runs smoothly. Rehearsal &amp; ceremony included.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="text-base font-semibold text-slate-900">Day-of Coordinator</h3>
            <p className="mt-1 text-lg font-semibold text-rose-700">$400</p>
            <p className="mt-1.5 text-slate-700">
              Planning &amp; leading your ceremony rehearsal and ensuring your ceremony goes off without a hitch.
            </p>
          </article>

          <article className="rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="text-base font-semibold text-slate-900">Reception Point Person</h3>
            <p className="mt-1 text-lg font-semibold text-rose-700">$250 (add-on)</p>
            <p className="mt-1.5 text-slate-700">
              Included with Full Planning; add-on for Month-of/Day-of. We handle the transition from ceremony to reception and keep
              things smooth through the big exit.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
