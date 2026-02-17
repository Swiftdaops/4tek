"use client";

import { Database, CreditCard, Brain, BarChart3 } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/app/components/ConsultationModal";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="gradient min-h-screen flex items-center justify-center text-center px-6 relative">
      <div className="absolute inset-0 opacity-20 grid grid-cols-4 gap-10 p-20">
        <Database className="w-16 h-16 mx-auto" />
        <CreditCard className="w-16 h-16 mx-auto" />
        <Brain className="w-16 h-16 mx-auto" />
        <BarChart3 className="w-16 h-16 mx-auto" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-stone-950">
          A Universe of APIs.
          <br />
          One Intelligent Infrastructure.
        </h1>
        <p className="mt-6 text-lg text-stone-800">
          We integrate the world’s most powerful automation, payment,
          analytics, and AI systems into a unified operating layer for your
          business.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => {
              const el = document.getElementById("categories");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="px-8 py-3 bg-stone-950 text-white rounded-xl hover:scale-105 transition"
          >
            Explore the Ecosystem
          </button>
          <button onClick={() => setModalOpen(true)} className="px-8 py-3 border border-stone-900 rounded-xl hover:bg-stone-900 hover:text-white transition">
            Request Architecture Consultation
          </button>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}