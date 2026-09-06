/* ============================================================================
   ZUGRIFF AUF DIE FAHRZEUGDATEN
   ----------------------------------------------------------------------------
   Die Fahrzeuge liegen jetzt in Sanity (Dataset "production"). Redigiert wird
   über das eingebettete Studio unter /studio.

   Dieses Modul liest die Daten aus Sanity und bringt sie in die gleiche
   Struktur wie das alte Content-Collections-Setup — Cards und Detail-Views
   müssen nicht angepasst werden.
   ========================================================================== */

import { sanityClient } from 'sanity:client';
import { urlFor } from '../sanity/image';
import { vehiclesQuery, soldQuery } from '../sanity/queries';

type Bilingual = { de: string; en: string };
type BilingualList = { de: string[]; en: string[] };

/** Ein Fahrzeug im Bestand. `id` ist der Slug (URL-Segment). */
export type Vehicle = {
  id: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  km: number;
  price: number | null;
  fuel: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  gearbox: 'automatic' | 'manual';
  power: number;
  drive: string;
  category: 'exotic' | 'premium' | 'everyday';
  featured: boolean;
  mfk?: string;
  colour: Bilingual;
  teaser: Bilingual;
  description: BilingualList;
  highlights: BilingualList;
  /** Fertige Bild-URLs. Das erste Bild ist das Titelbild. */
  photos: string[];
};

/** Ein bereits verkauftes Fahrzeug aus dem Archiv. */
export type SoldVehicle = {
  id: string;
  ref: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  soldYear: number;
  wide: boolean;
  colour: Bilingual;
  destination?: Bilingual;
  note: Bilingual;
  photos: string[];
};

type SanityPhoto = { _key?: string; asset?: { _ref?: string } } | null | undefined;

function mapPhotos(photos: SanityPhoto[] | undefined | null): string[] {
  if (!photos) return [];
  return photos
    .filter((p): p is NonNullable<SanityPhoto> => Boolean(p?.asset?._ref))
    .map((p) => urlFor(p as never, 2000));
}

/** Alle Fahrzeuge im Bestand, neuester Jahrgang zuerst. */
export async function getVehicles(): Promise<Vehicle[]> {
  const raw = await sanityClient.fetch<(Omit<Vehicle, 'photos'> & { photos: SanityPhoto[] })[]>(
    vehiclesQuery,
  );
  return raw.map((v) => ({
    ...v,
    featured: Boolean(v.featured),
    price: v.price ?? null,
    photos: mapPhotos(v.photos),
  }));
}

/** Die auf der Startseite hervorgehobenen Fahrzeuge. */
export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  const all = await getVehicles();
  const featured = all.filter((v) => v.featured);
  /* Fällt das Kennzeichen "featured" mal weg, zeigen wir statt einer leeren
     Sektion einfach die neuesten Fahrzeuge. */
  return (featured.length ? featured : all).slice(0, limit);
}

/** Ein einzelnes Fahrzeug anhand seines Slugs. */
export async function getVehicle(id: string): Promise<Vehicle | undefined> {
  return (await getVehicles()).find((v) => v.id === id);
}

/** Das Verkauft-Archiv, nach Referenznummer geordnet. */
export async function getSoldVehicles(): Promise<SoldVehicle[]> {
  const raw = await sanityClient.fetch<
    (Omit<SoldVehicle, 'photos'> & { photos: SanityPhoto[] })[]
  >(soldQuery);
  return raw.map((v) => ({
    ...v,
    wide: Boolean(v.wide),
    photos: mapPhotos(v.photos),
  }));
}

/** Das Archiv nach Verkaufsjahr gruppiert, neuestes Jahr zuerst. */
export async function getSoldByYear(): Promise<{ year: number; items: SoldVehicle[] }[]> {
  const all = await getSoldVehicles();
  const groups = new Map<number, SoldVehicle[]>();
  for (const v of all) {
    if (!groups.has(v.soldYear)) groups.set(v.soldYear, []);
    groups.get(v.soldYear)!.push(v);
  }
  return [...groups.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}
