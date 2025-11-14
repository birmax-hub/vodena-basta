'use client';

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vodenabasta.rs";

export function CanonicalURL() {
  const pathname = usePathname();

  const canonicalHref = useMemo(() => {
    const normalisedPath = pathname === "/" ? "" : pathname;
    return `${baseUrl}${normalisedPath}`;
  }, [pathname]);

  return <link rel="canonical" href={canonicalHref} />;
}

export default CanonicalURL;

