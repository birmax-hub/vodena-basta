"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HoverCard } from "@/components/ui/HoverCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  title: string;
  excerpt: string;
  href?: string;
  disabled?: boolean;
  image: string;
  className?: string;
};

export function BlogCard({ title, excerpt, href, disabled = false, image, className }: BlogCardProps) {
  const content = (
    <HoverCard as="article" className={cn("flex h-full flex-col", className)}>
      <div className="relative h-48 w-full overflow-hidden rounded-[2.5rem]">
        <Image
          src={image}
          alt={`Ilustracija: ${title}`}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 360px"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,16,17,0.95)_0%,rgba(6,22,30,0.65)_45%,transparent_100%)] opacity-85 transition group-hover:opacity-95" />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-8">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-accent-200/80">{excerpt}</p>
        <div className="flex items-center gap-2 text-sm font-semibold text-aqua-200">
          <span>Pročitaj više</span>
          <Icon
            icon={ArrowRight}
            size={20}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
            aria-hidden
          />
        </div>
      </div>
    </HoverCard>
  );

  if (disabled || !href) {
    return (
      <div className="pointer-events-none opacity-70" aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      prefetch={false}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua-500/50"
    >
      {content}
    </Link>
  );
}


