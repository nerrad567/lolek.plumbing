"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./AnimatedSection";
import { useLang } from "@/lib/LangContext";
import { serializeJsonLd } from "@/lib/json-ld";

export default function FaqSection() {
  const { dict } = useLang();
  const items = dict.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqJsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });

  return (
    <section
      id="faq"
      className="noise relative min-h-dvh scroll-mt-4 flex items-center bg-dark"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">
            {dict.faq.title}
          </h2>
          <div className="w-12 h-0.5 bg-blue mb-4" />
          <p className="text-blue font-semibold text-sm uppercase tracking-[0.2em] mb-10">
            {dict.faq.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-3 max-w-3xl">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="card-solid border-l-2 border-l-blue overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left p-5 hover:bg-light/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm md:text-base text-light uppercase tracking-wider pr-4">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-blue transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-light/80 text-sm md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
