"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Activity, Cpu, Droplets, Factory, Leaf } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "AI Kontrola",
    text: "Sturya.io analizira vremenske podatke i prilagođava parametre sistema u realnom vremenu.",
  },
  {
    icon: Droplets,
    title: "Nutritivni balans",
    text: "Preračunava optimalnu dozu hranljivih materija za svaku kulturu i fazu rasta.",
  },
  {
    icon: Leaf,
    title: "Plan berbe",
    text: "Predviđa najbolje vreme berbe i sinhronizuje logistiku sa zahtevima kupaca.",
  },
];

const statusCards = [
  {
    icon: Activity,
    label: "pH status",
    value: "Stabilan",
    note: "AI monitoring u realnom vremenu",
  },
  {
    icon: Droplets,
    label: "Potrošnja vode",
    value: "-90%",
    note: "Recirkulacija + kondenzacija",
  },
  {
    icon: Factory,
    label: "CO₂ otisak",
    value: "↓ 68%",
    note: "Lokalna proizvodnja bez transporta",
  },
];

const bubbles = [
  { size: 120, top: "18%", left: "8%", delay: 0 },
  { size: 160, bottom: "10%", right: "12%", delay: 1.2 },
  { size: 90, top: "65%", left: "26%", delay: 2.4 },
];

export function StruriaShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto flex w-full max-w-[540px] flex-col gap-8"
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 36 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -inset-x-16 -inset-y-12 opacity-70">
        {bubbles.map((bubble, idx) => (
          <motion.span
            key={`bubble-${idx}`}
            className="absolute rounded-full bg-[radial-gradient(circle_at_center,rgba(64,220,200,0.32),transparent_70%)] blur-3xl"
            style={{
              top: bubble.top,
              left: bubble.left,
              right: bubble.right,
              bottom: bubble.bottom,
              width: bubble.size,
              height: bubble.size,
            }}
            animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.5, 0.25], scale: [1, 1.08, 1] }}
            transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: bubble.delay }}
          />
        ))}
      </div>

      <motion.div
        className="panel-glow relative overflow-hidden rounded-[2.9rem] p-5 shadow-[0_0_60px_rgba(100,247,216,0.08)] backdrop-blur-xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        whileHover={prefersReducedMotion ? undefined : { rotateX: -2.5, rotateY: 2.5 }}
        style={{ transformStyle: "preserve-3d", perspective: 1200 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(40,220,190,0.18),transparent_68%)]"
            animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.5, 0.3] }}
            transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(52,135,255,0.18),transparent_70%)]"
            animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }}
            transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          />
        </div>

        <div className="relative flex flex-col gap-5">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.38em] text-brand-aqua/70">
            <span>STURYA.IO · AI PLATFORM</span>
            <motion.span
              className="rounded-full border border-brand-aqua/30 bg-brand-aqua/10 px-3 py-1 text-[0.6rem] font-semibold text-brand-aqua/75"
              animate={prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              REAL-TIME AI
            </motion.span>
          </div>

          <div className="grid gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group flex items-start gap-3 rounded-[26px] border border-white/12 bg-white/8 p-4 text-left text-white/90 shadow-[0_16px_60px_rgba(16,70,60,0.42)] transition-all duration-400 backdrop-blur-xl hover:border-brand-aqua/40 hover:shadow-[0_24px_80px_rgba(32,200,180,0.4)]"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              >
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-brand-aqua/15 text-brand-aqua">
                  <feature.icon className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="text-[0.78rem] leading-relaxed text-accent-200/80">{feature.text}</p>
                  {feature.title === "AI Kontrola" && (
                    <span className="text-[0.68rem] text-brand-aqua/80">Sturya.io analizira vremenske podatke i prilagođava parametre sistema u realnom vremenu.</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {statusCards.map((card, index) => (
              <motion.div
                key={card.label}
                className="flex flex-col gap-2 rounded-2xl border border-white/12 bg-white/8 p-3 text-left text-white/85 shadow-[0_16px_55px_rgba(12,60,56,0.38)] transition-all duration-300 backdrop-blur-lg hover:border-brand-aqua/35"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + index * 0.08 }}
              >
                <span className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.32em] text-brand-aqua/70">
                  <card.icon className="h-3.5 w-3.5" />
                  {card.label}
                </span>
                <p className="text-[1.05rem] font-semibold text-white">{card.value}</p>
                <p className="text-[0.68rem] text-accent-200/75">{card.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-3 flex flex-col items-center justify-center"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-400/70">AI powered by Sturya.io</span>
            <span className="mt-3 mb-2 h-px w-24 border-t border-white/10" />
            <a
              href="https://sturya.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
            >
              Poseti Sturya.io
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default StruriaShowcase;
