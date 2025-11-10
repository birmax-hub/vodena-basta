"use client";

import { PropsWithChildren, useEffect } from "react";
import { useAnimate, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

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
  stagger = 0.12,
}: SectionRevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(scope, { once });
  const prefersReducedMotion = useReducedMotion();

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

    node.style.opacity = "0";
    node.style.transform = "translate3d(0, 24px, 0) scale(0.98)";
    node.style.filter = "blur(18px)";

    if (childSelector) {
      node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translate3d(0, 28px, 0)";
        element.style.filter = "blur(18px)";
      });
    }
  }, [childSelector, prefersReducedMotion, scope]);

  useEffect(() => {
    const node = scope.current;
    if (!node || !isInView || prefersReducedMotion) return;

    const ease: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

    const runAnimation = async () => {
      await animate(
        node,
        {
          opacity: [0, 1],
          transform: ["translate3d(0, 24px, 0) scale(0.98)", "translate3d(0, 0, 0) scale(1)"],
          filter: ["blur(18px)", "blur(0px)"],
        },
        { duration: 0.85, delay, ease },
      );

      if (childSelector) {
        const targets = node.querySelectorAll<HTMLElement>(childSelector);
        if (targets.length > 0) {
          targets.forEach((element, index) => {
            void animate(
              element,
              {
                opacity: [0, 1],
                transform: ["translate3d(0, 28px, 0)", "translate3d(0, 0, 0)"],
                filter: ["blur(18px)", "blur(0px)"],
              },
              {
                duration: 0.65,
                ease,
                delay: index * stagger,
              },
            );
          });
        }
      }
    };

    void runAnimation();
  }, [animate, childSelector, delay, isInView, prefersReducedMotion, scope, stagger]);

  return (
    <div ref={scope} className={cn(className)}>
      {children}
    </div>
  );
}
