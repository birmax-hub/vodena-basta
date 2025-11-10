"use client";

import { PropsWithChildren, useEffect } from "react";
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
    node.style.transform = fadeInUpTransforms.parentFrom;
    node.style.filter = "blur(18px)";

    if (childSelector) {
      node.querySelectorAll<HTMLElement>(childSelector).forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = fadeInUpTransforms.childFrom;
        element.style.filter = "blur(18px)";
      });
    }
  }, [childSelector, prefersReducedMotion, scope]);

  useEffect(() => {
    const node = scope.current;
    if (!node || !isInView || prefersReducedMotion) return;

    const runAnimation = async () => {
      await animate(
        node,
        {
          opacity: [0, 1],
          transform: [fadeInUpTransforms.parentFrom, fadeInUpTransforms.parentTo],
          filter: ["blur(18px)", "blur(0px)"],
        },
        { duration: fadeInUpTimings.parentDuration, delay, ease: easeOutSoft },
      );

      if (childSelector) {
        const targets = node.querySelectorAll<HTMLElement>(childSelector);
        if (targets.length > 0) {
          targets.forEach((element, index) => {
            void animate(
              element,
              {
                opacity: [0, 1],
                transform: [fadeInUpTransforms.childFrom, fadeInUpTransforms.childTo],
                filter: ["blur(18px)", "blur(0px)"],
              },
              {
                duration: fadeInUpTimings.childDuration,
                ease: easeOutSoft,
                delay: index * (stagger ?? fadeInUpTimings.stagger),
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
