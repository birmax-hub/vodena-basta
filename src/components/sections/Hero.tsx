'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { fadeInUp, stagger } from "@/components/animations/variants";
import { GradientText } from "@/components/ui/GradientText";
import { GhostLink, PrimaryLink } from "@/components/ui/Buttons";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? undefined : stagger(0.1, 0.2);

  return (
    <section id="hero" data-section="hero" className="vb-section relative overflow-hidden">
      <div className="vb-container relative z-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <motion.div
          className="relative z-10 space-y-6 text-accent-200"
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          variants={containerVariants}
        >
          <motion.span
            variants={prefersReducedMotion ? undefined : fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.045] bg-white/[0.1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-accent-200/95 backdrop-blur"
          >
            Vodena Bašta
          </motion.span>
          <motion.h1 variants={prefersReducedMotion ? undefined : fadeInUp} className="text-balance font-semibold text-white text-[clamp(2.3rem,4.5vw,3.8rem)]">
            Vodena <GradientText>Bašta</GradientText>
          </motion.h1>
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeInUp}
            className="max-w-2xl text-[clamp(1.02rem,1.45vw,1.22rem)] leading-relaxed text-accent-200/80"
          >
            Prvi u potpunosti funkcionalan sistem akvaponije u Srbiji. Vodena Bašta spaja proizvodnju ribe i povrća u
            zatvorenom ciklusu kako bi obezbedila svež, lokalni i nutritivno bogat prinos tokom cele godine.
          </motion.p>
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeInUp}
            className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap"
          >
            <PrimaryLink href="#kontakt">Zakaži konsultaciju</PrimaryLink>
            <GhostLink href="#projekti" className="px-6 py-3">
              Pogledaj projekte
            </GhostLink>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10 w-full"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={prefersReducedMotion ? undefined : { duration: 0.9, ease: [0.17, 0.8, 0.25, 1] }}
        >
          <div className="pointer-events-none absolute -left-20 top-6 h-40 w-40 rounded-full bg-aqua-500/14 blur-3xl" />
          <motion.div
            className="relative overflow-hidden rounded-[3rem] border border-white/[0.045] bg-[linear-gradient(160deg,rgba(11,38,34,0.62)_0%,rgba(6,16,25,0.88)_55%,rgba(4,10,20,0.95)_100%)] p-6 shadow-[0_36px_150px_rgba(5,18,24,0.5)] backdrop-blur-xl"
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
            }
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.05] bg-white/[0.1] p-5 backdrop-blur">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-accent-200/65">
                <span>AI uplink · Sistem ravnoteže</span>
                <span>Stapar · Srbija</span>
              </div>
              <div className="mt-4 h-[clamp(220px,34vw,280px)] overflow-hidden rounded-[2.25rem] border border-white/[0.02]">
                <Image
                  src="/images/hero.jpg"
                  alt="Akvaponski sistem Vodena Bašta sa zelenim lisnatim kulturama"
                  fill
                  className="mask-organic object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-xs text-accent-200/80">
                <div>
                  <p className="uppercase tracking-wide text-accent-200/60">Voda</p>
                  <p className="text-lg font-semibold text-white">12.8°C</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-accent-200/60">Oksigen</p>
                  <p className="text-lg font-semibold text-leaf-300">97%</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-accent-200/60">Obrada</p>
                  <p className="text-lg font-semibold text-white">Stabilno</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

