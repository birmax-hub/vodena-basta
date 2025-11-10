"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group rounded-3xl border border-white/[0.035] bg-[linear-gradient(160deg,rgba(11,38,34,0.62)_0%,rgba(7,18,25,0.82)_48%,rgba(5,12,19,0.96)_100%)] p-6 text-accent-200 shadow-[0_32px_140px_rgba(3,14,20,0.48)] transition hover:-translate-y-1 hover:border-aqua-500/35 hover:shadow-[0_36px_160px_rgba(104,240,214,0.18)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.04] bg-white/[0.1] text-aqua-300 transition group-hover:border-aqua-500/40 group-hover:text-white">
        <Icon size={24} strokeWidth={1.8} aria-hidden />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-accent-200/80">{description}</p>
    </div>
  );
}

