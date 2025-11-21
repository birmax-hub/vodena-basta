import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";
import { defaultMetadata, siteMetadata } from "@/lib/seo-config";

export const dynamic = "force-static";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return [
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...studies.map((study) => ({ slug: study.blogSlug })),
  ];
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((item) => item.slug === params.slug);
  const study = studies.find((item) => item.blogSlug === params.slug);
  const entry = post ?? study;
  const baseTitle = "Blog | Vodena Bašta";
  const baseDescription =
    "Znanje, studije i saveti o akvaponiji, održivoj proizvodnji hrane i ekologiji.";
  const fallbackImage = `${siteMetadata.siteUrl}/images/og-default.jpg`;

  if (!entry) {
    return {
      title: baseTitle,
      description: baseDescription,
      openGraph: {
        title: baseTitle,
        description: "Najnoviji članci i studije iz akvaponije i regenerativne poljoprivrede.",
        url: "https://www.vodenabasta.rs/blog",
      },
      alternates: {
        canonical: "https://www.vodenabasta.rs/blog",
      },
    };
  }

  const slug = post ? post.slug : study!.blogSlug;
  const url = `${siteMetadata.siteUrl}/blog/${slug}`;
  const publishedIso = new Date(entry.date).toISOString();
  const firstParagraphMatch = entry.content.match(/<p>(.*?)<\/p>/i);
  const firstParagraph = firstParagraphMatch
    ? firstParagraphMatch[1].replace(/<[^>]+>/g, "")
    : entry.content.replace(/<[^>]+>/g, "").slice(0, 280);
  const description = entry.excerpt || firstParagraph;
  const ogImage = entry.image ?? fallbackImage;

  return {
    title: `${entry.title} | Vodena Bašta`,
    description,
    alternates: {
      canonical: `${siteMetadata.siteUrl}/blog/${slug}`,
    },
    openGraph: {
      ...(defaultMetadata.openGraph ?? {}),
      title: entry.title,
      description,
      url,
      type: "article",
      publishedTime: publishedIso,
      tags: [entry.category],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      ...(defaultMetadata.twitter ?? {}),
      title: entry.title,
      description,
      images: [ogImage],
    },
    other: {
      "article:published_time": publishedIso,
      "article:tag": entry.category,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  const study = studies.find((item) => item.blogSlug === params.slug);
  const entry = post ?? study;

  if (!entry) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("sr-RS", { dateStyle: "long" }).format(new Date(entry.date));
  const isStudy = !!study;

  // Render study layout (matches screenshot)
  if (isStudy) {
    return (
      <article className="vb-section pb-28 pt-24">
        <div className="relative pb-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(720px_320px_at_50%_0%,rgba(0,198,255,0.25),transparent_75%)] opacity-70 blur-[60px]" />
          <section className="relative mx-auto max-w-6xl overflow-hidden rounded-[3rem] border border-white/20 bg-white/[0.02] shadow-[0_35px_160px_rgba(6,20,18,0.55)]">
            <div className="relative h-[min(60vh,520px)] w-full">
              <Image
                src={study.image}
                alt={study.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#001a17]/85 via-[#001f1a]/40 to-transparent" />
              <div className="relative flex h-full flex-col justify-end gap-4 p-10 text-white sm:p-14">
                <nav aria-label="Putanja" className="text-sm text-emerald-100/75">
                  <ol className="flex flex-wrap items-center gap-2">
                    <li>
                      <Link href="/" className="transition hover:text-white focus-visible:text-white">
                        Početna
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <Link href="/blog" className="transition hover:text-white focus-visible:text-white">
                        Blog
                      </Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <span className="transition">Studija</span>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li className="font-semibold text-white">{study.title}</li>
                  </ol>
                </nav>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
                    {study.category}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
                    Studija iz prakse
                  </span>
                  <span className="text-sm text-emerald-100/80">{formattedDate}</span>
                </div>
                <h1 className="max-w-4xl text-balance text-4xl font-semibold sm:text-5xl">{study.title}</h1>
                <p className="max-w-3xl text-lg text-emerald-100/85">{study.excerpt}</p>
              </div>
            </div>
          </section>
        </div>

        <Container className="relative space-y-10">
          <div className="pointer-events-none absolute inset-x-[-18%] top-[-8%] h-48 rounded-[160px] bg-[radial-gradient(560px_260px_at_40%_50%,rgba(0,198,255,0.14),rgba(0,198,255,0))] blur-[48px] opacity-70" />

          <BackLink
            fallbackHref="/blog"
            label="← Nazad"
            className="text-sm font-medium text-emerald-200"
            matchPaths={["/blog", "/studies"]}
          />

          <div className="space-y-8 rounded-[2.5rem] border border-white/15 bg-white/[0.03] p-8 shadow-[0_24px_110px_rgba(4,16,20,0.5)] backdrop-blur md:p-12">
            <div className="prose prose-lg prose-invert prose-headings:font-semibold prose-headings:text-white prose-a:text-emerald-200/90 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: study.content }} />
            </div>
          </div>
        </Container>
      </article>
    );
  }

  // Render blog post layout
  if (!post) {
    notFound();
  }

  return (
    <article className="vb-section pb-24 pt-24">
      <Container className="relative space-y-10">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-12%] h-52 rounded-[160px] bg-[radial-gradient(560px_260px_at_40%_50%,rgba(0,198,255,0.16),rgba(0,198,255,0))] blur-[52px] opacity-70" />

        <nav aria-label="Putanja" className="text-sm text-emerald-100/70">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white focus-visible:text-white">
                Početna
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="transition hover:text-white focus-visible:text-white">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white">{post.title}</li>
          </ol>
        </nav>

        <BackLink fallbackHref="/blog" label="← Nazad" className="text-sm font-medium text-emerald-200" />

        <header className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
            {post.category}
          </span>
          <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">{post.title}</h1>
          {post.excerpt && (
            <p className="text-lg leading-relaxed text-emerald-100/85 max-w-3xl">{post.excerpt}</p>
          )}
          <p className="text-sm text-emerald-100/70">{formattedDate}</p>
        </header>

        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-[linear-gradient(160deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] shadow-[0_28px_120px_rgba(4,16,24,0.48)]">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-90" />
          </div>
        </div>

        <div className="prose prose-lg prose-invert prose-headings:font-semibold prose-headings:text-white prose-a:text-emerald-200/90 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Container>
    </article>
  );
}

