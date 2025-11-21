import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { BlogListing } from "@/components/blog/BlogListing";
import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";
import { defaultMetadata, siteMetadata } from "@/lib/seo-config";

export const dynamic = "force-static";
export const revalidate = 3600;

const allItems = [...blogPosts, ...studies].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const ogImage = allItems[0]?.image ?? `${siteMetadata.siteUrl}/images/og-default.jpg`;
const pageTitle = "Blog i studije | Vodena Bašta";
const pageDescription = "Znanje i praksa iz akvaponije, održivog uzgoja i inovacija.";
const canonicalPath = "/blog";
const pageUrl = `${siteMetadata.siteUrl}${canonicalPath}`;

export const metadata: Metadata = {
  ...defaultMetadata,
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    ...(defaultMetadata.openGraph ?? {}),
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    ...(defaultMetadata.twitter ?? {}),
    title: pageTitle,
    description: pageDescription,
    images: [ogImage],
  },
};

export default function BlogPage() {
  return (
    <section className="vb-section pb-24 pt-28">
      <Container className="relative space-y-16">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-10%] h-52 rounded-[160px] bg-[radial-gradient(560px_260px_at_40%_50%,rgba(0,198,255,0.16),rgba(0,198,255,0))] blur-[52px] opacity-70" />

        <header className="space-y-4 text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-100">
            Blog Vodene Bašte
          </span>
          <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
            Priče, znanje i praksa iz našeg akvaponskog ekosistema
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-emerald-100/80">
            Istražite uvodne vodiče, praktične savete i ekološke teme koje gradimo kroz projekte i partnerstva u
            akvaponiji.
          </p>
        </header>

        <BlogListing items={allItems} />
      </Container>
    </section>
  );
}

