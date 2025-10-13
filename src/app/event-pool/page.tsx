export default function EventPool() {
  const roles = ["Set-up / Clean-up","Decorating","Greeting guests","Parking","Passing drinks & apps","Serving food","Bartending","Bathroom attendants","Driver (bride & groom departure)"];
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">The Event Pool by Forrester Fields</h1>

      <div className="max-w-3xl mt-6 space-y-4 text-gray-800">
        <p><strong>Are you a dependable worker looking to earn extra money on weekends you choose?</strong><br/> <strong>Or a special events planner scrambling for dependable workers?</strong></p>
        <p>This is the place for you. Let’s help each other in the special events community of Walton County.</p>
        <p>As a special events planner, my job is to handle the behind-the-scenes hustle and make sure the big day goes off without a hitch. A successful event hinges on the reliability and efficiency of a cohesive team. I look for hard-working, dependable, ethical workers with strong references, communication, and transportation.</p>
        <p>Even when you secure the best workers well in advance, life happens. To make sure that never leaves an event short-staffed, I created a vetted pool of event workers. If a change arises, a worker can log in and swap with another approved member so the event remains fully staffed. If a contracted worker fails to get a replacement, they’re removed from the pool and forfeit future jobs with Forrester Fields or partners.</p>
        <p>If you’re looking to work special events in Walton County, apply below. If you’re a planner who’d like access to dependable workers, send us your request.</p>
        <p className="italic">— Marisol Forrester</p>
      </div>

      <h2 className="text-2xl font-semibold mt-10">Typical Roles</h2>
      <ul className="list-disc pl-6 mt-3 text-gray-700">
        {roles.map(r => <li key={r}>{r}</li>)}
      </ul>

      <div className="grid gap-8 md:grid-cols-2 mt-10">
        {/* Worker Apply */}
        <section className="card p-6">
          <h3 className="text-xl font-semibold">Apply to Join the Worker Pool</h3>
          <p className="text-gray-600 mt-1">Pay is typically $20/hr. Approved workers can view & claim shifts; swaps are allowed with notice.</p>
          <form action="https://formsubmit.co/workers@forresterfields.com" method="POST" className="mt-4 grid gap-3">
            <input type="hidden" name="_subject" value="Worker Pool Application" />
            <input type="hidden" name="_captcha" value="false" />
            <input className="border p-3 rounded-md" name="name" placeholder="Full name" required />
            <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
            <input className="border p-3 rounded-md" name="phone" placeholder="Phone" required />
            <textarea className="border p-3 rounded-md" name="availability" rows={3} placeholder="Availability (Fri/Sat/Sun, evenings, etc.)"></textarea>
            <fieldset className="border rounded-md p-3">
              <legend className="text-sm text-gray-600">Roles you can do</legend>
              {roles.map((r,i)=>(
                <label key={r} className="flex gap-2 items-center mt-2">
                  <input type="checkbox" name={`role_${i}`} value={r} /> <span>{r}</span>
                </label>
              ))}
            </fieldset>
            <textarea className="border p-3 rounded-md" name="references" rows={3} placeholder="References (names, phone/email)"></textarea>
            <button className="btn btn-primary">Submit Application</button>
          </form>
        </section>

        {/* Planner Request */}
        <section className="card p-6">
          <h3 className="text-xl font-semibold">Request Workers (for Planners)</h3>
          <p className="text-gray-600 mt-1">We’ll confirm availability from our vetted pool and follow up fast.</p>
          <form action="https://formsubmit.co/planners@forresterfields.com" method="POST" className="mt-4 grid gap-3">
            <input type="hidden" name="_subject" value="Planner Request for Workers" />
            <input type="hidden" name="_captcha" value="false" />
            <input className="border p-3 rounded-md" name="plannerName" placeholder="Planner / Business name" required />
            <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
            <input className="border p-3 rounded-md" name="phone" placeholder="Phone" required />
            <input className="border p-3 rounded-md" name="eventDate" placeholder="Event date" />
            <input className="border p-3 rounded-md" name="location" placeholder="City / Venue" />
            <textarea className="border p-3 rounded-md" name="rolesNeeded" rows={3} placeholder="Roles needed + hours"></textarea>
            <textarea className="border p-3 rounded-md" name="notes" rows={3} placeholder="Notes"></textarea>
            <button className="btn btn-outline">Send Request</button>
          </form>
        </section>
      </div>
    </main>
  );
}
