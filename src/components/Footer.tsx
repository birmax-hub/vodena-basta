/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";

const FOOTER_LINKS = [
  { label: "Početak", href: "#hero" },
  { label: "Akvaponija", href: "#akvaponija" },
  { label: "Uzgoj biljaka i riba", href: "#usluge" },
  { label: "Proizvodi", href: "#proizvodi" },
  { label: "Portfolio", href: "#projekti" },
  { label: "Blog", href: "#blog" },
  { label: "Kontakt", href: "#kontakt" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.02] bg-[rgba(6,20,18,0.94)] text-accent-200">
      <Container className="grid gap-12 py-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="space-y-6">
          <div className="logo-group group">
            <div className="logo-container logo-glow w-14 h-14">
              <img
                src="/logo/vodena-basta-site-icon.png"
                alt="Vodena Bašta logo"
                className="absolute h-[165%] w-[165%] scale-[1.25] object-cover object-center saturate-[1.25] brightness-[1.1] contrast-[1.05] drop-shadow-[0_0_12px_rgba(0,255,204,0.25)] transition-transform duration-500 group-hover:scale-[1.3]"
                loading="lazy"
                decoding="async"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
            <div className="logo-text text-center sm:text-left">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/90 sm:text-base">
                VODENA BAŠTA
              </h2>
              <p className="text-xs tracking-widest text-emerald-300/80 sm:text-sm">Akvaponski sistem iz Stapara</p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-accent-200/75">
            Vodena Bašta razvija i održava skalabilne akvaponske sisteme koji povezuju ribe i biljke u stabilan kružni
            tok. Naša misija je pouzdana proizvodnja hrane koja štedi vodu i energiju.
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center gap-4 text-sm text-accent-200/75">
            <span className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.02] bg-white/[0.05] text-aqua-300 shadow-[0_0_25px_rgba(26,217,206,0.12)] transition hover:border-aqua-500/35">
              <MapPin
                size={18}
                className="text-[#d9fff8b3] transition-transform duration-300 ease-out will-change-transform group-hover:scale-105 group-hover:text-aqua-400 group-hover:drop-shadow-neon"
                aria-hidden
              />
            </span>
            <span>Svetosavska, Stapar · Radimo širom Srbije i regiona Balkana.</span>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-300">Kontakt</h3>
          <ul className="space-y-3 text-sm text-accent-200/75">
            <li>
              Telefon:{" "}
              <a
                href="tel:+381604500876"
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
              >
                +381 60 450 08 76
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:pozdrav@vodenabasta.rs"
                className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
              >
                pozdrav@vodenabasta.rs
              </a>
            </li>
            <li>Radno vreme: pon-pet 9-17h · subota 9-13h</li>
          </ul>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="flex gap-3">
            {[
              { href: "https://www.instagram.com/vodenabasta", icon: Instagram, label: "Instagram" },
              { href: "https://www.facebook.com/vodenabasta", icon: Facebook, label: "Facebook" },
              { href: "https://www.linkedin.com/company/vodenabasta", icon: Linkedin, label: "LinkedIn" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.02] bg-white/[0.05] text-accent-200 transition hover:border-aqua-500/40 hover:text-white hover:scale-110 hover:shadow-[0_0_18px_rgba(0,198,255,0.25)]"
                aria-label={item.label}
              >
                <item.icon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-accent-300">Navigacija</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-accent-200/75">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  prefetch={false}
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/[0.02]">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-xs text-accent-200/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Vodena Bašta. Sva prava zadržana.</p>
          <p>Dizajn i razvoj: Vodena Bašta</p>
        </Container>
      </div>
    </footer>
  );
}

