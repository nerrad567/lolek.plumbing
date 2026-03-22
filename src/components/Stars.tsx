import { Star } from "lucide-react";

export default function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-yellow text-yellow" />
      ))}
    </div>
  );
}
