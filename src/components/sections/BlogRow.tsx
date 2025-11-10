"use client";

import { BlogCard } from "@/components/BlogCard";
import { SectionReveal } from "@/components/ux/SectionReveal";

type BlogRowProps = {
  posts: Array<{
    title: string;
    excerpt: string;
    image: string;
  }>;
};

export function BlogRow({ posts }: BlogRowProps) {
  return (
    <section
      id="blog"
      className="relative overflow-hidden rounded-[3.2rem] border border-white/[0.04] bg-[linear-gradient(175deg,rgba(9,30,27,0.65)_0%,rgba(6,16,25,0.9)_58%,rgba(4,8,18,0.96)_100%)] p-10 shadow-[0_36px_150px_rgba(4,16,24,0.5)] backdrop-blur-xl"
    >
      <div className="flex flex-col gap-12">
        <SectionReveal className="grid gap-6 lg:grid-cols-3" childSelector="[data-blog-card]">
          {posts.map((post) => (
            <div key={post.title} data-blog-card>
              <BlogCard title={post.title} excerpt={post.excerpt} image={post.image} disabled />
            </div>
          ))}
        </SectionReveal>
        <SectionReveal delay={0.15}>
          <div className="flex justify-center">
            <span
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/[0.04] bg-white/[0.08] px-5 py-2 text-sm text-accent-200/70 backdrop-blur"
            >
              Pročitaj sve tekstove (uskoro)
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}


