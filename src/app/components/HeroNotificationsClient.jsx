"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap } from "lucide-react";

export default function HeroNotificationsClient({ currentIndex, salesData }) {
  return (
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
  );
}
