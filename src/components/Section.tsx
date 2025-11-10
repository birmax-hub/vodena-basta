'use client';

import { motion } from "framer-motion";
import { type ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
  children?: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  alignment = "left",
  className,
  children,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <Container>
        <div
          className={cn(
            "mx-auto max-w-3xl space-y-4",
            alignment === "center" ? "text-center" : "text-left"
          )}
        >
          {eyebrow ? (
            <span className="inline-flex items-center justify-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-forest-900 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-lg leading-relaxed text-forest-700">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </Container>
    </motion.section>
  );
}

