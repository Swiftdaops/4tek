"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ConsultationModal from "@/app/components/ConsultationModal";

function Logo({ src, name, color }) {
  const isSeeklogo = typeof src === "string" && src.includes("seeklogo.com");

  if (!src || isSeeklogo) {
    const initials = (name || "?")
      .split(/\s+/)
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        aria-hidden
        className="flex items-center justify-center rounded-full"
        style={{
          width: 48,
          height: 48,
          background: color || "#e5e7eb",
          color: "white",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <motion.img src={src} alt={name} className="h-12 object-contain" draggable={false} />
  );
}

const paymentCards = [
  {
    title: "Credit & Debit Cards",
    desc: "Universally trusted; instant payment confirmation; broad audience coverage.",
    apis: [
      { name: "Visa", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg", color: "#1A1F71" },
      { name: "Mastercard", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg", color: "#EB001B" },
      { name: "AmEx", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/americanexpress.svg", color: "#2E77BC" },
    ],
  },
  {
    title: "Mobile Money / Local Wallets",
    desc: "Local customers can pay easily; popular in Africa & emerging markets.",
    apis: [
      { name: "Paystack", url: "https://seeklogo.com/images/P/paystack-logo-899B5B8BA4-seeklogo.com.png", color: "#00B14F" },
      { name: "Flutterwave", url: "https://seeklogo.com/images/F/flutterwave-logo-5E4F7A2F7A-seeklogo.com.png", color: "#0070CE" },
      { name: "MTN Mobile Money", url: "https://seeklogo.com/images/M/mtn-mobile-money-logo-39C8506F5B-seeklogo.com.png", color: "#FFD700" },
      { name: "Airtel Money", url: "https://seeklogo.com/images/A/airtel-logo-FF0000D5E1-seeklogo.com.png", color: "#FF0000" },
    ],
  },
  {
    title: "Bank Transfers / Direct Debit",
    desc: "Lower fees; suitable for high-value transactions or B2B payments.",
    apis: [
      { name: "Stripe ACH", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg", color: "#008CDD" },
      { name: "Paystack Bank Transfers", url: "https://seeklogo.com/images/P/paystack-logo-899B5B8BA4-seeklogo.com.png", color: "#00B14F" },
    ],
  },
  {
    title: "Recurring Payments / Subscriptions",
    desc: "Automate subscription billing; reduce churn and payment errors.",
    apis: [
      { name: "Stripe", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg", color: "#008CDD" },
      { name: "Paystack", url: "https://seeklogo.com/images/P/paystack-logo-899B5B8BA4-seeklogo.com.png", color: "#00B14F" },
      { name: "Chargebee", url: "https://seeklogo.com/images/C/chargebee-logo-9A8F36BC7B-seeklogo.com.png", color: "#FF6600" },
    ],
  },
  {
    title: "Digital Wallets",
    desc: "Faster checkout on mobile; trusted by tech-savvy users.",
    apis: [
      { name: "Apple Pay", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg", color: "#000000" },
      { name: "Google Pay", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlepay.svg", color: "#5F6368" },
      { name: "Samsung Pay", url: "https://seeklogo.com/images/S/samsung-pay-logo-EC3D3B55A1-seeklogo.com.png", color: "#1428A0" },
    ],
  },
  {
    title: "Buy Now, Pay Later (BNPL)",
    desc: "Increase average order value; flexible payments improve conversions.",
    apis: [
      { name: "Klarna", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/klarna.svg", color: "#FFB3C1" },
      { name: "Afterpay", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/afterpay.svg", color: "#000000" },
      { name: "PayPal Pay Later", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg", color: "#003087" },
    ],
  },
  {
    title: "Cryptocurrency Payments",
    desc: "Tap into crypto users; secure and low friction for international payments.",
    apis: [
      { name: "Coinbase Commerce", url: "https://seeklogo.com/images/C/coinbase-logo-7C7147F0C1-seeklogo.com.png", color: "#0052FF" },
      { name: "BitPay", url: "https://seeklogo.com/images/B/bitpay-logo-39CC0BDEAD-seeklogo.com.png", color: "#F7931A" },
      { name: "Binance Pay", url: "https://seeklogo.com/images/B/binance-logo-1A7F2C246B-seeklogo.com.png", color: "#F3BA2F" },
    ],
  },
  {
    title: "POS & QR Payments",
    desc: "In-store payments synced with online system; seamless omnichannel integration.",
    apis: [
      { name: "Square", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/square.svg", color: "#28A745" },
      { name: "Paystack QR", url: "https://seeklogo.com/images/P/paystack-logo-899B5B8BA4-seeklogo.com.png", color: "#00B14F" },
      { name: "Flutterwave QR", url: "https://seeklogo.com/images/F/flutterwave-logo-5E4F7A2F7A-seeklogo.com.png", color: "#0070CE" },
    ],
  },
  {
    title: "One-Click Checkout APIs",
    desc: "Reduce friction for returning customers; faster purchase flow.",
    apis: [
      { name: "Stripe", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg", color: "#008CDD" },
      { name: "PayPal", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg", color: "#003087" },
      { name: "Braintree", url: "https://seeklogo.com/images/B/braintree-logo-8F6E6D89F3-seeklogo.com.png", color: "#5F6368" },
    ],
  },
  {
    title: "Fraud & Risk Management APIs",
    desc: "Protect revenue; reduce chargebacks and failed payments.",
    apis: [
      { name: "Sift", url: "https://seeklogo.com/images/S/sift-logo-4D7D1A7F7A-seeklogo.com.png", color: "#FF0000" },
      { name: "Stripe Radar", url: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg", color: "#008CDD" },
      { name: "Kount", url: "https://seeklogo.com/images/K/kount-logo-5C3D2F2D3E-seeklogo.com.png", color: "#FF6600" },
    ],
  },
];

// Icon rotation interval
const ICON_DELAY = 5; // seconds

export default function PaymentSystems() {
  const [activeIndex, setActiveIndex] = useState(
    paymentCards.map(() => 0)
  );
  const [focused, setFocused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev.map((val, i) => (val + 1) % paymentCards[i].apis.length)
      );
    }, ICON_DELAY * 1000);

    return () => clearInterval(interval);
  }, []);

  // Smooth-scroll + transient fade highlight when navigated to via hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHash = () => {
      if (window.location.hash === "#payment-systems") {
        const el = document.getElementById("payment-systems");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          setFocused(true);
          // remove focus after animation duration
          window.clearTimeout(window.__paymentSystemsFocusTimeout);
          window.__paymentSystemsFocusTimeout = window.setTimeout(() => {
            setFocused(false);
          }, 2200);
        }
      }
    };

    // run on mount in case user navigated directly
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
      window.clearTimeout(window.__paymentSystemsFocusTimeout);
    };
  }, []);

  return (
    <section id="payment-systems" className="py-24 gradient text-white relative">
      {/* transient overlay used for focus highlight */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={focused ? { opacity: 0.12 } : { opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 bg-white pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-7xl relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
          Financial Systems — Payments
        </h2>
        <p className="text-center text-lg md:text-xl max-w-3xl mx-auto mb-12">
          Multi-layered payment integration for global and local markets—secure, compliant, and optimized to boost conversions.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentCards.map((card, i) => (
            <div key={i} className="card p-6 relative overflow-hidden flex flex-col items-start gap-4">
              <div className="mb-0 w-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={card.apis[activeIndex[i]].name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    {/**
                     * Avoid loading blocked external images (e.g. seeklogo.com)
                     * If the URL appears to be blocked, render a styled initials badge instead.
                     */}
                    <Logo
                      src={card.apis[activeIndex[i]].url}
                      name={card.apis[activeIndex[i]].name}
                      color={card.apis[activeIndex[i]].color}
                    />
                    <motion.span className="text-sm font-semibold text-stone-700">
                      {card.apis[activeIndex[i]].name}
                    </motion.span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <h3 className="text-xl font-bold mb-0">{card.title}</h3>
              <p className="text-sm">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto text-center mt-12">
          <button onClick={() => setModalOpen(true)} className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition">
            Start a Project
          </button>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </section>
  );
}