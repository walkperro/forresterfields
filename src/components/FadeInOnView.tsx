"use client";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeInOnView({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className + " transform-gpu will-change-transform"}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
