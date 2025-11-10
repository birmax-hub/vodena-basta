import "./globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { type ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { organizationJsonLd, siteMeta } from "@/lib/seo";

const Navbar = dynamic(
  () => import("@/components/Navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false },
);

const SmoothScrollClient = dynamic(() => import("@/components/ux/SmoothScrollClient"), {
  ssr: false,
});

const PageTransition = dynamic(() => import("@/components/ux/PageTransition"), { ssr: false });

const SceneBackground = dynamic(
  () => import("@/components/ux/SceneBackground").then((mod) => ({ default: mod.SceneBackground })),
  { ssr: false },
);

const InitialLoader = dynamic(
  () => import("@/components/InitialLoader").then((mod) => ({ default: mod.InitialLoader })),
  { ssr: false },
);

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = siteMeta;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr">
      <body className={`${inter.variable} ${poppins.variable} relative`} data-loaded="false">
        <div
          id="initial-loader-fallback"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br from-[#002d2a] via-[#003631] to-[#001f1b] backdrop-blur-2xl"
          aria-hidden
        >
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-emerald-400/25 blur-3xl" aria-hidden />
            <span className="absolute inset-2 rounded-full bg-emerald-500/20 blur-xl" aria-hidden />
            <span className="relative h-8 w-8 rounded-full bg-gradient-to-br from-emerald-300/70 via-cyan-400/70 to-emerald-200/60 shadow-[0_0_32px_rgba(52,255,200,0.3)]" aria-hidden />
          </span>
        </div>
        <InitialLoader />
        <SmoothScrollClient />
        <SceneBackground />
        <div className="site-shell relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main id="content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}

