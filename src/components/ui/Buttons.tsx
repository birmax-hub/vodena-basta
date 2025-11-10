"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  href: string;
};

const transitionEase = "ease-[cubic-bezier(0.22,0.61,0.36,1)]";

const baseButtonClasses = cn(
  "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
  "outline-none focus-visible:ring-2 focus-visible:ring-aqua-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "transition-transform transition-shadow transition-colors duration-300",
  "transform-gpu",
  `motion-safe:hover:scale-[1.05] motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98]`,
  "focus-visible:scale-[1.02]",
  `duration-300 ${transitionEase}`,
  "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300",
  "after:pointer-events-none after:absolute after:inset-[-18%] after:rounded-full after:bg-[radial-gradient(circle,rgba(82,255,227,0.25)_0%,rgba(82,255,227,0)_70%)] after:opacity-0 after:transition-opacity after:duration-300",
  "motion-safe:hover:after:opacity-100 motion-safe:hover:before:opacity-50",
  "link-plain",
);

const primaryClasses =
  "bg-[linear-gradient(118deg,#19d6c4_0%,#00c6ff_35%,#0072ff_65%,#00c6ff_82%,#ffd633_98%)] text-white shadow-[0_18px_55px_rgba(0,198,255,0.28)] border border-white/[0.08] hover:border-white/[0.12] motion-safe:hover:shadow-[0_28px_85px_rgba(0,198,255,0.38)]";

const ghostClasses =
  "border border-white/[0.04] bg-transparent text-accent-200/80 hover:border-accentBlue-400/60 hover:text-white hover:bg-white/[0.06] hover:shadow-[0_20px_50px_rgba(0,198,255,0.25)]";

export function PrimaryButton({ className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(baseButtonClasses, primaryClasses, className)} {...rest}>
      {children}
    </button>
  );
}

export function GhostButton({ className, children, ...rest }: ButtonProps) {
  return (
    <button className={cn(baseButtonClasses, ghostClasses, className)} {...rest}>
      {children}
    </button>
  );
}

export function PrimaryLink({ className, children, href, ...rest }: LinkProps) {
  return (
    <Link href={href} className={cn(baseButtonClasses, primaryClasses, className)} {...rest}>
      {children}
    </Link>
  );
}

export function GhostLink({ className, children, href, ...rest }: LinkProps) {
  return (
    <Link href={href} className={cn(baseButtonClasses, ghostClasses, className)} {...rest}>
      {children}
    </Link>
  );
}


