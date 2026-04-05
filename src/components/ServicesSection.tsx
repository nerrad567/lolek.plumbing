"use client";

import Image from "next/image";
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
      className="grain relative min-h-dvh scroll-mt-4 flex items-center overflow-hidden"
    >
      <Image
        src="/images/backgrounds/green_bg_pipes.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-green" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">
            {services.title}
          </h2>
          <div className="w-12 h-0.5 bg-green mb-10" />
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
