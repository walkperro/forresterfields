"use client";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function FadeInOnView({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 18, scale: 0.995 }}
        animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.995 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
