"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function TagCloud() {
  const tags = [
    "3-Click Checkout",
    "WhatsApp API Sync",
    "SEO-Ready Architecture",
    "Internal Admin Systems",
    "SaaS Dashboards",
    "API Development",
    "Payment Gateway Integration",
    "Inventory Automation",
    "Logistics Dashboards",
    "Structured Data Schema",
    "Page Speed Optimization",
    "Core Web Vitals",
    "CRM Integration",
    "Order Processing",
    "Crypto Payments",
    "Escrow Systems",
    "Abandoned Cart Recovery",
    "Landing Page Engineering",
    "Meta API integration",
  ];

  // chunk tags into small groups for each slide
  const chunk = (arr, size) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  };

  const slides = chunk(tags, 4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section aria-label="Technical Capabilities" className="gradient pt-6 border-t border-stone-200">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4 text-center">Engineering Scope & Infrastructure</p>

      <div className="max-w-4xl mx-auto overflow-hidden">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="py-4"
        >
          <div className="flex flex-wrap justify-center gap-3 px-4">
            {slides[index].map((tag) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="text-xs font-bold text-stone-600 px-4 py-2  border border-stone-200 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}