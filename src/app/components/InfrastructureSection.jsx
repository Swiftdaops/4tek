"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(() => import("./ConsultationModal"), { ssr: false });

const infrastructureProblems = [
  { title: "Hotel Management Systems", desc: "Direct online bookings, automated invoicing, real-time availability to prevent double-bookings." },
  { title: "Restaurant Platforms", desc: "POS-integrated ordering, kitchen automation, and table management dashboards." },
  { title: "E-commerce / Marketplaces", desc: "Branded marketplaces with product catalogs, payment integration, order tracking, and analytics." },
  { title: "Subscription Businesses", desc: "Automated subscription management, billing, and user dashboards." },
  { title: "Healthcare / Clinics", desc: "Patient intake, scheduling, billing, and reminders in a HIPAA-compliant system." },
  { title: "Event & Ticketing Platforms", desc: "Online ticketing, seat selection, and reporting to reduce mismanagement." },
  { title: "Logistics & Delivery", desc: "Fleet management, route optimization, and real-time tracking." },
  { title: "Manufacturers / Wholesalers", desc: "Custom ERP with production, inventory, and CRM integration." },
];

export default function InfrastructureSection() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <section className="py-20 gradient">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-stone-950 mt-12 mb-12">
            <span className="text-gradient">4Tek</span> Software Infrastructure
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Your business is not generic. Your software shouldn't be either. We architect custom systems that reflect how your operations actually work — from internal workflows to customer-facing platforms. No bloated templates. No patchwork plugins. Just clean, scalable architecture designed around your logic. Built to scale from 100 users to 100,000 without breaking.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {infrastructureProblems.map((item) => (
              <div key={item.title} className="card p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-indigo-600 mb-2">{item.title}</h3>
                <p className="text-stone-700">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-block bg-stone-950 text-white px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
            >
              Start a project
            </button>
          </div>
          <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </section>


    </>
  );
}