import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ThanksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">{/* Subtle check icon */}
        <div className="mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-100">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-700">
            <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      <h1 className="font-display text-3xl sm:text-4xl mb-4">
        Thank you for your application.
      </h1>
      <p className="text-gray-700 mb-8">
        You will hear from us as soon as possible!
      </p>
      <Link
        href="/"
        className="inline-block rounded-md border px-4 py-2 hover:bg-gray-50"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
