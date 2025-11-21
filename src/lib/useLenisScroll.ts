"use client";

import { useEffect, useState } from "react";

import Lenis from "lenis";

export function useLenisScroll(enabled = true) {
  const [shouldInit, setShouldInit] = useState(false);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Defer Lenis initialization until after page load and user interaction
    const initLenis = () => {
      setShouldInit(true);
    };
    
    // Wait for page load, then either user scroll/interaction or timeout
    if (typeof window === "undefined") {
      return;
    }
    
    const handleLoad = () => {
      // After page load, wait for user interaction or timeout
      const handleUserInteraction = () => {
        initLenis();
        window.removeEventListener("scroll", handleUserInteraction);
        window.removeEventListener("click", handleUserInteraction);
      };
      
      window.addEventListener("scroll", handleUserInteraction, { passive: true, once: true });
      window.addEventListener("click", handleUserInteraction, { once: true });
      
      // Fallback: initialize after timeout if no interaction
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initLenis, { timeout: 600 });
      } else {
        setTimeout(initLenis, 600);
      }
    };
    
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }
    
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !shouldInit) {
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

    // Start rAF loop only after initialization
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled, shouldInit]);
}
