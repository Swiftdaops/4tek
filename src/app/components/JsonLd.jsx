import Script from "next/script";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "4Tek",
    "url": "https://4tek.dev",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "aggregateRating": {
      "@type": "AggregateRating",
         "ratingValue": "4.9",
            "reviewCount": "120" 
    },
    "author": {
      "@type": "Organization",
      "name": "4Tek",
      "url": "https://4tek.dev"
    },
    "sameAs": [
      "https://www.linkedin.com/company/4tek",
      "https://twitter.com/4tek",
      "https://www.instagram.com/4tekhq?igsh=MWQ5MjRodzF1czFtYQ%3D%3D&utm_source=qr"
    ]
  };
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}