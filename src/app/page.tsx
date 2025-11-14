'use client';

import Script from "next/script";

import { ScrollTopButton } from "@/components/ScrollTopButton";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { GhostLink, PrimaryLink } from "@/components/ui/Buttons";
import { SectionReveal } from "@/components/ux/SectionReveal";
import { cn } from "@/lib/utils";
import { blogPostingJsonLd, productJsonLd, websiteJsonLd } from "@/lib/seo";
import { ArrowUpRight, CheckCircle2, Droplet, Leaf, Recycle, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type ComponentProps } from "react";
import { AboutUsGallery } from "@/components/AboutUsGallery";
import { AkvaponijaDiagram } from "@/components/AkvaponijaDiagram";
import { StruriaShowcase } from "@/components/StruriaShowcase";
import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";

const trustStats = [
  "10+ realizovanih sistema",
  "90% manje vode",
  "Bez pesticida",
];

const socialProof = [
  "Investitori i fondovi održive poljoprivrede",
  "Hotelski i restoranski lanci",
  "Obrazovne institucije i R&D centri",
  "Specijalizovane prodavnice zdrave hrane",
];

const benefits = [
  {
    icon: Droplet,
    title: "90% manje vode",
    copy: "Recirkulacija svakog litra vode i nutritivnog rastvora uz minimalne gubitke.",
  },
  {
    icon: ShieldCheck,
    title: "Bez hemije i pesticida",
    copy: "Potpuno kontrolisano okruženje daje hranu bez rezidua i mikrobioloških rizika.",
  },
  {
    icon: Leaf,
    title: "Čista hrana tokom cele godine",
    copy: "Stabilna temperatura i svetlo obezbeđuju odmicanje od sezonalnosti i uvoza.",
  },
  {
    icon: Recycle,
    title: "Zatvoren ciklus, niži troškovi",
    copy: "Biljke i ribe razmenjuju hranljive materije pa nema otpada ni skupog đubriva.",
  },
];

const projects = [
  {
    title: "Urban Garden · Novi Sad",
    vertical: "Krovna farma za fine dining i lokalne trgovine",
    result: "900 kg premium povrća mesečno, logistika u istom danu.",
    palette: "from-teal-400/40 via-emerald-400/20 to-transparent",
  },
  {
    title: "HoReCa Hub · Beograd",
    vertical: "Centralizovana mikrozelen farma za hotelske lance",
    result: "Plan berbe po aplikaciji, eliminisan uvoz licitnih kultura.",
    palette: "from-cyan-400/35 via-blue-500/20 to-transparent",
  },
  {
    title: "R&D Campus · Zlatibor",
    vertical: "Edukativni i istraživački centar za univerzitete",
    result: "Laboratorijska kontrola parametara i otvoreni kursevi.",
    palette: "from-emerald-300/35 via-lime-400/20 to-transparent",
  },
];

const productHighlights = [
  {
    label: "Akvadajz · paradajz iz akvaponije",
    reasons: [
      "Prirodno sladak ukus i visok sadržaj likopena",
      "Pakovanje u staklo zadržava aromu i teksturu",
      "Berba i isporuka u roku od 24 sata",
    ],
  },
];

const featuredStudies = studies.slice(0, 3);

const blogItems = featuredStudies.map((study) => ({
  title: study.title,
  excerpt: study.excerpt,
  category: study.category,
  slug: study.blogSlug,
  href: `/blog/${study.blogSlug}`,
  ctaLabel: "Pročitaj studiju",
  showArrow: true,
  image: null,
  structuredData: blogPostingJsonLd({
    title: study.title,
    description: study.excerpt,
    slug: study.blogSlug,
    image: study.image,
    datePublished: study.date,
  }),
}));

const finalBullets = [
  "Procena potencijala lokacije i tržišnog fit-a",
  "Finansijski model, ROI simulacija i operativni plan",
  "Pregled tehnologije, automatizacije i potrebnog tima",
];

const HERO_PARTICLES = [
  { top: "10%", left: "18%", size: 160, delay: "0s" },
  { top: "68%", left: "12%", size: 120, delay: "1.6s" },
  { top: "28%", right: "16%", size: 190, delay: "2.8s" },
  { bottom: "12%", right: "22%", size: 140, delay: "4.2s" },
  { top: "52%", left: "46%", size: 110, delay: "5.6s" },
];

const HERO_ORBS = [
  { top: "12%", left: "18%", size: 240, delay: 0 },
  { bottom: "20%", right: "10%", size: 280, delay: 1.4 },
  { top: "55%", left: "45%", size: 200, delay: 2.8 },
];

const heroHeadlineLines = ["Stabilna proizvodnja.", "Čista hrana.", "Pametan sistem."];

const heroStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const heroStaggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const MotionDivComponent = (props: ComponentProps<typeof motion.div>) => <motion.div {...props} />;
const MotionSectionComponent = (props: ComponentProps<typeof motion.section>) => <motion.section {...props} />;

function GradientBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-teal-100 backdrop-blur">
      {children}
    </span>
  );
}

function TrustRibbon() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-4 text-[13px] text-teal-100 backdrop-blur">
      {trustStats.map((stat) => (
        <div key={stat} className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <span>{stat}</span>
        </div>
      ))}
    </div>
  );
}

function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionDivComponent
      className="space-y-8 pt-16 sm:pt-20 md:pt-24 text-white"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <GradientBadge>Vodena Bašta · Premium Akvaponija</GradientBadge>

      <div className="space-y-6">
        <motion.h1
          className="relative text-balance text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] md:leading-[1.06] tracking-[-0.015em] after:pointer-events-none after:absolute after:left-0 after:bottom-[-0.7rem] after:h-[2px] after:w-28 after:rounded-full after:bg-gradient-to-r after:from-accentBlue-400/90 after:via-accentYellow-400/70 after:to-transparent"
          variants={heroStaggerContainer}
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
        >
          {heroHeadlineLines.map((line, index) => (
            <motion.span
              key={line}
              className="block text-shimmer"
              variants={heroStaggerItem}
              transition={{ delay: index * 0.2 }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>
        <p className="max-w-2xl text-[clamp(1.02rem,1.45vw,1.22rem)] leading-relaxed md:leading-loose text-emerald-100/85">
          Projektujemo, automatizujemo i vodimo akvaponske hubove koji isporučuju vrhunske proizvode tokom cele godine –
          bez pesticida, sa minimalnim resursima i potpunom kontrolom kvaliteta.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-3 text-[clamp(0.92rem,1.25vw,1.05rem)] text-emerald-100/85 sm:grid-cols-2 lg:grid-cols-3"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        {["90% manje vode", "AI nadzor sistema", "Bez hemije"].map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 shadow-[0_12px_40px_rgba(18,200,170,0.22)] transition hover:border-brand-aqua/60 hover:text-white"
          >
            <ShieldCheck className="h-4 w-4 text-brand-aqua" />
            {badge}
          </span>
        ))}
      </motion.div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap">
        <motion.div
          initial={prefersReducedMotion ? undefined : { boxShadow: "0 0 0 rgba(0, 255, 180, 0)", scale: 1 }}
          animate={prefersReducedMotion ? undefined : { boxShadow: ["0 0 0 rgba(0,255,180,0)", "0 0 22px rgba(0,255,180,0.32)", "0 0 0 rgba(0,255,180,0)"] , scale: [1, 1.04, 1] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.4, ease: "easeOut" }}
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05, boxShadow: "0 0 20px rgba(0,255,180,0.4)" }}
        >
          <PrimaryLink
            href="#kontakt"
            intent="consultation"
            className="cta-primary-animate btn-shimmer overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 text-sm font-semibold tracking-wide text-white ring-1 ring-emerald-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            Zakaži konsultaciju
          </PrimaryLink>
        </motion.div>
        <GhostLink
          href="#akvaponija"
          className="btn-aurora cta-secondary-animate overflow-hidden rounded-xl border border-white/8 bg-transparent px-8 py-3 text-sm font-semibold text-white/90 shadow-[0_0_20px_rgba(32,185,165,0.15)] hover:border-emerald-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          Saznaj više
        </GhostLink>
      </div>

      <TrustRibbon />
    </MotionDivComponent>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionSectionComponent
      id="pocetak"
      className="hero-root relative isolate min-h-[85vh] overflow-hidden py-[clamp(3.5rem,7vw,6rem)]"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[38%] h-[440px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle,rgba(22,140,120,0.45)_0%,rgba(22,140,120,0)_70%)] blur-[160px] opacity-70" />
        <div className="hero-bg-flow" />
        <div className="absolute -left-40 top-[-25%] h-[580px] w-[580px] rounded-full bg-[radial-gradient(circle_at_center,rgba(71,255,209,0.28),transparent_74%)] blur-3xl" />
        <div className="absolute -right-28 top-1/3 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle_at_center,rgba(116,193,255,0.2),transparent_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[conic-gradient(from_120deg_at_65%_45%,rgba(82,255,203,0.14),rgba(32,124,255,0.08),transparent_65%)] blur-2xl opacity-90" />
        {!prefersReducedMotion &&
          HERO_PARTICLES.map((particle, index) => (
            <span
              key={`hero-particle-${index}`}
              className="hero-particle absolute rounded-full bg-[radial-gradient(circle,rgba(87,255,214,0.28),rgba(87,255,214,0))]"
              style={{
                top: particle.top,
                left: particle.left,
                right: particle.right,
                bottom: particle.bottom,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
              }}
            />
          ))}
        {!prefersReducedMotion &&
          HERO_ORBS.map((orb, index) => (
            <span
              key={`hero-orb-${index}`}
              className="hero-orb"
              style={{
                top: orb.top,
                left: orb.left,
                right: orb.right,
                bottom: orb.bottom,
                width: orb.size,
                height: orb.size,
                animationDelay: `${orb.delay}s`,
              }}
            />
          ))}
      </div>

      <Container className="relative z-10 grid max-w-[1200px] items-center gap-10 px-4 mx-auto lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="pointer-events-none absolute inset-x-[-16%] top-[-14%] h-60 rounded-[200px] bg-[radial-gradient(680px_320px_at_42%_40%,rgba(0,198,255,0.18),rgba(0,198,255,0))] blur-[60px] opacity-75" />
        <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-12%] h-48 rounded-[160px] bg-[radial-gradient(540px_240px_at_70%_50%,rgba(255,214,51,0.1),rgba(255,214,51,0))] blur-[50px] opacity-65" />
        <HeroContent />
        <StruriaShowcase />
      </Container>
    </MotionSectionComponent>
  );
}

function TrustSection() {
  return (
    <section className="vb-section">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-12%] -top-24 h-48 rounded-[120px] bg-[radial-gradient(520px_220px_at_30%_50%,rgba(0,198,255,0.18),rgba(0,198,255,0))] blur-3xl opacity-80" />
        <div className="pointer-events-none absolute inset-x-[-18%] bottom-[-18%] h-52 rounded-[140px] bg-[radial-gradient(560px_260px_at_70%_50%,rgba(255,214,51,0.12),rgba(255,214,51,0))] blur-[52px] opacity-75" />
        <SectionReveal className="space-y-6 text-center">
          <GradientBadge>Veruju nam lideri</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Veruju nam farme, investitori i HoReCa kupci širom Srbije i regiona
          </h2>
          <p className="mx-auto max-w-2xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-emerald-100/85">
            Vodimo kompletne akvaponske programe za partnere koji zahtevaju stabilnu proizvodnju, transparentan kvalitet
            i brzu logistiku — od strateškog planiranja do svakodnevne operacije.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".trust-card">
          <div className="grid gap-6 rounded-[2.5rem] border border-white/20 bg-white/7 p-10 backdrop-blur">
            <div className="grid gap-6 text-sm text-emerald-100/90 lg:grid-cols-4">
              {socialProof.map((item) => (
                <div
                  key={item}
                  className="trust-card rounded-2xl border border-white/25 bg-white/12 px-6 py-5 text-left shadow-[0_18px_55px_rgba(4,16,24,0.35)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_60px_rgba(40,222,214,0.3)] hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,255,150,0.15)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.35em] text-emerald-200/60">
              <span className="transition-colors duration-200 hover:text-white/90">Farm DX</span>
              <span className="transition-colors duration-200 hover:text-white/90">Nova Linea</span>
              <span className="transition-colors duration-200 hover:text-white/90">R&D Alliance</span>
              <span className="transition-colors duration-200 hover:text-white/90">HoReCa Hub</span>
              <span className="transition-colors duration-200 hover:text-white/90">Green Campus</span>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function AboutSection() {
  return <AboutUsGallery />;
}

function BenefitsSection() {
  return (
    <section className="vb-section" id="akvaponija">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-14%] top-[-12%] h-44 rounded-[140px] bg-[radial-gradient(520px_220px_at_50%_50%,rgba(0,198,255,0.12),rgba(0,198,255,0))] blur-[46px] opacity-75" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Zašto akvaponija funkcioniše</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Voda, energija i hranljive materije u zatvorenom digitalizovanom ciklusu
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".benefit-card">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="benefit-card group relative overflow-hidden rounded-3xl border border-white/25 bg-[linear-gradient(160deg,rgba(5,26,23,0.78)_0%,rgba(3,11,18,0.9)_100%)] p-6 shadow-[0_28px_120px_rgba(3,14,20,0.45)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_30px_130px_rgba(44,222,214,0.28)] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,150,0.15)] hover:brightness-110"
              >
                <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(86,255,213,0.22),transparent_70%)] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-emerald-100 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(82,255,227,0.4)]">
                    <benefit.icon className="h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" strokeWidth={1.7} />
                  </span>
                  <h3 className="font-semibold text-white text-[clamp(1.1rem,1.8vw,1.35rem)]">{benefit.title}</h3>
                </div>
                <p className="relative mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-emerald-100/80">
                  {benefit.copy}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>
        <AkvaponijaDiagram />
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="vb-section" id="uzgoj-biljaka-i-riba">
      <Container className="relative">
        <div className="pointer-events-none absolute inset-x-[-16%] top-[-10%] h-56 rounded-[160px] bg-[radial-gradient(600px_260px_at_65%_40%,rgba(0,198,255,0.14),rgba(0,198,255,0))] blur-[48px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Uzgoj biljaka i riba</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.3rem,3.5vw,3rem)]">
            Savršena ravnoteža između dva ekosistema
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.12}>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.75rem] border border-white/15 bg-gradient-to-br from-[#0f3f2f] via-[#0c5037] to-[#093829] p-8 text-white shadow-[0_32px_140px_rgba(12,60,42,0.55)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_42px_160px_rgba(48,220,180,0.35)]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-leaf/15 blur-3xl" />
              </div>
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-leaf/80">
                  Biljke
                </div>
                <h3 className="text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold">Biljke – prirodni filter sistema</h3>
                <p className="text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-accent-200/85">
                  Biljke preuzimaju hranljive materije iz vode i vraćaju je čistu ribama. Naši sistemi omogućavaju uzgoj
                  raznih kultura tokom cele godine – bez zemlje i hemikalija.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm text-accent-200/80">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    <Leaf className="h-4 w-4" /> Salate &amp; mikrobilje
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    <Leaf className="h-4 w-4" /> Paradajz &amp; paprika
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    <Leaf className="h-4 w-4" /> Aromatično bilje
                  </span>
                </div>
              </div>
              <div className="relative mt-8 flex items-center justify-between text-sm text-accent-200/75">
                <PrimaryLink href="#kontakt" className="px-6 py-2 text-sm font-semibold">
                  Saznaj više
                </PrimaryLink>
              </div>
            </div>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.75rem] border border-white/15 bg-gradient-to-br from-[#06304a] via-[#053e5a] to-[#03293f] p-8 text-white shadow-[0_32px_140px_rgba(6,40,60,0.55)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_42px_160px_rgba(64,180,240,0.3)]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -bottom-28 left-6 h-72 w-72 rounded-full bg-brand-aqua/18 blur-3xl" />
              </div>
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-brand-aqua/80">
                  Ribe
                </div>
                <h3 className="text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold">Ribe – izvor hranljivih materija</h3>
                <p className="text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-accent-200/85">
                  Ribe stvaraju organski otpad koji se pretvara u hranu za biljke. Balans između količine ribe i biljaka
                  održava stabilan ekosistem i zdravu proizvodnju.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-accent-200/75">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-brand-aqua/70">
                      <Droplet className="h-4 w-4" /> Ribe
                    </p>
                    <p className="mt-2 text-[0.95rem] font-semibold text-white">Som, pastrmka, koi</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                    <p className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-brand-aqua/70">
                      <Droplet className="h-4 w-4" /> Monitoring
                    </p>
                    <p className="mt-2 text-[0.95rem] font-semibold text-white">Automatska filtracija i aeracija</p>
                  </div>
                </div>
              </div>
              <div className="relative mt-8 flex items-center justify-between text-sm text-accent-200/75">
                <PrimaryLink href="#kontakt" className="px-6 py-2 text-sm font-semibold">
                  Saznaj više
                </PrimaryLink>
              </div>
            </div>
            <motion.span
              className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              style={{ background: "linear-gradient(180deg, rgba(25,210,190,0) 0%, rgba(25,210,190,0.5) 50%, rgba(25,210,190,0) 100%)" }}
            />
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="vb-section" id="portfolio">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-14%] h-52 rounded-[160px] bg-[radial-gradient(560px_260px_at_58%_45%,rgba(0,198,255,0.16),rgba(0,198,255,0))] blur-[50px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Realizovani sistemi</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Premium farme koje smo pokrenuli zajedno sa investitorima i partnerima
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".project-card">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="project-card group relative overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_30px_130px_rgba(5,16,26,0.5)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_36px_150px_rgba(48,240,210,0.25)] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,150,0.15)] hover:brightness-110"
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-80",
                    project.palette,
                  )}
                />
                <div className="relative space-y-4 text-emerald-50">
                  <h3 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold text-white">{project.title}</h3>
                  <p className="text-[clamp(0.95rem,1.4vw,1.1rem)] text-emerald-100/85">{project.vertical}</p>
                  <p className="text-[clamp(0.95rem,1.35vw,1.05rem)] text-emerald-100/70">{project.result}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ProductSection() {
  return (
    <section className="vb-section" id="proizvodi">
      <Container className="relative space-y-10">
        <div className="pointer-events-none absolute inset-x-[-15%] top-[-12%] h-60 rounded-[180px] bg-[radial-gradient(640px_300px_at_50%_40%,rgba(0,198,255,0.16),rgba(0,198,255,0))] blur-[54px] opacity-75" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Premium proizvod</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Akvadajz — signature paradajz iz našeg akvaponskog sistema
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".product-card">
          {productHighlights.map((product) => (
            <div
              key={product.label}
              className="product-card group grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(165deg,rgba(8,30,26,0.72)_0%,rgba(5,14,21,0.92)_100%)] p-10 shadow-[0_40px_160px_rgba(5,16,26,0.52)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_46px_180px_rgba(48,240,210,0.22)] hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,255,150,0.15)] hover:brightness-110 xl:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="space-y-6 text-emerald-50">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/15 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100">
                  {product.label}
                </span>
                <h3 className="text-[clamp(1.9rem,3vw,2.6rem)] font-semibold text-white">
                  Od semena do pakovanja u jednom zatvorenom sistemu
                </h3>
                <ul className="space-y-4 text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                  {product.reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(45,255,199,0.35)]">
                        <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4 text-[clamp(0.95rem,1.35vw,1.05rem)] text-emerald-100/85">
                  <button
                    type="button"
                    onClick={() => window.location.assign("#kontakt")}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/12 px-7 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-[2px] hover:border-emerald-300/60 hover:text-emerald-50 hover:shadow-[0_0_18px_rgba(0,198,255,0.3)] hover:ring-1 hover:ring-cyan-400/40"
                  >
                    Poruči
                  </button>
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">
                    Cena: na upit
                  </span>
                </div>
              </div>

              <div className="relative flex h-full min-h-[clamp(240px,35vw,340px)] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/20 bg-[radial-gradient(circle_at_35%_20%,rgba(91,255,214,0.2),transparent_70%),radial-gradient(circle_at_75%_50%,rgba(116,193,255,0.18),transparent_72%),linear-gradient(150deg,rgba(5,16,21,0.95),rgba(4,10,18,0.9))] shadow-[0_32px_140px_rgba(4,16,26,0.55)]">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/20 bg-white/12 shadow-[0_28px_120px_rgba(48,240,210,0.4)]">
                  <Leaf className="h-16 w-16 text-emerald-200" strokeWidth={1.4} />
                </div>
              </div>
            </div>
          ))}
        </SectionReveal>
      </Container>
    </section>
  );
}

function BlogSection() {
  const blogCards = blogItems;

  return (
    <section className="vb-section" id="blog">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-16%] h-48 rounded-[150px] bg-[radial-gradient(540px_240px_at_35%_50%,rgba(0,198,255,0.14),rgba(0,198,255,0))] blur-[48px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Znanje i praksa</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">Blog i studije iz prakse</h2>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".blog-card">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blogCards.map((post) => (
              <Link
                key={post.slug}
                href={post.href ?? "#kontakt"}
                prefetch={false}
                className="blog-card group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_28px_120px_rgba(4,16,24,0.48)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_30px_130px_rgba(44,222,214,0.28)] hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,255,150,0.15)] hover:brightness-110"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                {post.image && (
                  <div className="relative -mx-6 -mt-6 aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      priority={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-80" />
                  </div>
                )}
                <div className={cn("relative flex flex-1 flex-col space-y-4 text-emerald-50", post.image ? "pt-4" : "")}>
                  <span className="inline-flex items-center self-start rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
                    {post.category}
                  </span>
                  <h3 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold text-white">{post.title}</h3>
                  <p className="flex-1 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-emerald-100/80">
                    {post.excerpt}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-2 text-[clamp(0.95rem,1.35vw,1.05rem)] font-semibold text-emerald-200 transition group-hover:text-white">
                    {post.ctaLabel ?? "Pročitaj više →"}
                    {post.showArrow ? <ArrowUpRight className="h-4 w-4" /> : null}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <div className="flex justify-center pt-4">
            <PrimaryLink
              href="/blog"
              className="px-10 py-3 text-sm font-semibold"
            >
              Pogledaj sve članke
            </PrimaryLink>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="vb-section" id="kontakt">
      <Container className="relative">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-18%] h-64 rounded-[180px] bg-[radial-gradient(620px_320px_at_45%_55%,rgba(0,198,255,0.18),rgba(0,198,255,0))] blur-[60px] opacity-80" />
        <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-18%] h-52 rounded-[150px] bg-[radial-gradient(520px_240px_at_65%_50%,rgba(255,214,51,0.12),rgba(255,214,51,0))] blur-[50px] opacity-65" />
        <SectionReveal childSelector=".cta-card">
          <div className="cta-card grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(170deg,rgba(8,30,26,0.72)_0%,rgba(4,11,19,0.94)_100%)] p-10 shadow-[0_45px_170px_rgba(4,14,22,0.55)] backdrop-blur xl:grid-cols-[1.1fr_0.9fr] hover:shadow-[0_0_22px_rgba(0,255,150,0.15)] hover:ring-1 hover:ring-cyan-400/20">
            <div className="space-y-6 text-emerald-50">
              <GradientBadge>Spremni da krenemo</GradientBadge>
              <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
                Spremni da zajedno izgradimo akvaponski sistem?
              </h2>
              <p className="text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                Na konsultaciji prolazimo kroz vaš model poslovanja, kapacitete i očekivani ROI, i predlažemo skalabilan
                plan ugradnje i plasiranja proizvoda.
              </p>
              <ul className="space-y-4 text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                {finalBullets.map((item) => (
                  <li key={item} className="group flex items-start gap-3 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-white/12 text-emerald-100 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:text-white">
                      <CheckCircle2 className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 text-xs uppercase tracking-[0.32em] text-emerald-100/60">
                <span>Investitori</span>
                <span>HoReCa</span>
                <span>R&D</span>
                <span>Privatni hubovi</span>
              </div>
            </div>

            <div className="rounded-[2.6rem] border border-white/30 bg-white/12 p-6 shadow-[0_26px_140px_rgba(136,255,229,0.25)] backdrop-blur">
              <ContactForm />
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

const blogPostStructuredData = blogPosts.map((post) =>
  blogPostingJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    image: post.image,
    datePublished: post.date,
  }),
);

const structuredBlogData = [...blogItems.map((item) => item.structuredData), ...blogPostStructuredData];

export default function HomePage() {
  return (
    <>
      <Script
        id="jsonld-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <Script
        id="jsonld-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd()) }}
      />
      {structuredBlogData.map((structured, index) => (
        <Script key={`blog-ld-${index}`} id={`jsonld-blog-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
      ))}

      <Hero />
      <TrustSection />
      <BenefitsSection />
      <ServicesSection />
      <ProductSection />
      <ProjectsSection />
      <BlogSection />
      <AboutSection />
      <FinalCTA />

      <ScrollTopButton />
    </>
  );
}
