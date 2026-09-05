import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ============================================================================
   SCHEMA DER FAHRZEUGDATEN
   ----------------------------------------------------------------------------
   Jedes Fahrzeug ist eine Datei in src/content/vehicles/ bzw. src/content/sold/.
   Der Dateiname ohne ".md" ist die id und wird zur Adresse der Seite.

   Dieses Schema wird bei jedem Build geprüft. Fehlt ein Feld oder hat einen
   falschen Typ, bricht der Build mit einer klaren Meldung ab — bevor etwas
   online geht.
   ========================================================================== */

/** Zweisprachiges Textfeld — beide Sprachen sind Pflicht. */
const bilingual = z.object({
  de: z.string().min(1, 'Deutscher Text fehlt'),
  en: z.string().min(1, 'Englischer Text fehlt'),
});

/** Zweisprachige Liste, z. B. Beschreibungsabsätze oder Ausstattung. */
const bilingualList = z.object({
  de: z.array(z.string()).min(1, 'Mindestens ein deutscher Eintrag nötig'),
  en: z.array(z.string()).min(1, 'Mindestens ein englischer Eintrag nötig'),
});

const vehicles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vehicles' }),
  schema: z.object({
    make: z.string(),
    model: z.string(),
    variant: z.string().optional(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 2),
    km: z.number().int().min(0),
    /** null oder weggelassen bedeutet "Preis auf Anfrage".
        Das CMS lässt das Feld bei leerer Eingabe ganz weg — daher default. */
    price: z.number().positive().nullable().default(null),
    fuel: z.enum(['petrol', 'diesel', 'hybrid', 'electric']),
    gearbox: z.enum(['automatic', 'manual']),
    power: z.number().int().positive(),
    drive: z.string(),
    category: z.enum(['exotic', 'premium', 'everyday']),
    /** Gross auf der Startseite zeigen */
    featured: z.boolean().default(false),
    mfk: z.string().optional(),
    colour: bilingual,
    teaser: bilingual,
    description: bilingualList,
    highlights: bilingualList,
    /** Bildpfade ab /, z. B. "/vehicles/porsche-911/01.jpg".
        Das erste Bild ist das Titelbild. */
    photos: z.array(z.string().startsWith('/', 'Pfad muss mit / beginnen')).default([]),
  }),
});

const sold = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sold' }),
  schema: z.object({
    /** Referenznummer auf der Kachel, z. B. "REF. 001" */
    ref: z.string(),
    make: z.string(),
    model: z.string(),
    variant: z.string().optional(),
    year: z.number().int().min(1900),
    /** Jahr des Verkaufs — gruppiert das Archiv */
    soldYear: z.number().int().min(1900).max(new Date().getFullYear()),
    /** Doppelt breite Kachel für besondere Fahrzeuge */
    wide: z.boolean().default(false),
    colour: bilingual,
    destination: bilingual.optional(),
    note: bilingual,
    /** Bildpfade ab /, z. B. "/sold/bugatti-veyron/01.jpg". */
    photos: z.array(z.string().startsWith('/', 'Pfad muss mit / beginnen')).default([]),
  }),
});

export const collections = { vehicles, sold };
