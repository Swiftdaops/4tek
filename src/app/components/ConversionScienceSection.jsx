"use client";

import { motion } from "framer-motion";

export default function ConversionScienceSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const eliminatePoints = [
    "Decision fatigue",
    "Navigation friction",
    "Checkout hesitation",
    "Performance bottlenecks",
  ];

  const optimizePoints = [
    "Tap-driven mobile flows",
    "Instant feedback loops",
    "Smart autofill and one-click logic",
    "Psychological momentum triggers",
  ];

  return (
    <section id="conversion-science" className="gradient relative py-28 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-stone-950 relative z-10">

        {/* Header Block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4 opacity-80">
            Conversion Science — Storefronts
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
            High-Velocity Storefront Engineering
          </h2>

          {/* Animated divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[3px] bg-stone-950 mt-8"
          />
        </motion.div>

        {/* Core Copy Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="card p-10 mb-20 space-y-6 text-lg md:text-xl"
        >
          <p className="text-xl md:text-2xl font-medium">
            Every additional click reduces purchase probability.
          </p>

          <p>
            We architect storefronts and checkout systems using applied
            behavioral psychology, friction-reduction frameworks, and
            mobile-first performance engineering.
          </p>

          <p className="font-semibold text-2xl">
            Your client should move from product discovery to successful
            transaction in three clicks or fewer.
          </p>
        </motion.div>

        {/* Two Glass Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Eliminate Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-2xl font-bold mb-8">
              We eliminate
            </h3>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5"
            >
              {eliminatePoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemFade}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="w-2 h-2 bg-stone-950 rounded-full" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Optimize Card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="text-2xl font-bold mb-8">
              We build systems optimized for
            </h3>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-5"
            >
              {optimizePoints.map((point, index) => (
                <motion.li
                  key={index}
                  variants={itemFade}
                  className="flex items-center gap-3 text-lg"
                >
                  <span className="w-2 h-2 bg-stone-950 rounded-full" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Closing Statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-3xl md:text-4xl font-semibold">
            Because conversion is not accidental.
          </p>
          <p className="text-3xl md:text-4xl font-semibold mt-2">
            It is engineered.
          </p>
        </motion.div>

      </div>
    </section>
  );
}