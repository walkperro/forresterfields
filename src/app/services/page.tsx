export default function Services() {
  const items = [
    { title: "Full Planner", price: "10% of budget (min $2,500)", desc: "From engagement to exit. Vendor management, timeline, design guidance." },
    { title: "Month-Of Planner / Coordinator", price: "$1,500", desc: "Finalize plans, vendor confirmations, rehearsal, day-of coordination." },
    { title: "Day-Of Coordinator", price: "$400", desc: "Run-of-show on the day and rehearsal leadership." },
    { title: "Reception Point Person", price: "$250", desc: "Guest transition, toasts, cake, bouquet/garter, grand exit." },
    { title: "Venue Packages", price: "From $1,500", desc: "Pavilion & field, lighting, house areas, dressing quarters, add-ons." },
  ];
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">Services & Packages</h1>
      <p className="text-gray-600 mt-2">Transparent options for stress-free planning.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {items.map((i) => (
          <div key={i.title} className="card p-6">
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="mt-1 font-medium">{i.price}</p>
            <p className="text-gray-600 mt-2">{i.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
