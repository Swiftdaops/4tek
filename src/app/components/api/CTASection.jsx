"use client";

import { useState } from "react";
import ConsultationModal from "@/app/components/ConsultationModal";

export default function FinalCTASection() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section className="py-32 px-6 gradient1 text-center">
      <h2 className="text-5xl font-bold text-stone-950 mb-8">
        Ready to Engineer Your Infrastructure?
      </h2>

      <button onClick={() => setModalOpen(true)} className="px-10 py-4 bg-stone-950 text-white rounded-xl hover:scale-105 transition">
        Request System Architecture Audit
      </button>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}