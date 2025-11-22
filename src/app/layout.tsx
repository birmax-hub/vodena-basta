// CSS is imported here - Next.js 14 automatically optimizes and extracts critical CSS
// The framework handles non-blocking CSS loading automatically
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
// CanonicalURL removed - using Next.js Metadata API (alternates.canonical) instead to avoid duplicate canonical tags

// Fonts - optimized with minimal subsets and display swap for LCP
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
  preload: false, // Only preload primary font
  fallback: ["system-ui", "arial"],
});

// Environment variables
const gaId = process.env.NEXT_PUBLIC_GA_ID;
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vodenabasta.rs"),
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
    canonical: "https://www.vodenabasta.rs/",
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "https://www.vodenabasta.rs/",
    siteName: "Vodena Bašta",
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
        
        {/* Preconnect for critical domains (improves LCP and FCP) */}
        <link rel="preconnect" href="https://www.vodenabasta.rs" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://vmzkfwmyypbgjyjkvoim.supabase.co" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="https://www.vodenabasta.rs" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://vmzkfwmyypbgjyjkvoim.supabase.co" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo/vodena-basta-site-icon.png" as="image" type="image/png" />
        
        {/* Preload first CSS chunk - Next.js 14 automatically optimizes CSS and handles preloading */}
        {/* CSS files are generated with content hashes, so Next.js handles CSS optimization automatically */}
        {/* The framework extracts critical CSS and loads non-critical CSS asynchronously */}
        
        {/* Preload critical font file */}
        <link rel="preload" as="font" href="/_next/static/media/8e9860b6e62d6359-s.woff2" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Critical CSS for hero section - typography and layout only (no animations/gradients) */}
        {/* Targets above-the-fold hero elements for immediate first paint - ~3KB */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Body background for first paint */
            body{background:linear-gradient(180deg,#0d3a35 0%,#0a2f2b 100%) fixed!important;min-height:100%;color:#d8e2d0;font-family:var(--font-inter),Inter,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;letter-spacing:-0.01em;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
            
            /* Hero H1 - typography only (LCP element) - ensures immediate render */
            #pocetak h1{position:relative;text-wrap:balance;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:600;line-height:1.08;letter-spacing:-0.015em;color:#fff;margin:0}
            @media(min-width:768px){#pocetak h1{font-size:clamp(3rem,5vw,3.75rem);line-height:1.06}}
            @media(min-width:1024px){#pocetak h1{font-size:clamp(3.5rem,5vw,4.5rem)}}
            #pocetak h1 span{display:block}
            
            /* Hero subtitle - typography only */
            #pocetak h1+div p,#pocetak h1~p{max-width:42rem;font-size:clamp(1.02rem,1.45vw,1.22rem);line-height:1.75;color:rgba(209,250,229,0.85);margin-top:1.5rem}
            @media(min-width:768px){#pocetak h1+div p,#pocetak h1~p{line-height:2}}
          `
        }} />
        
        {/* Google Verification */}
        {googleVerification ? (
          <meta name="google-site-verification" content={googleVerification} />
        ) : null}
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

        {/* Google Analytics 4 - Loads only after first user interaction to avoid TBT impact */}
        {/* Set NEXT_PUBLIC_ENABLE_ANALYTICS=true to enable, NEXT_PUBLIC_GA_ID for tracking ID */}
        {gaId && process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true' ? (
          <Script
            id="analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  if (typeof window === 'undefined') return;
                  const gaId = '${gaId}';
                  let initialized = false;
                  const loadGA4 = function() {
                    if (initialized) return;
                    initialized = true;
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
                    document.head.appendChild(script);
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', gaId, {
                      page_path: window.location.pathname,
                      send_page_view: true
                    });
                  };
                  const events = ['scroll', 'mousedown', 'touchstart', 'keydown'];
                  const handler = function() {
                    loadGA4();
                    events.forEach(function(e) {
                      window.removeEventListener(e, handler, { passive: true });
                    });
                  };
                  events.forEach(function(e) {
                    window.addEventListener(e, handler, { passive: true, once: true });
                  });
                })();
              `,
            }}
          />
        ) : null}

        {/* Schema.org JSON-LD */}
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
