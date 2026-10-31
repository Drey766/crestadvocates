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

  // ── VALUES ── titles are the firm's own words; descriptions are drafts
  values: [
    {
      title: "Professionalism",
      summary: "Careful, thorough work and clear communication at every stage of your matter.",
      detail:
        "We prepare carefully, communicate clearly and give every matter, large or small, the same attention. You should always know who is handling your matter and how to reach us.",
      status: "draft",
    },
    {
      title: "Integrity",
      summary: "Honest advice about where you stand, including when the answer is not the one you hoped for.",
      detail:
        "We tell you plainly where you stand and what your options are. We are open about how we work, and what you share with us stays in confidence.",
      status: "draft",
    },
    {
      title: "Client-focused approach",
      summary: "We listen first, and shape our advice around your goals and circumstances.",
      detail:
        "Every client's situation is different. We take the time to understand yours, explain things in plain English and stand by you when it matters most.",
      status: "draft",
    },
  ],

  // ── HOME PAGE COPY ──
  home: {
    // One sentence per entry in `pillars`, same order (draft)
    pillarNotes: [
      "We explain where you stand in plain English, so you understand your rights before you act.",
      "We take the time to understand what matters to you, and shape our advice around it.",
      "You have a team to turn to when questions come up, and we keep you informed along the way.",
    ],
    pillarNotesStatus: "draft",
    practiceAreas: {
      eyebrow: "Practice areas",
      heading: "How we can help",
      intro: "Legal support for businesses, individuals and families, explained in plain English.",
      linkLabel: "View all services",
    },
    retainer: {
      heading: "Your legal partner, on retainer",
      promisesLabel: "On retainer, you can expect",
      ctaLabel: "Talk to us about a retainer",
      detailLabel: "About the retainer",
    },
    whyCrest: {
      eyebrow: "Why Crest",
      heading: "You need more than legal advice.",
      text: "You need a team that listens, understands your needs, and stands by you when it matters most.",
    },
    howItWorks: {
      eyebrow: "How it works",
      heading: "What happens when you get in touch",
    },
    founder: {
      eyebrow: "Meet the founder",
      linkLabel: "Meet our team",
    },
    insights: {
      eyebrow: "Insights",
      heading: "General legal information",
      intro: "Plain-English guides to common legal questions. General information only, not legal advice.",
      linkLabel: "Read all insights",
    },
  },

  // ── ABOUT PAGE COPY ──
  about: {
    eyebrow: "About us",
    whoWeAre: {
      heading: "Who we are",
      paragraphs: [
        "Crest Advocates is a law firm in Kenya, founded by Lynn Ngugi. We work with individuals, families and businesses, offering clear counsel and strong representation.",
        "We believe you need more than legal advice. You need a team that listens, understands your needs, and stands by you when it matters most.",
        "That is how we approach every matter: we take the time to understand what is at stake for you, explain your options in plain English, and help you make decisions with confidence.",
      ],
      status: "draft",
    },
    missionVisionHeading: "Mission and vision",
    mission: {
      label: "Our mission",
      text: "To give our clients clear counsel and strong representation — protecting their rights, their interests and their peace of mind with professionalism and integrity.",
      status: "draft",
    },
    vision: {
      label: "Our vision",
      text: "To be a legal partner people can trust to stand with them — rising above the complexity of the law so they can make decisions with confidence.",
      status: "draft",
    },
    valuesHeading: "What we stand for",
    valuesIntro: "Professionalism, integrity, and a client-focused approach to every matter we handle.",
    howWeWork: {
      heading: "How we work",
      retainer: {
        title: "As your legal partner, on retainer",
        text: "We don't just show up when things go wrong. On retainer, we become your legal partner. We learn your business, understand your goals and give you direct, priority access to our team, so you can make decisions with confidence.",
        linkLabel: "About the retainer",
        status: "confirmed",
      },
      oneOff: {
        title: "For a specific matter",
        text: "When you need help with a particular matter, such as buying property, resolving a dispute or planning your estate, we work with you on that matter. We start by listening, then explain your options and the next steps clearly.",
        linkLabel: "View all services",
        status: "draft",
      },
    },
    // Render only when provided. Never invent years or credentials.
    experienceHeading: "Experience",
    experienceNote: "",                         // TODO — firm to provide, if wanted
    credentialsHeading: "Credentials and memberships",
    credentials: [] as string[],                // TODO — firm-level memberships, if any
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
