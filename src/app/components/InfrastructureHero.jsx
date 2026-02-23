import React from "react";

export default function InfrastructureHero() {
  return (
    <div>
      <h2 className="text-4xl md:text-5xl font-bold text-center text-stone-950 mt-12 mb-12">
        <span className="text-gradient">4Tek</span> Software Infrastructure
      </h2>
      <p
        className="text-lg md:text-xl text-center max-w-3xl mx-auto mb-12"
        style={{
          color: "#374151", // text-gray-700
          fontSize: "1.125rem",
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "48rem",
          marginBottom: "3rem",
        }}
      >
        Your business is not generic. Your software shouldn&apos;t be either. We architect custom systems that reflect how your operations actually work — from internal workflows to customer-facing platforms. No bloated templates. No patchwork plugins. Just clean, scalable architecture designed around your logic. Built to scale from 100 users to 100,000 without breaking.
      </p>
    </div>
  );
}
