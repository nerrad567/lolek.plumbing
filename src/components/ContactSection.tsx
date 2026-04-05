"use client";

import Image from "next/image";
import { Reveal } from "./AnimatedSection";
import { Phone, MapPin } from "lucide-react";
import { COMPANY, AREAS } from "@/lib/constants";
import ContactForm from "./ContactForm";
import { useLang } from "@/lib/LangContext";

export default function ContactSection() {
  const { dict: { contact: dict } } = useLang();
  return (
    <section
      id="contact"
      className="noise vignette relative min-h-dvh scroll-mt-4 flex items-center pb-24 md:pb-0 overflow-hidden"
    >
      <Image
        src="/images/backgrounds/bathroom.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-dark" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">
            {dict.title}
          </h2>
          <div className="w-12 h-0.5 bg-blue mb-6" />
          <p className="text-light/80 text-base max-w-xl mb-10">
            {dict.intro}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="space-y-3">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-4 bg-blue hover:bg-blue-dark text-light rounded-sm p-5 transition-colors border-2 border-blue"
              >
                <Phone size={22} />
                <div>
                  <p className="font-bold text-xs uppercase tracking-[0.2em]">{dict.calltext}</p>
                  <p className="text-light text-xl font-black tracking-wider">{COMPANY.phone}</p>
                </div>
              </a>

              <div className="card-solid-light p-4 flex items-center gap-4">
                <MapPin size={18} className="text-green shrink-0" />
                <p className="text-light/80 text-sm">{dict.based} &bull; {dict.location}</p>
              </div>

              <div className="card-solid-light p-4">
                <p className="font-bold text-xs uppercase tracking-[0.2em] text-light/75 mb-2">{dict.areasTitle}</p>
                <p className="text-sm text-light/80 leading-relaxed">
                  {AREAS.join(" \u00B7 ")}
                </p>
                <p className="text-xs text-light/55 mt-2">{dict.areasNote}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ContactForm dict={dict.form} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
