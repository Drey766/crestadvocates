import Link from "next/link";
import { business } from "@/config/business";
import { CheckList } from "@/components/ui/CheckList";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getServiceBySlug } from "@/lib/data";

const RETAINER_SLUG = "business-legal-retainer";

/** Split band: the firm's own retainer copy on navy, the four promises on ivory. */
export function RetainerFeature() {
  const retainer = getServiceBySlug(RETAINER_SLUG);
  if (!retainer) return null;
  const copy = business.home.retainer;

  return (
    <section aria-labelledby="retainer-heading" className="grid lg:grid-cols-2">
      <div className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="section-padding relative px-4 sm:px-6 lg:ml-auto lg:max-w-xl lg:pl-8 lg:pr-16">
          <p className="eyebrow">{retainer.title}</p>
          <h2 id="retainer-heading" className="mt-4 text-3xl md:text-4xl">
            {copy.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed md:text-lg">
            {retainer.overview.map((paragraph, i) => (
              <p key={`${retainer.slug}-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-ivory">
        <div className="section-padding px-4 sm:px-6 lg:mr-auto lg:max-w-xl lg:pl-16 lg:pr-8">
          <p className="eyebrow">{copy.promisesLabel}</p>
          <CheckList items={retainer.howWeHelp} className="mt-6 font-display text-2xl text-ink" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link href={`/contact?service=${retainer.slug}`} className="btn-navy">
              {copy.ctaLabel}
            </Link>
            <Link href={`/services/${retainer.slug}`} className="btn-outline-navy">
              {copy.detailLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
