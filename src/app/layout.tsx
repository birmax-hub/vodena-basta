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
      <body className={`${inter.variable} ${poppins.variable} relative`}>
        <SmoothScrollClient />
        <SceneBackground />
        <div className="relative z-10 flex min-h-full flex-col">
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

