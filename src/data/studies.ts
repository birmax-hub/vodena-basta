export type Study = {
  slug: string;
  blogSlug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  type: "study";
};

export const studies: Study[] = [
  {
    slug: "skaliranje-farme-bez-rizika",
    blogSlug: "kako-skalirati-akvaponsku-farmu-bez-rizika",
    title: "Kako skalirati akvaponsku farmu bez rizika",
    category: "Investicije",
    date: "2025-04-02",
    image: "/images/studies/skaliranje-farme.webp",
    excerpt: "Koraci za investitore koji ulaze u premium segment svežih proizvoda.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>Urban Garden iz Novog Sada želeo je da proširi kapacitete za opsluživanje hotelskih i restoranskih lanaca bez kompromisa u kvalitetu. Vodena Bašta je vodila proces evaluacije rizika i planiranja ulaganja.</p>
      </section>
      <section>
        <h3>Proces</h3>
        <p>Tim je izvršio mapiranje postojećih procesa, definisao ključne KPI vrednosti i postavio automatizaciju za hranjenje i oksigenaciju. Korišćeni su modularni bazeni prilagođeni krovu objekta, uz hibridni sistem vertikalnog gajenja.</p>
      </section>
      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>+48% kapaciteta u prve dve nedelje od puštanja u rad.</li>
          <li>90% manje gubitaka zahvaljujući digitalnom praćenju parametara.</li>
          <li>Standardizovan kvalitet proizvoda sa garancijom isporuke u roku od 24 časa.</li>
        </ul>
      </section>
      <section>
        <h3>Zaključak</h3>
        <p>Strategija je omogućila sigurno širenje bez zastoja u proizvodnji i uz transparentan ROI plan za investitore. Urban Garden sada poseduje plan rasta za naredne tri faze.</p>
      </section>
    `,
    type: "study",
  },
  {
    slug: "mikroklima-i-ph",
    blogSlug: "mikroklima-i-ph-dnevni-protokol-vodene-baste",
    title: "Mikroklima i pH: dnevni protokol Vodene Bašte",
    category: "Operacije",
    date: "2025-03-12",
    image: "/images/studies/mikroklima-ph.webp",
    excerpt: "Koje parametre pratimo da bi nutritivna vrednost bila konzistentna.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>HoReCa Hub u Beogradu zahtevao je preciznu kontrolu mikroklime i nutritivnog profila zbog isporuke svežih proizvoda elitnim kuhinjama. Naš tim je uveo dnevni protokol nadzora.</p>
      </section>
      <section>
        <h3>Proces</h3>
        <p>Postavljeni su IoT senzori za temperaturu, pH i rastvorene kiseonike. Podaci se integrišu u Sturya.io platformu kako bi AI predviđao promene i pravovremeno aktivirao korektivne akcije.</p>
      </section>
      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>Stabilan pH opseg 6.4 – 6.7 tokom 92% radnog vremena.</li>
          <li>Standardizovan okus i tekstura mikrozelenih kultura.</li>
          <li>Automatizovano slanje upozorenja operaterima u realnom vremenu.</li>
        </ul>
      </section>
      <section>
        <h3>Zaključak</h3>
        <p>Precizna kontrola mikroklime omogućila je da HoReCa Hub ispuni standarde premium gastronomije i smanji manuelni rad za 35%.</p>
      </section>
    `,
    type: "study",
  },
  {
    slug: "horeca-partnerstva",
    blogSlug: "horeca-partnerstva-isporuka-na-dan-narucivanja",
    title: "HoReCa partnerstva: isporuka na dan naručivanja",
    category: "Plasman",
    date: "2025-02-21",
    image: "/images/studies/horeca.webp",
    excerpt: "Naš servisni model sa šefovima kuhinja i hotelskim lancima.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>R&D Campus na Zlatiboru želeo je da unapredi koordinaciju sa hotelskim lancima koji zahtevaju premium proizvode sa tačnom specifikacijom. Vodena Bašta je razvila logistički model just-in-time isporuke.</p>
      </section>
      <section>
        <h3>Proces</h3>
        <p>Implementiran je kalendar berbe sinhronizovan sa aplikacijom Sturya.io, uz segmentaciju gajenja po klijentima. Kreirane su mikro serije proizvoda sa garantovanom sljedljivošću.</p>
      </section>
      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>100% usklađenost isporuke sa narudžbinama tokom prva tri meseca.</li>
          <li>Smanjenje zaliha na 1,5 dana, uz sveže proizvode svakog jutra.</li>
          <li>Povećanje zadovoljstva klijenata i potpis tri nova ugovora.</li>
        </ul>
      </section>
      <section>
        <h3>Zaključak</h3>
        <p>Modularna proizvodnja i logistika omogućile su partnerskim kuhinjama sigurnu nabavku, dok je Vodena Bašta dobila uvid u realnu potražnju radi skaliranja.</p>
      </section>
    `,
    type: "study",
  },
];

