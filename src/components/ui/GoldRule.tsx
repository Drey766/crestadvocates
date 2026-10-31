import { cn } from "@/lib/utils";

/** Thin gold line with a small centred diamond, taken from the logo. Decorative. */
export function GoldRule({ className }: { className?: string }) {
  return (
    <div className={cn("gold-rule", className)} aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
        <rect x="5" y="0.75" width="6" height="6" transform="rotate(45 5 0.75)" fill="currentColor" />
      </svg>
    </div>
  );
}
