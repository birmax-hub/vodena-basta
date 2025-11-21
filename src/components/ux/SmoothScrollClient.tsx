"use client";

import { useLenisScroll } from "@/lib/useLenisScroll";
import { useEffect, useState } from "react";

export default function SmoothScrollClient() {
  const [enabled, setEnabled] = useState(false);
 
  useEffect(() => {
    // Enable Lenis only after initial render
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(() => setEnabled(true), { timeout: 400 });
      return () => {
        if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: typeof cancelIdleCallback }).cancelIdleCallback(idleId);
        }
      };
    } else {
      const timer = setTimeout(() => setEnabled(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);
 
  useLenisScroll(enabled);
  return null;
}

