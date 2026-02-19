import Link from "next/link";

export default function GetStartedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl lg:text-5xl font-black mb-4 text-stone-950">Get Started</h1>

        <p className="mb-6 text-lg text-stone-800">
          We design and deliver autonomous sales systems for brands that want reliable,
          software-grade revenue. Choose how you'd like to begin and we'll guide the next steps.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded bg-blue-600 text-white font-bold shadow hover:scale-[1.02]"
          >
            Request Consultation
          </Link>

          <Link
            href="/solutions"
            className="inline-block px-6 py-3 rounded border border-stone-200 bg-white/60 font-bold text-stone-900"
          >
            Explore Solutions
          </Link>
        </div>

        <section className="mt-10 text-left bg-white/60 p-6 rounded shadow">
          <h2 className="font-bold mb-3 text-stone-900">What to expect</h2>
          <ol className="list-decimal list-inside space-y-2 text-stone-800">
            <li>Intro call to understand your goals and constraints</li>
            <li>Technical audit and opportunity sizing</li>
            <li>Tailored proposal with timeline and pricing</li>
          </ol>
        </section>
      </div>
    </main>
  );
}
