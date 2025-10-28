"use client";
import { motion } from "framer-motion";

export default function TestimonialsStripe() {
  const testimonials = [
    {
      quote: "The lake, the lights, and Marisol’s planning made our day absolutely effortless.",
      name: "Jessica & Ryan",
    },
    {
      quote: "Every detail was thoughtful. Our families are still raving about the venue.",
      name: "Amanda G.",
    },
    {
      quote: "Smooth communication, beautiful grounds, and a stress-free experience.",
      name: "Tyler S.",
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
              transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm ring-1 ring-black/5"
            >
              <p className="text-gray-800 leading-relaxed">“{t.quote}”</p>
              <p className="mt-3 text-gray-600 text-sm">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
