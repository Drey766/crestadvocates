import { business } from "@/config/business";
import type { BlogPost, TeamMember } from "@/types";
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

/** Person schema for a team profile. Only fields the firm has provided are included. */
export function personSchema(member: TeamMember) {
  const sameAs = [member.linkedin].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    url: `${siteUrl}/team/${member.slug}`,
    ...(member.title ? { jobTitle: member.title } : {}),
    ...(member.shortBio ? { description: member.shortBio } : {}),
    ...(member.photo ? { image: `${siteUrl}${member.photo}` } : {}),
    ...(member.email ? { email: member.email } : {}),
    ...(member.languages.length > 0 ? { knowsLanguage: member.languages } : {}),
    ...(member.practiceAreas.length > 0 ? { knowsAbout: member.practiceAreas } : {}),
    ...(member.memberships.length > 0
      ? { memberOf: member.memberships.map((name) => ({ "@type": "Organization", name })) }
      : {}),
    worksFor: { "@type": "LegalService", name: business.name, url: siteUrl },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** Article schema for an Insights post. Authored and published by the firm. */
export function articleSchema(post: BlogPost) {
  const url = `${siteUrl}/blog/${post.slug}`;
  const firm = { "@type": "LegalService", name: business.name, url: siteUrl };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.created_at,
    articleSection: post.category,
    image: `${siteUrl}/images/og-image.jpg`,
    author: post.author_name === business.name ? firm : { "@type": "Person", name: post.author_name },
    publisher: { ...firm, logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo-stacked.jpg` } },
  };
}
