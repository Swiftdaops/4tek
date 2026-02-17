"use client";

import {
  BarChart3,
  Activity,
  LineChart,
  Database,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

const analyticsTools = [
  {
    name: "Google Analytics",
    description:
      "Event tracking, user journeys, conversion funnels, and traffic attribution.",
    icon: BarChart3,
  },
  {
    name: "Mixpanel",
    description:
      "Advanced product analytics with cohort tracking and retention insights.",
    icon: LineChart,
  },
  {
    name: "Segment",
    description:
      "Customer data platform for event routing and analytics pipeline control.",
    icon: Database,
  },
  {
    name: "Amplitude",
    description:
      "Behavioral analytics designed to optimize product growth and engagement.",
    icon: Activity,
  },
];

export default function AnalyticsSection() {
  return (
    <section
      id="analytics"
      className="py-28 px-6 gradient"
      aria-labelledby="analytics-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2
            id="analytics-heading"
            className="text-4xl md:text-5xl font-bold text-stone-950"
          >
            Measure Everything. Optimize Anything.
          </h2>

          <p className="mt-6 text-lg text-stone-700">
            Data pipelines, behavioral tracking, and real-time analytics
            infrastructure that turn raw events into revenue-driving insights.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {analyticsTools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <div
                key={index}
                className="group card p-8 text-white transition-all duration-300 hover:scale-[1.02]"
              >
                <Icon className="w-10 h-10 mb-6 text-blue-300" />

                <h3 className="text-xl font-semibold mb-3">
                  {tool.name}
                </h3>

                <p className="text-sm opacity-90 leading-relaxed">
                  {tool.description}
                </p>

                {/* Subtle arrow reveal */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center text-xs text-blue-200">
                  Explore Integration
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}