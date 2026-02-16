"use client";
import { motion } from "framer-motion";

export default function SystemBlueprintSection() {
  const layers = [
    "Frontend",
    "API Layer",
    "Database",
    "Automation Engine",
    "Payment Infrastructure",
    "Analytics Loop",
  ];

  return (
    <section className="gradient py-28 px-6 md:px-12 relative overflow-hidden" id="system-diagram">
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
          className="text-4xl md:text-5xl font-bold text-stone-900 mb-6"
        >
          The SaaS Growth Blueprint
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-stone-800 text-lg mb-12 max-w-3xl"
        >
          A scalable SaaS system is not a single tool — it’s a connected
          architecture. Each layer feeds the next, creating a continuous
          growth loop that converts traffic, processes data, automates
          workflows, and drives revenue predictably.
        </motion.p>

        {/* Flow Steps */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              className="px-6 py-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-stone-900 font-medium shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {layer}
            </motion.div>
          ))}
        </div>

        {/* Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-white/40"
        >
          <img
            src="/saas-full-blueprint.svg"
            alt="Full SaaS System Diagram"
            className="w-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}