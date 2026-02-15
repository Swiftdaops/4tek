import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import TransitionWrapper from "./components/TransitionWrapper";
import Footer from "./components/Footer";
import StructuredData from "./components/JsonLd";
import ChatWidget from "./components/ChatWidget";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

// Optimized SEO Metadata
export const metadata = {
  metadataBase: new URL("https://4tek.dev"),
  title: {
    default: "4Tek | E-commerce Infrastructure & Software Development",
    template: "%s | 4Tek Systems",
  },
  description:
    "We engineer autonomous revenue engines and 3-click checkout systems. Registered software development company specializing in e-commerce automation and enterprise-grade infrastructure.",
  keywords: [
    "Software Development Nigeria",
    "E-commerce Automation",
    "WhatsApp API Integration",
    "Next.js Developers",
    "Admin Dashboards",
    "Revenue Engines",
    "3-click checkout",
  ],
  authors: [{ name: "4Tek Engineering Team" }],
  creator: "4Tek",
  publisher: "4Tek Systems",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://4tek.dev",
    siteName: "4Tek",
    title: "4Tek | Solving Online Revenue through Infrastructure",
    description:
      "Move beyond manual DMs. We build the software that automates your sales, inventory, and payments.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "4Tek Software Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4Tek | E-commerce Automation Architects",
    description: "Engineering 3-click checkout systems and automated WhatsApp catalogs.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://4tek.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon - essential for credibility */}
        <link rel="icon" href="/favicon.ico" />
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
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