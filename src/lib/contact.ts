// Consultation request schema, shared by the form (client) and /api/contact (server).
// It takes the allowed area-of-law values as an argument so the client bundle
// never has to import src/data.

import { z } from "zod";
import { business } from "@/config/business";
import type { ConsultationRequest } from "@/types";

export const DESCRIPTION_MAX = 600;
/** Submissions faster than this after the form loaded are treated as automated. */
export const MIN_SUBMIT_MS = 3000;
/** Area-of-law value for "Not sure yet". */
export const AREA_NOT_SURE = "not-sure";

const e = business.contact.form.errors;

// Empty form fields arrive as ""; treat them as missing
const blankToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

// Yesterday in UTC: visitors ahead of or behind UTC can still choose their own "today"
const earliestDate = () => new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export function consultationSchema(areaValues: readonly string[]): z.ZodType<ConsultationRequest> {
  return z
    .object({
      name: z.string({ error: e.name }).trim().min(2, e.name).max(120, e.name),
      phone: z
        .string({ error: e.phone })
        .trim()
        .refine((v) => /^\+?[\d\s()-]{7,20}$/.test(v) && v.replace(/\D/g, "").length >= 7, e.phone),
      email: z.preprocess(blankToUndefined, z.email(e.email).max(200, e.email).optional()),
      clientType: z.enum(["individual", "business"], { error: e.clientType }),
      areaOfLaw: z.string({ error: e.areaOfLaw }).refine((v) => areaValues.includes(v), e.areaOfLaw),
      preferredContact: z.enum(["whatsapp", "call", "email"], { error: e.preferredContact }),
      preferredDate: z.preprocess(
        blankToUndefined,
        z.iso.date(e.preferredDate).refine((v) => v >= earliestDate(), e.preferredDate).optional(),
      ),
      preferredTime: z.preprocess(
        blankToUndefined,
        z.enum(["morning", "afternoon", "evening"], { error: e.preferredTime }).optional(),
      ),
      description: z.preprocess(blankToUndefined, z.string().trim().max(DESCRIPTION_MAX, e.description).optional()),
      consent: z.literal(true, { error: e.consent }),
      website: z.string().optional(), // honeypot: checked separately, never shown to people
      startedAt: z.number(),
    })
    .refine((d) => d.preferredContact !== "email" || Boolean(d.email), {
      path: ["email"],
      message: e.emailRequired,
    });
}

export type ContactField = keyof ConsultationRequest;

export type ContactResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Partial<Record<ContactField, string[]>> }
  | { ok: false; reason: "too_fast" | "rate_limited" | "not_configured" | "send_failed" | "rejected" };
