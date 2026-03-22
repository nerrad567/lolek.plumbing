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
      className="panel-bg noise vignette relative min-h-screen flex items-center"
      style={{ backgroundImage: "url(/images/backgrounds/yellow_bg_bathroom.jpg)" }}
    >
      <div className="absolute inset-0 overlay-yellow" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16 py-14">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-1 bg-yellow mx-auto rounded-full mb-8" />
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
