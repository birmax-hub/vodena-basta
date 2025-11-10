"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { List } from "lucide-react";

import { MobileMenu } from "@/components/MobileMenu";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import { cn } from "@/lib/utils";
import { supabasePublicUrl } from "@/lib/images";

const NAV_LINKS = [
  { href: "#hero", label: "Početak" },
  { href: "#akvaponija", label: "Akvaponija" },
  { href: "#usluge", label: "Uzgoj biljaka i riba" },
  { href: "#proizvodi", label: "Proizvodi" },
  { href: "#projekti", label: "Portfolio" },
  { href: "#blog", label: "Blog" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

type NavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
};

function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  const navHeightValue = getComputedStyle(document.documentElement).getPropertyValue("--nav-height");
  const navHeight = parseFloat(navHeightValue) || 0;
  const rect = target.getBoundingClientRect();
  const offsetTop = rect.top + window.scrollY - navHeight - 12;

  window.scrollTo({ top: offsetTop, behavior: "smooth" });
}

function NavLink({ href, className, children, isActive }: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href) return;

      if (href.startsWith("#")) {
        event.preventDefault();
        scrollToHash(href);
        return;
      }

      const [path, hash] = href.split("#");
      if (hash) {
        event.preventDefault();
        if (path === pathname || path === "") {
          scrollToHash(`#${hash}`);
        } else {
          void router.push(`${path}#${hash}`);
        }
        return;
      }

      event.preventDefault();
      if (path !== pathname) {
        void router.push(path);
      }
    },
    [href, pathname, router],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        "transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua-500/60",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#hero");
  const prefersReduced = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);

  const updateNavHeight = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const nav = headerRef.current;
    if (!nav) {
      return;
    }
    const height = nav.offsetHeight;
    document.documentElement.style.setProperty("--nav-height", `${height}px`);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.35, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    updateNavHeight();
    const node = headerRef.current;
    if (!node || typeof ResizeObserver === "undefined") {
      return;
    }
    const resizeObserver = new ResizeObserver(() => updateNavHeight());
    resizeObserver.observe(node);
    window.addEventListener("resize", updateNavHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateNavHeight);
    };
  }, [updateNavHeight]);

  useEffect(() => {
    updateNavHeight();
  }, [mobileOpen, updateNavHeight]);

  const headerClasses = useMemo(() => {
    return cn(
      "fixed inset-x-0 top-0 z-50 w-full border-b border-white/5 bg-[#001F1A]/80 backdrop-blur-md",
      prefersReduced ? "" : "transition duration-300 ease-out",
      scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.45)]" : "shadow-none",
    );
  }, [prefersReduced, scrolled]);

  return (
    <>
      <header ref={headerRef} className={headerClasses}>
        <Container className="flex items-center justify-between py-3 md:py-4">
          <Link
            href="#hero"
            className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_10px_rgba(0,0,0,0.3)] backdrop-blur-md">
              <Image
                src={supabasePublicUrl("Logo/vodena-basta-site-icon.png")}
                alt="Logo Vodena Bašta"
                width={40}
                height={40}
                className="h-9 w-9 object-contain"
                priority
              />
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.32em] text-white/90">
              Vodena Bašta
            </span>
          </Link>
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Glavni meni">
            <ul className="flex items-center gap-6 text-sm font-medium text-white/80">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      className="group relative inline-flex flex-col items-center gap-2 px-2 py-1"
                      isActive={isActive}
                    >
                      <span
                        className={cn(
                          "text-sm transition-all duration-200",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white",
                        )}
                      >
                        {link.label}
                      </span>
                      <span
                        className={cn(
                          "h-0.5 w-8 rounded-full bg-gradient-to-r from-aqua-500 via-leaf-500 to-aqua-500 transition-all duration-300 ease-out",
                          isActive ? "w-8 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-70",
                        )}
                      />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <PrimaryLink href="#kontakt" intent="consultation" className="hidden lg:inline-flex">
              Zakaži konsultaciju
            </PrimaryLink>
          </nav>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/[0.02] bg-white/[0.05] p-2 text-accent-200 transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobilni-meni"
            aria-label="Otvori mobilni meni"
          >
            <List size={22} aria-hidden />
          </button>
        </Container>
      </header>
      <MobileMenu links={NAV_LINKS} isOpen={mobileOpen} onToggle={setMobileOpen} activeSection={activeSection} />
    </>
  );
}


