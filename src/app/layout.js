import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import TransitionWrapper from "./components/TransitionWrapper";
import Footer from "./components/Footer";
import StructuredData from "./components/JsonLd";
import ChatWidget from "./components/ChatWidget";
import { Analytics } from "@vercel/analytics/react";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://4tek.dev"),
  title: {
    default: "4Tek | E-commerce Infrastructure & Software Development",
    template: "%s | 4Tek Systems",
  },
  description: "Engineering autonomous revenue engines and 3-click checkout systems. Registered software development company specializing in e-commerce automation.",
  keywords: ["Software Development Nigeria", "E-commerce Automation", "WhatsApp API Integration", "Next.js Developers", "Revenue Engines"],
  
  // Theme & Mobile UI moved to `viewport` export per Next.js

  authors: [{ name: "4Tek Engineering Team" }],
  creator: "4Tek",
  publisher: "4Tek Systems",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://4tek.dev",
    siteName: "4Tek",
    title: "4Tek | Solving Online Revenue through Infrastructure",
    description: "Move beyond manual DMs. We build software that automates sales, inventory, and payments.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "4Tek Software Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "4Tek | E-commerce Automation Architects",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning
        className={`${jetBrainsMono.className} antialiased  text-stone-950`}
      >
        <Navbar />
        <TransitionWrapper>{children}</TransitionWrapper>
        <Footer />
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}

export const viewport = {
  themeColor: "#acb6e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};