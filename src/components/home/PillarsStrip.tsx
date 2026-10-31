import { business } from "@/config/business";
import { DraftBadge } from "@/components/ui/DraftBadge";

/** Your rights · Your interests · Your peace of mind, directly under the hero. */
export function PillarsStrip() {
  const { pillarNotes, pillarNotesStatus } = business.home;
  return (
    <section aria-label="What we protect" className="on-navy border-t border-navy-line">
      <ul className="container-site grid divide-y divide-navy-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {business.pillars.map((pillar, i) => (
          <li key={pillar} className="py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0">
            <h2 className="font-display text-2xl italic text-gold">{pillar}</h2>
            {pillarNotes[i] && <p className="mt-3 text-sm leading-relaxed">{pillarNotes[i]}</p>}
            {i === 0 && <DraftBadge status={pillarNotesStatus} className="mt-3" />}
          </li>
        ))}
      </ul>
    </section>
  );
}
