export default function DiagnosisSection() {
  const items = [
    "High cart abandonment → Payments optimization",
    "Manual order processing → Automation",
    "Poor engagement → AI assistant",
    "Low retention → Email automation",
  ];

  return (
    <section className="py-24 gradient text-center px-6">
      <h2 className="text-4xl font-bold text-stone-950 mb-16">
        Identify Your Bottleneck.
      </h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="card p-8 text-white">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}