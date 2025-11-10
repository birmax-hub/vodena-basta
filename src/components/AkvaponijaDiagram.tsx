"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Droplets, Fish, Leaf } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const loopTransition = {
  duration: 4.5,
  ease: "easeInOut" as const,
  repeat: Infinity,
};

function FlowArrow({ delay }: { delay?: number }) {
  return (
    <motion.span
      className="flex items-center gap-2 text-brand-aqua"
      initial={{ opacity: 0.35, x: 0 }}
      animate={{ opacity: [0.35, 1, 0.35], x: [0, 6, 0] }}
      transition={{ ...loopTransition, delay }}
    >
      <ArrowRight className="h-5 w-5" />
    </motion.span>
  );
}

export function AkvaponijaDiagram() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={containerVariants}
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#022e2b] to-[#013f40] p-12 shadow-[0_32px_140px_rgba(6,36,33,0.6)]"
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-brand-aqua/10 blur-3xl"
          animate={prefersReducedMotion ? undefined : { opacity: [0.3, 0.5, 0.3] }}
          transition={prefersReducedMotion ? undefined : { duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-[-40px] left-[15%] h-60 w-60 rounded-full bg-brand-leaf/10 blur-3xl"
          animate={prefersReducedMotion ? undefined : { opacity: [0.25, 0.45, 0.25] }}
          transition={prefersReducedMotion ? undefined : { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.2 }}
        />
      </div>
      <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5 text-white">
          <h3 className="text-[clamp(2rem,3vw,2.6rem)] font-semibold">Kako funkcioniše akvaponija</h3>
          <p className="text-[clamp(1rem,1.4vw,1.1rem)] leading-relaxed text-accent-200/85">
            Akvaponija povezuje akvakulturu i hidroponiju u jedinstven, zatvoren ciklus. Ribe proizvode hranljive materije koje biljke koriste za rast, dok biljke filtriraju i vraćaju čistu vodu ribama. Na taj način, sistem se sam održava – bez otpada, bez pesticida i sa minimalnim utroškom resursa.
          </p>
        </div>
        <div className="relative mx-auto flex w-full max-w-md flex-col items-center gap-6 text-accent-200">
          <motion.div
            className="flex w-full items-center justify-between rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl"
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center gap-3 text-center text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-aqua/20 text-brand-aqua">
                <Fish className="h-8 w-8" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-aqua/80">Ribe</p>
              <p className="max-w-[10rem] text-xs text-accent-200/75">Hrane se i proizvode prirodna jedinjenja bogata azotom.</p>
            </div>
            <FlowArrow />
            <div className="flex flex-col items-center gap-3 text-center text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-leaf/20 text-brand-leaf">
                <Leaf className="h-8 w-8" />
              </span>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-leaf/80">Biljke</p>
              <p className="max-w-[10rem] text-xs text-accent-200/75">Preuzimaju hranljive materije i rastu brže uz optimalan balans.</p>
            </div>
          </motion.div>
          <motion.div
            className="flex w-full items-center justify-around rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
              transition={prefersReducedMotion ? undefined : { ...loopTransition, delay: 0.2 }}
            >
              <Droplets className="h-6 w-6 text-brand-aqua" />
              <span className="text-xs uppercase tracking-[0.3em] text-brand-aqua/70">Hranljive materije</span>
            </motion.div>
            <FlowArrow delay={0.3} />
            <motion.div
              className="flex flex-col items-center gap-2"
              animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
              transition={prefersReducedMotion ? undefined : { ...loopTransition, delay: 0.6 }}
            >
              <Droplets className="h-6 w-6 text-cyan-300" />
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">Čista voda</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AkvaponijaDiagram;
