import React from "react";
import InfrastructureHero from "./InfrastructureHero";
import InfrastructureGridClient from "./InfrastructureGridClient";

export default function InfrastructureSection() {
  return (
    <section className="py-20 gradient">
      <div className="max-w-7xl mx-auto px-6">
        <InfrastructureHero />
        <InfrastructureGridClient />
      </div>
    </section>
  );
}
