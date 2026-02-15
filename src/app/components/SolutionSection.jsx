"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Database, cursorClick } from "lucide-react";

export default function SolutionSection() {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const features = [
    {
      title: "The 3-Click Checkout",
      desc: "We engineer high-velocity flows that move customers from 'Interest' to 'Payment Confirmed' in 3 clicks or less.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Omnichannel Sync",
      desc: "Real-time integration between your Next.js Webfront and WhatsApp Business Catalog. One dashboard, total control.",
      icon: <Database className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "SEO-Native Architecture",
      desc: "We don't 'add' SEO later. We build with clean, semantic code that forces Google to notice your brand.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <section id="solutions" className="py-24 gradient text-stone-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side: The "Software House" Pitch */}
          <div>
            <motion.span variants={item} className="text-blue-600 font-black tracking-widest text-xs uppercase">
              The 4Tek Infrastructure
            </motion.span>
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-black mt-4 mb-8 leading-[1.1]">
              We Don't Build Brochures. <br />
              We Engineer <span className="text-blue-600 italic">Revenue Engines.</span>
            </motion.h2>
            
            <motion.p variants={item} className="text-lg text-stone-900 mb-10 leading-relaxed">
              4Tek systems are built for one purpose: **Conversion.** By bridging the gap between custom Next.js webfronts and the WhatsApp Business API, we ensure your brand is accessible wherever your customers are.
            </motion.p>

            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div key={i} variants={item} className="flex gap-4 p-4 rounded-2xl border border-stone-100 hover:border-blue-100 transition-colors">
                  <div className="mt-1">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-stone-950">{f.title}</h4>
                    <p className="text-sm text-stone-900">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: The Visual Proof (A mock code/dashboard UI) */}
          <motion.div variants={item} className="relative">
             <div className="card bg-stone-950 p-2 rounded-[2rem] shadow-2xl rotate-2">
                <div className="bg-stone-900 rounded-[1.5rem] p-6 border border-white/10">
                   {/* Mock Header */}
                   <div className="flex justify-between items-center mb-8">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500" />
                         <div className="w-3 h-3 rounded-full bg-yellow-500" />
                         <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="text-[10px] text-stone-500 font-mono tracking-tighter">4tek_core_v2.sys</div>
                   </div>
                   
                   {/* Analytics Visualization */}
                   <div className="space-y-4">
                      <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }} 
                           whileInView={{ width: "98%" }} 
                           transition={{ duration: 1.5 }}
                           className="h-full bg-blue-500" 
                         />
                      </div>
                      <div className="flex justify-between text-[10px] font-mono">
                         <span className="text-stone-400">SEO OPTIMIZATION</span>
                         <span className="text-blue-400">98% PERFECT</span>
                      </div>

                      <div className="h-32 bg-stone-800/50 rounded-xl border border-white/5 flex items-center justify-center">
                         <div className="text-center">
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest">Average Checkout Time</p>
                            <p className="text-3xl font-black text-white">0.8s</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-stone-800/50 rounded-xl border border-white/5">
                            <p className="text-[10px] text-stone-500 uppercase">API Latency</p>
                            <p className="text-lg font-bold text-green-400">12ms</p>
                         </div>
                         <div className="p-4 bg-stone-800/50 rounded-xl border border-white/5">
                            <p className="text-[10px] text-stone-500 uppercase">CTR Boost</p>
                            <p className="text-lg font-bold text-blue-400">+42%</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             {/* Floating Achievement Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -bottom-6 -left-6 card bg-white p-4 shadow-xl border border-stone-100 flex items-center gap-3"
             >
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                   <Zap className="fill-current w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] text-stone-800 font-bold uppercase">3-Click Standard</p>
                   <p className="text-xs font-black text-stone-950">Active Integration</p>
                </div>
             </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}