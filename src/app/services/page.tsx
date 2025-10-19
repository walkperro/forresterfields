import ServicesAndPackages from "@/components/ServicesAndPackages";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ServicesPage() {
  return (
    <main className="container py-12">
      <h1 className="font-display text-4xl">Services & Packages</h1>
      <p className="text-gray-600 mt-2">Transparent options for stress-free planning.</p>

      <ServicesAndPackages />
    </main>
  );
}
