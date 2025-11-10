"use client";

import { forwardRef } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

type IconWrapperProps = Omit<LucideProps, "size" | "className"> & {
  icon: LucideIcon;
  size?: number | string;
  className?: string;
};

export const Icon = forwardRef<SVGSVGElement, IconWrapperProps>(function Icon(
  { icon: IconComponent, className, size = 24, ...rest },
  ref,
) {
  return (
    <IconComponent
      ref={ref}
      size={size}
      className={cn(
        "text-[#d9fff8b3] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform will-change-filter",
        "motion-safe:hover:scale-[1.08] motion-safe:hover:drop-shadow-[0_0_25px_rgba(66,255,217,0.45)] hover:text-brand-aqua focus-visible:text-brand-aqua",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
      {...rest}
    />
  );
});

