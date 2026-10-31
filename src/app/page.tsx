import { FinalCta } from "@/components/home/FinalCta";
import { FounderTeaser } from "@/components/home/FounderTeaser";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { PillarsStrip } from "@/components/home/PillarsStrip";
import { PracticeAreas } from "@/components/home/PracticeAreas";
import { RetainerFeature } from "@/components/home/RetainerFeature";
import { WhyCrest } from "@/components/home/WhyCrest";

// Section rhythm: navy (hero + pillars) · ivory · navy|ivory split · navy · ivory · navy · ivory · navy
export default function Home() {
  return (
    <>
      <Hero />
      <PillarsStrip />
      <PracticeAreas />
      <RetainerFeature />
      <WhyCrest />
      <HowItWorks />
      <FounderTeaser tone="navy" />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
