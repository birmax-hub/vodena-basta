"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer scroll check to avoid forced reflow on mount
    const initScrollListener = () => {
      // Throttle scroll handler to reduce TBT (throttle is better than debounce for scroll)
      let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (scrollTimeout === null) {
          scrollTimeout = setTimeout(() => {
            setVisible(currentScrollY > 320);
            scrollTimeout = null;
          }, 16); // ~60fps throttle
        }
      };

      // Check scroll position after initialization
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
      };
    };
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initScrollListener, { timeout: 200 });
      return () => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timeoutId = setTimeout(initScrollListener, 150);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-8 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-white/[0.02] bg-white/[0.035] px-5 py-2.5 text-sm font-semibold text-aqua-100 shadow-[0_0_50px_rgba(26,217,206,0.05)] backdrop-blur-xl transition",
        "hover:border-aqua-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60",
      )}
      aria-label="Nazad na vrh"
    >
      <Icon icon={ArrowUp} size={18} aria-hidden />
      Na vrh
    </button>
  );
}


