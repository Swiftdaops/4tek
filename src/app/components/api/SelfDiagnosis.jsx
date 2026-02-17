"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Workflow,
  Brain,
  Mail,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    problem: "High Cart Abandonment",
    solution: "Payments Optimization",
    target: "payments",
    icon: ShoppingCart,
  },
  {
    problem: "Manual Order Processing",
    solution: "Workflow Automation",
    target: "automation",
    icon: Workflow,
  },
  {
    problem: "Poor Customer Engagement",
    solution: "AI Digital Assistant",
    target: "ai",
    icon: Brain,
  },
  {
    problem: "Low Retention & Follow-Up",
    solution: "Email Automation",
    target: "email",
    icon: Mail,
  },
];

export default function DiagnosisSection() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="py-32 gradient text-center px-6">
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-950 mb-6">
          Identify Your Bottleneck.
        </h2>

        <p className="text-lg text-stone-900 max-w-2xl mx-auto">
          Every growth constraint maps to a system layer. Select your friction
          point and explore the infrastructure designed to remove it.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {items.map((item, i) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={i}
              onClick={() => scrollToSection(item.target)}
              whileHover={{
                scale: 1.04,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="card p-10 text-white text-left cursor-pointer focus:outline-none"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Icon className="w-8 h-8 mb-6 text-blue-300" />

                  <h3 className="text-xl font-semibold mb-2">
                    {item.problem}
                  </h3>

                  <p className="text-sm opacity-80">
                    Solution: {item.solution}
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 mt-1 text-blue-200 opacity-70 group-hover:opacity-100" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}