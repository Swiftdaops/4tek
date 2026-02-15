"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WhatIsSaaSSection() {
  const points = [
    { title: "Frontend Layer", desc: "Customer-facing interface optimized for clarity, speed, and conversion." },
    { title: "Backend Logic", desc: "Handles business rules, user authentication, and secure data processing." },
    { title: "Payment Infrastructure", desc: "Integrates multi-gateway payments, recurring billing, and fraud detection." },
    { title: "SEO Visibility Engine", desc: "Ensures your brand is discovered organically through structured, search-first architecture." },
    { title: "Automation Pipelines", desc: "Automates repetitive tasks like email campaigns, order confirmations, and inventory sync." },
    { title: "Data Intelligence Loops", desc: "Collects analytics and feedback to continuously optimize the business." },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-stone-50">
      <motion.div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-6">
          Beyond Software. A Revenue Operating System.
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-6">
          Operational SaaS is more than dashboards or billing tools. It's a connected system built to drive growth, optimize customer experience, and scale operations globally.  
          Learn more on <Link href="https://en.wikipedia.org/wiki/Software_as_a_service" target="_blank" className="text-blue-600 underline">Wikipedia</Link>.
        </motion.p>

        <ul className="space-y-4">
          {points.map((p, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <strong>{p.title}:</strong> {p.desc}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}