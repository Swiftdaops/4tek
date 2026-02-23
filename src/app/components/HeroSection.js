"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

const salesData = [
  // --- NORTH AMERICA (High Value) ---
  { amount: "$142,500.00", country: "🇺🇸 USA", time: "Just now" },
  { amount: "$12,400.50", country: "🇺🇸 USA", time: "3m ago" },
  { amount: "$2,400.00", country: "🇺🇸 USA", time: "6m ago" },
  { amount: "$195,000.00", country: "🇺🇸 USA", time: "4h ago" },
  { amount: "$850.00", country: "🇺🇸 USA", time: "1h ago" },
  { amount: "C$1,200.00", country: "🇨🇦 Canada", time: "40m ago" },
  { amount: "C$45,000.00", country: "🇨🇦 Canada", time: "48m ago" },

  // --- ASIA PACIFIC (E-commerce Giants) ---
  { amount: "¥1,280,000", country: "🇨🇳 China", time: "1m ago" },
  { amount: "¥450,000", country: "🇨🇳 China", time: "5m ago" },
  { amount: "¥18,500,000", country: "🇯🇵 Japan", time: "15m ago" },
  { amount: "¥6,200,000", country: "🇯🇵 Japan", time: "20m ago" },
  { amount: "₩150,000,000", country: "🇰🇷 South Korea", time: "16m ago" },
  { amount: "S$120,500", country: "🇸🇬 Singapore", time: "22m ago" },
  { amount: "A$85,000.00", country: "🇦🇺 Australia", time: "18m ago" },
  { amount: "A$210.00", country: "🇦🇺 Australia", time: "2h ago" },

  // --- EUROPEAN MARKETS ---
  { amount: "£89,000.00", country: "🇬🇧 UK", time: "2m ago" },
  { amount: "£14,250.25", country: "🇬🇧 UK", time: "4m ago" },
  { amount: "€140,000.00", country: "🇩🇪 Germany", time: "7m ago" },
  { amount: "€850.00", country: "🇫🇷 France", time: "8m ago" },
  { amount: "€62,100.00", country: "🇳🇱 Netherlands", time: "9m ago" },
  { amount: "€11,100.00", country: "🇮🇹 Italy", time: "12m ago" },
  { amount: "€9,200.00", country: "🇪🇸 Spain", time: "14m ago" },
  { amount: "CHF 155,000", country: "🇨🇭 Switzerland", time: "58m ago" },
  { amount: "€1,500.00", country: "🇧🇪 Belgium", time: "3h ago" },

  // --- MIDDLE EAST & GROWTH ---
  { amount: "د.إ620,000", country: "🇦🇪 UAE", time: "52m ago" },
  { amount: "SR450,000", country: "🇸🇦 Saudi Arabia", time: "55m ago" },
  { amount: "د.إ18,500", country: "🇦🇪 UAE", time: "1h ago" },
  { amount: "₹14,500,000", country: "🇮🇳 India", time: "33m ago" },
  { amount: "₹1,250,000", country: "🇮🇳 India", time: "3h ago" },
  { amount: "฿4,400,000", country: "🇹🇭 Thailand", time: "31m ago" },

  // --- MORE HIGH-VALUE ENTRIES ---
  { amount: "$52,000.00", country: "🇺🇸 USA", time: "10m ago" },
  { amount: "£112,000.00", country: "🇬🇧 UK", time: "15m ago" },
  { amount: "€98,400.00", country: "🇫🇷 France", time: "18m ago" },
  { amount: "¥12,000,000", country: "🇯🇵 Japan", time: "22m ago" },
  { amount: "$1,450.00", country: "🇺🇸 USA", time: "25m ago" },
  { amount: "€42,000.00", country: "🇩🇪 Germany", time: "30m ago" },
  { amount: "S$180,000", country: "🇸🇬 Singapore", time: "35m ago" },
  { amount: "£450.00", country: "🇬🇧 UK", time: "40m ago" },
  { amount: "€185,000.00", country: "🇱🇺 Luxembourg", time: "45m ago" },
  { amount: "$120,000.00", country: "🇺🇸 USA", time: "50m ago" },
  { amount: "A$160,000.00", country: "🇦🇺 Australia", time: "55m ago" },
  { amount: "₩250,000,000", country: "🇰🇷 South Korea", time: "1h ago" },
  { amount: "€88,000.00", country: "🇮🇪 Ireland", time: "1.2h ago" },
  { amount: "CHF 12,000", country: "🇨🇭 Switzerland", time: "1.5h ago" },
  { amount: "€1,200.00", country: "🇦🇹 Austria", time: "1.8h ago" },
  { amount: "kr 1,800,000", country: "🇸🇪 Sweden", time: "2h ago" },
  { amount: "$98,000.00", country: "🇺🇸 USA", time: "2.2h ago" },
  { amount: "£65,000.00", country: "🇬🇧 UK", time: "2.5h ago" },
  { amount: "€120,000.00", country: "🇫🇷 France", time: "2.8h ago" },
  { amount: "¥5,500,000", country: "🇯🇵 Japan", time: "3h ago" },
  { amount: "$44,000.00", country: "🇺🇸 USA", time: "3.2h ago" },
  { amount: "€35,000.00", country: "🇩🇪 Germany", time: "3.5h ago" },
  { amount: "£1,250.00", country: "🇬🇧 UK", time: "3.8h ago" },
  { amount: "$165,000.00", country: "🇺🇸 USA", time: "4h ago" },
  { amount: "€14,000.00", country: "🇳🇱 Netherlands", time: "4.5h ago" }
];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % salesData.length);
    }, 3500); // Each notification stays for 3.5 seconds

    return () => clearInterval(interval);
  }, [salesData.length]);


  return (
    <section className="relative min-h-screen w-full overflow-hidden gradient px-6 pt-32 pb-20">
      {/* Background Decorative Element (moved behind overlay) */}
      <div className="absolute top-0 left-1/2 -z-20 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Background image layer above the gradient but below overlay */}
      {(() => {
        const bg = `/api/image?url=${encodeURIComponent(
          "https://res.cloudinary.com/dnitzkowt/image/upload/v1771120347/Gemini_Generated_Image_3l1res3l1res3l1r__1_-removebg-preview_le9f2i.png"
        )}`;
        return (
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
            style={{ backgroundImage: `url('${bg}')` }}
            aria-hidden
          />
        );
      })()}

      {/* Semi-opaque overlay for legibility */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10" aria-hidden />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left Column: Content */}
        <div>
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center rounded-full bg-stone-950/10 px-4 py-1 text-sm font-medium text-stone-950 backdrop-blur-md ring-1 ring-stone-950/20 mb-8"
          >
            <span className="font-bold mr-2 text-blue-600">4Tek</span> Software Infrastructure
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-black tracking-tight text-stone-950 leading-[1.1] mb-6"
          >
            Your Online Store Should <br />
            <span className="text-blue-600 italic">Sell While You Sleep.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-stone-800 max-w-lg mb-10 leading-relaxed font-medium"
          >
            We engineer autonomous sales systems for brands ready to move beyond manual DMs. Your revenue deserves software-grade reliability.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/get-started" className="card bg-stone-950 px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-xl">
              Automate My Sales
            </Link>
            <Link href="/solutions" className="card border-2 border-stone-950/20 bg-white/50 px-8 py-4 text-sm font-bold text-stone-950 backdrop-blur-sm transition-all hover:bg-white/80">
              View Solutions
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Visual Notification Stack */}
        <motion.div
          variants={itemVariants}
          className="relative flex flex-col items-center justify-center h-48" // Set a fixed height for the container
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="card absolute w-full max-w-[400px] border border-stone-950/10 bg-white/80 p-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* PREMIUM 4TEK DEPOSIT ICON */}
                  <div className="relative h-14 w-14 rounded-2xl bg-stone-950 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="text-white w-7 h-7" />
                    <motion.div 
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1 shadow-md"
                    >
                        <Zap className="text-white w-3 h-3 fill-current" />
                    </motion.div>
                  </div>
                  
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase font-black tracking-[0.2em]">Verified Payment</p>
                    <h3 className="text-2xl font-black text-lime-500">{salesData[currentIndex].amount}</h3>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-bold text-stone-900">{salesData[currentIndex].country}</p>
                  <p className="text-[10px] font-bold text-stone-800 uppercase tracking-tighter">{salesData[currentIndex].time}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Glow behind notifications */}
          <div className="absolute -z-10 h-64 w-64 bg-blue-400/20 blur-[100px] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}