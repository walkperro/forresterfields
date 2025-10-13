export default function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Schedule a Tour / Check Your Date</h1>
      <p className="text-gray-600 mt-2">We’ll get back to you quickly.</p>
      <form action="https://formsubmit.co/hello@forresterfields.com" method="POST" className="mt-8 grid gap-4">
        <input type="hidden" name="_subject" value="New Inquiry from ForresterFields.com" />
        <input type="hidden" name="_captcha" value="false" />
        <input className="border p-3 rounded-md" name="name" placeholder="Your name" required />
        <input className="border p-3 rounded-md" name="email" type="email" placeholder="Email" required />
        <input className="border p-3 rounded-md" name="phone" placeholder="Phone" />
        <input className="border p-3 rounded-md" name="date" placeholder="Event date" />
        <input className="border p-3 rounded-md" name="guestCount" placeholder="Guest count" />
        <textarea className="border p-3 rounded-md" name="message" rows={5} placeholder="Tell us about your event" />
        <button className="px-5 py-3 bg-black text-white rounded-md">Send</button>
      </form>
    </main>
  );
}
