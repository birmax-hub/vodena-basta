import type { Metadata } from "next";

export const SITE_URL = "https://vodenabasta.rs";
export const SITE_NAME = "Vodena Bašta";
export const SITE_LOGO =
  "https://vmzkfwmyypbgjyjkvoim.supabase.co/storage/v1/object/public/Logo/vodena-basta-site-icon.png";

export const siteMeta: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vodena Bašta - Akvaponski sistem za održivu proizvodnju hrane",
    template: "%s | Akvaponija - Proizvodnja hrane bez zemlje",
  },
  description:
    "Vodena Bašta iz Stapara dizajnira akvaponske sisteme za uzgoj biljaka bez zemlje, čistu organsku hranu i održivu poljoprivredu u Srbiji i regionu Balkana.",
  alternates: {
    canonical: "/",
    languages: {
      "sr-Latn": "/",
    },
  },
  openGraph: {
    title: "Vodena Bašta - Akvaponski sistem za održivu proizvodnju hrane",
    description:
      "Pioniri akvaponije u Srbiji. Vodena Bašta razvija sisteme za uzgoj biljaka i riba bez hemije, sa minimalnom potrošnjom vode i stalnom proizvodnjom povrća.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "sr_RS",
    images: [
      {
        url: SITE_LOGO,
        width: 512,
        height: 512,
        alt: "Logo Vodena Bašta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vodena Bašta - Akvaponski sistem za održivu proizvodnju hrane",
    description:
      "Otkrijte kako Vodena Bašta povezuje uzgoj ribe i biljaka u zatvoren ciklus koji štedi vodu i donosi zdravo povrće tokom cele godine.",
    images: [SITE_LOGO],
  },
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: MetadataInput): Metadata {
  const url = new URL(path, SITE_URL);

  return {
    title,
    description,
    alternates: {
      canonical: url.pathname,
      languages: {
        "sr-Latn": url.pathname,
      },
    },
    openGraph: {
      title,
      description,
      url: url.href,
      siteName: SITE_NAME,
      type: "website",
      locale: "sr_RS",
      images: [
        {
          url: SITE_LOGO,
          width: 512,
          height: 512,
          alt: "Logo Vodena Bašta",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_LOGO],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    alternateName: "PG Vesna Radin",
    url: SITE_URL,
    telephone: "+381604500876",
    logo: SITE_LOGO,
    image: SITE_LOGO,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Svetosavska",
      addressLocality: "Stapar",
      addressRegion: "Zapadno-bački okrug",
      postalCode: "25260",
      addressCountry: "RS",
    },
    areaServed: ["Srbija", "Balkan"],
    sameAs: [
      "https://www.instagram.com/vodenabasta",
      "https://www.facebook.com/vodenabasta",
      "https://www.linkedin.com/company/vodenabasta",
    ],
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Akvadajz",
    description:
      "Akvadajz je premium paradajz iz akvaponskog sistema Vodene Bašte, uzgojen bez pesticida i sa minimalnom potrošnjom vode.",
    image: [
      `${SITE_URL}/images/placeholders/proizvod-akvadajz.jpg`,
      SITE_LOGO,
    ],
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RSD",
      price: "0.00",
      availability: "https://schema.org/PreOrder",
      url: `${SITE_URL}#proizvodi`,
    },
    sku: "AKV-001",
  };
}

export function blogPostingJsonLd(params: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}) {
  const { title, description, slug, image, datePublished, dateModified } =
    params;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}#blog-${slug}`,
    },
    image: image ?? SITE_LOGO,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?pretraga={pretraga}`,
      "query-input": "required name=pretraga",
    },
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt Vodena Bašta",
    url: `${SITE_URL}#kontakt`,
    description:
      "Kontakt strana za Vodenu Baštu - zakazivanje konsultacija i slanje upita za akvaponske projekte.",
  };
}

