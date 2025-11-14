'use client';

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { PrimaryLink } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scrollToHash";

type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  links: ReadonlyArray<NavItem>;
  isOpen: boolean;
  onToggle: (state: boolean) => void;
  activeSection?: string;
  currentPathname?: string;
};

export function MobileMenu({ links, isOpen, onToggle, activeSection, currentPathname }: MobileMenuProps) {
  const router = useRouter();
  const pathname = currentPathname ?? usePathname();
  const isHome = pathname === "/";

  const handleClick = (href: string) => async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href) return;
    event.preventDefault();

    if (href.startsWith("#")) {
      if (isHome) {
        scrollToHash(href);
      } else {
        await router.push(`/${href}`);
      }
      onToggle(false);
      return;
    }

    const [path, hash] = href.split("#");
    if (hash) {
      if (path === pathname || path === "") {
        scrollToHash(`#${hash}`);
      } else {
        await router.push(`${path}#${hash}`);
      }
      onToggle(false);
      return;
    }

    if (path !== pathname) {
      await router.push(path);
    }
    onToggle(false);
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[rgba(5,18,16,0.55)] backdrop-blur-xl"
          aria-hidden={!isOpen}
        >
          <motion.nav
            id="mobilni-meni"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.28 }}
            className="ml-auto flex h-full w-80 max-w-full flex-col gap-8 overflow-y-auto overscroll-contain border-l border-white/[0.02] bg-white/[0.02] px-6 py-8 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            aria-label="Glavni mobilni meni"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold uppercase tracking-[0.32em] text-accent-200">Meni</p>
              <button
                type="button"
                onClick={() => onToggle(false)}
                className="rounded-full border border-white/[0.02] bg-white/[0.05] p-2 text-accent-200 transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-500/60"
                aria-label="Zatvori meni"
              >
                <Icon icon={X} size={20} aria-hidden />
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-4 overflow-y-auto overscroll-contain pr-2">
              {links.map((link) => {
                const isActive = activeSection === link.href;
                const resolvedHref =
                  !isHome && link.href.startsWith("#") ? `/${link.href}` : link.href;
                return (
                  <li key={link.href}>
                    <Link
                      key={link.href}
                      href={resolvedHref}
                      prefetch={false}
                      onClick={handleClick(link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-2xl px-6 py-4 text-lg font-semibold text-white/80 transition",
                        isActive
                          ? "border-aqua-500/40 bg-white/[0.05] text-white"
                          : "border-white/[0.02] bg-white/[0.015] text-accent-200/80 hover:border-aqua-500/40 hover:text-accent-200",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <PrimaryLink
              href={isHome ? "#kontakt" : "/#kontakt"}
              className="w-full justify-center py-3 text-sm"
            >
              Zakaži konsultaciju
            </PrimaryLink>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


