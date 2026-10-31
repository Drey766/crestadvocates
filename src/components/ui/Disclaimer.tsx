import { business } from "@/config/business";
import { cn } from "@/lib/utils";

/** The site-wide legal disclaimer, from business.legal. */
export function Disclaimer({ className }: { className?: string }) {
  return <p className={cn("text-sm leading-relaxed", className)}>{business.legal.disclaimer}</p>;
}
