import { CalendarCheck, Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { business } from "@/config/business";
import { whatsappLink } from "@/lib/whatsapp";

const copy = business.contact;
const bookingUrl = business.consultation.bookingUrl || process.env.NEXT_PUBLIC_BOOKING_URL || "";

/** Direct contact routes on navy. Email, address, hours, map and booking render only when provided. */
export function ContactDetails() {
  const location = [business.address, business.city].filter(Boolean).join(", ");

  return (
    <div className="on-navy card-dark p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl">{copy.detailsHeading}</h2>

      <div className="mt-6 flex flex-col gap-3">
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <MessageCircle aria-hidden="true" className="size-4" />
          {copy.whatsappCta}
        </a>
        <a href={business.phoneHref} className="btn-outline-gold">
          <Phone aria-hidden="true" className="size-4" />
          {business.phone}
        </a>
      </div>

      <dl className="mt-8 space-y-5 text-sm">
        <Detail icon={<Phone className="size-4" />} label={copy.labels.phone}>
          <a href={business.phoneHref} className="inline-flex min-h-11 items-center text-white hover:text-gold">
            {business.phone}
          </a>
        </Detail>
        {business.email && (
          <Detail icon={<Mail className="size-4" />} label={copy.labels.email}>
            <a href={`mailto:${business.email}`} className="inline-flex min-h-11 items-center text-white hover:text-gold">
              {business.email}
            </a>
          </Detail>
        )}
        {location && (
          <Detail icon={<MapPin className="size-4" />} label={copy.labels.address}>
            <span className="text-white">{location}</span>
            {business.mapUrl && (
              <a
                href={business.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-gold hover:text-gold-light"
              >
                {copy.mapLabel}
                <ExternalLink aria-hidden="true" className="size-3.5" />
              </a>
            )}
          </Detail>
        )}
        {business.hours && (
          <Detail icon={<Clock className="size-4" />} label={copy.labels.hours}>
            <span className="text-white">{business.hours}</span>
          </Detail>
        )}
      </dl>

      {bookingUrl && (
        <div className="mt-8 border-t border-navy-line pt-8">
          <h3 className="text-xl">{copy.bookingHeading}</h3>
          <p className="mt-2 text-sm leading-relaxed">{copy.bookingText}</p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold mt-4">
            <CalendarCheck aria-hidden="true" className="size-4" />
            {copy.bookingCta}
          </a>
        </div>
      )}

      <div className="mt-8 border-t border-navy-line pt-8">
        <h3 className="flex items-center gap-2 text-xl">
          <ShieldCheck aria-hidden="true" className="size-5 text-gold" />
          {copy.confidentialityHeading}
        </h3>
        <p className="mt-3 text-sm leading-relaxed">{business.legal.disclaimer}</p>
      </div>
    </div>
  );
}

function Detail({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3">
      <span aria-hidden="true" className="mt-3 text-gold">
        {icon}
      </span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</dt>
        <dd className="flex flex-col">{children}</dd>
      </div>
    </div>
  );
}
