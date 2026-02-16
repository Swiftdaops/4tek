"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function WhatIsSaaSSection() {
  const points = [
    {
      title: "Frontend Layer",
      desc: "Customer-facing interface optimized for clarity, speed, and conversion.",
    },
    {
      title: "Backend Logic",
      desc: "Handles business rules, user authentication, and secure data processing.",
    },
    {
      title: "Payment Infrastructure",
      desc: "Integrates multi-gateway payments, recurring billing, and fraud detection.",
    },
    {
      title: "SEO Visibility Engine",
      desc: "Ensures your brand is discovered organically through structured, search-first architecture.",
    },
    {
      title: "Automation Pipelines",
      desc: "Automates repetitive tasks like email campaigns, order confirmations, and inventory sync.",
    },
    {
      title: "Data Intelligence Loops",
      desc: "Collects analytics and feedback to continuously optimize the business.",
    },
  ];

  return (
    <section className="gradient py-28 px-6 md:px-12 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-10 md:p-16 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight"
        >
          Beyond Software. <span className="text-white">A Revenue Operating System.</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-stone-800 text-lg mb-10 max-w-3xl"
        >
          Operational SaaS is more than dashboards or billing tools. It's a connected
          growth system engineered to optimize customer experience, increase
          conversion velocity, and scale globally.
          <br className="hidden md:block" />
          <Link
            href="https://en.wikipedia.org/wiki/Software_as_a_service"
            target="_blank"
            className="ml-1 font-semibold underline underline-offset-4 hover:text-white transition-colors"
          >
            Learn more on Wikipedia →
          </Link>
        </motion.p>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-2">
                {p.title}
              </h3>
              <p className="text-stone-800 text-sm leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}