"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Info, Layers, Shield } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
    }

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const targetWidth = isMobile ? (open ? 320 : 260) : (open ? 720 : 520);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        animate={{
          width: targetWidth,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="backdrop-blur-xl bg-white/10 border-[3px] border-white/20 shadow-2xl rounded-full px-6 py-3 md:px-10 md:py-4 flex items-center justify-between min-w-[260px] md:min-w-[720px]"
      >
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          <span aria-hidden className="sr-only">4Tek</span>
          <span className="text-gradient inline-block">4Tek</span>
        </Link>

        {/* Desktop Links (icon pills) */}
        <div className="hidden md:flex items-center gap-4 text-blue-500">
            <Link href="/about" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue/60 bg-white/5 transition hover:opacity-90">
              <Info className="w-4 h-4 shrink-0" />
              <span className="ml-0 text-sm md:text-base lg:text-base font-semibold md:font-bold whitespace-nowrap overflow-hidden truncate max-w-22.5 md:max-w-35 lg:max-w-45 text-blue-500">About</span>
            </Link>

            <Link href="/solutions" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-blue/60 bg-white/5 transition hover:opacity-90">
              <Layers className="w-4 h-4 shrink-0" />
              <span className="ml-0 text-sm md:text-base lg:text-base font-semibold md:font-bold whitespace-nowrap overflow-hidden truncate max-w-22.5 md:max-w-35 lg:max-w-45 text-blue-500">Solution</span>
            </Link>

            <Link href="/security" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-white/60 bg-white/5 transition hover:opacity-90">
              <Shield className="w-4 h-4 shrink-0" />
              <span className="ml-0 text-sm md:text-base lg:text-base font-semibold md:font-bold whitespace-nowrap overflow-hidden truncate max-w-22.5 md:max-w-35 lg:max-w-45 text-blue-500">Security</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-950"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Center Reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden mt-4 backdrop-blur-xl bg-white/10 border border-blue/20 shadow-2xl rounded-2xl p-6 flex flex-col items-center gap-6 text-blue-500"
          >
            <Link href="/about" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-white/60 bg-white/5 w-full justify-center">
              <Info className="w-4 h-4 shrink-0" />
              <span className="text-base font-semibold md:font-bold text-blue-500">About</span>
            </Link>

            <Link href="/solution" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-white/60 bg-white/5 w-full justify-center">
              <Layers className="w-4 h-4 shrink-0" />
              <span className="text-base font-semibold md:font-bold text-blue-500">Solution</span>
            </Link>

            <Link href="/security" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 border-white/60 bg-white/5 w-full justify-center">
              <Shield className="w-4 h-4 shrink-0" />
              <span className="text-base font-semibold md:font-bold text-blue-500">Security</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// logo uses pure CSS animated gradient (no motion so it stays visually static)
