"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section id="audit" className="py-24 px-6 md:px-12 gradient text-white text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold">Ready to Evaluate Your Infrastructure?</h2>
        <p className="text-lg">
          Schedule a technical audit with 4Tek. Understand where your SaaS ecosystem can scale and improve revenue performance globally.
        </p>
        <Link href="/contact" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-stone-50 transition-colors">
          Request Technical Review
        </Link>
      </motion.div>
    </section>
  );
}