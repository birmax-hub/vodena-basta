"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";

import { SectionReveal } from "@/components/ux/SectionReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { PrimaryLink } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";

export function ProductHighlight() {
  return (
    <SectionReveal delay={0.05}>
      <article
        id="proizvodi"
        className="group relative grid gap-10 overflow-hidden rounded-[3.2rem] border border-white/[0.04] bg-[linear-gradient(170deg,rgba(10,33,30,0.65)_0%,rgba(6,18,27,0.88)_55%,rgba(4,9,18,0.95)_100%)] p-10 shadow-[0_40px_160px_rgba(5,18,28,0.55)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="space-y-6 text-accent-200">
          <span className="inline-flex items-center rounded-full border border-white/[0.04] bg-white/[0.08] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent-200/90 backdrop-blur">
            Akvadajz
          </span>
          <h3 className="text-3xl font-semibold text-white">Najtraženiji paradajz iz akvaponskog sistema</h3>
          <p className="text-base leading-relaxed text-accent-200/80">
            Domaći paradajz u staklenoj boci, bez aditiva, ručno bran i spakovan u roku od 24 sata. Idealno za HoReCa
            sektor i specijalizovane prodavnice zdrave hrane.
          </p>
          <HoverCard className="space-y-4 p-6 text-sm text-accent-200/85">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-300">
                Zašto kupci vole Akvadajz
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Prirodno sladak ukus i visoka koncentracija likopena.",
                "Pakovanje u staklo čuva ukus, miris i boju.",
                "Dostava od farme do kuhinje u roku od 24 sata.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon icon={CheckCircle} size={20} className="mt-0.5 text-aqua-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </HoverCard>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div className="rounded-full border border-white/[0.04] bg-white/[0.08] px-5 py-2 text-sm text-accent-200/85 backdrop-blur">
              Cena: na upit
            </div>
            <PrimaryLink href="#kontakt" className="px-7 py-3 text-sm font-semibold">
              Poruči
            </PrimaryLink>
          </div>
        </div>
        <SectionReveal delay={0.12}>
          <div className="relative">
            <HoverCard className="h-full overflow-hidden rounded-[3rem] p-4">
              <div className="relative h-full min-h-[clamp(220px,34vw,340px)] overflow-hidden rounded-[2.6rem] border border-white/[0.04] bg-white/[0.08] backdrop-blur">
                <Image
                  src="/images/placeholders/proizvod-akvadajz.jpg"
                  alt="Akvadajz paradajz u boci iz Vodene Bašte"
                  fill
                  className="mask-organic object-cover"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
            </HoverCard>
          </div>
        </SectionReveal>
      </article>
    </SectionReveal>
  );
}


