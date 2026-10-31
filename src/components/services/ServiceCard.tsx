import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import type { Service } from "@/types";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

/** Practice-area card for light backgrounds: icon, title, summary, "Learn more". */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card group flex h-full flex-col transition-colors hover:border-gold"
    >
      <span className="flex size-12 items-center justify-center rounded-sm bg-navy">
        <ServiceIcon name={service.icon} className="size-6 text-gold" />
      </span>
      <h3 className="mt-5 text-2xl">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed">{service.summary}</p>
      <span className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
          {business.services.learnMore}
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        <DraftBadge status={service.status} />
      </span>
    </Link>
  );
}
