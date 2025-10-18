import Link from "next/link";

export const metadata = { title: "Application received" };

export default function ThanksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="rounded-xl border bg-white p-8">
        <h1 className="font-display text-2xl mb-3">Thank you for your application!</h1>
        <p className="text-gray-700">
          You’ll hear from us as soon as possible. If there’s a fit, we’ll reach out with next steps.
        </p>
        <div className="mt-8">
          <Link href="/" className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
