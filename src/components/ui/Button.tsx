import Link from "next/link";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type Ref,
  type AnchorHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function getVariantClasses(variant: ButtonVariant) {
  switch (variant) {
    case "secondary":
      return "glass-button border border-white/[0.03] bg-white/[0.05] text-accent-100/90 backdrop-blur-xl motion-safe:hover:text-white motion-safe:hover:border-accentBlue-400/50 motion-safe:hover:shadow-[0_26px_65px_rgba(0,198,255,0.28)]";
    case "ghost":
      return "border border-white/[0.05] bg-transparent text-accent-200/80 hover:border-accentBlue-400/55 hover:text-white hover:bg-white/[0.06] motion-safe:hover:shadow-[0_24px_55px_rgba(0,198,255,0.28)]";
    case "primary":
    default:
      return "bg-[linear-gradient(118deg,#18d1bd_0%,#00c6ff_34%,#0072ff_62%,#00b1ff_88%,#ffd633_100%)] text-white shadow-[0_18px_60px_rgba(0,198,255,0.3)] border border-white/[0.08] hover:border-white/[0.12] motion-safe:hover:shadow-[0_30px_85px_rgba(0,198,255,0.4)]";
  }
}

function getSizeClasses(size: ButtonSize) {
  switch (size) {
    case "sm":
      return "px-4 py-2 text-sm";
    case "lg":
      return "px-7 py-3 text-lg";
    case "md":
    default:
      return "px-6 py-2.5 text-base";
  }
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", ...props },
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 motion-safe:hover:scale-[1.05] motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] focus-visible:scale-[1.02] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300 after:pointer-events-none after:absolute after:inset-[-22%] after:rounded-full after:bg-[radial-gradient(circle,rgba(82,255,227,0.22)_0%,rgba(82,255,227,0)_70%)] after:opacity-0 after:transition-opacity after:duration-300 motion-safe:hover:before:opacity-55 motion-safe:hover:after:opacity-100",
        getVariantClasses(variant),
        getSizeClasses(size),
        className,
      )}
      {...props}
    />
  );
});

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 motion-safe:hover:scale-[1.05] motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] focus-visible:scale-[1.02] before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-white/10 before:opacity-0 before:transition-opacity before:duration-300 after:pointer-events-none after:absolute after:inset-[-22%] after:rounded-full after:bg-[radial-gradient(circle,rgba(82,255,227,0.22)_0%,rgba(82,255,227,0)_70%)] after:opacity-0 after:transition-opacity after:duration-300 motion-safe:hover:before:opacity-55 motion-safe:hover:after:opacity-100 link-plain",
        getVariantClasses(variant),
        getSizeClasses(size),
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

export { Button };

