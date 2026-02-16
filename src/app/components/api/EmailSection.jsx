"use client";

import { Mail, Send, Inbox, AtSign } from "lucide-react";

const emailApis = [
  {
    name: "SendGrid",
    description: "Transactional email automation.",
    icon: Send,
  },
  {
    name: "Mailgun",
    description: "Scalable email sending infrastructure.",
    icon: Mail,
  },
  {
    name: "HubSpot Email",
    description: "Automated marketing sequences.",
    icon: Inbox,
  },
  {
    name: "Postmark",
    description: "High deliverability transactional email.",
    icon: AtSign,
  },
];

export default function EmailSection() {
  return (
    <section
      id="email"
      className="py-24 px-6 gradient"
      aria-labelledby="email-heading"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <h2
            id="email-heading"
            className="text-4xl md:text-5xl font-bold text-stone-950 mb-6"
          >
            Automated Communication at Scale.
          </h2>

          <p className="text-lg text-stone-900 max-w-xl">
            Build intelligent communication workflows that deliver
            transactional emails, marketing sequences, and real-time customer
            notifications automatically.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          {emailApis.map((api, index) => {
            const Icon = api.icon;

            return (
              <div
                key={index}
                className="card p-8 text-white transition-all duration-300 hover:scale-[1.02]"
              >
                <Icon className="w-10 h-10 mb-6 text-blue-300" />

                <h3 className="text-xl font-semibold mb-3">
                  {api.name}
                </h3>

                <p className="text-sm opacity-90">
                  {api.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}