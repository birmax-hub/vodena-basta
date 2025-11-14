import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";

const BASE_URL = "https://vodenabasta.rs";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const studyEntries = studies.map((study) => ({
    url: `${BASE_URL}/blog/${study.blogSlug}`,
    lastModified: new Date(study.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogEntries,
    ...studyEntries,
  ];
}
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
    lastModified,
    },
  ];
}

