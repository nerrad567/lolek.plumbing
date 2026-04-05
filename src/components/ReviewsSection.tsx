"use client";

import { Reveal, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ReviewCard from "./ReviewCard";
import type { Review } from "@/lib/reviews";
import { useLang } from "@/lib/LangContext";

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const { dict: { work: { reviewsTitle: title } } } = useLang();
  return (
    <section
      id="reviews"
      className="panel-bg noise vignette relative min-h-dvh scroll-mt-4 flex items-center"
      style={{ backgroundImage: "url(/images/backgrounds/yellow_bg_bathroom.jpg)" }}
    >
      <div className="absolute inset-0 overlay-yellow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight uppercase">
            {title}
          </h2>
          <div className="w-12 h-0.5 bg-yellow mb-10" />
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reviews.map((review, i) => (
            <StaggerItem key={i}>
              <ReviewCard review={review} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
