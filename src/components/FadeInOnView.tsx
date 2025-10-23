"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";

/** Subtle, luxurious fade/float—similar feel to the gallery crossfades */
export default function FadeInOnView({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  // softer springy-ease curve
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease, delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
