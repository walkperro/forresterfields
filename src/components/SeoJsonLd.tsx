export default function SeoJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["Organization","LocalBusiness","EventVenue","WeddingService"],
    name: "Forrester Fields",
    url: "https://forresterfields.vercel.app/",
    telephone: "+1-000-000-0000",
    areaServed: ["Walton County","Greater Atlanta"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Loganville",
      addressRegion: "GA",
      addressCountry: "US"
    },
    sameAs: [
      "https://instagram.com/forresterfields",
      "https://facebook.com/forresterfields"
    ]
  };
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
