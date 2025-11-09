import ClientErrorForwarder from "@/components/ClientErrorForwarder";
import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";

const display = Playfair_Display({ subsets:["latin"], variable:"--ff-display" });
const inter = Inter({ subsets:["latin"], variable:"--ff-sans" });
export const metadata: Metadata = {
  metadataBase: new URL("https://forresterfields.vercel.app"),
  title: "Forrester Fields – Lakeside Weddings in Loganville, GA",
  description: "Serene private lakeside venue in Loganville, GA. Full planning, month-of, and day-of coordination for Walton County & Northeast Atlanta.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Forrester Fields",
    locale: "en_US",
    url: "https://forresterfields.vercel.app/",
    title: "Forrester Fields – Lakeside Weddings in Loganville, GA",
    description: "Serene private lakeside venue in Loganville, GA. Full planning, month-of, and day-of coordination for Walton County & Northeast Atlanta.",
    images: ["/media/forresterfields/logo.png"]
  },
  twitter: { card: "summary_large_image", images: ["/media/forresterfields/logo.png"] },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="video" href="/media/forresterfields/hero_21s_streamcopy.mp4" type="video/mp4" />
  <link rel="preload" as="image" href="/media/forresterfields/venue.png" />
      </head>
      <body className={`${display.variable} ${inter.variable} font-sans min-h-screen flex flex-col`}>
        <SeoJsonLd />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        {process.env.NEXT_PUBLIC_DEBUG_CLIENT === "1" ? <ClientErrorForwarder /> : null}
      </body>
      </html>
  );
}
