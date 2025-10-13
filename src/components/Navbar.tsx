"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <nav className="container h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Forrester Fields" width={110} height={32} priority />
        </Link>

        {/* desktop */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          <Link href="/services">Services</Link>
          <Link href="/venue">Venue</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/event-pool">Event Pool</Link>
          <Link href="/contact" className="btn btn-primary text-white">Contact</Link>
        </div>

        {/* mobile burger */}
        <button aria-label="Menu" className="md:hidden inline-flex items-center gap-2 border rounded-md px-3 py-2"
          onClick={()=>setOpen(v=>!v)}>
          <span>Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg>
        </button>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-3 grid gap-3 text-sm">
            <Link href="/services" onClick={()=>setOpen(false)}>Services</Link>
            <Link href="/venue" onClick={()=>setOpen(false)}>Venue</Link>
            <Link href="/gallery" onClick={()=>setOpen(false)}>Gallery</Link>
            <Link href="/event-pool" onClick={()=>setOpen(false)}>Event Pool</Link>
            <Link href="/contact" className="btn btn-primary w-fit text-white" onClick={()=>setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
