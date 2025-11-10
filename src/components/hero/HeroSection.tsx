'use client';

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-hero-water px-4 py-[clamp(4rem,8vw,6.5rem)] sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(71,156,152,0.35),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(167,208,128,0.2),transparent_60%)]" />
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-flex items-center rounded-full border border-white/[0.025] bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-accent-200 backdrop-blur">
            Vodena Bašta
          </span>
          <div className="space-y-6">
            <h1 className="text-[clamp(2.5rem,5vw,4.2rem)] font-semibold leading-tight text-white">
              Vodena Bašta
            </h1>
            <p className="max-w-xl text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-accent-100/90">
              Prvi u potpunosti funkcionalan sistem akvaponije u Srbiji. Vodena
              Bašta spaja proizvodnju ribe i povrća u zatvorenom ciklusu kako bi
              obezbedila svež, lokalni i nutritivno bogat prinos tokom cele godine.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <ButtonLink href="#akvaponija" className="glass-button px-8 py-3 text-base">
              Saznaj više
            </ButtonLink>
            <ButtonLink
              href="#kontakt"
              variant="secondary"
              className="glass-button border-white/20 bg-transparent px-8 py-3 text-base hover:bg-white/10 focus-visible:outline-white/40"
            >
              Kontakt
            </ButtonLink>
          </div>
          <dl className="grid gap-6 text-sm text-accent-100/80 sm:grid-cols-3">
            <div>
              <dt className="font-semibold uppercase tracking-wide text-accent-200/90">
                70% manje vode
              </dt>
              <dd>Recirkulacija hranljivih materija bez hemije.</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-accent-200/90">
                Monitoring 24/7
              </dt>
              <dd>Digitalni nadzor parametara za stabilan rad sistema.</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-accent-200/90">
                Prinos cele godine
              </dt>
              <dd>Kontrolisani uslovi i stalna dostupnost svežih proizvoda.</dd>
            </div>
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95, y: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-x-6 -inset-y-8 -z-10 rounded-[3.5rem] bg-white/[0.04] blur-3xl" />
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [-8, 8, -8],
                    rotate: [-1.2, 1.2, -1.2],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }
            className="glass-panel relative overflow-hidden rounded-[3.25rem] border-white/[0.025] bg-white/[0.04] p-4 shadow-[0_0_60px_rgba(26,217,206,0.06)] backdrop-blur-2xl"
          >
            <div className="relative h-[340px] w-full overflow-hidden rounded-[3rem]">
              <Image
                src="/images/hero.jpg"
                alt="Akvaponski sistem Vodena Bašta sa zelenim lisnatim kulturama"
                fill
                priority
                className="mask-organic object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
            </div>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.03] bg-white/[0.06] px-5 py-4 text-sm text-accent-100 shadow-[0_0_35px_rgba(26,217,206,0.08)] backdrop-blur">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent-200/80">
                  Ekosistem u ravnoteži
                </p>
                <p className="font-semibold text-white">
                  Biljke hrane ribu, riba hrani biljke.
                </p>
              </div>
              <div className="text-right text-xs text-accent-200/70">
                Stapar, Srbija
                <br />12.8 °C voda
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0c2e24] to-transparent" />
    </section>
  );
}

