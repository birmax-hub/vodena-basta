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
    title: "Planiranje rasta akvaponske farme: ključni koraci i procena troškova",
    category: "Investicije",
    date: "2025-04-02",
    image: "/images/studies/skaliranje-farme.webp",
    excerpt:
      "Praktični koraci za proizvođače i investitore koji žele da bezbedno prošire kapacitet akvaponske proizvodnje.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>
          Jedna akvaponska farma iz severne Srbije želela je da poveća kapacitet usled rasta lokalne potražnje.
          Naš tim je sprovao analizu rizika, investicioni model i fazni plan širenja koji ne prekida postojeću proizvodnju.
        </p>
      </section>

      <section>
        <h3>Proces</h3>
        <p>
          Analizirani su tokovi rada, stanje opreme i ključni KPI parametri. Implementirana je osnovna automatizacija
          za hranjenje, oksigenaciju i praćenje kvaliteta vode. Modularni bazeni i vertikalni sistemi omogućili su
          širenje bez zastoja i uz predvidive troškove.
        </p>
      </section>

      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>Povećanje kapaciteta kroz modularnu nadogradnju sistema.</li>
          <li>Preciznije upravljanje i smanjeni operativni gubici.</li>
          <li>Stabilniji kvalitet proizvoda zbog doslednog praćenja parametara.</li>
        </ul>
      </section>

      <section>
        <h3>Zaključak</h3>
        <p>
          Strukturirano planiranje rasta omogućilo je sigurnu ekspanziju bez prekida rada i uz jasnu projekciju
          povrata investicije. Metodologija se može primeniti na farmama različitih veličina.
        </p>
      </section>
    `,
    type: "study",
  },

  {
    slug: "mikroklima-i-ph",
    blogSlug: "mikroklima-i-ph-dnevni-protokol-vodene-baste",
    title: "Mikroklima i pH: dnevni operativni protokol u akvaponskom sistemu",
    category: "Operacije",
    date: "2025-03-12",
    image: "/images/studies/mikroklima-ph.webp",
    excerpt:
      "Koje parametre treba pratiti svakog dana da bi se obezbedio stabilan kvalitet i nutritivna vrednost biljaka.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>
          Ključ stabilne akvaponske proizvodnje je dosledna kontrola mikroklime. Naš tim je razvio dnevni protokol
          koji obuhvata praćenje najvažnijih parametara i pravovremenu korekciju sistema.
        </p>
      </section>

      <section>
        <h3>Proces</h3>
        <p>
          Instalirani su senzori za temperaturu, pH, rastvoreni kiseonik i provodljivost. Svi podaci se prate preko
          softverske platforme koja omogućava rano prepoznavanje odstupanja i brzu reakciju operatera.
        </p>
      </section>

      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>Stabilan pH opseg tokom većine radnog vremena.</li>
          <li>Ujednačen kvalitet mikrobilja i lisnatih kultura.</li>
          <li>Manje manuelnih intervencija zahvaljujući automatizovanom nadzoru.</li>
        </ul>
      </section>

      <section>
        <h3>Zaključak</h3>
        <p>
          Standardizovan protokol rada podiže pouzdanost i stabilnost proizvodnje tokom cele godine. 
          Precizna mikroklima doprinosi boljem nutritivnom profilu i većoj efikasnosti sistema.
        </p>
      </section>
    `,
    type: "study",
  },

  {
    slug: "horeca-partnerstva",
    blogSlug: "horeca-partnerstva-isporuka-na-dan-narucivanja",
    title: "Saradnja sa restoranima: organizacija lokalnih isporuka svežih proizvoda",
    category: "Plasman",
    date: "2025-02-21",
    image: "/images/studies/horeca.webp",
    excerpt:
      "Kako akvaponske farme mogu da organizuju efikasan i stabilan plasman proizvoda ka restoranima i lokalnim objektima.",
    content: `
      <section>
        <h3>Uvod</h3>
        <p>
          Lokalni restorani sve češće traže sveže i pouzdane isporuke. Akvaponija omogućava stabilnu proizvodnju
          tokom cele godine, pa je saradnja sa HoReCa sektorom prirodan korak u razvoju farme.
        </p>
      </section>

      <section>
        <h3>Proces</h3>
        <p>
          Napravljen je plan berbe usklađen sa potrebama restorana, uz segmentaciju kultura po klijentima. 
          Proizvodnja je organizovana u manjim, kontrolisanim serijama koje omogućavaju veću svežinu i sljedljivost.
        </p>
      </section>

      <section>
        <h3>Rezultati</h3>
        <ul>
          <li>Precizniji raspored isporuke i manje zaliha.</li>
          <li>Bolja komunikacija između farme i kuhinja.</li>
          <li>Stabilan kvalitet, što olakšava planiranje menija.</li>
        </ul>
      </section>

      <section>
        <h3>Zaključak</h3>
        <p>
          Organizovani model saradnje sa restoranima omogućava farmai predvidiv plasman i veću iskorišćenost kapaciteta,
          dok kupcima obezbeđuje lokalne, sveže i dosledne proizvode tokom čitave godine.
        </p>
      </section>
    `,
    type: "study",
  },
];
