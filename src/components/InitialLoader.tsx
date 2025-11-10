"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type InitialLoaderProps = {
  /** Automatically fades the loader out after the provided duration. */
  autoDismiss?: boolean;
  /** Minimum time (in milliseconds) the loader stays visible before fading. */
  minimumDuration?: number;
};

const OVERLAY_TRANSITION = {
  ease: "easeInOut" as const,
  duration: 0.8,
};

export function InitialLoader({ autoDismiss = true, minimumDuration = 1600 }: InitialLoaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoDismiss) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, minimumDuration);

    return () => window.clearTimeout(timeout);
  }, [autoDismiss, minimumDuration]);

  const pulseAnimation = prefersReducedMotion
    ? { opacity: 0.9 }
    : {
        opacity: [0.55, 1, 0.55],
        scale: [1, 1.18, 1],
      };

  return (
    <AnimatePresence>{visible && <LoaderOverlay pulseAnimation={pulseAnimation} />}</AnimatePresence>
  );
}

function LoaderOverlay({
  pulseAnimation,
}: {
  pulseAnimation: {
    opacity: number | number[];
    scale?: number | number[];
  };
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={OVERLAY_TRANSITION}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#002d2a] via-[#003631] to-[#001f1b] backdrop-blur-2xl"
      role="status"
      aria-live="polite"
      aria-label="Stranica se učitava"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <motion.div
          className="relative flex h-16 w-16 items-center justify-center"
          animate={pulseAnimation}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute inset-0 rounded-full bg-emerald-400/25 blur-3xl" aria-hidden />
          <span className="absolute inset-2 rounded-full bg-emerald-500/20 blur-xl" aria-hidden />
          <span className="relative h-10 w-10 rounded-full bg-gradient-to-br from-emerald-300/70 via-cyan-400/70 to-emerald-200/60 shadow-[0_0_40px_rgba(52,255,200,0.35)]" aria-hidden />
        </motion.div>
        <motion.span
          className="text-xs uppercase tracking-[0.42em] text-emerald-100/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Vodena Bašta
        </motion.span>
      </div>
    </motion.div>
  );
}

export default InitialLoader;
