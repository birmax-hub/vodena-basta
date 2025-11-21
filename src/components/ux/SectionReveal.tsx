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

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initial appearance
  useEffect(() => {
    const node = scope.current;
    if (!node) return;

    if (prefersReducedMotion) {
      node.style.opacity = "1";
      node.style.transform = "none";
      node.style.filter = "none";

      if (childSelector) {
        node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
          element.style.filter = "none";
        });
      }
      return;
    }

    // Stable, non-flicker initial state
    node.style.opacity = "0.7";
    node.style.transform = "translate3d(0, 6px, 0)";
    node.style.filter = "blur(6px)";

    if (childSelector) {
      node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
        element.style.opacity = "0.7";
        element.style.transform = "translate3d(0, 6px, 0)";
        element.style.filter = "blur(6px)";
      });
    }
  }, [childSelector, prefersReducedMotion, scope]);

  // Animation once visible
  useEffect(() => {
    const node = scope.current;
    if (!node || !isInView || prefersReducedMotion) return;

    const runAnimation = async () => {
      const mobileDelay = isMobile ? 0.02 : 0;
      const totalDelay = delay + mobileDelay;

      // Parent animation
      await animate(
        node,
        {
          opacity: [0.7, 1],
          transform: ["translate3d(0, 6px, 0)", fadeInUpTransforms.parentTo],
          filter: ["blur(6px)", "blur(0px)"],
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
                filter: ["blur(6px)", "blur(0px)"],
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
  }, [animate, childSelector, delay, isInView, isMobile, prefersReducedMotion, scope, stagger]);

  return (
    <div
      ref={scope}
      className={cn(className)}
      style={{
        willChange: "opacity, transform",
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
