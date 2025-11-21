import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.vodenabasta.rs";
const siteName = "Vodena Bašta";
const defaultTitle = siteName;
const defaultDescription =
  "Vodena Bašta gradi inteligentne akvaponske sisteme koji povezuju ribe, biljke i tehnologiju u održivu proizvodnju hrane.";

export const siteMetadata = {
  siteUrl,
  siteName,
  title: defaultTitle,
  description: defaultDescription,
  locale: "sr_RS",
  keywords: [
    "akvaponija",
    "održiva proizvodnja hrane",
    "regenerativna poljoprivreda",
    "Vodena Bašta",
    "pametni sistemi za gajenje",
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: siteMetadata.keywords,
  openGraph: {
    type: "website",
    locale: siteMetadata.locale,
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/images/og-default.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

