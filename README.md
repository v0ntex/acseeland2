# Auto Center Seeland AG — Website

Static, bilingual (DE / EN) website for Auto Center Seeland AG, Biel/Bienne.
Built with [Astro](https://astro.build). No database, no backend, no monthly cost.

---

## Before it goes live

Contact details are set and live in `src/data/site.ts`:

| | |
|---|---|
| Phone / WhatsApp | +41 79 363 99 99 |
| Email | info@autocenterseeland.ch |
| Instagram | @acseeland |

No opening hours are published — the site states *"Jederzeit erreichbar / Reachable any time"*
instead, on the contact page and in the footer.

Two things still need attention:

1. **`astro.config.mjs`** → change `site:` to your real domain, and match it in
   **`public/robots.txt`**.
2. **`/impressum/` and `/datenschutz/`** are working drafts based on Swiss
   requirements (revDSG). **Have a lawyer review them before launch.**

If you would rather not offer WhatsApp, set `whatsapp: null` in
`src/data/site.ts` and every WhatsApp button disappears.

---

## Fahrzeuge pflegen — zwei Wege

Die Fahrzeuge liegen als je eine Datei pro Auto in `src/content/vehicles/`
und `src/content/sold/`. Beide Wege unten bearbeiten dieselben Dateien —
du kannst jederzeit wechseln.

### Weg A: Weboberfläche unter /admin  (empfohlen, sobald eingerichtet)

Einloggen, Fahrzeug über ein Formular erfassen, Fotos per Drag-and-drop,
auf „Veröffentlichen" klicken — die Seite aktualisiert sich in ein bis zwei
Minuten selbst. Kein Terminal, kein Upload, mehrere Personen möglich.

**Einrichtung — was noch fehlt** (einmalig):

1. GitHub-Konto anlegen und ein Repository erstellen (privat ist möglich).
2. Dieses Projekt dorthin hochladen.
3. Seite bei Netlify oder Cloudflare Pages verbinden
   (Build: `npm run build`, Verzeichnis: `dist`).
4. In `public/admin/config.yml` bei `repo:` das Repository eintragen
   und den Login über eine GitHub-App freischalten.

Schritt 1 und 3 brauchen deine Zugangsdaten — die kann und darf ich nicht
für dich anlegen. Schritt 2 und 4 mache ich mit dir zusammen.

### Weg B: Dateien direkt bearbeiten  (funktioniert sofort)

```bash
npm run dev      # 1. Seite lokal öffnen, Änderungen sofort sichtbar
npm run check    # 2. Daten prüfen (findet fehlende Fotos, doppelte Einträge)
npm run build    # 3. Fertige Seite in dist/ erzeugen, dann hochladen
```

Beim Build werden alle Felder automatisch gegen das Schema in
`src/content.config.ts` geprüft. Fehlt etwas oder stimmt ein Typ nicht,
bricht der Build mit einer klaren Meldung ab — bevor etwas online geht.

---

## Fahrzeuge von Hand bearbeiten

### Fahrzeug in den Bestand aufnehmen

1. Eine bestehende Datei in `src/content/vehicles/` kopieren.
2. Umbenennen — der Dateiname ohne `.md` wird zur Adresse der Seite
   (nur Kleinbuchstaben, Zahlen, Bindestriche) — und die Werte anpassen.
3. Fotos nach `public/vehicles/<dateiname>/` legen und die Pfade eintragen:
   ```yaml
   photos:
     - "/vehicles/porsche-911-992-carrera-4s/01.jpg"
     - "/vehicles/porsche-911-992-carrera-4s/02.jpg"
   ```
   Der Pfad beginnt mit `/` und lässt `public` weg. Das erste Foto ist das
   Titelbild. Bei `photos: []` erscheint der ACS-Platzhalter.
4. `npm run check`, dann `npm run build`.

### Fahrzeug als verkauft markieren

Die Datei von `src/content/vehicles/` nach `src/content/sold/` verschieben,
`ref` (fortlaufende Nummer) und `soldYear` ergänzen, die Felder `price`,
`km`, `fuel`, `gearbox`, `power`, `drive`, `category`, `description` und
`highlights` entfernen, `teaser` in `note` umbenennen, Fotos nach
`public/sold/<dateiname>/` verschieben. Fertig — es erscheint im Archiv
"Bereits verkauft", nach Jahr gruppiert. `wide: true` gibt einem
besonderen Fahrzeug eine doppelt breite Kachel.

### Preis auf Anfrage

`price: null` statt einer Zahl — dann steht "Preis auf Anfrage" statt CHF.

### Texte ändern

Alle Texte stehen in `src/i18n/ui.ts`, Deutsch und Englisch nebeneinander.
Beide Sprachen brauchen dieselben Schlüssel.

### Häufige Stolpersteine

| Meldung | Ursache |
|---|---|
| Build bricht mit Feldnamen ab | Pflichtfeld fehlt oder falscher Typ |
| `Bild "..." liegt nicht unter public/...` | Pfad oder Gross-/Kleinschreibung stimmt nicht |
| `Deutscher/Englischer Text fehlt` | Eine Sprache vergessen |
| `steht gleichzeitig im Bestand UND ...` | Datei beim Verkaufen kopiert statt verschoben |

---

## Photo guidance

- **Format:** JPEG. Astro converts to WebP automatically at build time.
- **Size:** at least 1600px wide, 3:2 landscape works best.
- **Weight:** under ~500 KB each before the build.
- Shoot each car consistently: 3/4 front, 3/4 rear, side, interior, wheels,
  engine. The layout is designed around a consistent set.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Opens at `http://localhost:4321` and reloads as you edit.

```bash
npm run build
```

Produces the finished site in `dist/` — plain HTML, CSS and images.

---

## Publishing

`dist/` is a plain folder of static files, so anything can host it:

- **Cloudflare Pages / Netlify / Vercel** — free. Connect the repository,
  set build command `npm run build` and output directory `dist`.
- **Hostpoint / Infomaniak / any Swiss web host** — run `npm run build`
  and upload the contents of `dist/` by FTP.

---

## Design system

Taken from the ACS brand guideline, defined as tokens in
`src/styles/global.css`:

| | |
|---|---|
| Signal red | `#FE3335` — accents, marks, hover states |
| Deep red | `#D91F21` — filled buttons that carry white text (keeps contrast ≥4.5:1) |
| Background | `#0A0A0A` |
| Typeface | Manrope 300–800 (Google Fonts) |
| Corner radius | 2px — near-square, echoing the angular ACS mark |

Red is used as an accent, never as a background field. That is deliberate:
it keeps the cars the loudest thing on the page.

### Accessibility

Checked and passing: text contrast ≥4.5:1 throughout, pointer targets ≥24px,
visible focus rings, one `h1` per page, no heading level skips, alt text on
every image, form errors with a focused error summary, and full
`prefers-reduced-motion` support.

---

## Structure

```
src/
  data/
    site.ts        ← Kontaktdaten, Socials              (EDIT)
    queries.ts     ← Datenzugriff (nicht ändern)
  content/
    vehicles/*.md  ← Bestand, eine Datei pro Auto       (EDIT)
    sold/*.md      ← Verkauft-Archiv                    (EDIT)
  content.config.ts ← Schema/Validierung
  i18n/ui.ts       ← all DE + EN text                   (EDIT)
  styles/global.css← design tokens
  components/      ← header, footer, cards, forms
    views/         ← one file per page, shared by DE and EN
  pages/           ← URL routes (thin wrappers)
public/
  admin/           ← Weboberfläche unter /admin
  brand/           ← ACS-Logos (SVG)
  vehicles/<name>/ ← Fotos der Bestandsfahrzeuge
  sold/<name>/     ← Fotos der verkauften Fahrzeuge
```

### Pages

| German | English |
|---|---|
| `/` | `/en/` |
| `/fahrzeuge/` | `/en/vehicles/` |
| `/fahrzeuge/<id>/` | `/en/vehicles/<id>/` |
| `/verkauft/` | `/en/sold/` |
| `/import/` | `/en/import/` |
| `/ueber-uns/` | `/en/about/` |
| `/kontakt/` | `/en/contact/` |
| `/impressum/` | `/en/imprint/` |
| `/datenschutz/` | `/en/privacy/` |

---

## Contact forms

By default the forms open the visitor's email programme with the message
pre-filled. No backend, nothing to maintain.

To receive submissions directly instead, create a free
[Formspree](https://formspree.io) form and paste the endpoint into
`src/data/site.ts`:

```ts
formEndpoint: 'https://formspree.io/f/xxxxxxxx',
```

The forms switch to a real POST automatically.
