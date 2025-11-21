import "./globals.css";

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import { type ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { organizationJsonLd } from "@/lib/seo";

// Dynamic imports for performance
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const SmoothScrollClient = dynamic(() => import("@/components/ux/SmoothScrollClient"), { ssr: false });
const PageTransition = dynamic(() => import("@/components/ux/PageTransition"), { ssr: false });
const SceneBackground = dynamic(() => import("@/components/ux/SceneBackground"), { ssr: false });
const InitialLoader = dynamic(() => import("@/components/InitialLoader"), { ssr: false });
const CanonicalURL = dynamic(() => import("@/components/CanonicalURL"), { ssr: false });

// Fonts
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

// Environment variables
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://vodenabasta.rs"),
  title: {
    default: "Vodena Bašta – Pametan akvaponski sistem",
    template: "%s | Vodena Bašta",
  },
  description:
    "Premium akvaponski sistemi, proizvodnja bez pesticida, minimalna potrošnja resursa i pametni AI nadzor.",
  keywords: [
    "vodena basta",
    "akvaponija",
    "akvaponski sistemi",
    "održiva poljoprivreda",
    "urbana poljoprivreda",
    "hidroponija",
    "aeroponika",
    "organska proizvodnja hrane",
  ],
  alternates: {
    canonical: "https://vodenabasta.rs",
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://vodenabasta.rs",
    siteName: "Vodena Bašta – Akvaponski sistem",
    title: "Vodena Bašta – Pametan akvaponski sistem",
    description:
      "Premium akvaponski sistemi, proizvodnja bez pesticida, minimalna potrošnja resursa i pametni AI nadzor.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vodena Bašta – Akvaponski sistem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vodena Bašta – Pametan akvaponski sistem",
    description:
      "Premium akvaponski sistemi, proizvodnja bez pesticida, minimalna potrošnja resursa i pametni AI nadzor.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: googleVerification || "",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sr">
      <head>
        {/* DNS Prefetch Control */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Viewport Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0d3a35" />
        
        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preconnect for Supabase (used for storage) */}
        <link rel="preconnect" href="https://vmzkfwmyypbgjyjkvoim.supabase.co" />
        
        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vmzkfwmyypbgjyjkvoim.supabase.co" />
        
        {/* Google Verification */}
        {googleVerification ? (
          <meta name="google-site-verification" content={googleVerification} />
        ) : null}
        
        <CanonicalURL />
      </head>

      <body className={`${inter.variable} ${poppins.variable} relative`} data-loaded="false">
        {/* Initial Loader Fallback */}
        <div
          id="initial-loader-fallback"
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-gradient-to-br 
          from-[#002d2a] via-[#003631] to-[#001f1b] backdrop-blur-2xl"
          aria-hidden
        >
          <span className="relative flex h-12 w-12 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-emerald-400/25 blur-3xl" aria-hidden />
            <span className="absolute inset-2 rounded-full bg-emerald-500/20 blur-xl" aria-hidden />
            <span className="relative h-8 w-8 rounded-full bg-gradient-to-br 
              from-emerald-300/70 via-cyan-400/70 to-emerald-200/60 
              shadow-[0_0_32px_rgba(52,255,200,0.3)]"
              aria-hidden 
            />
          </span>
        </div>

        <InitialLoader />
        <SmoothScrollClient />
        <SceneBackground />

        {/* Page Shell */}
        <div className="site-shell relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main id="content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>

        {/* Google Analytics */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}

        {/* Schema.org JSON-LD */}
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
