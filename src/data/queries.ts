/* ============================================================================
   ZUGRIFF AUF DIE FAHRZEUGDATEN
   ----------------------------------------------------------------------------
   Die Fahrzeuge liegen als einzelne Dateien in src/content/vehicles/ und
   src/content/sold/ — bearbeitbar von Hand oder über das CMS unter /admin.

   Dieses Modul liest sie ein und bringt sie in eine feste Reihenfolge.
   Die Komponenten greifen nur hierüber zu, nie direkt auf die Dateien.
   ========================================================================== */

import { getCollection, type CollectionEntry } from 'astro:content';

/** Ein Fahrzeug im Bestand. `id` ist der Dateiname ohne Endung. */
export type Vehicle = CollectionEntry<'vehicles'>['data'] & { id: string };

/** Ein bereits verkauftes Fahrzeug aus dem Archiv. */
export type SoldVehicle = CollectionEntry<'sold'>['data'] & { id: string };

const flatten = <T extends { id: string; data: object }>(entry: T) =>
  ({ id: entry.id, ...entry.data }) as never;

/** Alle Fahrzeuge im Bestand, neuester Jahrgang zuerst. */
export async function getVehicles(): Promise<Vehicle[]> {
  const entries = await getCollection('vehicles');
  return entries
    .map(flatten)
    .sort((a: Vehicle, b: Vehicle) => b.year - a.year || a.km - b.km);
}

/** Die auf der Startseite hervorgehobenen Fahrzeuge. */
export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  const all = await getVehicles();
  const featured = all.filter((v) => v.featured);
  /* Fällt das Kennzeichen "featured" mal weg, zeigen wir statt einer leeren
     Sektion einfach die neuesten Fahrzeuge. */
  return (featured.length ? featured : all).slice(0, limit);
}

/** Ein einzelnes Fahrzeug anhand seiner id. */
export async function getVehicle(id: string): Promise<Vehicle | undefined> {
  return (await getVehicles()).find((v) => v.id === id);
}

/** Das Verkauft-Archiv, nach Referenznummer geordnet. */
export async function getSoldVehicles(): Promise<SoldVehicle[]> {
  const entries = await getCollection('sold');
  return entries
    .map(flatten)
    .sort((a: SoldVehicle, b: SoldVehicle) =>
      b.soldYear - a.soldYear || a.ref.localeCompare(b.ref, 'de'),
    );
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
