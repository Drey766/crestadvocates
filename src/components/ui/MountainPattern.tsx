import { cn } from "@/lib/utils";

/**
 * Faint repeating peak lines derived from the logo's mountain, for navy sections.
 * Place inside a `relative` parent; it fills it and ignores pointer events.
 */
export function MountainPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-gold opacity-[0.07]", className)}
    >
      <defs>
        <pattern id="crest-peaks" width="160" height="96" patternUnits="userSpaceOnUse">
          <path
            d="M0 80 L44 30 L60 46 L80 16 L112 58 L124 46 L160 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M70 92 Q96 70 132 72" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#crest-peaks)" />
    </svg>
  );
}
