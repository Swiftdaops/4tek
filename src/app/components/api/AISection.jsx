"use client";

import { Brain, Bot, MessageSquare } from "lucide-react";

const aiApis = [
  {
    name: "OpenAI API",
    description:
      "Conversational AI, support automation, smart product recommendations.",
    hover:
      "Use if: You want a 24/7 digital sales assistant.",
    icon: Brain,
  },
  {
    name: "Dialogflow",
    description:
      "Conversational logic for advanced chatbot workflows.",
    hover:
      "Use if: You need structured AI decision trees.",
    icon: Bot,
  },
  {
    name: "Intercom",
    description:
      "AI-driven customer engagement platform.",
    hover:
      "Use if: You want live + AI hybrid support.",
    icon: MessageSquare,
  },
];

export default function AISection() {
  return (
    <section
      id="ai"
      className="py-24 px-6 gradient"
      aria-labelledby="ai-heading"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left Content */}
        <div>
          <h2
            id="ai-heading"
            className="text-4xl md:text-5xl font-bold text-stone-950 mb-6"
          >
            Intelligent Assistants That Sell for You.
          </h2>

          <p className="text-lg text-stone-700 max-w-xl">
            AI systems that guide users, answer questions, and convert visitors
            into customers 24/7.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          {aiApis.map((api, index) => {
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