# kunzglobal.com

Website der Dachmarke **Kunz Global** – Relaunch 2026 („One group. Multiple businesses. One vision.“).

## Aufbau

- **Hosting unverändert:** GitHub Pages, `public/CNAME` = `kunzglobal.com`, Deployment über `.github/workflows/deploy.yml` bei jedem Push auf `main`.
- **Stack:** Vite + React + TypeScript. React rendert nur **zur Build-Zeit** statisches HTML (`src/render/prerender.tsx`); im Browser läuft kein React, nur `src/client/main.ts` (≈ 5 KB: Navigation, Reveals, Ökosystem-Hover, Parallax, Formular).
- **Sprachen:** EN (Root), `/es/`, `/de/`, `/pt/` – jeweils `businesses/`, `about/`, `contact/`, `legal/`, `privacy/`, `terms/`. Canonical, hreflang, Open Graph und `sitemap.xml` entstehen beim Build.
- **Texte:** ausschließlich in `src/content/<sprache>.ts` (Typ `Content` erzwingt gleiche Struktur in allen Sprachen). Rechtstexte in `src/content/legal/` – de/en/es vom alten Stand übernommen, pt übersetzt.
- **Marken und Links:** `src/site/config.ts`. Es werden nur geprüfte Websites verlinkt; `url: null` heißt „kein Link“ (derzeit Kunz Systems und Vomando, deren Websites noch nicht veröffentlicht sind).
- **Design-System:** Tokens in `src/styles/tokens.css`, Bausteine in `base.css`, Sektionen in `sections.css`, Motion in `motion.css` (achtet auf `prefers-reduced-motion`; ohne JavaScript bleibt alles sichtbar).
- **Schriften:** Inter Tight + Instrument Serif, selbst gehostet (Fontsource). Keine Cookies, kein Tracking, keine Drittanbieter.

## Befehle

```bash
npm install
npm run dev        # Vorschau mit Live-Reload, http://localhost:5173
npm run check      # Typen, ESLint, Build, Tests – muss vor jedem Merge grün sein
npm run preview    # gebautes dist/ ansehen
npm run images     # public/img neu erzeugen (Originale liegen außerhalb des Repos)
npm run globe      # Globus der Uruguay-Sektion neu berechnen
```

## Regeln

- Keine unveröffentlichten Projekte nennen (`tests/site.test.mjs` sperrt u. a. Solar/Recycling) – Zukunftsthemen nur abstrakt unter „Future Ventures“.
- Keine erfundenen Zahlen, Kunden, Auszeichnungen oder Superlative.
- Externe Links nur auf verifizierte Seiten (Liste im Test).
- Das Kontaktformular sendet nichts selbst, es öffnet das Mailprogramm. Ein echter Endpunkt müsste zuerst in der Datenschutzerklärung beschrieben werden.
- Fotos: nur echte Kunz-Bilder; Kennzeichen unkenntlich (siehe `scripts/build-images.mjs`), Metadaten werden entfernt.

## Alter Stand

Tag `backup-before-premium-relaunch-2026-09-18` und Branch `backup/live-2026-09-18` enthalten die Seite vor dem Relaunch (Commit `03aef8e`).
