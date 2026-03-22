"use client";

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
      className="panel-bg noise vignette relative min-h-screen flex items-center"
      style={{ backgroundImage: "url(/images/backgrounds/bathroom.jpg)" }}
    >
      <div className="absolute inset-0 overlay-dark" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-10">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight">
            {dict.title}
          </h2>
          <div className="w-12 h-1 bg-blue mx-auto rounded-full mb-2" />
          <p className="text-center text-white/50 text-sm max-w-md mx-auto mb-8">
            {dict.intro}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="space-y-3">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-4 bg-blue hover:bg-blue-dark text-white rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue/20"
              >
                <Phone size={22} />
                <div>
                  <p className="font-bold">{dict.calltext}</p>
                  <p className="text-white/80 text-lg font-extrabold">{COMPANY.phone}</p>
                </div>
              </a>

              <div className="glass-strong rounded-xl p-4 flex items-center gap-4">
                <MapPin size={18} className="text-green shrink-0" />
                <p className="text-white/70 text-sm">{dict.based} &bull; {dict.location}</p>
              </div>

              <div className="glass-strong rounded-xl p-4">
                <p className="font-bold text-xs uppercase tracking-wider text-white/50 mb-2">{dict.areasTitle}</p>
                <p className="text-sm text-white/60 leading-relaxed">
                  {AREAS.join(" \u00B7 ")}
                </p>
                <p className="text-xs text-white/30 mt-2">{dict.areasNote}</p>
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
