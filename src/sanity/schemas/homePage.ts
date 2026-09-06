import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'stats', title: 'Kennzahlen' },
    { name: 'intro', title: 'Was wir tun' },
    { name: 'featured', title: 'Featured-Bereich' },
    { name: 'soldTeaser', title: 'Verkauft-Teaser' },
    { name: 'meta', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero-Eyebrow',
      type: 'localeString',
      group: 'hero',
      description: "'{year}' wird automatisch ersetzt",
    }),
    defineField({
      name: 'heroTitle1',
      title: 'Hero-Titel Zeile 1',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle2',
      title: 'Hero-Titel Zeile 2',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroTitle3',
      title: 'Hero-Titel Zeile 3 (rot)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero-Lead-Text',
      type: 'localeText',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta',
      title: 'Hero CTA-Button (primär)',
      type: 'localeString',
      group: 'hero',
    }),
    defineField({
      name: 'heroCta2',
      title: 'Hero CTA-Button (sekundär)',
      type: 'localeString',
      group: 'hero',
    }),

    defineField({
      name: 'statsYearsLabel',
      title: 'Kennzahl "Jahre Erfahrung"',
      type: 'localeString',
      group: 'stats',
    }),
    defineField({
      name: 'statsSoldLabel',
      title: 'Kennzahl "Verkaufte Fahrzeuge"',
      type: 'localeString',
      group: 'stats',
    }),
    defineField({
      name: 'statsViewingLabel',
      title: 'Kennzahl "Besichtigung" — Label',
      type: 'localeString',
      group: 'stats',
    }),
    defineField({
      name: 'statsViewingValue',
      title: 'Kennzahl "Besichtigung" — Wert',
      type: 'localeString',
      group: 'stats',
    }),
    defineField({
      name: 'statsRegionLabel',
      title: 'Kennzahl "Standort" — Label',
      type: 'localeString',
      group: 'stats',
    }),
    defineField({
      name: 'statsRegionValue',
      title: 'Kennzahl "Standort" — Wert',
      type: 'localeString',
      group: 'stats',
    }),

    defineField({
      name: 'introEyebrow',
      title: 'Intro-Eyebrow',
      type: 'localeString',
      group: 'intro',
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro-Titel',
      type: 'localeString',
      group: 'intro',
    }),
    defineField({
      name: 'introCards',
      title: 'Intro-Cards (genau 3)',
      type: 'array',
      group: 'intro',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'localeString' },
            { name: 'body', title: 'Text', type: 'localeText' },
          ],
          preview: {
            select: { title: 'title.de' },
            prepare: ({ title }) => ({ title: title ?? 'Card' }),
          },
        },
      ],
      validation: (r) => r.length(3),
    }),
    defineField({
      name: 'introLinkLabel',
      title: 'Intro-Link-Text ("Mehr erfahren")',
      type: 'localeString',
      group: 'intro',
    }),

    defineField({
      name: 'featuredEyebrow',
      title: 'Featured-Eyebrow',
      type: 'localeString',
      group: 'featured',
    }),
    defineField({
      name: 'featuredTitle',
      title: 'Featured-Titel',
      type: 'localeString',
      group: 'featured',
    }),
    defineField({
      name: 'featuredLead',
      title: 'Featured-Lead',
      type: 'localeText',
      group: 'featured',
    }),
    defineField({
      name: 'featuredAllLabel',
      title: 'Featured-Button "Alle Fahrzeuge"',
      type: 'localeString',
      group: 'featured',
    }),

    defineField({
      name: 'soldTeaserEyebrow',
      title: 'Sold-Eyebrow',
      type: 'localeString',
      group: 'soldTeaser',
    }),
    defineField({
      name: 'soldTeaserTitle',
      title: 'Sold-Titel',
      type: 'localeString',
      group: 'soldTeaser',
    }),
    defineField({
      name: 'soldTeaserLead',
      title: 'Sold-Lead',
      type: 'localeText',
      group: 'soldTeaser',
    }),
    defineField({
      name: 'soldTeaserCta',
      title: 'Sold-CTA',
      type: 'localeString',
      group: 'soldTeaser',
    }),

    defineField({
      name: 'metaTagline',
      title: 'Meta-Tagline',
      type: 'localeString',
      group: 'meta',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta-Title (Browser-Tab)',
      type: 'localeString',
      group: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta-Description (SEO)',
      type: 'localeText',
      group: 'meta',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Startseite' }),
  },
});
