import HeroVideo from "@/components/HeroVideo";
import Image from "next/image";
import Link from "next/link";
import { getPreviewImages } from "@/lib/previews";
import TestimonialsStripe from "@/components/TestimonialsStripe";
import FadeInOnView from "@/components/FadeInOnView";

export default function Home() {
  const PREVIEW = getPreviewImages();
  const valueProps: [string, string][] = [
    ["Lakeside Ceremony", "Say “I do” beside the water under market lights."],
    ["Planning to Day-Of", "From full planning to month-of and day-of coordination."],
    ["Stress-free Logistics", "Parking, dressing suites, decor, lighting, and more."],
  ];

  return (
    <main>
      {/* HERO */}
      <HeroVideo />

      {/* VALUE PROPS */}
      <section className="section">
        <FadeInOnView>
          <div className="container grid gap-6 md:grid-cols-3">
            {valueProps.map(([t, d], i) => (
              <FadeInOnView key={t} delay={i * 0.05}>
                <div className="card p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold">{t}</h3>
                  <p className="text-gray-600 mt-2">{d}</p>
                </div>
              </FadeInOnView>
            ))}
          </div>
        </FadeInOnView>
      </section>

      {/* ABOUT FORRESTER FIELDS */}
      <section className="section">
        <FadeInOnView>
          <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr] items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">About Forrester Fields</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Forrester Fields is a serene, private lakeside venue in Loganville, GA — serving Walton County
                and the Greater Atlanta area. From full planning to month-of and day-of coordination, our team
                makes weddings effortless, beautiful, and deeply personal.
              </p>
              <p className="text-gray-600 mt-3 leading-relaxed">
                You’ll find market lights by the water, thoughtful spaces for getting ready, and a warm,
                dedicated staff focused on a smooth, stress-free day.
              </p>
            </div>

            {/* White card with logo */}
            <div className="justify-self-center w-full max-w-sm">
              <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-6 flex items-center justify-center">
                <Image
                  src="/media/forresterfields/logo.png"
                  alt="Forrester Fields logo"
                  width={224}
                  height={224}
                  className="w-56 h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </FadeInOnView>
      </section>

      {/* TESTIMONIALS STRIPE */}
      <FadeInOnView>
        <TestimonialsStripe />
      </FadeInOnView>

      {/* GALLERY PREVIEW */}
      <section className="section bg-brand-cream/50">
        <FadeInOnView>
          <div className="container">
            <h2 className="font-display text-3xl">Gallery</h2>
            <p className="text-gray-600 mt-2">A peek at recent weddings at Forrester Fields.</p>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {PREVIEW.map((f, i) => (
                <Image
                  key={i}
                  src={f}
                  alt={`Wedding ${i + 1}`}
                  width={900}
                  height={700}
                  className="h-40 w-full object-cover rounded-md"
                />
              ))}
            </div>
            <div className="mt-6">
              <Link href="/gallery" className="underline">See full gallery →</Link>
            </div>
          </div>
        </FadeInOnView>
      </section>

      {/* SECONDARY CTA (kept subtle at bottom) */}
      <section className="section">
        <FadeInOnView>
          <div className="container card p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-display">Ready to chat details?</h3>
              <p className="text-gray-600 mt-1">We’ll reply quickly with availability and next steps.</p>
            </div>
            <Link href="/contact" className="btn btn-primary">Get in touch</Link>
          </div>
        </FadeInOnView>
      </section>

      {/* ABOUT: MARISOL */}
      <section className="section bg-white">
        <FadeInOnView>
          <div className="container text-center">
            <div className="relative mx-auto w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8">
              <Image
                src="/media/forresterfields/momndad.jpg"
                alt="Marisol and her husband at the beach at sunset"
                fill
                priority
                className="rounded-full object-cover"
              />
            </div>

            <h2 className="font-display text-3xl md:text-4xl mb-4">
              About Me, Your Wedding Planner!
            </h2>

            <div className="mx-auto max-w-3xl text-gray-700 leading-relaxed">
              <p>
                I am blessed to get to do what I love with the support of a wonderful
                husband of 31 years. We have attended, been a part of and hosted many
                celebrations and weddings over the years. It&apos;s a dream come true to
                get to share my ideas and love for weddings and parties with others.
              </p>

              <p className="font-semibold mt-4">I was made for this!</p>

              <div className="mx-auto my-6 h-px w-24 bg-gray-200 rounded-full" />

              <figure className="mt-4">
                <blockquote className="italic text-gray-800 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                  “Do not forget to show hospitality to strangers, for by so doing some
                  people have shown hospitality to angels without knowing it.”
                  <footer className="mt-3 text-gray-600 not-italic text-sm">
                    Hebrews 13:2
                  </footer>
                </blockquote>
              </figure>
            </div>
          </div>
        </FadeInOnView>
      </section>
    </main>
  );
}
