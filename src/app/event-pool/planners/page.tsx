import { Playfair_Display } from "next/font/google";
import PlannerRequestFormClient from "../PlannerRequestFormClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
});

export const dynamic = "force-dynamic";

export default function PlannersPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className={`${playfair.className} text-4xl font-medium leading-snug text-slate-800`}>
        Planners
      </h1>
      <p className="mt-2 text-slate-600">
        Need staff for an upcoming event? Send us the details and we’ll get back to you quickly.
      </p>

      <div className="mt-6">
        <PlannerRequestFormClient />
      </div>
    </main>
  );
}
