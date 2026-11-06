// src/types/index.ts — content types for src/data/*.json and the contact form

export interface Service {
  slug: string; title: string; icon: string; image?: string; // /images/photos/…
  audience: ("businesses" | "individuals")[];
  summary: string; overview: string[]; howWeHelp: string[]; whatToExpect: string[];
  faqs: { q: string; a: string }[];
  relatedPosts?: string[]; // Insights post slugs
  featured?: boolean; status: "confirmed" | "draft";
}
export interface TeamMember {
  slug: string; name: string; title: string; titleStatus?: "confirm";
  photo: string; photoPosition?: string; shortBio: string;
  bio: string[]; qualifications: string[]; admissions: string[];
  practiceAreas: string[]; skills: string[]; languages: string[]; memberships: string[];
  email: string; linkedin: string; status: "confirmed" | "draft";
}
export interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string;
  cover: string | null; category: string; author_name: string;
  read_time: number; created_at: string; published: boolean; status: "confirmed" | "draft";
}
export interface ProcessStep { step: number; title: string; description: string; status: "confirmed" | "draft"; }
export interface FAQ { id: string; q: string; a: string; status: "confirmed" | "draft"; }
export interface ConsultationRequest {
  name: string; phone: string; email?: string; clientType: "individual" | "business";
  areaOfLaw: string; preferredContact: "whatsapp" | "call" | "email";
  preferredDate?: string; preferredTime?: "morning" | "afternoon" | "evening";
  description?: string; consent: boolean; website?: string; startedAt: number;
}
