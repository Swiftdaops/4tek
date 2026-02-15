"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="gradient pt-24 md:pt-32 min-h-screen flex flex-col justify-center items-start px-6 md:px-12 text-stone-950">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl space-y-6"
      >
        <p className="uppercase tracking-widest text-sm font-semibold text-blue-600">Operational SaaS Architecture</p>
        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          Infrastructure for Modern Digital Commerce
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          4Tek engineers full-stack SaaS ecosystems that unify visibility, performance, automation, payments, and data intelligence into a single operational system.
        </p>
        <div className="flex gap-4 mt-6">
          <Link href="#audit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Audit Your Architecture
          </Link>
          <Link href="#system-diagram" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            View System Blueprint
          </Link>
        </div>
      </motion.div>
    </section>
  );
}