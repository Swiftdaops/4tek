"use client";
import { motion } from "framer-motion";

export default function SystemBlueprintSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-blue-50" id="system-diagram">
      <motion.div className="max-w-6xl mx-auto text-center space-y-6">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
          System Blueprint
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-lg">
          Frontend → API Layer → Database → Automation Engine → Payment Infrastructure → Analytics Loop
        </motion.p>
        <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} src="/saas-full-blueprint.svg" alt="Full SaaS System Diagram" className="mx-auto rounded-lg shadow-lg w-full md:w-3/4"/>
      </motion.div>
    </section>
  );
}