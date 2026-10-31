"use client";

import { useSearchParams } from "next/navigation";
import { ConsultationForm, type AreaOption } from "@/components/contact/ConsultationForm";

/**
 * Preselects the area of law from `?service=<slug>`.
 * Uses useSearchParams, so it must render inside <Suspense> (see contact/page.tsx).
 */
export function ServiceAwareForm({ areas }: { areas: AreaOption[] }) {
  const service = useSearchParams().get("service") ?? "";
  const defaultArea = areas.some((a) => a.value === service) ? service : "";
  return <ConsultationForm key={defaultArea} areas={areas} defaultArea={defaultArea} />;
}
