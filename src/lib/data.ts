// Typed access to the JSON content in src/data.
//
// Each file is validated with zod when this module loads. Pages are prerendered,
// so a missing field, a typo in a status value or a duplicate slug fails
// `npm run build` with a clear message instead of reaching the live site.
// The `z.ZodType<…>` annotations keep these schemas in step with src/types.

import { z } from "zod";
import type { BlogPost, FAQ, ProcessStep, Service, TeamMember } from "@/types";
import servicesJson from "@/data/services.json";
import teamJson from "@/data/team.json";
import blogsJson from "@/data/blogs.json";
import faqsJson from "@/data/faqs.json";
import processJson from "@/data/process.json";

const status = z.enum(["confirmed", "draft"]);
const text = z.string().trim().min(1);

const serviceSchema: z.ZodType<Service> = z.object({
  slug: text,
  title: text,
  icon: text,
  audience: z.array(z.enum(["businesses", "individuals"])).min(1),
  summary: text,
  overview: z.array(text),
  howWeHelp: z.array(text),
  whatToExpect: z.array(text),
  faqs: z.array(z.object({ q: text, a: text })),
  relatedPosts: z.array(text).optional(),
  featured: z.boolean().optional(),
  status,
});

// Only slug and name are required. Every other profile field may be empty: the UI hides it.
const teamMemberSchema: z.ZodType<TeamMember> = z.object({
  slug: text,
  name: text,
  title: z.string().trim(),
  titleStatus: z.literal("confirm").optional(),
  photo: z.union([z.literal(""), z.string().startsWith("/images/")]),
  photoPosition: z.string().optional(),
  shortBio: z.string().trim(),
  bio: z.array(text),
  qualifications: z.array(text),
  admissions: z.array(text),
  practiceAreas: z.array(text),
  skills: z.array(text),
  languages: z.array(text),
  memberships: z.array(text),
  email: z.union([z.literal(""), z.email()]),
  linkedin: z.union([z.literal(""), z.url()]),
  status,
});

const blogPostSchema: z.ZodType<BlogPost> = z.object({
  id: text,
  title: text,
  slug: text,
  excerpt: text,
  content: text,
  cover: z.string().nullable(),
  category: text,
  author_name: text,
  read_time: z.number().int().positive(),
  created_at: z.iso.date(),
  published: z.boolean(),
  status,
});

const processStepSchema: z.ZodType<ProcessStep> = z.object({
  step: z.number().int().positive(),
  title: text,
  description: text,
  status,
});

const faqSchema: z.ZodType<FAQ> = z.object({
  id: text,
  q: text,
  a: text,
  status,
});

function load<T>(file: string, schema: z.ZodType<T>, raw: unknown, key?: (item: T) => string): T[] {
  const result = z.array(schema).safeParse(raw);
  if (!result.success) {
    throw new Error(`Invalid src/data/${file}:\n${z.prettifyError(result.error)}`);
  }
  if (key) {
    const seen = new Set<string>();
    for (const item of result.data) {
      const k = key(item);
      if (seen.has(k)) throw new Error(`Duplicate key "${k}" in src/data/${file}`);
      seen.add(k);
    }
  }
  return result.data;
}

const services = load("services.json", serviceSchema, servicesJson, (s) => s.slug);
const team = load("team.json", teamMemberSchema, teamJson, (m) => m.slug);
const posts = load("blogs.json", blogPostSchema, blogsJson, (p) => p.slug);
const faqs = load("faqs.json", faqSchema, faqsJson, (f) => f.id);
const processSteps = load("process.json", processStepSchema, processJson, (p) => String(p.step)).sort(
  (a, b) => a.step - b.step,
);

// services.json may only point at posts that exist
for (const service of services) {
  for (const slug of service.relatedPosts ?? []) {
    if (!posts.some((p) => p.slug === slug)) {
      throw new Error(`src/data/services.json: "${service.slug}" lists unknown related post "${slug}"`);
    }
  }
}

// ── Services ── featured first, then file order
export function getServices(): Service[] {
  return [...services].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Published Insights posts linked from a service, in the order listed. */
export function getRelatedPosts(service: Service): BlogPost[] {
  const published = getPosts();
  return (service.relatedPosts ?? []).flatMap((slug) => published.filter((p) => p.slug === slug));
}

// ── Team ──
export function getTeam(): TeamMember[] {
  return team;
}

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

// ── Insights (blog) ── published only, newest first
export function getPosts(): BlogPost[] {
  return posts
    .filter((p) => p.published)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((p) => p.slug === slug);
}

// ── FAQs and process ──
export function getFaqs(): FAQ[] {
  return faqs;
}

export function getProcessSteps(): ProcessStep[] {
  return processSteps;
}
