import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import type { Service } from "@/types";
import { CheckList } from "@/components/ui/CheckList";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Wide navy card for a featured service (the retainer), shown first in the services grid. */
export function FeaturedServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="on-navy group relative grid gap-8 overflow-hidden rounded-sm border border-navy-line p-6 transition-colors hover:border-gold md:p-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12"
    >
      <MountainPattern />
      <div className="relative">
        <span className="flex flex-wrap items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-sm border border-gold/60">
            <ServiceIcon name={service.icon} className="size-6 text-gold" />
          </span>
          <span className="eyebrow">{business.services.featuredLabel}</span>
          <DraftBadge status={service.status} />
        </span>
        <h3 className="mt-6 text-3xl md:text-4xl">{service.title}</h3>
        <p className="mt-4 text-base leading-relaxed md:text-lg">{service.summary}</p>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          {business.services.learnMore}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <CheckList items={service.howWeHelp} className="relative self-center font-display text-xl text-white md:text-2xl" />
    </Link>
  );
}
