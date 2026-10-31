"use client";

import { useState } from "react";
import { business } from "@/config/business";
import type { Service } from "@/types";
import { FeaturedServiceCard } from "@/components/services/FeaturedServiceCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { cn } from "@/lib/utils";

type Filter = "all" | Service["audience"][number];
const filters: Filter[] = ["all", "businesses", "individuals"];

/** Audience filter buttons above the services grid. Featured services span the full row. */
export function ServicesExplorer({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const copy = business.services;
  const visible = filter === "all" ? services : services.filter((s) => s.audience.includes(filter));

  return (
    <>
      <div role="group" aria-label={copy.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((value) => {
          const active = value === filter;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(value)}
              className={cn(
                "min-h-11 rounded-sm border px-4 text-sm font-semibold transition-colors",
                active ? "border-navy bg-navy text-white" : "border-navy/20 bg-white text-navy hover:border-navy",
              )}
            >
              {copy.filters[value]}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="sr-only">
        {copy.resultsLabel(visible.length)}
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service) => (
          <li key={service.slug} className={cn(service.featured && "sm:col-span-2 lg:col-span-3")}>
            {service.featured ? <FeaturedServiceCard service={service} /> : <ServiceCard service={service} />}
          </li>
        ))}
      </ul>
    </>
  );
}
