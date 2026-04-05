"use client";

import Image from "next/image";
import { Reveal, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { openLightbox } from "./Lightbox";
import { projects } from "@/lib/projects";
import { useLang } from "@/lib/LangContext";

export default function ProjectsSection() {
  const { dict: { work: dict } } = useLang();
  return (
    <section
      id="work"
      className="noise vignette relative min-h-dvh scroll-mt-4 flex items-center overflow-hidden"
    >
      <Image
        src="/images/backgrounds/yellow_bg_bathroom.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={75}
        className="object-cover"
      />
      <div className="absolute inset-0 overlay-yellow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">
            {dict.title}
          </h2>
          <div className="w-12 h-0.5 bg-yellow mb-10" />
        </Reveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {projects.slice(0, 8).map((project, i) => {
            const meta = (dict.projects as Record<string, { title: string; desc: string }>)[project.titleKey];
            return (
              <StaggerItem key={i}>
                <button
                  onClick={() => openLightbox(project.image, meta?.title || "")}
                  className="group relative aspect-square rounded-xl overflow-hidden w-full"
                >
                  <Image
                    src={project.image}
                    alt={meta?.title || "Project"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 photo-treatment"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-sm font-bold">{meta?.title}</p>
                      <p className="text-xs text-white/60">{meta?.desc}</p>
                    </div>
                  </div>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
