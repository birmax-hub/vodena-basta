'use client';

import { motion } from "framer-motion";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function HeroLeaf() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative grid gap-12 py-20 lg:grid-cols-[1fr_minmax(280px,420px)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
            Pioniri akvaponije u Srbiji
          </span>
          <h1 className="text-4xl font-bold uppercase tracking-tight text-forest-900 sm:text-5xl lg:text-6xl">
            Vodena Bašta
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-forest-700">
            Prvi u potpunosti funkcionalan sistem akvaponije u Srbiji. Vodena
            Bašta spaja proizvodnju ribe i povrća u zatvorenom ciklusu kako bi
            obezbedila svež, lokalni i nutritivno bogat prinos tokom cele godine.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#akvaponija" size="lg">
              Saznaj više
            </ButtonLink>
            <ButtonLink href="#kontakt" variant="secondary" size="lg">
              Kontakt
            </ButtonLink>
          </div>
          <dl className="grid gap-4 text-sm text-forest-700 sm:grid-cols-3">
            <div>
              <dt className="font-semibold uppercase tracking-wide text-forest-500">
                70% manje vode
              </dt>
              <dd>Recirkulacija hranljivih materija bez hemije.</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-forest-500">
                Monitoring 24/7
              </dt>
              <dd>Digitalni nadzor parametara za stabilan rad sistema.</dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-forest-500">
                Prinos cele godine
              </dt>
              <dd>Kontrolisani uslovi i stalna dostupnost svežih proizvoda.</dd>
            </div>
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative h-[320px] overflow-hidden rounded-[3rem] border border-white/[0.02] bg-white/[0.08] p-6 backdrop-blur sm:h-[380px]"
        >
          <div className="absolute inset-6 overflow-hidden rounded-[2.5rem]">
            <Image
              src="/images/hero.jpg"
              alt="Akvaponski sistem Vodena Bašta sa zelenim lisnatim kulturama"
              fill
              className="leaf-mask object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/[0.02] bg-white/[0.1] px-4 py-3 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-wide text-brand-600">
                Ekosistem u ravnoteži
              </p>
              <p className="text-sm font-semibold text-forest-700">
                Biljke hrane ribu, riba hrani biljke.
              </p>
            </div>
            <div className="text-right text-xs text-forest-500">
              Stapar, Srbija
              <br />
              12.8 °C voda
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

