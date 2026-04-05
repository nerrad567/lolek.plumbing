"use client";

import Image from "next/image";
import { Reveal } from "./AnimatedSection";
import { Shield, FileCheck, PhoneOff, Quote, Award, Clock } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const badges = [
  { key: "gassafe", icon: Shield },
  { key: "insured", icon: FileCheck },
  { key: "nocallout", icon: PhoneOff },
  { key: "freequotes", icon: Quote },
  { key: "guaranteed", icon: Award },
  { key: "flexible", icon: Clock },
] as const;

export default function AboutSection() {
  const { dict: { about: dict } } = useLang();
  return (
    <section
      id="about"
      className="grain relative min-h-dvh scroll-mt-4 flex items-center overflow-hidden"
    >
      <Image
        src="/images/backgrounds/red_bg_bathroom.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-red" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">{dict.title}</h2>
              <div className="w-12 h-0.5 bg-red mb-4" />
              <p className="text-blue font-semibold text-sm uppercase tracking-[0.2em] mb-8">{dict.subtitle}</p>
              <p className="text-light/90 mb-4 leading-relaxed">{dict.desc1}</p>
              <p className="text-light/80 mb-8 leading-relaxed">{dict.desc2}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8">
                {badges.map(({ key, icon: Icon }) => (
                  <div
                    key={key}
                    className="card-solid-light flex items-center gap-2 text-xs text-light/70 px-3 py-2"
                  >
                    <Icon size={14} className="text-blue shrink-0" />
                    <span>{dict[key]}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="flex gap-10 mb-8">
                <div>
                  <span className="text-4xl font-black text-blue">50+</span>
                  <p className="text-xs text-light/70 mt-1 uppercase tracking-wider font-bold">{dict.statsReviews}</p>
                </div>
                <div>
                  <span className="text-4xl font-black text-green">£0</span>
                  <p className="text-xs text-light/70 mt-1 uppercase tracking-wider font-bold">{dict.statsCallout}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="px-7 py-3 bg-blue hover:bg-blue-dark text-light font-bold rounded-sm transition-colors text-sm uppercase tracking-[0.2em] border border-blue"
              >
                {dict.cta}
              </button>
            </Reveal>
          </div>

          <Reveal delay={0.2} scale={0.9}>
            <div className="relative hidden md:block">
              <Image
                src="/images/ui/redsplash.jpg"
                alt="Plumbing work"
                width={500}
                height={600}
                className="rounded-sm shadow-2xl shadow-black/50 object-cover photo-treatment border-2 border-light/5"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
