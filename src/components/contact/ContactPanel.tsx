'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Info, MapPin, Phone, Mail } from "lucide-react";

import { ContactForm } from "@/components/ContactForm";
import { SectionReveal } from "@/components/ux/SectionReveal";
import { HoverCard } from "@/components/ui/HoverCard";
import { Icon } from "@/components/ui/Icon";

type ToastState =
  | {
      status: "success" | "error";
      message: string;
    }
  | null;

export function ContactPanel() {
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleStatusChange = (
    status: "idle" | "saving" | "success" | "error",
    message: string | null,
  ) => {
    if (status === "success" && message) {
      setToast({ status: "success", message });
    }
    if (status === "error" && message) {
      setToast({ status: "error", message });
    }
  };

  return (
    <section
      id="kontakt"
      className="relative overflow-hidden rounded-[3.2rem] border border-white/[0.045] bg-[linear-gradient(165deg,rgba(10,35,32,0.65)_0%,rgba(7,17,24,0.88)_60%,rgba(4,8,16,0.94)_100%)] p-10 shadow-[0_40px_180px_rgba(3,12,20,0.55)] backdrop-blur-xl"
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionReveal className="space-y-6" childSelector="[data-contact-primary]">
          <h3 data-contact-primary className="text-3xl font-semibold text-white">
            Spremni da zajedno izgradimo akvaponski sistem?
          </h3>
          <p data-contact-primary className="text-sm leading-relaxed text-accent-200/80">
            Pošaljite nam osnovne informacije o projektu i zakažite konsultaciju. Radićemo sa vama na dizajnu, obuci tima
            i planu plasmana proizvoda.
          </p>
          <HoverCard data-contact-primary className="space-y-4 p-6 text-sm text-accent-200/85">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent-300">
              Šta dobijate na konsultaciji
            </p>
            <ul className="space-y-3">
              <li>- Predlog vrste ribe i biljaka prema tržištu.</li>
              <li>- Dimenzionisanje biofiltra i automatike.</li>
              <li>- Savet za subvencije i finansiranje.</li>
            </ul>
          </HoverCard>
          <HoverCard data-contact-primary className="space-y-4 p-6 text-sm text-accent-200/80">
            <div className="flex items-center gap-3">
              <Icon icon={MapPin} size={22} aria-hidden className="text-aqua-400" />
              <span>Svetosavska, Stapar · PG Vesna Radin</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon={Phone} size={22} aria-hidden className="text-aqua-400" />
              <a href="tel:+381604500876" className="transition-colors hover:text-white">
                +381 60 450 08 76
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Icon icon={Mail} size={22} aria-hidden className="text-aqua-400" />
              <a href="mailto:pozdrav@vodenabasta.rs" className="transition-colors hover:text-white">
                pozdrav@vodenabasta.rs
              </a>
            </div>
            <p className="text-xs text-accent-200/70">
              Radno vreme: pon-pet 9-17h · subota 9-13h. Posete su moguće uz prethodnu najavu.
            </p>
          </HoverCard>
        </SectionReveal>
        <SectionReveal className="space-y-6" childSelector="[data-contact-secondary]">
          <HoverCard data-contact-secondary className="p-4">
            <div className="relative h-64 overflow-hidden rounded-[2.4rem]">
              <Image
                src="/images/placeholders/mapa.jpg"
                alt="Mapa lokacije Vodene Bašte u Staparu"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <p className="mt-4 text-center text-sm text-accent-200/75">
              Svetosavska, Stapar · GPS koordinate dostupne na zahtev
            </p>
          </HoverCard>
          <div
            data-contact-secondary
            className="rounded-[2.6rem] border border-white/[0.04] bg-[linear-gradient(150deg,rgba(9,32,30,0.6)_0%,rgba(5,15,22,0.86)_100%)] p-6 shadow-[0_28px_120px_rgba(6,20,28,0.55)] backdrop-blur-xl"
          >
            <ContactForm onStatusChange={handleStatusChange} />
          </div>
        </SectionReveal>
      </div>
      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/[0.02] bg-white/[0.04] px-5 py-3 text-sm shadow-[0_0_45px_rgba(26,217,206,0.05)] backdrop-blur-xl"
          >
            {toast.status === "success" ? (
              <Icon icon={CheckCircle} size={20} className="text-leaf-400" aria-hidden />
            ) : (
              <Icon icon={Info} size={20} className="text-red-300" aria-hidden />
            )}
            <p className="text-accent-100">{toast.message}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}


