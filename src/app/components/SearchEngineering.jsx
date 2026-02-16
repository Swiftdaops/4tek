"use client";

import { motion } from "framer-motion";
import { Search, Globe, Zap, BarChart3, Binary, ShieldCheck } from "lucide-react";

export default function SearchEngineering() {
  const cards = [
    {
      title: "Semantic Architecture",
      desc: "We structure your HTML and content so Google understands your business as an entity—not just a page. Semantic architecture ensures your brand is indexed correctly and appears in relevant searches.",
      icon: <Binary className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Core Web Vital Dominance",
      desc: "Google rewards sites that load fast and perform smoothly. We optimize LCP, CLS, and INP to guarantee your site hits the 'green zone' for performance, ranking you higher and keeping users engaged.",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Entity-Based Indexing",
      desc: "We build your brand as an 'entity' in Google’s Knowledge Graph. This positions you as the number-one suggested solution for your services in search results, including 'People Also Ask' and featured snippets.",
      icon: <Globe className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Programmatic Metadata",
      desc: "Every page dynamically generates meta-tags, OpenGraph data, and schema markup. Social sharing previews are perfect, and search engines know exactly what your pages are about—boosting visibility and click-throughs.",
      icon: <Search className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <section id="search-engineering" className="py-24 gradient text-stone-950">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Logic & Copy */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="flex items-center gap-2 text-blue-600 font-mono text-sm mb-4">
               <span className="w-8 h-[1px] bg-blue-600"></span>
               <span>SEARCH ENGINEERING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-[1.1]">
              If Google can't find you, <br />
              <span className="text-blue-600">you don't exist online.</span>
            </h2>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              Most websites fail before they even load because they are built for eyes, not algorithms. At 4Tek, we engineer <strong>Search-First Architecture</strong>—structuring your site so Google indexes every page correctly and prioritizes your brand for relevant searches.
            </p>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Proper SEO isn’t optional. Every competitor is already optimizing, and without technical SEO, your website won’t appear in search results. When we optimize your site, Google sees your brand as the definitive solution in your niche—driving organic traffic, leads, and conversions.
            </p>
            <div className="p-6 bg-stone-50 border-l-4 border-blue-600 rounded-r-2xl">
              <p className="text-stone-900 font-bold italic">
                "If Google suggests your brand as the number-one solution for what you do best, every searcher becomes a potential customer."
              </p>
            </div>
          </div>

          {/* Right Column: Cards & Metrics */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-stone-200 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:border-blue-200 transition-all group relative z-20"
              >
                <div className="mb-6 p-3 bg-stone-50 w-fit rounded-xl group-hover:bg-blue-50 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-sm text-stone-900 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}

            {/* Metrics Flex Card */}
            <div className="sm:col-span-2 card bg-stone-950/90 backdrop-blur-sm text-white p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative z-20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px]" />
               <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-2">Technical SEO Perfection</h4>
                  <p className="text-stone-800 text-sm">
                    Our builds consistently score 95+ on Google Lighthouse audits. Every page is crawlable, structured, and optimized to outrank your competitors.
                  </p>
               </div>
               <div className="flex gap-4 relative z-10">
                  {[
                    { label: "Performance", val: "100" },
                    { label: "SEO", val: "100" },
                    { label: "Accessibility", val: "100" }
                  ].map((m, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                       <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-400 font-black text-sm">
                          {m.val}
                       </div>
                       <span className="text-[10px] uppercase mt-2 font-bold tracking-widest text-stone-900">{m.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}