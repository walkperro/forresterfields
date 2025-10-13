import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Playfair_Display({ subsets:["latin"], variable:"--ff-display" });
const inter = Inter({ subsets:["latin"], variable:"--ff-sans" });

export const metadata: Metadata = {
  title: "Forrester Fields – Lakeside Weddings in Loganville, GA",
  description: "Serene lakeside venue with planning, coordination, and an on-call worker pool.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
