'use client';

import Script from "next/script";

import { ScrollTopButton } from "@/components/ScrollTopButton";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { GhostLink, PrimaryLink } from "@/components/ui/Buttons";
import { SectionReveal } from "@/components/ux/SectionReveal";
import { cn } from "@/lib/utils";
import { blogPostingJsonLd, productJsonLd, websiteJsonLd } from "@/lib/seo";
import {
  ArrowUpRight,
  CheckCircle2,
  Droplet,
  Factory,
  Leaf,
  LineChart,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import Link from "next/link";
import { type ComponentProps, type MouseEvent } from "react";

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

const services = [
  {
    icon: Sparkles,
    title: "Strategija i projektovanje",
    copy: "Dimenzionisanje farme, izbor kulture i ROI modeli prilagođeni vašem tržištu.",
  },
  {
    icon: Factory,
    title: "Izgradnja i automatizacija",
    copy: "Modularni sistemi, IoT senzori, redundantan monitoring i AI nadzor procesa.",
  },
  {
    icon: LineChart,
    title: "Operativni konsalting i održavanje",
    copy: "Obuka tima, nutritivni protokoli, plasman proizvoda i 24/7 podrška.",
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

const blogItems = [
  {
    title: "Kako skalirati akvaponsku farmu bez rizika",
    excerpt: "Koraci za investitore koji ulaze u premium segment svežih proizvoda.",
    category: "Investicije",
    slug: "skaliranje-farme",
    structuredData: blogPostingJsonLd({
      title: "Kako skalirati akvaponsku farmu bez rizika",
      description:
        "Koraci za investitore koji ulaze u premium segment svežih proizvoda.",
      slug: "skaliranje-farme",
      image: "/images/blog/skaliranje-farme.png",
      datePublished: "2025-03-22",
    }),
  },
  {
    title: "Mikroklima i pH: dnevni protokol Vodene Bašte",
    excerpt: "Koje parametre pratimo da bi nutritivna vrednost bila konzistentna.",
    category: "Operacije",
    slug: "mikroklima-ph",
    structuredData: blogPostingJsonLd({
      title: "Mikroklima i pH: dnevni protokol Vodene Bašte",
      description:
        "Koje parametre pratimo da bi nutritivna vrednost bila konzistentna.",
      slug: "mikroklima-ph",
      image: "/images/blog/mikroklima.png",
      datePublished: "2025-02-14",
    }),
  },
  {
    title: "HoReCa partnerstva: kako isporučujemo na dan naručivanja",
    excerpt: "Naš servisni model sa šefovima kuhinja i hotelskim lancima.",
    category: "Plasman",
    slug: "horeca-partnerstva",
    structuredData: blogPostingJsonLd({
      title: "HoReCa partnerstva: kako isporučujemo na dan naručivanja",
      description:
        "Naš servisni model sa šefovima kuhinja i hotelskim lancima.",
      slug: "horeca-partnerstva",
      image: "/images/blog/horeca.png",
      datePublished: "2025-01-28",
    }),
  },
];

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

const MotionDivComponent = (props: ComponentProps<typeof motion.div>) => <motion.div {...props} />;

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

function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useTransform(tiltY, (value) => `${value}deg`);
  const rotateY = useTransform(tiltX, (value) => `${value}deg`);

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const tiltRange = 6;
    tiltX.set((x - 0.5) * tiltRange);
    tiltY.set((0.5 - y) * tiltRange);
  };

  const resetTilt = () => {
    animate(tiltX, 0, { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] });
    animate(tiltY, 0, { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] });
  };

  return (
    <MotionDivComponent
      className="relative w-full"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 60, scale: 0.98 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.9, 0.3, 1] }}
      onMouseMove={handlePointerMove}
      onMouseEnter={handlePointerMove}
      onMouseLeave={resetTilt}
    >
      <div className="absolute -top-12 -left-16 h-52 w-52 rounded-full bg-[radial-gradient(circle_at_center,rgba(87,255,214,0.3),transparent_70%)] blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(108,198,255,0.24),transparent_72%)] blur-3xl" />

      <MotionDivComponent
        className="relative overflow-hidden rounded-[3.5rem] border border-white/15 bg-[linear-gradient(150deg,rgba(14,46,40,0.6),rgba(4,10,20,0.92))] p-5 sm:p-7 shadow-[0_45px_140px_rgba(4,16,24,0.55)] backdrop-blur"
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }
        }
        style={{
          rotateX,
          rotateY,
          transformPerspective: "1200px",
        }}
      >
        <div className="relative overflow-hidden rounded-[2.8rem] border border-white/12 bg-gradient-to-br from-cyan-300/10 via-teal-200/6 to-emerald-200/12 p-5 sm:p-6 backdrop-blur-xl">
          <div className="relative flex h-[clamp(220px,32vw,320px)] items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/15 bg-[radial-gradient(circle_at_25%_30%,rgba(87,255,214,0.18),transparent_72%),radial-gradient(circle_at_75%_45%,rgba(104,191,255,0.18),transparent_78%),linear-gradient(140deg,rgba(6,20,26,0.92),rgba(4,10,18,0.96))]">
            <div className="absolute inset-10 rounded-[1.5rem] border border-white/12 bg-gradient-to-br from-emerald-300/15 via-teal-400/10 to-transparent blur-xl opacity-80" />
            <div className="relative grid w-full max-w-xs gap-6 text-emerald-50">
              <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:shadow-[0_0_35px_rgba(82,255,227,0.3)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-slate-950 shadow-[0_0_20px_rgba(82,255,207,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-300/60 group-hover:shadow-[0_0_30px_rgba(82,255,227,0.4)]">
                  <Sparkles className="h-5 w-5 text-emerald-500 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">AI kontrola</p>
                  <p className="text-sm font-semibold text-white">Sve sonde u jednoj platformi</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:shadow-[0_0_35px_rgba(82,255,227,0.3)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-slate-950 shadow-[0_0_20px_rgba(82,255,207,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-300/60 group-hover:shadow-[0_0_30px_rgba(82,255,227,0.4)]">
                  <Droplet className="h-5 w-5 text-cyan-300 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">Nutritivni balans</p>
                  <p className="text-sm font-semibold text-white">Doziranje po kulturi</p>
                </div>
              </div>
              <div className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/12 px-4 py-3 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:shadow-[0_0_35px_rgba(82,255,227,0.3)]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-slate-950 shadow-[0_0_20px_rgba(82,255,207,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-300/60 group-hover:shadow-[0_0_30px_rgba(82,255,227,0.4)]">
                  <Factory className="h-5 w-5 text-emerald-400 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">Plan berbe</p>
                  <p className="text-sm font-semibold text-white">Isporuka isti dan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "pH status", value: "Stabilan", note: "AI monitoring u realnom vremenu" },
            { label: "Potrošnja vode", value: "-90%", note: "Recirkulacija + kondenzacija" },
            { label: "CO₂ otisak", value: "↓ 68%", note: "Lokalna proizvodnja bez transporta" },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/15 bg-white/12 px-4 py-3 text-xs text-teal-50 backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_18px_45px_rgba(42,225,210,0.22)]"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-emerald-100/80">{metric.label}</p>
              <p className="pt-1 text-lg font-semibold text-white">{metric.value}</p>
              <p className="text-[11px] text-emerald-100/70">{metric.note}</p>
            </div>
          ))}
        </div>
      </MotionDivComponent>
    </MotionDivComponent>
  );
}

function HeroContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionDivComponent
      className="space-y-8 text-white"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 50 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: [0.21, 0.9, 0.26, 1] }}
    >
      <GradientBadge>Vodena Bašta · Premium Akvaponija</GradientBadge>

      <div className="space-y-5">
        <h1 className="relative text-balance font-semibold leading-[clamp(2.6rem,5vw,4.1rem)] tracking-tight text-[clamp(2.3rem,4.4vw,3.8rem)] after:pointer-events-none after:absolute after:left-0 after:bottom-[-0.7rem] after:h-[2px] after:w-28 after:rounded-full after:bg-gradient-to-r after:from-accentBlue-400/90 after:via-accentYellow-400/70 after:to-transparent">
          Stabilna proizvodnja. Čista hrana. Pametan sistem.
        </h1>
        <p className="max-w-2xl text-[clamp(1.02rem,1.45vw,1.22rem)] leading-relaxed text-emerald-100/85">
          Projektujemo, automatizujemo i vodimo akvaponske hubove koji isporučuju vrhunske proizvode 365 dana
          godišnje — bez pesticida, sa minimalnim resursima i potpunom kontrolom kvaliteta.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-[clamp(0.92rem,1.25vw,1.05rem)] text-emerald-100/85 sm:gap-4">
        {[
          "Hrana bez pesticida i teških metala",
          "Zero-waste ciklus: biljke i ribe održavaju balans",
          "Optimizovan prinos uz manje troškova i potrošnje vode",
        ].map((benefit) => (
          <div key={benefit} className="group flex items-start gap-3 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]">
            <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(45,255,199,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:shadow-[0_0_28px_rgba(76,255,224,0.4)] group-hover:scale-110">
              <ShieldCheck className="h-3.5 w-3.5 transition-colors duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:text-slate-900" strokeWidth={2.4} />
            </span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:flex-wrap">
        <PrimaryLink href="#kontakt" className="px-8 py-3 text-sm font-semibold">
          Zakaži konsultaciju
        </PrimaryLink>
        <GhostLink href="#projekti" className="px-8 py-3 text-sm font-semibold">
          Pogledaj projekte
        </GhostLink>
      </div>

      <TrustRibbon />
    </MotionDivComponent>
  );
}

function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#021512] via-[#052822] to-[#061026] py-[clamp(3.5rem,7vw,6rem)]">
      <div className="pointer-events-none absolute inset-0">
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
      </div>

      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="pointer-events-none absolute inset-x-[-16%] top-[-14%] h-60 rounded-[200px] bg-[radial-gradient(680px_320px_at_42%_40%,rgba(0,198,255,0.18),rgba(0,198,255,0))] blur-[60px] opacity-75" />
        <div className="pointer-events-none absolute inset-x-[-12%] bottom-[-12%] h-48 rounded-[160px] bg-[radial-gradient(540px_240px_at_70%_50%,rgba(255,214,51,0.1),rgba(255,214,51,0))] blur-[50px] opacity-65" />
        <HeroContent />
        <HeroVisual />
      </Container>
    </section>
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

        <SectionReveal delay={0.1}>
          <div className="grid gap-6 rounded-[2.5rem] border border-white/20 bg-white/7 p-10 backdrop-blur">
            <div className="grid gap-6 text-sm text-emerald-100/90 lg:grid-cols-4">
              {socialProof.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/25 bg-white/12 px-6 py-5 text-left shadow-[0_18px_55px_rgba(4,16,24,0.35)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_22px_60px_rgba(40,222,214,0.3)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.35em] text-emerald-200/60">
              <span>Farm DX</span>
              <span>Nova Linea</span>
              <span>R&D Alliance</span>
              <span>HoReCa Hub</span>
              <span>Green Campus</span>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="vb-section">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-14%] top-[-12%] h-44 rounded-[140px] bg-[radial-gradient(520px_220px_at_50%_50%,rgba(0,198,255,0.12),rgba(0,198,255,0))] blur-[46px] opacity-75" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Zašto akvaponija funkcioniše</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Voda, energija i hranljive materije u zatvorenom digitalizovanom ciklusu
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-white/25 bg-[linear-gradient(160deg,rgba(5,26,23,0.78)_0%,rgba(3,11,18,0.9)_100%)] p-6 shadow-[0_28px_120px_rgba(3,14,20,0.45)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_30px_130px_rgba(44,222,214,0.28)]"
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
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="vb-section" id="usluge">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-16%] top-[-10%] h-56 rounded-[160px] bg-[radial-gradient(600px_260px_at_65%_40%,rgba(0,198,255,0.14),rgba(0,198,255,0))] blur-[48px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Naša metodologija</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Kompletan lanac od ideje do prve berbe
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex h-full flex-col gap-4 rounded-[2.5rem] border border-white/25 bg-[linear-gradient(170deg,rgba(6,24,22,0.75)_0%,rgba(4,10,18,0.95)_100%)] p-6 shadow-[0_28px_120px_rgba(4,16,24,0.5)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_32px_130px_rgba(36,222,214,0.3)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/35 bg-white/12 text-emerald-100 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(82,255,227,0.35)]">
                  <service.icon className="h-6 w-6 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110 group-hover:text-brand-aqua" strokeWidth={1.7} />
                </span>
                <h3 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold text-white">{service.title}</h3>
                <p className="flex-1 text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                  {service.copy}
                </p>
                <Link
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-[clamp(0.95rem,1.3vw,1.05rem)] font-semibold text-emerald-200 transition hover:text-white"
                >
                  Saznaj više
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </SectionReveal>
      </Container>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="vb-section" id="projekti">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-14%] h-52 rounded-[160px] bg-[radial-gradient(560px_260px_at_58%_45%,rgba(0,198,255,0.16),rgba(0,198,255,0))] blur-[50px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Realizovani sistemi</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Premium farme koje smo pokrenuli zajedno sa investitorima i partnerima
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_30px_130px_rgba(5,16,26,0.5)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_36px_150px_rgba(48,240,210,0.25)]"
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

        <SectionReveal delay={0.1}>
          {productHighlights.map((product) => (
            <div
              key={product.label}
              className="group grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(165deg,rgba(8,30,26,0.72)_0%,rgba(5,14,21,0.92)_100%)] p-10 shadow-[0_40px_160px_rgba(5,16,26,0.52)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_46px_180px_rgba(48,240,210,0.22)] xl:grid-cols-[1.15fr_0.85fr]"
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/12 px-7 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:text-emerald-50"
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
  return (
    <section className="vb-section" id="blog">
      <Container className="relative space-y-12">
        <div className="pointer-events-none absolute inset-x-[-18%] top-[-16%] h-48 rounded-[150px] bg-[radial-gradient(540px_240px_at_35%_50%,rgba(0,198,255,0.14),rgba(0,198,255,0))] blur-[48px] opacity-70" />
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Znanje i praksa</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Najnovije iz našeg znanja i laboratorije
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {blogItems.map((post) => (
              <Link
                key={post.slug}
                href="#kontakt"
                className="group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_28px_120px_rgba(4,16,24,0.48)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_32px_140px_rgba(42,228,218,0.28)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                <div className="relative space-y-4 text-emerald-50">
                  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-100">
                    {post.category}
                  </span>
                  <h3 className="text-[clamp(1.2rem,2vw,1.45rem)] font-semibold text-white">{post.title}</h3>
                  <p className="flex-1 text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-emerald-100/80">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[clamp(0.95rem,1.35vw,1.05rem)] font-semibold text-emerald-200 transition group-hover:text-white">
                    Pročitaj studiju
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
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
        <SectionReveal>
          <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(170deg,rgba(8,30,26,0.72)_0%,rgba(4,11,19,0.94)_100%)] p-10 shadow-[0_45px_170px_rgba(4,14,22,0.55)] backdrop-blur transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 motion-safe:hover:shadow-[0_52px_180px_rgba(48,240,210,0.2)] xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-emerald-50">
              <GradientBadge>Spremni da krenemo</GradientBadge>
              <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
                Spremni da zajedno izgradimo akvaponski sistem sa garantovanom stabilnošću?
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

const structuredBlogData = blogItems.map((item) => item.structuredData);

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
      <ProjectsSection />
      <ProductSection />
      <BlogSection />
      <FinalCTA />

      <ScrollTopButton />
    </>
  );
}
