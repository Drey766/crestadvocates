import Image from "next/image";
import { business } from "@/config/business";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

/**
 * Cover for an Insights post: its photo under a navy tint, or a branded card of peak lines
 * when it has no photo. Decorative (the post title is always shown next to it), so it is
 * hidden from screen readers. Set showLabel={false} where the category is already on the page.
 */
export function PostCover({
  post,
  size = "card",
  showLabel = true,
  priority,
  className,
}: {
  post: Pick<BlogPost, "category" | "cover">;
  size?: "card" | "hero";
  showLabel?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "on-navy relative flex aspect-[16/9] overflow-hidden bg-linear-to-br from-navy-raised via-navy to-navy",
        size === "hero" ? "p-8 md:p-10" : "p-5",
        className,
      )}
    >
      {post.cover ? (
        <>
          <Image
            src={post.cover}
            alt=""
            fill
            sizes={size === "hero" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"}
            priority={priority}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/15" />
        </>
      ) : (
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
      )}
      <div className="relative flex w-full flex-col justify-between">
        {showLabel && (
          // On a solid chip over a photo: gold text on a bright image would be unreadable
          <span className={cn("eyebrow", size === "hero" && "text-sm", post.cover && "self-start bg-navy px-3 py-1.5")}>
            {post.category}
          </span>
        )}
        {!post.cover && (
          <span className="flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-muted-on-navy">
            <span className="h-px w-6 bg-gold" />
            {business.name}
          </span>
        )}
      </div>
    </div>
  );
}
