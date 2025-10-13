export default function EventPool() {
  const roles = ["Set-up / Clean-up","Decorating","Greeting guests","Parking","Serving food","Bartending","Bathroom attendant","Driver (bride & groom departure)"];
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">The Event Pool by Forrester Fields</h1>
      <div className="prose prose-gray max-w-none mt-6">
        <p><strong>Are you a dependable worker looking to earn extra money on weekends you choose?</strong><br/>
        <strong>Or a special-events planner scrambling for trustworthy help?</strong></p>
        <p>Welcome to the community where Walton County event pros help each other thrive.</p>
        <p>As a planner, I’ve learned that flawless events depend on a cohesive team that is reliable, ethical, and hard-working. Even the best-planned weddings can face last-minute changes — so I created a vetted pool of approved event workers ready to step in when needed.</p>
        <p>Members can view available shifts and swap with another approved worker if something unexpected comes up. If a worker fails to get a replacement for a scheduled shift, they are removed from the pool to keep standards high for everyone.</p>
        <p><em>— Marisol Forrester</em></p>
      </div>

      <h2 className="text-2xl font-semibold mt-10">Typical Roles</h2>
      <ul className="list-disc pl-6 mt-3 text-gray-700">
        {roles.map(r => <li key={r}>{r}</li>)}
      </ul>

      <div className="grid gap-8 md:grid-cols-2 mt-10">
        {/* Worker Apply */}
        <section className="border rounded-xl p-6">
          <h3 className="text-xl font-semibold">Apply to Join the Worker Pool</h3>
          <p className="text-gray-600 mt-1">Pay is typically $20/hr. Approved workers can view & claim shifts.</p>
          <form action="https://formsubmit.co/workers@forresterfields.com" method="POST" className="mt-4 grid gap-3">
            <input type="hidden" name="_subject" value="Worker Pool Application" />
            <input type="hidden" name="_captcha" value="false" />
            <input className="border p-3 rounded-md" name="name" placeholder="Full name" required />
            <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
            <input className="border p-3 rounded-md" name="phone" placeholder="Phone" required />
            <textarea className="border p-3 rounded-md" name="availability" rows={3} placeholder="Availability (Fri/Sat/Sun, evenings, etc.)" />
            <fieldset className="border rounded-md p-3">
              <legend className="text-sm text-gray-600">Roles you can do</legend>
              {roles.map((r,i)=>(
                <label key={r} className="flex gap-2 items-center mt-2">
                  <input type="checkbox" name={`role_${i}`} value={r} /> <span>{r}</span>
                </label>
              ))}
            </fieldset>
            <textarea className="border p-3 rounded-md" name="references" rows={3} placeholder="References (names, phone/email)" />
            <button className="px-4 py-3 bg-black text-white rounded-md">Submit Application</button>
          </form>
        </section>

        {/* Planner Request */}
        <section className="border rounded-xl p-6">
          <h3 className="text-xl font-semibold">Request Workers (for Planners)</h3>
          <p className="text-gray-600 mt-1">We’ll confirm availability from our vetted pool.</p>
          <form action="https://formsubmit.co/planners@forresterfields.com" method="POST" className="mt-4 grid gap-3">
            <input type="hidden" name="_subject" value="Planner Request for Workers" />
            <input type="hidden" name="_captcha" value="false" />
            <input className="border p-3 rounded-md" name="plannerName" placeholder="Planner / Business name" required />
            <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
            <input className="border p-3 rounded-md" name="phone" placeholder="Phone" required />
            <input className="border p-3 rounded-md" name="eventDate" placeholder="Event date" />
            <input className="border p-3 rounded-md" name="location" placeholder="City / Venue" />
            <textarea className="border p-3 rounded-md" name="rolesNeeded" rows={3} placeholder="Roles needed + hours" />
            <textarea className="border p-3 rounded-md" name="notes" rows={3} placeholder="Notes" />
            <button className="px-4 py-3 bg-black text-white rounded-md">Send Request</button>
          </form>
        </section>
      </div>
    </main>
  );
}
