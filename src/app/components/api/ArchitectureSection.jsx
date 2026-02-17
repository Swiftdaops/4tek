"use client";

import {
  User,
  ShoppingCart,
  CreditCard,
  Database,
  Mail,
  BarChart3,
  Cpu,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import React from "react";

const architectureFlow = [
  {
    title: "User",
    note: "Identity & session layer",
    apis: "Clerk · Auth0 · Firebase Auth",
    icon: User,
  },
  {
    title: "Checkout",
    note: "Cart & conversion layer",
    apis: "Stripe Link · PayPal SDK",
    icon: ShoppingCart,
  },
  {
    title: "Payment",
    note: "Transaction processing",
    apis: "Stripe · Apple Pay · Coinbase Commerce",
    icon: CreditCard,
  },
  {
    title: "CRM",
    note: "Customer data sync",
    apis: "HubSpot · Intercom",
    icon: Database,
  },
  {
    title: "Email",
    note: "Transactional & lifecycle messaging",
    apis: "SendGrid · Mailgun · Postmark",
    icon: Mail,
  },
  {
    title: "Analytics",
    note: "Behavior & revenue insights",
    apis: "Google Analytics · Mixpanel · Amplitude",
    icon: BarChart3,
  },
  {
    title: "Automation",
    note: "AI workflows & orchestration",
    apis: "OpenAI API · Zapier · Segment",
    icon: Cpu,
  },
];

export default function ArchitectureSection() {
  return (
    <section className="py-28 px-4 sm:px-6 md:px-6 gradient">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-950 mb-6">
          We Don’t Just Integrate APIs. We Architect Ecosystems.
        </h2>

        <p className="text-base md:text-lg text-stone-900 max-w-3xl mx-auto px-2">
          From identity to automation, every layer connects to form a seamless,
          revenue-generating digital infrastructure.
        </p>
      </div>

      {/* Flow */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          {architectureFlow.map((step, index) => {
            const Icon = step.icon;

            return (
              <React.Fragment key={index}>
                {/* Card */}
                <div className="card p-6 w-full sm:w-80 md:w-64 lg:w-56 text-white text-center transition-all duration-300 hover:scale-[1.03]">
                  <Icon className="w-8 h-8 mx-auto mb-4 text-blue-300" />

                  <h3 className="font-semibold text-lg md:text-xl mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs md:text-sm opacity-80 mb-3">
                    {step.note}
                  </p>

                  <p className="text-[11px] md:text-sm text-blue-200 leading-relaxed">
                    {step.apis}
                  </p>
                </div>

                {/* Arrows: show vertical chevron on mobile, horizontal arrow on lg+ */}
                {index !== architectureFlow.length - 1 && (
                  <>
                    <ChevronDown className="block lg:hidden w-6 h-6 text-stone-900 my-2" />
                    <ArrowRight className="hidden lg:block w-6 h-6 text-stone-900" />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}