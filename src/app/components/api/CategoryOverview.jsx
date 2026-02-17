"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  CreditCard,
  Brain,
  Mail,
  BarChart3,
  Shield,
} from "lucide-react";

const categories = [
  { title: "Automation & Workflow", icon: Workflow, target: "automation" },
  { title: "Payments & Fintech", icon: CreditCard, target: "payments" },
  { title: "AI & Digital Sales Reps", icon: Brain, target: "ai" },
  { title: "Email & Communication", icon: Mail, target: "email" },
  { title: "Analytics & Intelligence", icon: BarChart3, target: "analytics" },
  { title: "Authentication & Identity", icon: Shield, target: "auth" },
];

export default function CategoriesSection() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="categories" className="py-24 px-6 gradient text-center">
      <div className="max-w-6xl mx-auto mb-14">
        <h2 className="text-4xl font-bold text-stone-950 mb-4">
          Explore the Ecosystem
        </h2>
        <p className="text-stone-900 max-w-2xl mx-auto">
          Select a category to explore the APIs that optimize each layer of your
          business infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {categories.map((cat, i) => {
          const Icon = cat.icon;

          return (
            <motion.button
              key={i}
              onClick={() => scrollToSection(cat.target)}
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="card p-10 text-white text-center cursor-pointer focus:outline-none"
            >
              <Icon className="w-10 h-10 mx-auto mb-6 text-blue-300" />
              <h3 className="text-xl font-semibold tracking-tight">
                {cat.title}
              </h3>

              <p className="mt-3 text-sm opacity-80">
                Explore APIs powering this layer
              </p>

              <div className="mt-4">
                <span className="inline-flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                  Click to explore
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}