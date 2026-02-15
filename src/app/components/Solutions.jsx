"use client";

import { motion } from "framer-motion";

const solutions = [
  {
    id: "01",
    title: "Core Development — Infrastructure",
    subtitle: "Precision-Built Software Infrastructure",
    description:
      "Your business is not generic. Your software shouldn't be either. We architect custom systems that reflect how your operations actually work — from internal workflows to customer-facing platforms. No bloated templates. No patchwork plugins. Just clean, scalable architecture designed around your logic. Built to scale from 100 users to 100,000 without breaking.",
  },
  {
    id: "02",
    title: "Search Engineering — Visibility",
    subtitle: "Search-First Architecture",
    description:
      "Most websites fail before they even load — because no one finds them. We engineer your system around search intent, technical SEO structure, and performance metrics that align with how Google actually ranks pages. This isn’t keyword stuffing. This is structural visibility engineering. If customers are searching for a solution — your brand should appear.",
  },
  {
    id: "03",
    title: "Revenue Operations — Automation",
    subtitle: "Operational Automation Systems",
    description:
      "Manual processes kill growth. If your team is confirming orders via WhatsApp manually, tracking payments in spreadsheets, or responding to repetitive inquiries — you are paying the Human Tax. We replace friction with automation.",
  },
  {
    id: "04",
    title: "Financial Systems — Payments",
    subtitle: "Modern Payment Infrastructure",
    description:
      "Revenue stops when payments fail. We integrate multi-layered payment systems designed for global and local markets — from traditional card networks to crypto rails and recurring billing systems. Secure. Compliant. Reliable.",
  },
  {
    id: "05",
    title: "Conversion Science — Storefronts",
    subtitle: "High-Velocity Storefront Engineering",
    description:
      "Every extra click is a lost sale. We design storefronts and checkout systems engineered around behavioral psychology, speed optimization, and mobile-first conversion patterns. Your customer should move from interest to payment confirmation in three clicks or less. We don’t design for aesthetics. We design for outcomes.",
  },
];

export default function Solutions() {
  return (
    <section className="py-16 gradient" id="solutions">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-stone-950 mb-12">
          Our Core Solutions
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {solutions.map((sol) => (
            <motion.article
              key={sol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="p-6 card rounded-2xl shadow-md hover:shadow-lg border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-indigo-600 mr-4">
                  {sol.id}
                </span>
                <h3 className="text-2xl font-semibold text-stone-950">
                  {sol.title}
                </h3>
              </div>
              <h4 className="text-lg font-medium text-stone-900 mb-2">
                {sol.subtitle}
              </h4>
              <p className="text-gray-800 leading-relaxed">{sol.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}