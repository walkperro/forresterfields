import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";

const display = Playfair_Display({ subsets:["latin"], variable:"--ff-display" });
const inter = Inter({ subsets:["latin"], variable:"--ff-sans" });

export const metadata: Metadata = {
  title: "Forrester Fields – Lakeside Weddings in Loganville, GA",
  description: "Serene lakeside venue serving Walton County & Greater Atlanta with full planning, month-of, and day-of coordination.",
  metadataBase: new URL("https://forresterfields.vercel.app"),
  openGraph: {
    title: "Forrester Fields – Lakeside Weddings",
    description: "Private lakeside venue in Loganville, GA.",
    url: "https://forresterfields.vercel.app/",
    siteName: "Forrester Fields",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Forrester Fields" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forrester Fields – Lakeside Weddings",
    description: "Private lakeside venue in Loganville, GA.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <SeoJsonLd />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
