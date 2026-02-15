"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationModal from "../components/ConsultationModal";

const businessTypes = {
  retail: {
    title: "Retail & Product Businesses",
    description:
      "Turn your products into a 24/7 online store that sells even while you sleep.",
    features: [
      "Show every product you sell in a clean, organized catalog",
      "Let customers add to cart and checkout without messaging you",
      "Accept secure payments instantly (Paystack / Flutterwave)",
      "Run discount codes and flash sales anytime you want",
      "Track every sale from one simple dashboard",
      "Manage your stock without guessing what's available",
      "Recover customers who abandoned their cart",
      "Build customer accounts that encourage repeat purchases",
    ],
  },

  consultant: {
    title: "Consultants & Service Providers",
    description:
      "Stop chasing clients in DMs. Let your expertise sell itself online.",
    features: [
      "Break down your services clearly so clients understand your value",
      "Allow clients to book appointments directly on your calendar",
      "Collect payments before consultations to avoid no-shows",
      "Automatically capture serious leads, not time-wasters",
      "Send instant booking confirmations and reminders",
      "Store client information securely in one place",
      "Track inquiries and follow up professionally",
      "Position yourself as an authority with a premium online presence",
    ],
  },

  logistics: {
    title: "Dispatch & Logistics Companies",
    description:
      "Let customers request deliveries without endless phone calls.",
    features: [
      "Allow customers to book deliveries online in seconds",
      "Collect delivery details with structured request forms",
      "Automatically confirm orders without manual texting",
      "Integrate tracking so customers can follow their package",
      "Store customer delivery history and contact information",
      "Manage all requests from one admin dashboard",
      "Show clear pricing so customers know what to expect",
      "Reduce operational confusion and manual errors",
    ],
  },

  restaurant: {
    title: "Restaurants & Food Vendors",
    description:
      "Let customers browse your menu and order without calling you.",
    features: [
      "Display your full menu with prices and images",
      "Accept food orders directly from your website",
      "Allow customers to reserve tables online",
      "Run promo codes and limited-time specials",
      "Highlight featured dishes to increase average order value",
      "Track repeat customers automatically",
      "Accept secure online payments",
      "Send instant order confirmations to customers",
    ],
  },

  tattooShop: {
    title: "Tattoo Shops & Studios",
    description:
      "Show your art professionally and book serious clients only.",
    features: [
      "Display artist portfolios in high-quality galleries",
      "Let clients book tattoo sessions online",
      "Collect deposits before confirming appointments",
      "Accept custom design requests through structured forms",
      "Share aftercare instructions professionally",
      "Filter tattoos by style (blackwork, realism, etc.)",
      "Automatically confirm bookings",
      "Collect digital consent forms before sessions",
    ],
  },

  tattooArtist: {
    title: "Independent Tattoo Artists",
    description:
      "Build your personal brand and attract high-value clients.",
    features: [
      "Showcase your tattoo work in a premium online portfolio",
      "Allow clients to book directly from your calendar",
      "Collect deposits before appointments",
      "Screen serious clients with consultation forms",
      "Connect your Instagram seamlessly",
      "Capture client details for repeat bookings",
      "Automate confirmations and reminders",
      "Position yourself as a professional, not just an Instagram page",
    ],
  },

  authors: {
    title: "Authors & Writers",
    description:
      "Own your audience instead of depending on third-party platforms.",
    features: [
      "Sell your books directly from your website",
      "Allow readers to pre-order upcoming releases",
      "Build an email list of loyal readers",
      "Show your author bio and media press kit",
      "List book tours and signing events",
      "Deliver digital downloads automatically",
      "Track reader purchases and engagement",
      "Create a professional brand beyond social media",
    ],
  },

  bookstore: {
    title: "Bookstores & Online Bookshops",
    description:
      "Turn your physical inventory into an online bookstore.",
    features: [
      "Display books by genre, author, and category",
      "Allow customers to search and filter easily",
      "Accept online payments securely",
      "Track inventory automatically",
      "Run seasonal promotions and coupon codes",
      "Highlight bestsellers and staff picks",
      "Let customers create accounts and reorder",
      "Reach readers beyond your physical location",
    ],
  },

  barbershop: {
    title: "Barbing Salons",
    description:
      "Stop overcrowding. Let clients book their haircut online.",
    features: [
      "Allow clients to book haircut appointments online",
      "Show pricing for different haircut styles",
      "Send automatic appointment reminders",
      "Collect deposits for premium services",
      "Show barber portfolios and specialties",
      "Track repeat customers",
      "Promote seasonal discounts",
      "Reduce long waiting times and walk-in confusion",
    ],
  },

  hairsalon: {
    title: "Hair Salons & Stylists",
    description:
      "Make it easy for clients to book, browse styles, and pay.",
    features: [
      "Show hairstyle galleries and transformation photos",
      "Accept online booking ",
      "Accept deposits before appointments",
      "Display service pricing clearly",
      "Collect hair consultation details beforehand",
      "Send automated reminders",
      "Run promo campaigns for holidays",
      "Track loyal customers and repeat visits",
    ],
  },
  unique: {
  title: "My Business Is Unique",
  description:
    "Every business solves a different problem. Your process, your customers, and the way you deliver value is unique — and your website should reflect that.",
  features: [
    "We study how your business operates before building anything",
    "We design systems around your specific customer journey",
    "We automate how your clients book, order, or request your services",
    "We structure your offers clearly so customers understand your value",
    "We build payment and data systems tailored to your workflow",
    "We help you turn your unique process into a digital sales system",
    "We eliminate manual steps that slow your business down",
    "We create a platform that grows with your business over time",
  ],
  cta: {
    text: "Let’s Talk",
    action: "contact",
  },
},
};



export default function WhoThisIsForPage() {
  const [selected, setSelected] = useState("retail");
  const [isOpen, setIsOpen] = useState(false);

  const current = businessTypes[selected];

  return (
    <section className="min-h-screen py-28 gradient text-white">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Who 4Tek Is Built For
          </h1>
          <p className="text-lg  max-w-3xl mx-auto">
            Not every business operates the same way. 
            That’s why we design your online system around your business.
          </p>
        </div>

        {/* Filter Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {Object.keys(businessTypes).map((key) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`px-6 py-3 rounded-full border transition ${
                selected === key
                  ? "bg-[#603813] text-white border-[#603813]"
                  : "border-stone-300 text-white card"
              }`}
            >
              {businessTypes[key].title.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Dynamic Feature Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="gradient rounded-3xl p-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-4">
              {current.title}
            </h2>

            <div className="card bg-white/5 p-6 rounded-xl mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-white mb-4 md:mb-0 md:max-w-3xl">
                {current.description}
              </p>

              <div className="mt-4 md:mt-0">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-block bg-white text-[#603813] font-semibold py-2 px-5 rounded-full hover:opacity-95 transition"
                >
                  Get Quota
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {current.features.map((feature, index) => (
                <div
                  key={index}
                  className=" rounded-xl p-5 shadow-md"
                >
                  <p className="font-medium text-white">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Closing Statement */}
        <div className="text-center mt-20">
          <p className="text-xl font-semibold">
            Every business has a system.
          </p>
          <p className="text-2xl font-bold mt-2">
            We build yours digitally.
          </p>
        </div>

      </div>
      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
