import { business } from "@/config/business";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyCrest() {
  const copy = business.home.whyCrest;
  return (
    <section className="on-navy relative overflow-hidden">
      <MountainPattern />
      <div className="container-site section-padding relative">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} intro={copy.text} />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {business.values.map((value) => (
            <li key={value.title} className="card-dark">
              <GoldRule className="w-16" />
              <h3 className="mt-5 text-2xl">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{value.summary}</p>
              <DraftBadge status={value.status} className="mt-4" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
