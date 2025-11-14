'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type BackLinkProps = {
  fallbackHref: string;
  label?: string;
  className?: string;
  matchPaths?: string[];
};

export function BackLink({
  fallbackHref,
  label = "← Nazad",
  className,
  matchPaths = ["/blog", "/studies"],
}: BackLinkProps) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  // ESLint-friendly zavisnost
  const matchKey = matchPaths.join("|");

  useEffect(() => {
    if (typeof document === "undefined") return;

    const paths = matchKey.split("|");
    if (document.referrer && paths.some((p) => document.referrer.includes(p))) {
      setCanGoBack(true);
    }
  }, [matchKey]);

  const handleClick = () => {
    if (canGoBack) router.back();
    else router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-emerald-100/80 transition duration-300 hover:border-white/20 hover:text-white",
        className
      )}
    >
      {label}
    </button>
  );
}
