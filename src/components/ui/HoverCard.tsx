"use client";

import {
  ElementType,
  ReactNode,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";

import { cn } from "@/lib/utils";

type HoverCardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

const baseClassName =
  "group relative isolate overflow-hidden rounded-3xl border border-white/[0.035] bg-[linear-gradient(155deg,rgba(14,46,40,0.55)_0%,rgba(7,21,26,0.78)_42%,rgba(6,12,21,0.9)_100%)] backdrop-blur-xl shadow-[0_24px_120px_rgba(5,18,24,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform will-change-filter motion-safe:hover:-translate-y-1.5 motion-safe:hover:scale-[1.02] motion-safe:hover:shadow-[0_32px_120px_rgba(12,255,219,0.25)]";

export function HoverCard<T extends ElementType = "div">({
  as,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: HoverCardProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const [highlight, setHighlight] = useState({ x: "50%", y: "50%", opacity: 0 });

  const highlightStyle = useMemo(
    () => ({
      background: `radial-gradient(520px 520px at ${highlight.x} ${highlight.y}, rgba(108,255,231,0.22) 0%, rgba(108,255,231,0) 90%)`,
      backgroundRepeat: "no-repeat",
      opacity: highlight.opacity,
    }),
    [highlight],
  );

  return (
    <Component
      className={cn(baseClassName, "hover:-translate-y-1 hover:scale-[1.01] hover:shadow-glow", className)}
      onMouseMove={(event: MouseEvent<HTMLElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 100;
        const y = ((event.clientY - bounds.top) / bounds.height) * 100;
        setHighlight({ x: `${x}%`, y: `${y}%`, opacity: 0.08 });
        onMouseMove?.(event);
      }}
      onMouseLeave={(event: MouseEvent<HTMLElement>) => {
        setHighlight((prev) => ({ ...prev, opacity: 0 }));
        onMouseLeave?.(event);
      }}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px rounded-[inherit] transition-opacity duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
        style={highlightStyle}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/[0.04] opacity-25 transition-opacity duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:opacity-45"
        style={{
          background:
            "radial-gradient(420px 420px at 30% 20%, rgba(102,228,255,0.18) 0%, rgba(102,228,255,0) 88%)",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10">{children}</div>
    </Component>
  );
}


