// src/config/business.ts
// =====================================================
// BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
// =====================================================
// Edit ONLY this file to change firm details, contact info,
// colours or fixed legal wording. Every page imports from here.
// Empty strings / null = "not provided yet" → the UI hides it.

export const business = {
  // ── IDENTITY ──
  name: "Crest Advocates",
  shortName: "Crest",
  descriptor: "Advocates",
  tagline: "Rising Above. Protecting What Matters.",
  strapline: "Clear counsel. Strong representation.",
  pillars: ["Your rights.", "Your interests.", "Your peace of mind."],
  founder: { name: "Lynn Ngugi", slug: "lynn-ngugi" },
  foundedYear: null as number | null,           // hide "since" copy if null

  // ── CONTACT ──
  phone: "+254 113 467 024",
  phoneHref: "tel:+254113467024",
  whatsappNumber: "254113467024",
  whatsappUrl: "https://wa.me/254113467024",
  email: "",                                    // TODO — not provided
  address: "",                                  // TODO — not provided
  city: "",                                     // TODO — do not assume
  country: "Kenya",
  hours: "",                                    // TODO — not provided
  mapUrl: "",                                   // only render map if provided
  instagramUrl: "https://www.instagram.com/crestadvocates/", // confirm
  linkedinUrl: "",
  facebookUrl: "",

  // ── CONSULTATIONS ──
  consultation: {
    isFree: null as boolean | null,             // never claim "free" unless true
    bookingUrl: "",                             // optional Cal.com / Calendly link
  },

  // ── LEGAL / COMPLIANCE COPY ──
  legal: {
    disclaimer:
      "The information on this website is general in nature and does not constitute legal advice. Submitting an enquiry does not create an advocate–client relationship. Please do not send confidential or sensitive details through the contact form.",
    formNotice:
      "Please don't include confidential details here. We'll discuss your matter properly once we speak.",
    dataProtectionAct: "Data Protection Act, 2019",
  },

  // ── VOICE / MICRO-COPY ──
  copy: {
    heroHeadline: "Rising Above. Protecting What Matters.",
    heroSubtext: "Clear counsel. Strong representation. Your rights, your interests and your peace of mind — in capable hands.",
    primaryCta: "Schedule a Consultation",
    secondaryCta: "WhatsApp Us",
    whatsappPrefill: "Hello Crest Advocates, I'd like to make an enquiry.",
    formSuccess: "Thank you — we've received your request and will be in touch shortly.",
    formFallback: "We couldn't send your request online just now. Please reach us directly on WhatsApp or by phone — we'd be glad to help.",
    footerLine: "Clear counsel. Strong representation.",
    finalCtaHeading: "Ready to take the next step?",
    finalCtaText: "Get in touch for legal guidance you can rely on.",
  },

  // ── COLOURS ── (sampled from the logo — see Design System)
  colors: {
    navy: "#03112C",
    navyRaised: "#0A1F44",
    navyLine: "#1B3260",
    gold: "#D3A54F",
    goldLight: "#F5C972",
    goldDark: "#BE8A36",
    goldText: "#8A6416",   // AA-safe gold-toned TEXT on white/ivory
    ivory: "#FAF7F0",
    white: "#FFFFFF",
    ink: "#03112C",
    slate: "#4A5568",
    mutedOnNavy: "#B9C2D3",
  },

  // ── FONTS ──
  fonts: { display: "Cormorant Garamond", body: "Inter" },
} as const;

export type Business = typeof business;
