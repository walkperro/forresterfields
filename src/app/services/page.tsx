export default function Services() {
  const items = [
    { title: "Full Planner", price: "10% of budget (min $2,500)", desc: "Full planning from engagement to exit." },
    { title: "Month-Of Planner / Coordinator", price: "$1,500", desc: "Finalize plans, tie loose ends, rehearsal & ceremony included." },
    { title: "Day-Of Coordinator", price: "$400", desc: "Run-of-show on the day + rehearsal leadership." },
    { title: "Reception Point Person", price: "$250", desc: "Guest transition to reception and through grand exit." },
    { title: "Venue Packages", price: "From $1,500", desc: "Pavilion & field, house areas, add-ons, all-access package available." },
  ];
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Services & Packages</h1>
      <p className="text-gray-600 mt-2">Transparent pricing with flexible options.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {items.map((i) => (
          <div key={i.title} className="border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="mt-1 font-medium">{i.price}</p>
            <p className="text-gray-600 mt-2">{i.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
