"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import ConsultationModal from "./ConsultationModal.js";
import AboutOfferSection from "./AboutOfferSection.jsx";
import SectionDivider from "./SectionDivider";
import CTASection from "./api/CTASection.jsx";

const sectionVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutPageSections() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.section className="pt-16 pb-24 gradient text-white" initial="hidden" animate="visible" variants={sectionVariant} transition={{ duration: 0.6 }}>
        <div className="container mx-auto px-6 max-w-4xl text-center">

          <h2 className="text-4xl font-bold mt-10 mb-6 text-white">
            Traditional Websites Were Built To Exist.
            <br />
            Not To Sell.
          </h2>

          <p className="text-lg text-white leading-relaxed">
            Most websites are digital brochures.
            They look nice, but they don't automate sales.
            They don't capture abandoned orders.
            They don't guide customers through checkout.
            And they don't integrate with payment systems properly.
          </p>

          <p className="mt-6 text-lg text-white">
            In a world where attention is short and competition is high,
            your business needs more than a website.
            It needs a revenue engine.
          </p>

        </div>
      </motion.section>

      <SectionDivider className="-mt-1" colorFrom="#603813" colorTo="#b29f94" />

      <motion.section id="problem" className="py-24 gradient text-white" initial="hidden" animate="visible" variants={sectionVariant} transition={{ duration: 0.7, delay: 0.05 }}>
        <div className="container mx-auto px-6 max-w-5xl text-white text-center">

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            The World Is Buying Online.
            <br />
            But Most Businesses Are Not Built For It.
          </h2>

          <p className="text-lg text-white leading-relaxed max-w-3xl mx-auto">
            By 2026, over 80% of product discovery and purchases happen online.
            Yet thousands of brands still rely on manual chats, scattered catalogs,
            outdated websites, or Instagram DMs to manage their sales.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">

            <motion.div whileHover={{ y: -4 }} className="rounded" >
              <h3 className="font-semibold text-xl mb-2 text-white flex items-center justify-start">
                <XCircle className="w-6 h-6 mr-3 text-white" />
                Manual Orders
              </h3>
              <p className="text-white">
                Businesses reply to every inquiry manually. 
                Late replies mean lost customers. 
                No system means no scalability.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="rounded" >
              <h3 className="font-semibold text-xl mb-2 text-white flex items-center justify-start">
                <XCircle className="w-6 h-6 mr-3 text-white" />
                Poor Product Cataloging
              </h3>
              <p className="text-white">
                Products are posted randomly on social media.
                Customers struggle to browse, compare, or checkout easily.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="rounded" >
              <h3 className="font-semibold text-xl mb-2 text-white flex items-center justify-start">
                <XCircle className="w-6 h-6 mr-3 text-white" />
                Outdated Websites
              </h3>
              <p className="text-white">
                Slow pages. No automation. No integrated payments.
                No tracking. No growth system.
              </p>
            </motion.div>
    
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-block bg-white text-[#603813] font-semibold py-3 px-6 rounded-full hover:opacity-95 transition"
            >
              Get Quota
            </button>
          </div>

        </div>
      </motion.section>

      <SectionDivider invert className="-mt-1" colorFrom="#b29f94" colorTo="#ffffff" />

      <ConsultationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <SectionDivider className="-mt-1" colorFrom="#ffffff" colorTo="#603813" />

      <AboutOfferSection />
      <CTASection/>
    </>
  );
}
