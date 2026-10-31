import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { getTeamMember } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Founder photo, short bio and a link to the Team page. Works on navy or ivory. */
export function FounderTeaser({ tone = "navy" }: { tone?: "navy" | "ivory" }) {
  const founder = getTeamMember(business.founder.slug);
  if (!founder) return null;
  const copy = business.home.founder;
  const onNavy = tone === "navy";

  return (
    <section className={cn("section-padding", onNavy ? "on-navy" : "bg-ivory")}>
      <div className="container-site grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div
          className={cn(
            "mx-auto w-full max-w-sm border p-2 md:max-w-none",
            onNavy ? "border-navy-line" : "border-gold/50",
          )}
        >
          <Image
            src={founder.photo}
            alt={`${founder.name}, founder of ${business.name}.`}
            width={1000}
            height={1000}
            sizes="(min-width: 768px) 40vw, 384px"
            className="aspect-square w-full object-cover"
            style={{ objectPosition: founder.photoPosition }}
          />
        </div>
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="mt-4 text-3xl md:text-4xl">{founder.name}</h2>
          {founder.title && (
            <p
              className={cn(
                "mt-2 text-sm font-semibold uppercase tracking-[0.15em]",
                onNavy ? "text-gold" : "text-gold-text",
              )}
            >
              {founder.title}
            </p>
          )}
          <p className="mt-6 text-lg leading-relaxed">{founder.shortBio}</p>
          <DraftBadge status={founder.status} className="mt-4" />
          <div className="mt-8">
            <Link href="/team" className={onNavy ? "btn-outline-gold" : "btn-outline-navy"}>
              {copy.linkLabel}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
