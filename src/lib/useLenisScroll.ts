"use client";

import { useEffect } from "react";

import Lenis from "lenis";

export function useLenisScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.18,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 1.15,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);
}
