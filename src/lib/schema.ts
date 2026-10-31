import { business } from "@/config/business";
import { siteUrl } from "@/lib/utils";

/** Serialise JSON-LD safely for a <script> tag (escapes "<" to block injection). */
export function jsonLdString(data: object): string {
  return JSON.stringify(data).replace(/</g, "\u003c");
}

/** Firm-level LegalService schema. Address fields appear only when provided. */
export function legalServiceSchema() {
  const address =
    business.address || business.city
      ? {
          "@type": "PostalAddress",
          ...(business.address ? { streetAddress: business.address } : {}),
          ...(business.city ? { addressLocality: business.city } : {}),
          addressCountry: business.country,
        }
      : undefined;

  const sameAs = [business.instagramUrl, business.linkedinUrl, business.facebookUrl].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: business.name,
    slogan: business.tagline,
    url: siteUrl,
    logo: `${siteUrl}/images/logo-stacked.jpg`,
    image: `${siteUrl}/images/og-image.jpg`,
    telephone: business.phone,
    ...(business.email ? { email: business.email } : {}),
    areaServed: business.country,
    ...(address ? { address } : {}),
    ...(business.foundedYear ? { foundingDate: String(business.foundedYear) } : {}),
    founder: {
      "@type": "Person",
      name: business.founder.name,
      url: `${siteUrl}/team/${business.founder.slug}`,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
