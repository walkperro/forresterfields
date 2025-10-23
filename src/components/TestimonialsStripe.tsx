"use client";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function TestimonialsStripe() {
  const items = [
    {
      quote:
        "The lake, the lights, and Marisol’s planning made our day absolutely effortless.",
      who: "— Jessica & Ryan",
    },
    {
      quote:
        "Every detail was thoughtful. Our families are still raving about the venue.",
      who: "— Amanda G.",
    },
    {
      quote:
        "Smooth communication, beautiful grounds, and a stress-free experience.",
      who: "— Tyler S.",
    },
  ];
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section className="section bg-white">
      <div className="container">
        {/* Subtle rating row */}
        <div className="mb-6 flex items-center gap-3 text-sm text-slate-600">
          <div className="inline-flex items-center gap-1 text-gray-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="m12 17.27-5.18 3.05 1.64-5.64L4 10.24l5.81-.5L12 4l2.19 5.74 5.81.5-4.46 4.44 1.64 5.64L12 17.27Z"
                  fill="currentColor"
                />
              </svg>
            ))}
          </div>
          <span>Kind words from recent couples</span>
          <span className="mx-1">•</span>
          <Link href="/gallery" className="underline underline-offset-2 hover:text-slate-800">
            See what others are saying →
          </Link>
        </div>

        <LazyMotion features={domAnimation}>
          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-4 md:grid-cols-3"
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.06 },
              },
            }}
          >
            {items.map((t, i) => (
              <m.figure
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.995 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.45, ease },
                  },
                }}
                className="rounded-2xl border bg-white p-6 shadow-sm ring-1 ring-black/5"
              >
                <blockquote className="text-slate-800 leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-3 text-sm text-slate-600">
                  {t.who}
                </figcaption>
              </m.figure>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
