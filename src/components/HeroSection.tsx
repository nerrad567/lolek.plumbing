"use client";

import { Reveal } from "./AnimatedSection";
import { Phone, ChevronDown } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Feature {
  title: string;
  desc: string;
}

interface HeroSectionProps {
  dict: {
    tagline: string;
    subtitle: string;
    desc: string;
    descHighlight: string;
    ctaDiscover: string;
    ctaCall: string;
    scroll: string;
  };
  features: Feature[];
}

export default function HeroSection({ dict, features }: HeroSectionProps) {
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatureIndex((i) => (i + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);

  return (
    <section
      id="home"
      className="panel-bg grain relative min-h-dvh scroll-mt-4 flex items-center"
      style={{ backgroundImage: "url(/images/backgrounds/blue_bg_tap.jpg)" }}
    >
      <div className="absolute inset-0 overlay-blue" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <Reveal>
          <p className="text-muted uppercase tracking-[0.4em] text-xs font-medium mb-6">
            {dict.tagline}
          </p>

          <h1 className="leading-none mb-5">
            <span className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-blue uppercase">LOLEK</span>
            <span className="text-5xl md:text-7xl lg:text-8xl font-black text-red">.</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-light/75 drop-shadow-sm lowercase">plumbing</span>
          </h1>

          <p className="text-lg md:text-xl text-light font-medium mb-3 uppercase tracking-wider">
            {dict.subtitle}
          </p>

          <p className="text-base text-light/70 max-w-lg mb-4">
            {dict.desc}{" "}
            <span className="text-blue font-bold">{dict.descHighlight}</span>
          </p>

          <a
            href={COMPANY.phoneHref}
            className="inline-block text-3xl md:text-4xl font-black text-light mb-5 hover:text-blue transition-colors tracking-wider"
          >
            {COMPANY.phone}
          </a>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-light/70 mb-8">
            <span className="font-bold">Gas Safe</span>
            <span className="text-light/25">/</span>
            <span className="font-bold">55★ Reviews</span>
            <span className="text-light/25">/</span>
            <span className="font-bold">No Call-Out Fee</span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 bg-red hover:bg-red-dark text-light font-bold rounded-sm transition-colors text-sm uppercase tracking-[0.2em] border border-red"
            >
              {dict.ctaDiscover}
            </button>
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-2 px-7 py-3 bg-transparent border-2 border-light/20 hover:border-blue text-light font-bold rounded-sm transition-colors text-sm uppercase tracking-wider"
            >
              <Phone size={16} />
              {dict.ctaCall}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="max-w-md card-solid">
            <div className="relative h-20 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={featureIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-center px-5"
                >
                  <h3 className="font-bold text-blue text-sm uppercase tracking-wider">{features[featureIndex].title}</h3>
                  <p className="text-xs text-light/80 mt-1 leading-relaxed">{features[featureIndex].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex gap-2 px-5 pb-3">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFeatureIndex(i)}
                  className={`h-1 rounded-none transition-all ${
                    i === featureIndex ? "bg-blue w-6" : "bg-light/15 w-2"
                  }`}
                  aria-label={`Feature ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-light/20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
