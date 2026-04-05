"use client";

import { Reveal, StaggerContainer } from "./AnimatedSection";
import ServiceCard from "./ServiceCard";
import { useLang } from "@/lib/LangContext";

const serviceKeys = ["boilers", "bathrooms", "heating", "smart", "plumbing", "landlord"] as const;

export default function ServicesSection() {
  const { dict: fullDict } = useLang();
  const services = fullDict.services;
  return (
    <section
      id="services"
      className="panel-bg grain relative min-h-dvh scroll-mt-4 flex items-center"
      style={{ backgroundImage: "url(/images/backgrounds/green_bg_pipes.jpg)" }}
    >
      <div className="absolute inset-0 overlay-green" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-20 py-20">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tight uppercase">
            {services.title}
          </h2>
          <div className="w-12 h-0.5 bg-green mb-12" />
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {serviceKeys.map((key) => {
            const service = services[key];
            return (
              <ServiceCard
                key={key}
                serviceKey={key}
                title={service.title}
                desc={service.desc}
              />
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
