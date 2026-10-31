import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business } from "@/config/business";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/data";

export function PracticeAreas() {
  const services = getServices();
  if (services.length === 0) return null;
  const copy = business.home.practiceAreas;

  return (
    <section className="section-padding bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} intro={copy.intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        <Link href="/services" className="btn-outline-navy mt-10">
          {copy.linkLabel}
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
