"use client";

import Link from "next/link";
import Script from "next/script";
import { Terminal, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import Solutions from "./Solutions";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { label: "Automation", href: "/solutions#revenue-automation" },
        { label: "SaaS Infrastructure", href: "/saas" },
        { label: "Infrastructure", href: "/solutions#infrastructure" },
        { label: "Search Engineering", href: "/solutions#search-engineering" },
        { label: "Revenue Automation", href: "/solutions#revenue-automation" },
        { label: "Payments Systems", href: "/solutions#payment-systems" },
        { label: "Conversion Science", href: "/solutions#conversion-science" },
      ],
    },
    {
      title: "Engineering",
      links: [
        { label: "API Documentation", href: "/api-ecosystem" },
        { label: "Solutions", href: "/solutions" },
        { label: "Tech Stack", href: "/stack" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About 4Tek", href: "/about" },
        { label: "Who needs Automations", href: "/who-this-is-for" },
        { label: "HTML Sitemap", href: "/sitemap.xml" },
      ],
    },
  ];

  return (
    <footer
      className="relative overflow-hidden gradient1 border-t border-stone-200 pt-20 pb-10"
      role="contentinfo"
    >
      {/* decorative background image placed behind left content */}
      <img
        src={`/api/image?url=${encodeURIComponent(
          "https://res.cloudinary.com/dnitzkowt/image/upload/v1771120347/Gemini_Generated_Image_3l1res3l1res3l1r__1_-removebg-preview_le9f2i.png"
        )}`}
        alt="decorative background"
        aria-hidden="true"
        width="1024"
        height="1024"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none object-contain z-0 w-[320px] sm:w-[512px] md:w-[720px] lg:w-[1024px]"
      />

      {/* semi-transparent overlay for contrast (above image, below content) */}
      <div className="absolute inset-0  pointer-events-none z-10" aria-hidden />

      <div className="container mx-auto px-6 max-w-6xl relative z-20">

        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">

          {/* Brand + Keyword Block */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 z-30">
              <Terminal className="w-6 h-6 text-white drop-shadow-md" />
              <span className="text-xl font-black tracking-tight text-white uppercase drop-shadow-sm">
                4Tek.dev
              </span>
            </Link>

            <p className="text-white text-sm leading-relaxed max-w-xs mb-6">
  We partner with global brands to optimize customer experience through
  precision-built commerce systems, automation architecture, and scalable software.
</p>

            <div className="flex gap-4">
              <Link href="https://github.com" aria-label="GitHub">
                <Github className="w-5 h-5 text-stone-400 hover:text-blue-600 transition-colors" />
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-stone-400 hover:text-blue-600 transition-colors" />
              </Link>
              <Link
                href="https://www.instagram.com/4tekhq?igsh=MWQ5MjRodzF1czFtYQ%3D%3D&utm_source=qr"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-stone-400 hover:text-blue-600 transition-colors" />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-stone-400 hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerLinks.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-950 mb-6">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-stone-500">

          <div>
            © {currentYear} 4Tek Systems Operating LLC. All rights reserved.
          </div>

          <div className="flex items-center gap-4 uppercase tracking-wide">
            <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
            <span>Serving Global Clients</span>
          </div>
        </div>
      </div>

      {/* Structured Data for E-E-A-T */}
      <Script
        id="4tek-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareCompany",
            name: "4Tek Systems Operating LLC",
            url: "https://4tek.dev",
            logo: "https://4tek.dev/logo.png",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressCountry: "Nigeria",
            },
            sameAs: [
              "https://github.com/yourprofile",
              "https://linkedin.com/company/yourprofile",
              "https://twitter.com/yourprofile",
              "https://www.instagram.com/4tekhq?igsh=MWQ5MjRodzF1czFtYQ%3D%3D&utm_source=qr"
            ],
            description:
              "4Tek.dev builds scalable e-commerce infrastructure, automation systems, and SaaS platforms for growth-focused businesses.",
          }),
        }}
      />
    </footer>
  );
}