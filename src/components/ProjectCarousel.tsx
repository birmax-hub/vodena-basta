'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
  location: string;
};

type ProjectCarouselProps = {
  projects: Project[];
};

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const nextIndex = (index + projects.length) % projects.length;
    setCurrent(nextIndex);
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.04] bg-[linear-gradient(165deg,rgba(8,27,24,0.65)_0%,rgba(6,16,24,0.9)_58%,rgba(4,9,18,0.98)_100%)] shadow-[0_36px_150px_rgba(4,16,24,0.52)] backdrop-blur-xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.article
            key={projects[current].title}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 p-6 sm:grid-cols-[0.9fr_1.1fr] sm:p-10"
          >
            <div className="relative h-56 overflow-hidden rounded-3xl sm:h-full">
              <Image
                src={projects[current].image}
                alt={`Projekat ${projects[current].title} u mestu ${projects[current].location}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 360px"
              />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-aqua-200/80">
                {projects[current].location}
              </span>
              <h3 className="text-2xl font-semibold text-white">{projects[current].title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-accent-200/80">{projects[current].description}</p>
              <Link
                href={projects[current].href}
                className="group inline-flex w-fit items-center gap-2 rounded-full border border-aqua-500/25 px-5 py-2 text-sm font-semibold text-aqua-200 transition hover:border-aqua-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
              >
                Pitaj za sličan projekat
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.article>
        </AnimatePresence>
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.02] bg-white/[0.05] p-3 text-accent-200 transition hover:-translate-y-1/2 hover:translate-x-0.5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
          aria-label="Prethodni projekat"
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => goTo(current + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/[0.02] bg-white/[0.05] p-3 text-accent-200 transition hover:-translate-y-1/2 hover:-translate-x-0.5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
          aria-label="Sledeći projekat"
        >
          <ChevronRight size={18} aria-hidden />
        </button>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {projects.map((project, index) => (
          <button
            key={project.title}
            type="button"
            onClick={() => goTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition",
              current === index ? "bg-aqua-500" : "bg-accent-200/40 hover:bg-aqua-400/70",
            )}
            aria-label={`Prikaži projekat ${project.title}`}
            aria-pressed={current === index}
          />
        ))}
      </div>
    </div>
  );
}


