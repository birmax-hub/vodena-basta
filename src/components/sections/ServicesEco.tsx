"use client";

import { ArrowRight, Compass, Layers3, LifeBuoy } from "lucide-react";

import { SectionReveal } from "@/components/ux/SectionReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { Icon } from "@/components/ui/Icon";

const SERVICES = [
  {
    icon: Compass,
    title: "Projektovanje",
    bullets: [
      "Analiza lokacije i dostupne infrastrukture.",
      "Dimenzionisanje biofiltra i hidroponskih leja.",
      "Plan svetla, vode i monitoring sistema.",
    ],
  },
  {
    icon: Layers3,
    title: "Izgradnja i ugradnja",
    bullets: [
      "Modularni rezervoari i hidroponske leje.",
      "Automatizacija hranjenja i cirkulacije.",
      "Integracija senzora i daljinskog nadzora.",
    ],
  },
  {
    icon: LifeBuoy,
    title: "Konsalting i održavanje",
    bullets: [
      "Obuka tima za svakodnevnu rutinu.",
      "Plan nutritivnog balansa i parametara.",
      "Podrška pri subvencijama i plasmanskim modelima.",
    ],
  },
] as const;

export function ServicesEco() {
  return (
    <SectionReveal className="grid gap-6 md:grid-cols-3" childSelector="[data-service-card]">
      {SERVICES.map((service) => (
        <HoverCard key={service.title} data-service-card className="flex h-full flex-col p-8">
          <div className="relative flex items-start gap-4">
            <span className="pointer-events-none absolute -left-8 -top-10 h-20 w-20 rounded-full bg-leaf-500/15 blur-2xl" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.045] bg-[linear-gradient(150deg,rgba(23,74,66,0.42)_0%,rgba(9,26,32,0.78)_100%)] shadow-[0_18px_60px_rgba(24,194,196,0.28)] backdrop-blur-xl">
              <Icon icon={service.icon} size={26} aria-hidden />
            </div>
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
          </div>
          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-accent-200/80">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aqua-500/40" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 text-sm font-medium text-aqua-200 transition-colors duration-300 hover:text-white"
            >
              Saznaj više
              <Icon
                icon={ArrowRight}
                size={20}
                className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                aria-hidden
              />
            </a>
          </div>
        </HoverCard>
      ))}
    </SectionReveal>
  );
}


