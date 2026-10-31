import type { Metadata } from "next";
import { business } from "@/config/business";
import { LegalPage } from "@/components/legal/LegalPage";

const copy = business.disclaimerPage;

export const metadata: Metadata = {
  title: copy.heading,
  description: business.legal.disclaimer,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      heading={copy.heading}
      intro={copy.intro}
      status={copy.status}
      sections={copy.sections}
      lead={<blockquote>{business.legal.disclaimer}</blockquote>}
    />
  );
}
