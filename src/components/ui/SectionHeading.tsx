import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Eyebrow + h2 + optional intro. Colours follow the section (.on-navy or light). */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cn("text-3xl md:text-4xl", eyebrow && "mt-4")}>{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed md:text-lg">{intro}</p>}
    </div>
  );
}
