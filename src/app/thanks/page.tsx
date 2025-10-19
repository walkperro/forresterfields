import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ThanksPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
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
