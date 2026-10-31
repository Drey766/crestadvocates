import type { Metadata } from "next";
import { Suspense } from "react";
import { business } from "@/config/business";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ConsultationForm } from "@/components/contact/ConsultationForm";
import { ServiceAwareForm } from "@/components/contact/ServiceAwareForm";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { FaqList } from "@/components/ui/FaqList";
import { GoldRule } from "@/components/ui/GoldRule";
import { MountainPattern } from "@/components/ui/MountainPattern";
import { getFaqs, getServices } from "@/lib/data";

const copy = business.contact;

export const metadata: Metadata = {
  title: copy.heading,
  description: copy.intro,
  alternates: { canonical: "/contact" },
};

// Section rhythm: navy hero · ivory details and form · white FAQs
export default function ContactPage() {
  const areas = getServices().map((s) => ({ value: s.slug, label: s.title }));
  const faqs = getFaqs();

  return (
    <>
      <section className="on-navy relative overflow-hidden">
        <MountainPattern />
        <div className="container-site section-padding relative">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{copy.heading}</h1>
          <GoldRule className="mt-8 max-w-xs" />
          <p className="mt-8 max-w-2xl text-lg leading-relaxed">{copy.intro}</p>
        </div>
      </section>

      <section className="section-padding bg-ivory">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
          <div className="lg:order-2">
            <h2 className="text-3xl md:text-4xl">{copy.formHeading}</h2>
            <p className="mb-6 mt-3 text-sm">{copy.formIntro}</p>
            {/* useSearchParams (?service=) needs a Suspense boundary; the fallback is the same form, unselected */}
            <Suspense fallback={<ConsultationForm areas={areas} />}>
              <ServiceAwareForm areas={areas} />
            </Suspense>
          </div>
          <div className="lg:order-1">
            <div className="lg:sticky lg:top-28">
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="contact-faqs" className="section-padding bg-white">
          <div className="container-site">
            <div className="max-w-3xl">
              <h2 id="contact-faqs" className="flex flex-wrap items-center gap-3 text-3xl md:text-4xl">
                {copy.faqsHeading}
                <DraftBadge status={faqs.some((f) => f.status === "draft") ? "draft" : "confirmed"} />
              </h2>
              <FaqList items={faqs} className="mt-8" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
