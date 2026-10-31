import type { Metadata } from "next";
import { business } from "@/config/business";
import { LegalPage } from "@/components/legal/LegalPage";
import { whatsappLink } from "@/lib/whatsapp";

const copy = business.privacy;
const labels = business.contact.labels;

export const metadata: Metadata = {
  title: copy.heading,
  description: copy.intro,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage heading={copy.heading} intro={copy.intro} status={copy.status} sections={copy.sections}>
      <section>
        <h2>{copy.contactHeading}</h2>
        <p className="mt-5">{copy.contactText}</p>
        <ul className="mt-5">
          <li>
            {labels.phone}: <a href={business.phoneHref}>{business.phone}</a>
          </li>
          <li>
            {labels.whatsapp}:{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              {business.phone}
            </a>
          </li>
          {business.email && (
            <li>
              {labels.email}: <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
          )}
        </ul>
      </section>
    </LegalPage>
  );
}
