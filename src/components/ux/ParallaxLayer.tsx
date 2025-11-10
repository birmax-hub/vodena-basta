'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

type ParallaxLayerProps = PropsWithChildren<{
  speed?: number;
  className?: string;
}>;

export default function ParallaxLayer({
  speed = 0.2,
  className = "",
  children,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

