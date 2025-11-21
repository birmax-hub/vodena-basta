import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vodenabasta.rs";

  // Get all blog post URLs
  const blogPostUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Get all study URLs
  const studyUrls = studies.map((study) => ({
    url: `${baseUrl}/blog/${study.blogSlug}`,
    lastModified: new Date(study.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPostUrls,
    ...studyUrls,
  ];
}
