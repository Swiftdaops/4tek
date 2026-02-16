export default function SeaSection() {
  const logos = [
    "Stripe", "PayPal", "OpenAI", "HubSpot",
    "PostHog", "Algolia", "Coinbase",
    "Clerk", "Firebase", "Segment"
  ];

  return (
    <section className="py-24 gradient text-center px-6">
      <h2 className="text-4xl font-bold text-stone-950 mb-16">
        A Growing Ecosystem of Integrations
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 max-w-6xl mx-auto">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="card p-6 text-white hover:scale-105 transition"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}