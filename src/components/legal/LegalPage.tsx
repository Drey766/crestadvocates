import type { ReactNode } from "react";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";

/** Navy hero + plain readable sections on white, for /privacy and /disclaimer. */
export function LegalPage({
  heading,
  intro,
  status,
  sections,
  lead,
  children,
}: {
  heading: string;
  intro: string;
  status: "confirmed" | "draft";
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative">
          <h1 className="flex max-w-3xl flex-wrap items-center gap-4 text-4xl sm:text-5xl">
            {heading}
            <DraftBadge status={status} />
          </h1>
          <GoldRule className="mt-8 max-w-xs" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{intro}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="prose-article">
            {lead}
            {sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph, i) => (
                  <p key={`${section.heading}-${i}`} className="mt-5">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
