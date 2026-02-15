"use client";

import { motion } from "framer-motion";

export default function FinalPushCTA() {
  const whatsappNumber = "2348012345678"; // Replace with your WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi 4Tek! I'm ready to audit my workflow and start a project."
  )}`;

  return (
    <section className="bg-indigo-600 py-20 px-6">
      <motion.div
        className="max-w-3xl mx-auto text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to stop selling manually?
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Let’s audit your current workflow and identify where automation can save time, reduce errors, and boost revenue.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          Start A Project
        </a>
      </motion.div>
    </section>
  );
}