"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function AboutOfferSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="what-we-offer"
      ref={ref}
      className="py-28 gradient text-white"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 max-w-5xl text-center"
      >
        {/* Section Label */}
        <motion.p
          variants={item}
          className="text-sm uppercase tracking-wider text-white mb-4"
        >
          What We Offer
        </motion.p>

        {/* Main Heading (SEO Important) */}
        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl font-bold leading-tight mb-8"
        >
          We Build Websites & Online Systems
          <br />
          That Help Businesses Sell Smarter.
        </motion.h1>

        {/* Friendly Intro */}
        <motion.p
          variants={item}
          className="text-lg text-white leading-relaxed max-w-3xl mx-auto mb-12"
        >
          Modern businesses need more than just a website.
          They need structure. They need automation.
          They need systems that capture demand, process payments,
          collect customer data, and operate without constant manual effort.
        </motion.p>

        {/* Core Statement Box */}
        <motion.div
          variants={item}
          className="card rounded-2xl p-10 shadow-xl"
        >
          <p className="text-xl font-semibold mb-6">
            4Tek builds digital commerce infrastructure — not just websites.
          </p>

          <p className="text-white leading-relaxed">
            We design and develop e-commerce websites and online sales systems
            that organize your products clearly, allow customers to browse freely,
            accept payments automatically, and help you grow without being online
            24/7. Your website becomes your digital sales engine — working for you
            every single day.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
