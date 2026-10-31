import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** List with gold check icons (replaces the firm's emoji ticks). */
export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("check-list", className)}>
      {items.map((item, i) => (
        <li key={`${item}-${i}`}>
          <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={2.25} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
