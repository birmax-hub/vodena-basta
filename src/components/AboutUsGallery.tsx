"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const aboutImages = [
  "1-resize.webp",
  "2-resize.webp",
  "3-resize.webp",
  "4-resize.webp",
  "5-resize.webp",
  "6-resize.webp",
  "7-resize.webp",
  "8-resize.webp",
  "9-resize.webp",
  "10-resize.webp",
  "11-resize.webp",
  "12-resize.webp",
  "13-resize.webp",
  "14-resize.webp",
  "15-resize.webp",
  "16-resize.webp",
  "17-resize.webp",
  "18-resize.webp",
  "19-resize.webp",
  "20-resize.webp",
  "21-resize.webp",
  "22-resize.webp",
  "23-resize.webp",
  "24-resize.webp",
  "25-resize.webp",
  "26-resize.webp",
  "27-resize.webp",
  "28-resize.webp",
  "29-resize.webp",
  "30-resize.webp",
  "31-resize.webp",
  "32-resize.webp",
  "33-resize.webp",
  "34-resize.webp",
  "35-resize.webp",
  "36-resize.webp",
  "37-resize.webp",
  "38-resize.webp",
  "124214125.webp",
  "akvaponija-za-pocetnike-1024x538-1.webp",
  "IMG-0778-1630x860-1.webp",
  "ustedite-vreme-i-novac-dok-uzgajate-povrce-1024x538-1.webp",
];

const splitPoint = Math.ceil(aboutImages.length / 2);

const containerVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const rowVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function createAltFromFilename(filename: string) {
  return filename
    .replace(/[-_]/g, " ")
    .replace(/\.[^.]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function AboutUsGallery() {
  const prefersReducedMotion = useReducedMotion();
  const rows = useMemo(() => [aboutImages.slice(0, splitPoint), aboutImages.slice(splitPoint)], []);

  return (
    <section id="o-nama" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#021512] to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#021512] to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-[1600px] px-6">
        <motion.div
          variants={containerVariant}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6 text-center"
        >
          <h2 className="text-[clamp(2.3rem,3.6vw,3rem)] font-semibold text-white">
            O nama – Naša priča u slikama
          </h2>
          <p className="mx-auto max-w-3xl text-[clamp(1rem,1.6vw,1.15rem)] leading-relaxed text-accent-200/85">
            Naš rad kombinuje nauku, tehnologiju i strast prema održivoj proizvodnji hrane. Svaki sistem koji gradimo
            rezultat je porodičnog iskustva, inženjerske preciznosti i ljubavi prema prirodi.
          </p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={`gallery-row-${rowIndex}`}
              variants={rowVariant}
              initial={prefersReducedMotion ? undefined : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-none"
            >
              {row.map((image) => (
                <div
                  key={image}
                  className="snap-center"
                >
                  <motion.div
                    className="group relative aspect-[4/3] w-[260px] md:w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg transition-all duration-500 ease-out hover:scale-105 hover:shadow-[0_28px_80px_rgba(32,200,180,0.28)]"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  >
                    <Image
                      src={`/images/about/${image}`}
                      alt={createAltFromFilename(image)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 260px, (max-width: 1200px) 320px, 360px"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGCQBwAAHgAC9xibzwAAAABJRU5ErkJggg=="
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={containerVariant}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 grid gap-12 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_36px_120px_rgba(8,40,32,0.45)] backdrop-blur-xl sm:p-10 md:grid-cols-2"
        >
          <div className="space-y-5 text-left">
            <h3 className="text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold text-white">
              Naša priča – Početak svega
            </h3>
            <div className="space-y-4">
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-accent-200/80">
                Ideja o Vodenoj bašti rodila se iz porodične želje da proizvedemo zdravu hranu na održiv način. Prve akvaponske konstrukcije nastale su u našem dvorištu – iz entuzijazma, istraživanja i ljubavi prema prirodi. Danas isti taj duh prenosi svaka naša instalacija, bilo da je u plasteniku, habu ili na krovu zgrade.
              </p>
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-accent-200/80">
                Vremenom smo iz malog eksperimenata prerasli u ozbiljan sistem koji pomaže drugim proizvođačima, investitorima i porodičnim farmama da pokrenu sopstvenu akvaponsku proizvodnju. Naš razvoj se zasniva na terenskom radu, testiranju različitih kultura, optimizaciji vode i energije, kao i iskustvu koje smo gradili više od deset godina.
              </p>
              <p className="text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-accent-200/80">
                Misija Vodene bašte je da spojimo inovaciju i tradiciju - da pokažemo da se vrhunska hrana može proizvoditi lokalno, čisto, bez hemije i bez iscrpljivanja prirodnih resursa. Svaka instalacija koju isporučimo predstavlja nastavak naše priče.
              </p>
            </div>
          </div>
          <motion.div
            variants={rowVariant}
            className="flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_28px_120px_rgba(8,32,28,0.45)]"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
          >
            <Image
              src="/images/porodicni-sistem-vodena-basta-141241.png"
              alt="Porodični sistem Vodena Bašta"
              width={960}
              height={720}
              className="mx-auto h-auto w-full max-h-[600px] rounded-2xl object-contain shadow-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGDgDwABHgEIjw3ekQAAAABJRU5ErkJggg=="
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUsGallery;
