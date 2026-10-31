import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accordion of questions on a light background. Native <details>, so it works without JavaScript. */
export function FaqList({ items, className }: { items: readonly { q: string; a: string }[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <div className={cn("divide-y divide-navy/10 border-y border-navy/10", className)}>
      {items.map((item, i) => (
        <details key={`${item.q}-${i}`} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-gold-text transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="pb-5 pr-9 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
