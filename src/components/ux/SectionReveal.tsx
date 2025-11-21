"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { easeOutSoft, fadeInUpTimings, fadeInUpTransforms } from "@/lib/motionVariants";

type SectionRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  once?: boolean;
  childSelector?: string;
  stagger?: number;
}>;

export function SectionReveal({
  children,
  className,
  delay = 0,
  once = true,
  childSelector,
  stagger = fadeInUpTimings.stagger,
}: SectionRevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(scope, { once });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Defer mobile check to avoid forced reflow on mount
    const initMobileCheck = () => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    };
    
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initMobileCheck, { timeout: 200 });
    } else {
      setTimeout(initMobileCheck, 150);
    }
  }, []);

  // Initial appearance
  useEffect(() => {
    const node = scope.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.style.opacity = "1";
      node.style.transform = "none";

      if (childSelector) {
        // Defer querySelectorAll to avoid blocking initial paint
        const initChildren = () => {
          node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
          });
        };
        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initChildren, { timeout: 100 });
        } else {
          setTimeout(initChildren, 50);
        }
        return;
      }
      return;
    }

    // Stable, non-flicker initial state - GPU composited (opacity + transform only)
    node.style.opacity = "0.7";
    node.style.transform = "translate3d(0, 6px, 0)";

    if (childSelector) {
      // Defer querySelectorAll to avoid blocking initial paint
      const initChildren = () => {
        node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
          element.style.opacity = "0.7";
          element.style.transform = "translate3d(0, 6px, 0)";
        });
        setIsInitialized(true);
      };
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(initChildren, { timeout: 100 });
      } else {
        setTimeout(initChildren, 50);
      }
    } else {
      setIsInitialized(true);
    }
  }, [childSelector, prefersReducedMotion, scope]);

  // Animation once visible
  useEffect(() => {
    const node = scope.current;
    if (!node || !isInView || prefersReducedMotion || !isInitialized) return;

    const runAnimation = async () => {
      const mobileDelay = isMobile ? 0.02 : 0;
      const totalDelay = delay + mobileDelay;

      // Parent animation - GPU composited (opacity + transform only)
      await animate(
        node,
        {
          opacity: [0.7, 1],
          transform: ["translate3d(0, 6px, 0)", fadeInUpTransforms.parentTo],
        },
        { duration: fadeInUpTimings.parentDuration, delay: totalDelay, ease: easeOutSoft },
      );

      // Child animation
      if (childSelector) {
        const targets = node.querySelectorAll<HTMLElement>(childSelector);
        if (targets.length > 0) {
          targets.forEach((element, index) => {
            void animate(
              element,
              {
                opacity: [0.7, 1],
                transform: ["translate3d(0, 6px, 0)", fadeInUpTransforms.childTo],
              },
              {
                duration: fadeInUpTimings.childDuration,
                ease: easeOutSoft,
                delay: totalDelay + index * (stagger ?? fadeInUpTimings.stagger),
              },
            );
          });
        }
      }
    };

    void runAnimation();
  }, [animate, childSelector, delay, isInView, isMobile, isInitialized, prefersReducedMotion, scope, stagger]);

  return (
    <div
      ref={scope}
      className={cn(className)}
      style={{
        // Conditionally set willChange only after initialization to reduce layer overhead
        willChange: isInitialized && isInView ? "opacity, transform" : "auto",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}
