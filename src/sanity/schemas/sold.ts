import { defineType, defineField } from 'sanity';

export const sold = defineType({
  name: 'sold',
  title: 'Verkauftes Fahrzeug (Archiv)',
  type: 'document',
  fields: [
    defineField({
      name: 'ref',
      title: 'Referenznummer',
      type: 'string',
      description: 'z. B. REF. 043 — fortlaufend',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      options: {
        source: (doc: Record<string, unknown>) =>
          [doc.make, doc.model, doc.year].filter(Boolean).join(' '),
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'make',
      title: 'Marke',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'model',
      title: 'Modell',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Ausführung',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Jahrgang',
      type: 'number',
      validation: (r) => r.required().integer().min(1900),
    }),
    defineField({
      name: 'soldYear',
      title: 'Verkauft im Jahr',
      type: 'number',
      description: 'Gruppiert das Archiv',
      validation: (r) => r.required().integer().min(1900),
    }),
    defineField({
      name: 'wide',
      title: 'Doppelt breite Kachel',
      type: 'boolean',
      description: 'Für besondere Fahrzeuge',
      initialValue: false,
    }),
    defineField({
      name: 'colour',
      title: 'Farbe',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Verkauft nach',
      type: 'localeString',
      description: "z. B. 'Verkauft nach Deutschland'",
    }),
    defineField({
      name: 'note',
      title: 'Kurzbeschreibung',
      type: 'localeText',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt-Text', type: 'string' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      ref: 'ref',
      make: 'make',
      model: 'model',
      soldYear: 'soldYear',
      media: 'photos.0',
    },
    prepare({ ref, make, model, soldYear, media }) {
      return {
        title: `${ref ?? ''} — ${make ?? ''} ${model ?? ''}`.trim(),
        subtitle: soldYear ? `Verkauft ${soldYear}` : undefined,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Verkaufsjahr (neu → alt)',
      name: 'soldYearDesc',
      by: [{ field: 'soldYear', direction: 'desc' }],
    },
    { title: 'Referenznummer', name: 'refAsc', by: [{ field: 'ref', direction: 'asc' }] },
  ],
});
