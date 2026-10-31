import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/config/business";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { whatsappLink } from "@/lib/whatsapp";

/** Closing navy band: schedule, WhatsApp or call. */
export function FinalCta() {
  return (
    <section className="on-navy relative overflow-hidden">
      <MountainPattern />
      <div className="container-site section-padding relative text-center">
        <h2 className="text-3xl md:text-5xl">{business.copy.finalCtaHeading}</h2>
        <GoldRule className="mx-auto mt-6 max-w-40" />
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed">{business.copy.finalCtaText}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn-gold">
            {business.copy.primaryCta}
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            <MessageCircle aria-hidden="true" className="size-4" />
            {business.copy.secondaryCta}
          </a>
          <a href={business.phoneHref} className="btn-outline-gold">
            <Phone aria-hidden="true" className="size-4" />
            {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
