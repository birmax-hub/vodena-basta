export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  type: "blog";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "akvaponija-za-pocetnike",
    title: "Akvaponija za početnike: spoj prirode, tehnologije i održivosti",
    category: "Osnove",
    date: "2025-11-10",
    image: "/images/blog/akvaponija.webp",
    excerpt:
      "Saznajte kako akvaponija kombinuje ribarstvo i hidroponiju u zatvorenom ekosistemu koji štedi vodu, energiju i prostor — idealno rešenje za početnike koji žele da započnu sopstvenu održivu proizvodnju hrane.",
    content: `
      <h1>Akvaponija za početnike</h1>
      <p><strong>Akvaponija</strong> je održivi sistem uzgoja hrane koji kombinuje <em>akvakulturu</em> (uzgoj riba) i <em>hidroponiju</em> (uzgoj biljaka bez zemlje) u jedan zatvoreni, samoodrživi ekosistem. U njemu ribe proizvode hranljive materije koje biljke koriste za rast, dok biljke pročišćavaju vodu i vraćaju je ribama. Time se stvara prirodni balans bez upotrebe hemikalija.</p>
      
      <h2>Kako funkcioniše akvaponijski sistem</h2>
      <p>Voda iz ribnjaka obogaćena amonijakom prolazi kroz biofilter u kome mikroorganizmi pretvaraju amonijak u nitrate — hranljive materije koje biljke lako usvajaju. Biljke zatim filtriraju vodu i vraćaju je nazad ribama, čineći sistem potpuno zatvorenim i održivim.</p>
      <ul>
        <li><strong>Ribe</strong> proizvode hranljive materije (amonijak).</li>
        <li><strong>Bakterije</strong> u biofiltru pretvaraju amonijak u nitrate.</li>
        <li><strong>Biljke</strong> preuzimaju nitrate i čiste vodu.</li>
      </ul>

      <h2>Prednosti akvaponije</h2>
      <ul>
        <li>Ušteda do 90% vode u odnosu na tradicionalne metode uzgoja.</li>
        <li>Bez pesticida, hemikalija i veštačkih đubriva.</li>
        <li>Mogućnost uzgoja tokom cele godine.</li>
        <li>Brži rast biljaka zbog stalne dostupnosti hranljivih materija.</li>
        <li>Istovremena proizvodnja ribe i povrća u istom sistemu.</li>
      </ul>

      <h2>Akvaponija i budućnost proizvodnje hrane</h2>
      <p>U eri klimatskih promena i ograničenih resursa, akvaponija nudi održiv model proizvodnje hrane koji spaja prirodu i tehnologiju. <strong>Vodena Bašta</strong> razvija modularne sisteme koji su jednostavni za upotrebu i prilagođeni početnicima, malim proizvođačima i restoranima koji žele lokalnu, svežu hranu.</p>

      <h2>Kako da započnete sa akvaponijom</h2>
      <p>Za uspešan početak potrebno je uspostaviti ravnotežu između količine riba, zapremine vode i biljne mase. Naš tim nudi podršku pri projektovanju i održavanju sistema, tako da možete da započnete bez rizika i grešaka.</p>

      <p><em>Želite da saznate više?</em> Pogledajte i naše <a href="/blog">studije iz prakse</a> ili nas kontaktirajte za savete o izgradnji sopstvenog akvaponskog sistema.</p>

      <p><strong>Vodena Bašta</strong> — spoj nauke, prirode i inovacija u službi održive proizvodnje hrane.</p>
    `,
    type: "blog",
  },
  {
    slug: "ustedite-vreme-i-novac",
    title: "Uštedite vreme i novac dok uzgajate povrće: pametni sistemi za efikasniji uzgoj",
    category: "Praktični saveti",
    date: "2025-11-10",
    image: "/images/blog/ustedite-vreme.webp",
    excerpt:
      "Otkrijte kako moderni akvaponski sistemi smanjuju troškove proizvodnje, štede resurse i povećavaju prinose — bez kompromisa po kvalitet hrane.",
    content: `
      <h1>Uštedite vreme i novac dok uzgajate povrće</h1>
      <p>U savremenoj poljoprivredi najveći izazov je kako uzgajati više, a trošiti manje. <strong>Akvaponija</strong> i drugi zatvoreni sistemi uzgoja nude rešenje koje kombinuje preciznu kontrolu resursa, automatizaciju i održivost.</p>

      <h2>Zašto je zatvoreni sistem efikasniji</h2>
      <p>Tradicionalna poljoprivreda zavisi od vremenskih uslova, zemljišta i ručnog rada. U zatvorenim sistemima svi ovi faktori su kontrolisani, što omogućava uštedu vremena, vode i energije.</p>

      <ul>
        <li><strong>Precizna distribucija vode:</strong> cirkulišuća voda se koristi više puta, bez rasipanja.</li>
        <li><strong>Automatsko hranjenje i osvetljenje:</strong> optimizovano prema fazi rasta biljaka.</li>
        <li><strong>Planiranje berbe:</strong> uzgoj u skladu sa potražnjom kupaca smanjuje otpad i gubitke.</li>
      </ul>

      <h2>Uštede u praksi</h2>
      <p>Analize naših partnera pokazuju da akvaponski moduli mogu smanjiti troškove energije i do 30%, a potrošnju vode više od 80%. Održavanje je minimalno, jer sistem sam balansira odnos između biljaka i riba.</p>

      <h2>Kako započeti optimizaciju</h2>
      <p>Počnite sa malim sistemom i vremenom ga proširujte. Ulaganje u automatizaciju se brzo isplati — smanjuje manuelni rad, povećava prinose i donosi stabilan kvalitet hrane.</p>

      <p><strong>Vodena Bašta</strong> pomaže proizvođačima da pređu na efikasniji, ekološki i pametan model proizvodnje hrane.</p>
    `,
    type: "blog",
  },
  {
    slug: "zemljiste-je-zivi-organizam",
    title: "Zemljište je živi organizam: ključ održive poljoprivrede",
    category: "Ekologija",
    date: "2025-11-10",
    image: "/images/blog/zemljiste.webp",
    excerpt:
      "Zdravo zemljište je temelj života na planeti. Naučite kako regenerativna poljoprivreda i akvaponija pomažu da se ono obnovi i očuva za buduće generacije.",
    content: `
      <h1>Zemljište je živi organizam</h1>
      <p>U svakoj šaci zdrave zemlje krije se milijarde mikroorganizama koji čine osnovu života. <strong>Zemljište</strong> nije pasivna podloga, već aktivan ekosistem koji filtrira vodu, čuva hranljive materije i omogućava biljkama da rastu.</p>

      <h2>Zašto je zdravo tlo ključno</h2>
      <p>Zemljište sa dovoljno mikroflore omogućava biljkama da budu otpornije, bogatije hranljivim materijama i da bolje koriste vlagu. Nažalost, intenzivna obrada i hemijska sredstva narušavaju taj balans.</p>

      <h2>Regenerativna poljoprivreda i akvaponija</h2>
      <p>Akvaponijski sistemi rasterećuju zemljište jer proizvodnja hrane ne zavisi od obradive površine. Time zemljište dobija vreme da se oporavi, dok akvaponija omogućava održivu proizvodnju u zatvorenom ciklusu.</p>

      <ul>
        <li>Koristite kompost i mikrobiološke aktivatore umesto hemikalija.</li>
        <li>Sadite biljke koje obogaćuju tlo (npr. mahunarke).</li>
        <li>Smanjite oranje i očuvajte mikrostrukturu tla.</li>
      </ul>

      <h2>Sinergija vodenih i zemaljskih ekosistema</h2>
      <p><strong>Vodena Bašta</strong> spaja principe akvaponije i regenerativne poljoprivrede. Naši projekti pokazuju da održiva proizvodnja hrane može da očuva i obnovi prirodu, a ne da je iscrpljuje.</p>

      <p><em>Pročitajte više u našim <a href="/blog">studijama iz prakse</a> i saznajte kako implementiramo ove principe u realnim uslovima.</em></p>
    `,
    type: "blog",
  },
];
