import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type GradientTextProps = ComponentPropsWithoutRef<"span">;

export function GradientText({ className, children, ...rest }: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-white via-accentBlue-400 to-accentYellow-300 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,198,255,0.35)]",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}


