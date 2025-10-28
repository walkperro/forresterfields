"use client";
import { motion } from "framer-motion";

export default function TestimonialsStripe() {
  // Curated & lightly edited for length; real reviewer names preserved
  const testimonials = [
    {
      quote:
        "Gorgeous lakeside grounds with plenty of seating. Marisol managed every detail so our day felt effortless.",
      name: "Mary Rowe Echevarria",
    },
    {
      quote:
        "Beautiful venue and amazing property. Peaceful, breathtaking scenery that makes any event feel extra special.",
      name: "Maggie Fallon Kirk",
    },
    {
      quote:
        "This is the place for your next event. Simple, smooth, and welcoming from start to finish.",
      name: "Juan Hernandez",
    },
    {
      quote:
        "Integrity and family-first service. With an eye for detail, events run seamlessly. Highly recommend!",
      name: "Dana Williamson Taylor",
    },
    {
      quote:
        "The lakeside setting is stunning. Attention to detail—ceremony to cocktails to dinner—flowed elegantly all evening.",
      name: "Rebecca Grubbs Dalrymple",
    },
    {
      quote:
        "Beautiful property with lots of options to host your event. Peaceful atmosphere and great backdrop for photos.",
      name: "Logan Forrester",
    },
  ];

  return (
    <section className="section pt-2">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: i * 0.12, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-gray-800 leading-relaxed">
                “{t.quote}”
              </p>
              <p className="mt-3 text-gray-600 text-sm">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
