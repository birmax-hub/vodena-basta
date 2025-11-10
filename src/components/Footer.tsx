import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { supabasePublicUrl } from "@/lib/images";

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
          <div className="flex items-center gap-4">
            <Image
              src={supabasePublicUrl("Logo/vodena-basta-site-icon.png")}
              alt="Logo Vodena Bašta"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-white/[0.025] bg-white/[0.08] object-cover shadow-[0_0_35px_rgba(26,217,206,0.12)]"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent-300">Vodena Bašta</p>
              <p className="text-sm text-accent-200/70">Akvaponski sistem iz Stapara</p>
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
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.02] bg-white/[0.05] text-accent-200 transition hover:border-aqua-500/40 hover:text-white"
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
                  className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
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

