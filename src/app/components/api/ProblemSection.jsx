export default function ProblemSection() {
  return (
    <section className="py-24 px-6 gradient text-center">
      <h2 className="text-4xl font-bold text-stone-950 mb-16">
        Your Business Is Only as Strong as Its Systems.
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <div className="card p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">Manual Operations</h3>
          <p>
            Manual workflows slow growth, create errors, and increase staffing
            costs.
          </p>
        </div>

        <div className="card p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">Payment Friction</h3>
          <p>
            Checkout friction kills conversions and damages trust.
          </p>
        </div>

        <div className="card p-8 text-white">
          <h3 className="text-xl font-semibold mb-4">
            Blind Decision Making
          </h3>
          <p>
            Without behavioral intelligence, growth becomes guesswork.
          </p>
        </div>
      </div>

      <p className="mt-16 text-lg text-stone-700">
        The right API architecture eliminates these bottlenecks.
      </p>
    </section>
  );
}