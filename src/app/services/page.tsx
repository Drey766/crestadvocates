import type { Metadata } from "next";
import { business } from "@/config/business";
import { FinalCta } from "@/components/home/FinalCta";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getServices } from "@/lib/data";

const copy = business.services;

export const metadata: Metadata = {
  title: copy.eyebrow,
  description: copy.intro,
  alternates: { canonical: "/services" },
};

// Section rhythm: navy hero · ivory grid · navy CTA
export default function ServicesPage() {
  return (
    <>
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{copy.heading}</h1>
          <GoldRule className="mt-8 max-w-xs" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{copy.intro}</p>
        </div>
      </section>

      <section aria-labelledby="practice-areas" className="section-padding bg-ivory">
        <div className="container-site">
          <h2 id="practice-areas" className="sr-only">
            {copy.gridHeading}
          </h2>
          <ServicesExplorer services={getServices()} />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
