"use client";

import React, { useState } from "react";
import { Shield, Zap, Server } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import dynamic from "next/dynamic";

const ConsultationModal = dynamic(() => import("./ConsultationModal"), { ssr: false });

export default function TechStackSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const proxied = (u) => `/api/image?url=${encodeURIComponent(u)}`;
  const payments = [
    { name: "Flutterwave", logo: proxied("https://res.cloudinary.com/dnitzkowt/image/upload/v1771123816/unnamed-removebg-preview_ba3qnv.png") },
    { name: "Paystack", logo: proxied("https://res.cloudinary.com/dnitzkowt/image/upload/v1771123892/download__1_-removebg-preview_1_ctcbcr.png") },
    { name: "PayPal", logo: "https://seeklogo.com/images/P/paypal-logo-57D5F56A0E-seeklogo.com.png" },
    { name: "Stripe", logo: "https://seeklogo.com/images/S/stripe-logo-1C92F0E6F4-seeklogo.com.png" },
    { name: "Visa", logo: "https://seeklogo.com/images/V/visa-logo-B9975ECA6A-seeklogo.com.png" },
    { name: "Mastercard", logo: "https://seeklogo.com/images/M/mastercard-logo-473B8726A9-seeklogo.com.png" },
    { name: "Apple Pay", logo: "https://seeklogo.com/images/A/apple-pay-logo-3E3F3F3F3F-seeklogo.com.png" },
    { name: "Google Pay", logo: "https://seeklogo.com/images/G/google-pay-logo-3F3F3F3F3F-seeklogo.com.png" },
    { name: "Bitcoin", logo: "https://seeklogo.com/images/B/bitcoin-logo-5943C92D52-seeklogo.com.png" },
    { name: "Ethereum", logo: "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png" },
    { name: "Klarna", logo: "https://seeklogo.com/images/K/klarna-logo-6D8F39F9E3-seeklogo.com.png" },
    { name: "Afterpay", logo: "https://seeklogo.com/images/A/afterpay-logo-9A5A6B4F3E-seeklogo.com.png" },
  ];

  return (
    <section className="py-24 gradient text-stone-950">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest text-blue-600 font-bold">
            Tech Stack & Architecture
          </p>
          <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">
            Enterprise-Grade Architecture.
            <br />
            <span className="text-blue-600 italic">
              Built for Speed, Security & Scale.
            </span>
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-stone-800 text-lg">
            Performance-optimized infrastructure designed to solve common
            problems like slow websites, poor SEO rankings, and insecure
            payment systems.
          </p>
        </div>

        {/* CORE PILLARS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card p-8 rounded-2xl border border-stone-200">
            <Zap className="text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">
              Fast Website Performance
            </h3>
            <p className="text-stone-800 text-sm">
              Sub-second load speeds, CDN-powered images, optimized bundles,
              and mobile-first builds to improve Google rankings and
              conversion rates.
            </p>
          </div>

          <div className="card p-8 rounded-2xl border border-stone-200">
            <Shield className="text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">
              Secure Payment Architecture
            </h3>
            <p className="text-stone-800 text-sm">
              JWT authentication, httpOnly cookies, rate limiting,
              encryption, and hardened server headers protect your business
              and customer data.
            </p>
          </div>

          <div className="card p-8 rounded-2xl border border-stone-200">
            <Server className="text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">
              Scalable Backend Systems
            </h3>
            <p className="text-stone-800 text-sm">
              REST APIs, structured databases, and modular architecture
              designed for growth without system breakdown.
            </p>
          </div>
        </div>

        {/* GRADIENT DIVIDER */}
        <div className="h-[2px] w-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400 mb-16" />

        {/* PAYMENTS SECTION */}
        <div className="gradient p-12 rounded-3xl border-2 border-blue-500 shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-10">
            4Tek Supported Payment Integrations
          </h3>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={2}
            spaceBetween={30}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {[
              "paypal",
              "stripe",
              "visa",
              "mastercard",
              "applepay",
              "googlepay",
              "bitcoin",
              "ethereum",
              "klarna",
              "afterpay",
              "razorpay",
              "square",
              "wise",
              "payoneer",
              "americanexpress",
            ].map((brand, index) => (
              <SwiperSlide key={index}>
                <div className="card flex flex-col items-center gap-4 p-6 rounded-xl  hover:shadow-md transition">
                  <img
                    src={`https://cdn.simpleicons.org/${brand}`}
                    alt={brand}
                    className="h-12 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                  <span className="text-gradient2 font-semibold text-lg capitalize text-center">{brand.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="mt-2 inline-flex items-center gap-2 rounded-full border-2 border-blue-500 px-4 py-2 text-blue-500 font-semibold hover:bg-blue-50 transition"
                  >
                    Integrate
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>
    </section>
  );
}