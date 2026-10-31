import { business } from "@/config/business";
import { DraftBadge } from "@/components/ui/DraftBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProcessSteps } from "@/lib/data";

export function HowItWorks() {
  const steps = getProcessSteps();
  if (steps.length === 0) return null;
  const copy = business.home.howItWorks;

  return (
    <section className="section-padding bg-ivory">
      <div className="container-site">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.heading} />
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <li key={step.step} className="border-t border-gold pt-6">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full bg-navy font-display text-2xl font-semibold lining-nums text-gold"
              >
                {step.step}
              </span>
              <h3 className="mt-5 text-2xl">
                <span className="sr-only">Step {step.step}: </span>
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed">{step.description}</p>
              <DraftBadge status={step.status} className="mt-4" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
