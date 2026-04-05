import Stars from "./Stars";
import type { Review } from "@/lib/reviews";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <blockquote className="card-solid border-l-2 border-l-yellow p-4 h-full flex flex-col">
      <Stars />
      <p className="mt-2 text-light/70 flex-1 text-xs leading-relaxed">&ldquo;{review.text}&rdquo;</p>
      <footer className="mt-3 text-xs text-light/65">
        <strong className="text-light/90 font-bold">{review.name}</strong>
        <span className="mx-1.5 text-light/30">/</span>
        <span>{review.area}</span>
      </footer>
    </blockquote>
  );
}
