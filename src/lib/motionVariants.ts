import type { EasingDefinition } from "framer-motion";

export const easeOutSoft: EasingDefinition = [0.25, 0.8, 0.25, 1];

export const fadeInUpTimings = {
  parentDuration: 0.55,
  childDuration: 0.45,
  stagger: 0.15,
};

export const fadeInUpTransforms = {
  parentFrom: "translate3d(0, 24px, 0) scale(0.98)",
  parentTo: "translate3d(0, 0, 0) scale(1)",
  childFrom: "translate3d(0, 28px, 0)",
  childTo: "translate3d(0, 0, 0)",
};
