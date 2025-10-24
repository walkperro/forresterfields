"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Staggered fade for menu items
  const list = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.18 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: -6 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  };

  const close = () => setOpen(false);
  const baseLink =
    "block py-2 -mx-1 px-1 rounded hover:bg-gray-50 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Forrester Fields" width={110} height={32} priority />
        </Link>

        {/* desktop */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link href="/services" className="hover:opacity-80 transition">Services</Link>
          <Link href="/venue" className="hover:opacity-80 transition">Venue</Link>
          <Link href="/gallery" className="hover:opacity-80 transition">Gallery</Link>
          <Link href="/event-pool" className="hover:opacity-80 transition">Event Pool</Link>
          <Link href="/contact" className="btn btn-primary text-white">Contact</Link>
        </div>

        {/* mobile burger */}
        <button
          aria-label="Menu"
          className="md:hidden inline-flex items-center gap-2 border rounded-md px-3 py-2"
          onClick={() => setOpen(v => !v)}
        >
          <span>Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>
      </nav>

      {/* mobile drawer (slow, smooth, and staggered) */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease }}
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <div className="container py-3">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={list}
                className="grid gap-1 text-sm"
              >
                <motion.li variants={item}>
                  <Link href="/services" onClick={close} className={baseLink}>Services</Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link href="/venue" onClick={close} className={baseLink}>Venue</Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link href="/gallery" onClick={close} className={baseLink}>Gallery</Link>
                </motion.li>
                <motion.li variants={item}>
                  <Link href="/event-pool" onClick={close} className={baseLink}>Event Pool</Link>
                </motion.li>
                {/* Contact aligned exactly like others, with subtle emphasis */}
                <motion.li variants={item}>
                  <Link
                    href="/contact"
                    onClick={close}
                    className={baseLink + " text-emerald-700 font-medium"}
                  >
                    Contact
                  </Link>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
