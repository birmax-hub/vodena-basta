'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type ListingItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  type: "blog" | "study";
};

type FilterValue = "all" | "blog" | "study";

const FILTERS: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "Sve" },
  { value: "blog", label: "Blog" },
  { value: "study", label: "Studije" },
];

type BlogListingProps = {
  items: ListingItem[];
};

export function BlogListing({ items }: BlogListingProps) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.type === filter);
  }, [filter, items]);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {FILTERS.map((option) => {
          const isActive = option.value === filter;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              className={cn(
                "relative inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60",
                isActive
                  ? "border-white/25 bg-white/12 text-white shadow-[0_12px_40px_rgba(0,255,200,0.18)]"
                  : "border-white/10 bg-white/5 text-emerald-100/75 hover:border-white/20 hover:text-white",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const href = item.type === "blog" ? `/blog/${item.slug}` : `/studies/${item.slug}`;
          const readableDate = new Intl.DateTimeFormat("sr-RS", { dateStyle: "long" }).format(
            new Date(item.date),
          );

          return (
            <Link
              key={`${item.type}-${item.slug}`}
              href={href}
              prefetch={true}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_28px_120px_rgba(4,16,24,0.48)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu hover:-translate-y-2 hover:shadow-[0_30px_130px_rgba(44,222,214,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative -mx-6 -mt-6 aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
              </div>
              <div className="relative flex flex-1 flex-col space-y-4 pt-4 text-emerald-50">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center self-start rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
                    {item.category}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
                    {item.type === "blog" ? "Blog" : "Studija"}
                  </span>
                </div>
                <h2 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold text-white">{item.title}</h2>
                <p className="text-sm text-emerald-100/70">{readableDate}</p>
                <p className="flex-1 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-emerald-100/80">
                  {item.excerpt}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-[clamp(0.95rem,1.35vw,1.05rem)] font-semibold text-emerald-200 transition group-hover:text-white">
                  {item.type === "blog" ? "Pročitaj više →" : "Otvori studiju →"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

