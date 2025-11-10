"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";

import { SectionReveal } from "@/components/ux/SectionReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { Icon } from "@/components/ui/Icon";

type PortfolioItem = {
  title: string;
  description: string;
  image: string;
  location: string;
};

type PortfolioCarouselProps = {
  items: PortfolioItem[];
};

export function PortfolioCarousel({ items }: PortfolioCarouselProps) {
  return (
    <SectionReveal
      className="-mx-4 overflow-x-auto pb-6 sm:-mx-6 lg:-mx-8 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden"
      childSelector="[data-portfolio-card]"
    >
      <div className="flex snap-x snap-mandatory gap-6 px-4 sm:px-6 lg:px-8">
        {items.map((item) => (
          <HoverCard
            as="article"
            key={item.title}
            data-portfolio-card
            className="group relative flex w-80 shrink-0 snap-start flex-col overflow-hidden rounded-[2.5rem] sm:w-96"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={`Projekat ${item.title} u mestu ${item.location}`}
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
                sizes="320px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-900/90 via-transparent to-transparent opacity-80 transition group-hover:opacity-95" />
            </div>
            <div className="relative flex flex-1 flex-col justify-end gap-3 p-6 text-accent-200/85">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-aqua-200/80">
                <Icon icon={MapPin} size={18} aria-hidden />
                <span>{item.location}</span>
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-accent-200/80">{item.description}</p>
            </div>
          </HoverCard>
        ))}
      </div>
    </SectionReveal>
  );
}


