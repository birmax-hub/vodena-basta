"use client";

import { Droplet, Leaf, ShieldCheck, RefreshCw } from "lucide-react";

import { SectionReveal } from "@/components/ux/SectionReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { Icon } from "@/components/ui/Icon";

const BENEFITS = [
  {
    icon: Droplet,
    title: "90% manje vode",
    description: "Recirkulacija hranljivih materija održava sistem i čuva resurse.",
  },
  {
    icon: ShieldCheck,
    title: "Bez hemije",
    description: "Sistem je zatvoren, nema potrebe za pesticidima ni aditivima.",
  },
  {
    icon: Leaf,
    title: "Čista hrana",
    description: "Biljke usvajaju prirodne nitrate dobijene od ribe i bakterija.",
  },
  {
    icon: RefreshCw,
    title: "Zatvoren ciklus",
    description: "Biljke, ribe i voda funkcionišu u kružnom toku tokom cele godine.",
  },
] as const;

export function BenefitEco() {
  return (
    <SectionReveal className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" childSelector="[data-benefit-card]">
      {BENEFITS.map((benefit) => (
        <HoverCard key={benefit.title} data-benefit-card className="p-6">
          <div className="relative">
            <span className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-aqua-500/15 blur-2xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.045] bg-[linear-gradient(150deg,rgba(21,68,60,0.42)_0%,rgba(8,23,32,0.78)_100%)] shadow-[0_18px_60px_rgba(104,236,214,0.25)] backdrop-blur-xl">
              <Icon icon={benefit.icon} size={26} aria-hidden />
            </div>
            <h3 className="mt-6 text-lg font-semibold text-white">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-accent-200/80">{benefit.description}</p>
          </div>
        </HoverCard>
      ))}
    </SectionReveal>
  );
}

