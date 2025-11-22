'use client';

import Script from "next/script";
import dynamic from "next/dynamic";

import { ScrollTopButton } from "@/components/ScrollTopButton";
import { Container } from "@/components/ui/Container";
import { GhostLink, PrimaryLink } from "@/components/ui/Buttons";
import { SectionReveal } from "@/components/ux/SectionReveal";
import { cn } from "@/lib/utils";
import { blogPostingJsonLd, productJsonLd, websiteJsonLd } from "@/lib/seo";
import { ArrowUpRight, CheckCircle2, Droplet, Leaf, Recycle, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type ComponentProps, useEffect, useState } from "react";
import { StruriaShowcase } from "@/components/StruriaShowcase";
import { blogPosts } from "@/lib/posts";
import { studies } from "@/data/studies";

// Code split heavy components below the fold for better initial load performance
// ContactForm is kept SSR for form functionality, but lazy-loaded to reduce initial bundle
const ContactForm = dynamic(() => import("@/components/ContactForm").then(mod => ({ default: mod.ContactForm })), { ssr: true });
// AboutUsGallery and AkvaponijaDiagram are client-only animations, so no SSR needed
const AboutUsGallery = dynamic(() => import("@/components/AboutUsGallery").then(mod => ({ default: mod.AboutUsGallery })), { ssr: false });
const AkvaponijaDiagram = dynamic(() => import("@/components/AkvaponijaDiagram").then(mod => ({ default: mod.AkvaponijaDiagram })), { ssr: false });

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
    title: "H2O Farm · Stapar",
    vertical: "Komercijalni akvaponski sistem za uzgoj bosiljka i nane",
    result: "Stabilna celogodišnja proizvodnja aromatičnog bilja uz minimalnu potrošnju resursa i kontrolisan kvalitet.",
    palette: "from-teal-400/40 via-emerald-400/20 to-transparent",
  },
  {
    title: "Srpski domaćin · Ribnik",
    vertical: "Porodično poljoprivredno gazdinstvo sa integrisanim akvaponskim uzgojem raznog povrća",
    result: "Održiva proizvodnja raznovrsnog povrća tokom cele godine u zatvorenom akvaponskom sistemu.",
    palette: "from-cyan-400/35 via-blue-500/20 to-transparent",
  },
  {
    title: "Vodena Bašta · Stapar",
    vertical: "Demo i razvojni akvaponski sistem za paradajz i začinsko bilje",
    result: "Razvojni model za testiranje svetlosnih režima, mineralizacije i protoka u uzgoju paradajza i začinskih kultura.",
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

// Reduced particle count for better performance - only visible above fold
const HERO_PARTICLES = [
  { top: "10%", left: "18%", size: 160, delay: "0s" },
  { top: "28%", right: "16%", size: 190, delay: "2.8s" },
  { top: "52%", left: "46%", size: 110, delay: "5.6s" },
];

const HERO_ORBS = [
  { top: "12%", left: "18%", size: 240, delay: 0 },
  { bottom: "20%", right: "10%", size: 260, delay: 1.4 },
  // Removed orb at top: "55%", left: "45%" - was causing dark halo behind CTA buttons
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
    <span
      className="
        inline-block
        max-w-max
        rounded-full
        border border-white/25
        bg-white/10
        px-4
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-teal-100
      "
    >
      {children}
    </span>
  );
}

function TrustRibbon() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-4 text-[13px] text-teal-100">
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
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback for better LCP - animations start after initial paint
    const initAnimations = () => setShouldAnimate(true);
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initAnimations, { timeout: 150 });
      return () => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(initAnimations, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MotionDivComponent
      className="space-y-8 pt-16 sm:pt-20 md:pt-24 text-white max-w-[640px]"
      initial={undefined}
      animate={prefersReducedMotion || !shouldAnimate ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <GradientBadge>Vodena Bašta · Premium Akvaponija</GradientBadge>

      <div className="space-y-4">
        <motion.h1
          className="relative text-balance text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] md:leading-[1.06] tracking-[-0.015em] max-w-[16ch] after:pointer-events-none after:absolute after:left-0 after:bottom-[-0.4rem] after:h-[2px] after:w-28 after:rounded-full after:bg-gradient-to-r after:from-accentBlue-400/90 after:via-accentYellow-400/70 after:to-transparent"
          variants={prefersReducedMotion ? undefined : heroStaggerContainer}
          initial={undefined}
          animate={prefersReducedMotion ? undefined : shouldAnimate ? "visible" : undefined}
        >
          {heroHeadlineLines.map((line, index) => (
            <motion.span
              key={line}
              className="block text-shimmer"
              variants={prefersReducedMotion ? undefined : heroStaggerItem}
              transition={prefersReducedMotion || !shouldAnimate ? undefined : { delay: index * 0.2 }}
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
        initial={undefined}
        animate={prefersReducedMotion || !shouldAnimate ? undefined : { opacity: 1, y: 0 }}
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
        {/* LCP Button - Rendered immediately without animation delays */}
        <PrimaryLink
          href="#kontakt"
          intent="consultation"
          className="overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 text-sm font-semibold tracking-wide text-white ring-1 ring-emerald-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 transition-transform duration-200 hover:scale-105"
        >
          Zakaži konsultaciju
        </PrimaryLink>
        <GhostLink
          href="#akvaponija"
          className="btn-aurora cta-secondary-animate overflow-hidden rounded-xl border border-white/8 bg-transparent px-8 py-3 text-sm font-semibold text-white/90 hover:border-emerald-300/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  useEffect(() => {
    // Gate animations to start only after LCP window (2.5s) to ensure H1 is the LCP element
    const initAnimations = () => {
      setShouldAnimate(true);
      // Enable CSS animations after LCP window to ensure hero background doesn't delay LCP
      setTimeout(() => {
        setAnimationsEnabled(true);
        if (typeof document !== 'undefined') {
          document.documentElement.classList.add('animations-enabled');
        }
      }, 2500);
    };
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initAnimations, { timeout: 200 });
      return () => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(initAnimations, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <MotionSectionComponent
      id="pocetak"
      className={cn("hero-root relative isolate min-h-screen overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24", animationsEnabled && "animations-enabled")}
      initial={undefined}
      animate={prefersReducedMotion || !shouldAnimate ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={cn("hero-bg-flow", animationsEnabled && "animations-enabled")} />
        <div className="relative max-w-[1350px] xl:max-w-[1450px] mx-auto h-full">
          {!prefersReducedMotion &&
            HERO_PARTICLES.map((particle, index) => {
              const p = particle as { top?: string; left?: string; right?: string; bottom?: string; size: number; delay: string };
              const style: Record<string, string | number> = {
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
              };
              if (p.top) style.top = p.top;
              if (p.left) style.left = p.left;
              if (p.right) style.right = p.right;
              if (p.bottom) style.bottom = p.bottom;
              return (
                <span
                  key={`hero-particle-${index}`}
                  className="hero-particle absolute rounded-full bg-[radial-gradient(circle,rgba(87,255,214,0.28),rgba(87,255,214,0))]"
                  style={style as React.CSSProperties}
                />
              );
            })}
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
      </div>

      <Container className="relative z-10 grid max-w-[1500px] items-center gap-10 px-6 mx-auto lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <HeroContent />
        {/* StruriaShowcase is below fold on mobile, so no priority needed */}
        <StruriaShowcase />
      </Container>
    </MotionSectionComponent>
  );
}

function TrustSection() {
  return (
    <section className="vb-section relative overflow-hidden min-h-[400px]">
      <Container className="relative space-y-12">
        <SectionReveal className="space-y-6 text-center">
          <GradientBadge>Veruju nam lideri</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
          Naši sistemi služe farmama, investitorima i profesionalnim kupcima širom Srbije
          </h2>
          <p className="mx-auto max-w-2xl text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-emerald-100/85">
          Akvaponska rešenja koja koriste naši klijenti omogućavaju plasman proizvoda i profesionalnim kupcima - uključujući restorane i specijalizovane objekte. Mi pružamo tehničku podršku, održavanje i optimizaciju sistema, dok naši partneri samostalno razvijaju sopstvenu proizvodnju i prodajne kanale.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".trust-card">
          <div className="grid gap-6 rounded-[2.5rem] border border-white/20 bg-white/7 p-10">
            <div className="grid gap-6 text-sm text-emerald-100/90 lg:grid-cols-4">
              {socialProof.map((item) => (
                <div
                  key={item}
                  className="trust-card rounded-2xl border border-white/25 bg-white/12 px-6 py-5 text-left shadow-[0_18px_55px_rgba(4,16,24,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-1 hover:bg-white/10 hover:opacity-100"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.35em] text-emerald-200/60">
              <span className="transition-colors duration-200 hover:text-white/90">PRO BAR</span>
              <span className="transition-colors duration-200 hover:text-white/90">Linea Belgrade</span>
              <span className="transition-colors duration-200 hover:text-white/90">Lokalni restorani</span>
              <span className="transition-colors duration-200 hover:text-white/90">Edukativni centri</span>
              <span className="transition-colors duration-200 hover:text-white/90">Farme partneri</span>
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
    <section className="vb-section relative overflow-hidden min-h-[600px]" id="akvaponija">
      <Container className="relative space-y-12">
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
                className="benefit-card group relative overflow-hidden rounded-3xl border border-white/25 bg-[linear-gradient(160deg,rgba(5,26,23,0.78)_0%,rgba(3,11,18,0.9)_100%)] p-6 shadow-[0_28px_120px_rgba(3,14,20,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 hover:scale-[1.02] hover:opacity-100"
              >
                <div className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,rgba(86,255,213,0.22),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-emerald-100 transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:border-aqua-400/55 group-hover:text-white group-hover:opacity-100">
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
    <section className="vb-section relative overflow-hidden min-h-[500px]" id="uzgoj-biljaka-i-riba">
      <Container className="relative">
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Uzgoj biljaka i riba</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.3rem,3.5vw,3rem)]">
            Savršena ravnoteža između dva ekosistema
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.12}>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.75rem] border border-white/15 bg-gradient-to-br from-[#0f3f2f] via-[#0c5037] to-[#093829] p-8 text-white shadow-[0_32px_140px_rgba(12,60,42,0.55)] transition duration-500 ease-out hover:-translate-y-1 hover:opacity-100">
              <div className="absolute inset-0 pointer-events-none">
                {/* GPU-friendly - no blur */}
                <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-leaf/12 opacity-50" />
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
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2.75rem] border border-white/15 bg-gradient-to-br from-[#06304a] via-[#053e5a] to-[#03293f] p-8 text-white shadow-[0_32px_140px_rgba(6,40,60,0.55)] transition duration-500 ease-out hover:-translate-y-1 hover:opacity-100">
              <div className="absolute inset-0 pointer-events-none">
                {/* GPU-friendly - no blur */}
                <div className="absolute -bottom-28 left-6 h-72 w-72 rounded-full bg-brand-aqua/14 opacity-45" />
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
    <section className="vb-section relative overflow-hidden min-h-[500px]" id="portfolio">
      <Container className="relative space-y-12">
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
                className="project-card group relative overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_30px_130px_rgba(5,16,26,0.5)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 hover:scale-[1.02] hover:opacity-100"
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
    <section className="vb-section relative overflow-hidden min-h-[500px]" id="proizvodi">
      <Container className="relative space-y-10">
        <SectionReveal className="space-y-4 text-center">
          <GradientBadge>Premium proizvod</GradientBadge>
          <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
            Akvadajz - pasirani paradajz iz našeg akvaponskog sistema
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} childSelector=".product-card">
          {productHighlights.map((product) => (
            <div
              key={product.label}
              className="product-card group grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(165deg,rgba(8,30,26,0.72)_0%,rgba(5,14,21,0.92)_100%)] p-10 shadow-[0_40px_160px_rgba(5,16,26,0.52)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 hover:scale-[1.01] hover:opacity-100 xl:grid-cols-[1.15fr_0.85fr]"
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/12 px-7 py-3 font-semibold text-white transition hover:-translate-y-[2px] hover:border-emerald-300/60 hover:text-emerald-50 hover:opacity-100 hover:ring-1 hover:ring-cyan-400/40"
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
    <section className="vb-section relative overflow-hidden min-h-[600px]" id="blog">
      <Container className="relative space-y-12">
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
                className="blog-card group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/25 bg-[linear-gradient(165deg,rgba(6,24,22,0.78)_0%,rgba(4,9,18,0.94)_100%)] p-6 shadow-[0_28px_120px_rgba(4,16,24,0.48)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu motion-safe:hover:-translate-y-2 hover:scale-[1.01] hover:opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                {post.image && (
                  <div className="relative -mx-6 -mt-6 aspect-[16/9] overflow-hidden min-h-[200px]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGCQBwAAHgAC9xibzwAAAABJRU5ErkJggg=="
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
    <section className="vb-section relative overflow-hidden min-h-[600px]" id="kontakt">
      <Container className="relative">
        <SectionReveal childSelector=".cta-card">
          <div className="cta-card grid grid-cols-1 gap-10 overflow-hidden rounded-[3rem] border border-white/30 bg-[linear-gradient(170deg,rgba(8,30,26,0.72)_0%,rgba(4,11,19,0.94)_100%)] p-10 shadow-[0_45px_170px_rgba(4,14,22,0.55)] xl:grid-cols-[1.1fr_0.9fr] hover:opacity-100 hover:ring-1 hover:ring-cyan-400/20">
            <div className="space-y-6 text-emerald-50">
              <GradientBadge>Spremni da krenemo</GradientBadge>
              <h2 className="font-semibold text-white text-[clamp(2.1rem,3.2vw,2.8rem)]">
                Spremni da zajedno izgradimo akvaponski sistem?
              </h2>
              <div className="space-y-4">
                <p className="text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                  Na konsultaciji prolazimo kroz vaš model poslovanja, kapacitete i očekivani ROI, i predlažemo skalabilan plan ugradnje i plasiranja proizvoda. Bilo da tek ulazite u svet akvaponije ili želite da unapredite postojeći sistem, pomoći ćemo vam da razumete sve ključne faze - od izgradnje i tehnologije, do logistike i tržišta.
                </p>
                <p className="text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                  Naš tim je radio sa različitim profilima klijenata: porodičnim farmama, profesionalnim proizvođačima, investitorima, HoReCa objektima i R&D centrima. Na osnovu iskustva iz realnih instalacija, dajemo jasne smernice kako da izbegnete nepotrebne troškove, optimizujete rad i postignete stabilnu i predvidivu proizvodnju.
                </p>
                <p className="text-[clamp(0.98rem,1.45vw,1.15rem)] leading-relaxed text-emerald-100/80">
                  Uz konsultaciju dobijate i procenu rizika, predlog najboljeg modela gajenja za vaše potrebe, kao i preporuke za plasman proizvoda. Cilj je da zajedno kreiramo održiv, profitabilan i dugoročno skalabilan sistem.
                </p>
              </div>
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

            {/* GPU-friendly shadow - using gradient overlay instead of box-shadow */}
            <div className="rounded-[2.6rem] border border-white/30 bg-white/12 p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(136,255,229,0.08),transparent_70%)] opacity-60" />
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
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
      />
      <Script
        id="jsonld-product"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd()) }}
      />
      {structuredBlogData.map((structured, index) => (
        <Script key={`blog-ld-${index}`} id={`jsonld-blog-${index}`} type="application/ld+json" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured) }} />
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
