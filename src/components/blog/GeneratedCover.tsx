import { business } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * Branded cover for a post with no image: navy gradient, peak lines and the category.
 * Decorative (the post title is always shown next to it), so it is hidden from screen readers.
 */
export function GeneratedCover({
  category,
  size = "card",
  className,
}: {
  category: string;
  size?: "card" | "hero";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "on-navy relative flex overflow-hidden bg-linear-to-br from-navy-raised via-navy to-navy",
        size === "hero" ? "aspect-[16/9] p-8 md:p-10" : "aspect-[16/9] p-5",
        className,
      )}
    >
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full text-gold">
        <path
          d="M-10 205 L90 110 L130 145 L185 70 L260 160 L290 132 L410 205"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.35"
        />
        <path
          d="M-10 225 L60 170 L110 195 L200 120 L280 190 L330 160 L410 225"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.18"
        />
        <path d="M150 215 Q215 165 300 170" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
      <div className="relative flex w-full flex-col justify-between">
        <span className={cn("eyebrow", size === "hero" && "text-sm")}>{category}</span>
        <span className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-muted-on-navy">
          <span className="h-px w-6 bg-gold" />
          {business.name}
        </span>
      </div>
    </div>
  );
}
