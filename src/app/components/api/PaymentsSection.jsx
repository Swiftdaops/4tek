"use client";

import {
  CreditCard,
  Zap,
  Shield,
  Smartphone,
  Wallet,
  Bitcoin,
} from "lucide-react";

const paymentApis = [
  {
    name: "Stripe",
    description:
      "Global card payments, subscriptions, and marketplace infrastructure.",
    hover:
      "Use if: You need scalable global payment architecture.",
    icon: CreditCard,
  },
  {
    name: "Stripe Link",
    description:
      "One-click checkout across millions of sites.",
    hover:
      "Use if: Cart abandonment is above 60%.",
    icon: Zap,
  },
  {
    name: "PayPal",
    description:
      "Trusted consumer payment method worldwide.",
    hover:
      "Use if: You want increased checkout confidence.",
    icon: Shield,
  },
  {
    name: "Apple Pay",
    description:
      "Biometric mobile checkout.",
    hover:
      "Use if: More than 50% of traffic is mobile.",
    icon: Smartphone,
  },
  {
    name: "Google Pay",
    description:
      "Fast Android checkout integration.",
    hover:
      "Use if: You want frictionless Android payments.",
    icon: Wallet,
  },
  {
    name: "Coinbase Commerce",
    description:
      "Accept crypto payments with instant fiat conversion.",
    hover:
      "Use if: You sell globally or want lower transaction fees.",
    icon: Bitcoin,
  },
];

export default function PaymentsSection() {
  return (
    <section
      id="payments"
      className="py-28 px-6 gradient"
      aria-labelledby="payments-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2
            id="payments-heading"
            className="text-4xl md:text-5xl font-bold text-stone-950 mb-6"
          >
            Remove Checkout Friction. Increase Revenue.
          </h2>

          <p className="text-lg text-stone-900">
            Secure, global payment infrastructure designed to maximize
            conversion and trust.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paymentApis.map((api, index) => {
            const Icon = api.icon;

            return (
              <div
                key={index}
                className="card p-8 text-white transition-all duration-300 hover:scale-[1.02] group"
              >
                <Icon className="w-10 h-10 mb-6 text-blue-300" />

                <h3 className="text-xl font-semibold mb-3">
                  {api.name}
                </h3>

                <p className="text-sm opacity-90">
                  {api.description}
                </p>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition duration-300 text-xs text-blue-200">
                  {api.hover}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}