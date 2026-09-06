import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = import.meta.env.SANITY_PROJECT_ID ?? 'm7gc2yj5';
const dataset = import.meta.env.SANITY_DATASET ?? 'production';

const builder = imageUrlBuilder({ projectId, dataset });

/** Baut aus einem Sanity-Bild eine URL. Optional Breite in Pixel. */
export function urlFor(source: SanityImageSource, width?: number): string {
  const b = builder.image(source).auto('format').fit('max');
  return (width ? b.width(width) : b).url();
}
