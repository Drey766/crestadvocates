import type { MetadataRoute } from "next";
import { legalNav, mainNav } from "@/config/nav";
import { getPosts, getServices, getTeam } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...mainNav, ...legalNav].map((item) => ({ url: `${siteUrl}${item.href === "/" ? "" : item.href}` }));

  return [
    ...pages,
    ...getServices().map((s) => ({ url: `${siteUrl}/services/${s.slug}` })),
    ...getTeam().map((m) => ({ url: `${siteUrl}/team/${m.slug}` })),
    ...getPosts().map((p) => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p.created_at })),
  ];
}
