## Pokretanje projekta

- Instalacija zavisnosti: `npm install`
- Razvojni server: `npm run dev` i zatim posetite `http://localhost:3000`
- Produkcijski build: `npm run build` pa `npm start`

## Konfiguracija okruženja

Kreirajte `.env.local` sa:

```
NEXT_PUBLIC_SUPABASE_URL=...      # URL Supabase projekta
NEXT_PUBLIC_SUPABASE_ANON_KEY=... # Anon ključ
```

Kontakt forma koristi ove vrednosti za javni Supabase klijent.

## Supabase migracija

SQL skripta `supabase/migrations/0001_contact_messages.sql` kreira tabelu `public.contact_messages` i RLS politiku za anon insert. Pokrenite je jednom u Supabase SQL editoru ili kroz Vaš CI/CD workflow pre puštanja sajta.

## Stil i brending

- Paleta i prilagođene vrednosti definisane su u `tailwind.config.ts` (`brand`, `accent`, `forest` skale).
- Kontejner raspored (`max-w-7xl`, padding) i globalne stilove potražite u `src/app/globals.css`.
- Navigacija i podnožje: `src/components/Navbar.tsx` i `src/components/Footer.tsx`. Ovde menjate linkove, CTA i kontakt podatke.

## Slike i aktiva

- Hero i placeholder vizuali nalaze se u `public/images/**`. Za zamenu upotrebite iste putanje/ekstenzije.
- Logo se učitava direktno iz Supabase storage-a putem helpera `supabasePublicUrl` u `src/lib/images.ts`.
- Ikonice sajta: `public/icon.png` i `public/favicon.ico`.

## SEO i JSON-LD

- Globalna meta konfiguracija: `src/lib/seo.ts`. Tu se nalaze `siteMeta` (Next Metadata), kao i helperi za JSON-LD (Organization/LocalBusiness, Product, BlogPosting, WebSite/SearchAction, ContactPage).
- Layout (`src/app/layout.tsx`) koristi `siteMeta` i dodaje Organization JSON-LD na svim stranicama.
- Povremeni sadržaj (po stranama) može koristiti `createPageMetadata` helper za dodatne meta informacije.

## Kontakt forma

- UI i klijentska validacija: `src/components/ContactForm.tsx` (`zod`, loading i status poruke na srpskom).
- API ruta: `src/app/api/contact/route.ts` validira request i insertuje u tabelu `public.contact_messages`.
- Vreme obrade i poruke o grešci/succesu su lokalizovane na srpski.

## Sledeći koraci

- Import WordPress sadržaja u `content/` kao Markdown/MDX (planirano, nijedan fajl još nije dodat).
- Podešavanje Supabase Edge funkcija ili Cron-a za dodatne automatizacije lead nurturing-a.
- Dodavanje realnih fotografija i projekata kada postanu dostupni.
