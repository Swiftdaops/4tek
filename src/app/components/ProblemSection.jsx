"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AlertCircle, Clock, XCircle, ZapOff } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const painPoints = [
    {
      title: "The 'Ghosting' Bug",
      desc: "Customers ask for price, you reply 2 hours later, and they are gone. That is not 'bad luck'; that is latency.",
      icon: <XCircle className="w-8 h-8 text-red-500" />,
    },
    {
      title: "The 'Price Check' Loop",
      desc: "You spend 40% of your day typing numbers. This is redundant data entry, not sales.",
      icon: <AlertCircle className="w-8 h-8 text-orange-500" />,
    },
    {
      title: "Manual Inventory Errors",
      desc: "Selling the same item twice because you forgot to update the status? That's a database sync failure.",
      icon: <ZapOff className="w-8 h-8 text-stone-500" />,
    },
    {
      title: "Downtime Revenue Loss",
      desc: "If your business stops when you sleep, your income is capped by your physical energy.",
      icon: <Clock className="w-8 h-8 text-blue-500" />,
    },
  ];

  return (
    <section
      id="problem"
      ref={ref}
      className="py-24 gradient text-stone-950 relative overflow-hidden"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 max-w-6xl relative z-10"
      >
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div variants={item} className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 font-bold text-xs tracking-widest uppercase border border-red-200">
              System Audit: Critical Errors Found
            </span>
          </motion.div>

          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6"
          >
            Replying "Check DM" is a <br />
            <span className="text-red-600">Bug in Your Business Logic.</span>
          </motion.h2>

         <motion.p
            variants={item}
            className="text-lg md:text-xl text-stone-800 leading-relaxed font-medium max-w-3xl mx-auto"
          >
            Your revenue is currently <span className="text-stone-950 font-black decoration-red-500/30 underline decoration-4 underline-offset-4">capped by your typing speed. </span> 
            Every minute a customer waits for a reply, your conversion probability drops. 
            If your sales process relies on you being awake, 
            you don't own a business — you own a job.
          </motion.p>
        </div>

        {/* The Pain Grid (SEO: Uses H3 for sub-points) */}
        <motion.div
          variants={container}
          className="grid md:grid-cols-2 gap-6 mb-16"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={item}
              className="card group flex items-start gap-5 p-8 border border-stone-200 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 rounded-2xl"
            >
              <div className="p-3 rounded-xl bg-stone-50 group-hover:bg-red-50 transition-colors">
                {point.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-950 mb-2 group-hover:text-red-600 transition-colors">
                  {point.title}
                </h3>
                <p className="text-stone-900 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* The "Software Solution" Bridge */}
        <motion.div
          variants={item}
          className="card bg-stone-950 text-white p-8 md:p-12 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative gradient inside the dark card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stop debugging manually. Start automating.
            </h3>
            <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
              You don’t need more followers. You need a <b>Revenue Engine</b> that captures, processes, and closes sales 24/7.
            </p>
            
            <a 
              href="#solutions" 
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-stone-950 bg-white rounded-full hover:bg-stone-200 transition-all shadow-lg hover:scale-105 active:scale-95"
            >
              See The 4Tek Fix
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}