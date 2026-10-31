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
    // Every Insights post must end with this sentence (checked when src/data/blogs.json loads)
    articleNotice: "Laws change; speak to an advocate about your situation.",
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

  // ── SERVICES PAGES COPY ──
  services: {
    eyebrow: "Services",
    heading: "Legal support for businesses, individuals and families",
    intro:
      "Whether you run a business or need help with a personal or family matter, we listen first, explain your options in plain English and stand by you through the process.",
    gridHeading: "Practice areas",
    filterLabel: "Show services for",
    filters: { all: "All", businesses: "For Businesses", individuals: "For Individuals & Families" },
    resultsLabel: (count: number) => `Showing ${count} ${count === 1 ? "service" : "services"}`,
    featuredLabel: "Featured",
    learnMore: "Learn more",
    audienceLabels: { businesses: "For businesses", individuals: "For individuals and families" },
    detail: {
      backLabel: "All services",
      overviewHeading: "Overview",
      howWeHelpHeading: "How we can help",
      whatToExpectHeading: "What to expect",
      faqsHeading: "Common questions",
      insightsHeading: "Related insights",
      asideHeading: "Talk to us",
      asideText: "Tell us briefly what you need. We'll discuss the details properly once we speak.",
      ctaText: "Get in touch to talk through your situation and your options.",
    },
    whatsappPrefill: (service: string) => `Hello Crest Advocates, I'd like to ask about ${service}.`,
  },

  // ── TEAM PAGES COPY ──
  team: {
    eyebrow: "Our team",
    heading: "The people you'll work with",
    intro: "Clear counsel and strong representation start with people who listen. Meet the team at Crest Advocates.",
    gridHeading: "Our team",
    profileLabel: "View profile",
    backLabel: "Our team",
    bioHeading: "About",
    detailLabels: {
      qualifications: "Qualifications",
      admissions: "Admissions",
      practiceAreas: "Practice areas",
      skills: "Skills",
      languages: "Languages",
      memberships: "Memberships",
    },
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
  },

  // ── INSIGHTS (BLOG) COPY ──
  insights: {
    eyebrow: "Insights",
    heading: "General legal information, in plain English",
    intro:
      "Short guides to common legal questions for individuals, families and businesses in Kenya. General information only, not legal advice.",
    featuredLabel: "Latest",
    filterLabel: "Show insights about",
    allLabel: "All topics",
    resultsLabel: (count: number) => `Showing ${count} ${count === 1 ? "article" : "articles"}`,
    readTime: (minutes: number) => `${minutes} min read`,
    readLabel: "Read article",
    backLabel: "All insights",
    byLabel: "By",
    relatedHeading: "More insights",
    ctaHeading: "Have a question about your own situation?",
    ctaText: "Every matter is different. Talk to us about yours and we'll explain your options clearly.",
  },

  // ── CONTACT PAGE COPY ──
  contact: {
    eyebrow: "Contact",
    heading: "Schedule a Consultation",
    intro:
      "Tell us briefly what you need and how you would like us to reach you. For the quickest response, call us or send a message on WhatsApp.",
    detailsHeading: "Reach us directly",
    labels: { phone: "Phone", whatsapp: "WhatsApp", email: "Email", address: "Office", hours: "Hours" },
    whatsappCta: "Message us on WhatsApp",
    bookingHeading: "Book a time online",
    bookingText: "Prefer to choose a time yourself? Use our online booking page.",
    bookingCta: "Choose a time",
    mapLabel: "View on map",
    confidentialityHeading: "A note on confidentiality",
    formHeading: "Consultation request",
    formIntro: "Fields marked * are required.",
    faqsHeading: "Common questions",
    form: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      emailHint: "Needed only if you would like us to reply by email.",
      clientType: "I am",
      clientTypes: { individual: "An individual", business: "A business" },
      areaOfLaw: "Area of law",
      areaPlaceholder: "Select an area of law",
      notSure: "Not sure yet",
      preferredContact: "How should we contact you?",
      contactMethods: { whatsapp: "WhatsApp", call: "Phone call", email: "Email" },
      preferredDate: "Preferred date",
      preferredTime: "Preferred time",
      times: { morning: "Morning", afternoon: "Afternoon", evening: "Evening" },
      anyTime: "Any time",
      optional: "optional",
      description: "Briefly, what do you need help with?",
      charsLeft: (n: number) => `${n} characters left`,
      consent: "I agree to Crest Advocates contacting me about this request, and I have read the",
      consentLink: "privacy notice",
      honeypot: "Leave this field empty",
      submit: "Send request",
      sending: "Sending…",
      errorSummary: "Please check the highlighted fields.",
      tooFast: "That was quick. Please check your details and send the request again.",
      rateLimited: "We've received several requests from you in a short time. Please call or message us on WhatsApp instead.",
      callCta: "Call",
      errors: {
        name: "Please enter your name.",
        phone: "Please enter a phone number we can reach you on.",
        email: "Please enter a valid email address.",
        emailRequired: "Please enter your email address, or choose WhatsApp or a phone call.",
        clientType: "Please tell us whether you are an individual or a business.",
        areaOfLaw: "Please choose an area of law, or \"Not sure yet\".",
        preferredContact: "Please choose how we should contact you.",
        preferredDate: "Please enter a valid date.",
        preferredTime: "Please choose a time of day.",
        description: "Please keep your description to 600 characters or fewer.",
        consent: "Please confirm that we may contact you about this request.",
      },
      whatsappFallbackPrefill: (name: string, area: string) =>
        `Hello Crest Advocates, my name is ${name}. I'd like to request a consultation about ${area}.`,
    },
  },

  // ── LEGAL PAGES ── drafts: the firm should have these reviewed before launch
  privacy: {
    heading: "Privacy notice",
    intro:
      "This notice explains, in plain English, what information this website collects, why, and what happens to it. It is written with Kenya's Data Protection Act, 2019 in mind.",
    status: "draft",
    sections: [
      {
        heading: "What we collect",
        paragraphs: [
          "When you send a consultation request, we collect the details you type into the form: your name, phone number, email address (if you give one), whether you are an individual or a business, the area of law, how and when you would like to be contacted, and the short description you choose to add.",
          "Please do not include confidential or sensitive details in the form. We will discuss your matter properly once we speak.",
        ],
      },
      {
        heading: "Why we collect it",
        paragraphs: [
          "We use these details only to respond to your request and to arrange a consultation. We do not use them for marketing, and we do not sell or rent them to anyone.",
        ],
      },
      {
        heading: "How it is handled",
        paragraphs: [
          "Your request is sent to the firm by email through an email delivery provider. The website itself does not keep a copy of your request in a database.",
          "To protect the form from abuse, the website briefly keeps a count of requests from each internet address. This count is held in memory only and is not linked to your name or message.",
          "Our hosting provider may keep standard technical logs, such as internet addresses and the pages requested, to keep the website secure and running.",
        ],
      },
      {
        heading: "Cookies and tracking",
        paragraphs: [
          "This website does not use advertising or analytics cookies, and it does not use session-recording or heatmap tools.",
          "If you choose to contact us on WhatsApp, the link opens WhatsApp, and WhatsApp's own privacy policy applies to that conversation.",
        ],
      },
      {
        heading: "How long we keep it",
        paragraphs: [
          "We keep your details only for as long as we need them to respond to you and, if you become a client, as our professional obligations require.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Under the Data Protection Act, 2019, you can ask to see the personal information we hold about you, ask us to correct or delete it, and object to how we use it. You can also complain to the Office of the Data Protection Commissioner.",
        ],
      },
    ],
    contactHeading: "Contact us about your information",
    contactText: "To ask a question about this notice or your information, please contact us:",
  },

  disclaimerPage: {
    heading: "Disclaimer",
    intro: "Please read this before relying on anything on this website.",
    status: "draft",
    sections: [
      {
        heading: "General information only",
        paragraphs: [
          "The articles, service descriptions and answers on this website are general information. They are not legal advice and should not be relied on as a substitute for advice about your own situation.",
          "Laws and procedures change, and every matter turns on its own facts. Please speak to an advocate before acting on anything you read here.",
        ],
      },
      {
        heading: "No advocate–client relationship",
        paragraphs: [
          "Reading this website, calling us, messaging us or sending a consultation request does not by itself create an advocate–client relationship. That relationship begins only once we have agreed to act for you.",
        ],
      },
      {
        heading: "Confidentiality",
        paragraphs: [
          "Please do not send confidential or sensitive details through the contact form, by email or on WhatsApp before we have spoken. We will discuss your matter properly once we speak.",
        ],
      },
      {
        heading: "Links to other websites",
        paragraphs: [
          "Where this website links to other websites, such as WhatsApp or social media, we are not responsible for their content or how they handle your information.",
        ],
      },
    ],
  },

  notFound: {
    eyebrow: "Page not found",
    heading: "We couldn't find that page.",
    text: "The page may have moved, or the link may be incorrect. These links may help.",
    homeLabel: "Go to the home page",
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
    danger: "#991B1B",     // form error text on white/ivory (7.7:1 on white)
  },

  // ── FONTS ──
  fonts: { display: "Cormorant Garamond", body: "Inter" },
} as const;

export type Business = typeof business;
