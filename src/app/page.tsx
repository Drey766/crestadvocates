import Link from "next/link";
import { business } from "@/config/business";
import { CheckList } from "@/components/ui/CheckList";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { GoldRule } from "@/components/ui/GoldRule";
import { LogoStacked } from "@/components/ui/Logo";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { whatsappLink } from "@/lib/whatsapp";

// Phase 1 placeholder: proves the layout shell and design tokens. Replaced in Phase 4.
export default function Home() {
  return (
    <>
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">{business.descriptor}</p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{business.copy.heroHeadline}</h1>
            <GoldRule className="mt-8 max-w-xs" />
            <p className="mt-8 max-w-xl text-lg leading-relaxed">{business.copy.heroSubtext}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-gold">
                {business.copy.primaryCta}
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                {business.copy.secondaryCta}
              </a>
            </div>
          </div>
          <LogoStacked priority className="hidden w-80 lg:block" />
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-site">
          <p className="eyebrow">
            Layout check <DraftBadge className="ml-2" />
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl">{business.strapline}</h2>
          <CheckList items={business.pillars} className="mt-8 text-ink" />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-navy">
              {business.copy.primaryCta}
            </Link>
            <a href={business.phoneHref} className="btn-outline-navy">
              {business.phone}
            </a>
          </div>
          <Disclaimer className="mt-10 max-w-2xl" />
        </div>
      </section>
    </>
  );
}
