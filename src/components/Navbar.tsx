"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { List } from "lucide-react";

import { MobileMenu } from "@/components/MobileMenu";
import { Container } from "@/components/ui/Container";
import { PrimaryLink } from "@/components/ui/Buttons";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scrollToHash";

const NAV_LINKS = [
  { href: "#pocetak", label: "Početak" },
  { href: "#akvaponija", label: "Akvaponija" },
  { href: "#uzgoj-biljaka-i-riba", label: "Uzgoj biljaka i riba" },
  { href: "#proizvodi", label: "Proizvodi" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#blog", label: "Blog" },
  { href: "#o-nama", label: "O nama" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

type NavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
};

function NavLink({ href, className, children, isActive, onSelect }: NavLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href) return;

      if (href.startsWith("#")) {
        event.preventDefault();
        scrollToHash(href);
        onSelect?.();
        return;
      }

      const [path, hash] = href.split("#");
      if (hash) {
        event.preventDefault();
        if (path === pathname || path === "") {
          scrollToHash(`#${hash}`);
          onSelect?.();
        } else {
          onSelect?.();
          void router.push(`${path}#${hash}`);
        }
        return;
      }

      event.preventDefault();
      if (path !== pathname) {
        void router.push(path);
      }
      onSelect?.();
    },
    [href, onSelect, pathname, router],
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
  const [activeSection, setActiveSection] = useState<string>("#pocetak");
  const prefersReduced = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -45%",
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

  useEffect(() => {
    if (!isHome && (pathname.startsWith("/blog") || pathname.startsWith("/studies"))) {
      setActiveSection("#blog");
    }
  }, [isHome, pathname]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [mobileOpen]);

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
            href={isHome ? "#pocetak" : "/#pocetak"}
            prefetch={false}
            className="logo-group group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
          >
            <div className="logo-container logo-glow w-14 h-14">
              <img
                src="/logo/vodena-basta-site-icon.png"
                alt="Vodena Bašta logo"
                className="absolute h-[165%] w-[165%] scale-[1.25] object-cover object-center saturate-[1.25] brightness-[1.1] contrast-[1.05] drop-shadow-[0_0_12px_rgba(0,255,204,0.25)] transition-transform duration-500 group-hover:scale-[1.3]"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>
            <div className="logo-text">
              <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-white sm:text-base">
                VODENA BAŠTA
              </h2>
              <p className="text-xs tracking-widest text-emerald-300/80 sm:text-sm">Akvaponski sistem</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Glavni meni">
            <ul className="flex items-center gap-6 text-sm font-medium text-white/80">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href;
                const resolvedHref =
                  !isHome && link.href.startsWith("#") ? `/${link.href}` : link.href;
                return (
                  <li key={link.href}>
                    <NavLink
                      href={resolvedHref}
                      className="link-plain group relative inline-flex flex-col items-center gap-2 px-2 py-1 transition-colors duration-300"
                      isActive={isActive}
                      onSelect={() => setActiveSection(link.href)}
                    >
                      <span
                        className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          isActive ? "text-white" : "text-white/70 group-hover:text-white",
                        )}
                      >
                        {link.label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 h-0.5 w-8 origin-center scale-x-0 rounded-full bg-gradient-to-r from-aqua-500 via-leaf-500 to-aqua-500 transition duration-300 ease-out",
                          isActive
                            ? "opacity-100 scale-x-100"
                            : "opacity-0 group-hover:opacity-70 group-hover:scale-x-75",
                        )}
                      />
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <PrimaryLink
              href={isHome ? "#kontakt" : "/#kontakt"}
              intent="consultation"
              className="hidden lg:inline-flex"
            >
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
      <MobileMenu
        links={NAV_LINKS}
        isOpen={mobileOpen}
        onToggle={setMobileOpen}
        activeSection={activeSection}
        currentPathname={pathname}
      />
    </>
  );
}


