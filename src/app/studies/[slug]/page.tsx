import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BackLink } from "@/components/BackLink";
import { Container } from "@/components/ui/Container";
import { studies } from "@/data/studies";
import { defaultMetadata, siteMetadata } from "@/lib/seo-config";

export const dynamic = "force-static";

type StudyPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: StudyPageProps): Promise<Metadata> {
  const study = studies.find((item) => item.slug === params.slug);
  const fallbackImage = `${siteMetadata.siteUrl}/images/og-default.jpg`;

  if (!study) {
    return {
      title: "Studija | Vodena Bašta",
      description:
        "Detaljne studije slučaja o implementaciji akvaponskih sistema, logistici i operativnom vođenju Vodene Bašte.",
      openGraph: {
        title: "Studija | Vodena Bašta",
        description:
          "Detaljne studije slučaja o implementaciji akvaponskih sistema, logistici i operativnom vođenju Vodene Bašte.",
        url: `${siteMetadata.siteUrl}/studies`,
      },
      alternates: {
        canonical: "/blog",
      },
    };
  }

  const publishedIso = new Date(study.date).toISOString();
  const description = study.excerpt;
  const ogImage = study.image ?? fallbackImage;
  const url = `${siteMetadata.siteUrl}/studies/${study.slug}`;

  return {
    title: `${study.title} | Vodena Bašta`,
    description,
    alternates: {
      canonical: `/studies/${study.slug}`,
    },
    openGraph: {
      ...(defaultMetadata.openGraph ?? {}),
      type: "article",
      title: study.title,
      description,
      url,
      publishedTime: publishedIso,
      tags: [study.category],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: study.title,
        },
      ],
    },
    twitter: {
      ...(defaultMetadata.twitter ?? {}),
      title: study.title,
      description,
      images: [ogImage],
    },
    other: {
      "article:published_time": publishedIso,
      "article:tag": study.category,
    },
  };
}

export default function StudyPage({ params }: StudyPageProps) {
  const study = studies.find((item) => item.slug === params.slug);

  if (!study) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("sr-RS", { dateStyle: "long" }).format(new Date(study.date));

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
              sizes="100vw"
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

