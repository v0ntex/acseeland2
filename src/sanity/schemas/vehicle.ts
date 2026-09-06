import { defineType, defineField } from 'sanity';

export const vehicle = defineType({
  name: 'vehicle',
  title: 'Fahrzeug im Bestand',
  type: 'document',
  groups: [
    { name: 'basis', title: 'Basis', default: true },
    { name: 'technik', title: 'Technik' },
    { name: 'texte', title: 'Texte' },
    { name: 'medien', title: 'Fotos' },
  ],
  fields: [
    defineField({
      name: 'make',
      title: 'Marke',
      type: 'string',
      group: 'basis',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'model',
      title: 'Modell',
      type: 'string',
      group: 'basis',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Ausführung',
      type: 'string',
      group: 'basis',
      description: 'z. B. 992 Carrera 4S',
    }),
    defineField({
      name: 'slug',
      title: 'URL-Slug',
      type: 'slug',
      group: 'basis',
      options: {
        source: (doc: Record<string, unknown>) =>
          [doc.make, doc.model, doc.year].filter(Boolean).join(' '),
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Jahrgang',
      type: 'number',
      group: 'basis',
      validation: (r) => r.required().integer().min(1900),
    }),
    defineField({
      name: 'km',
      title: 'Kilometerstand',
      type: 'number',
      group: 'basis',
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: 'price',
      title: 'Preis in CHF',
      type: 'number',
      group: 'basis',
      description: "Leer lassen für 'Preis auf Anfrage'",
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      group: 'basis',
      options: {
        list: [
          { title: 'Sport & Luxus', value: 'exotic' },
          { title: 'Premium', value: 'premium' },
          { title: 'Occasionen', value: 'everyday' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Auf Startseite hervorheben',
      type: 'boolean',
      group: 'basis',
      initialValue: false,
    }),
    defineField({
      name: 'mfk',
      title: 'MFK',
      type: 'string',
      group: 'basis',
      description: "z. B. 'Neu ab MFK' oder '05.2027'",
    }),

    defineField({
      name: 'fuel',
      title: 'Treibstoff',
      type: 'string',
      group: 'technik',
      options: {
        list: [
          { title: 'Benzin', value: 'petrol' },
          { title: 'Diesel', value: 'diesel' },
          { title: 'Hybrid', value: 'hybrid' },
          { title: 'Elektro', value: 'electric' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gearbox',
      title: 'Getriebe',
      type: 'string',
      group: 'technik',
      options: {
        list: [
          { title: 'Automat', value: 'automatic' },
          { title: 'Handschaltung', value: 'manual' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'power',
      title: 'Leistung in PS',
      type: 'number',
      group: 'technik',
      validation: (r) => r.required().integer().min(1),
    }),
    defineField({
      name: 'drive',
      title: 'Antrieb',
      type: 'string',
      group: 'technik',
      description: 'z. B. Allrad, Vorderrad, quattro',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'colour',
      title: 'Farbe',
      type: 'localeString',
      group: 'technik',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'teaser',
      title: 'Kurztext (Übersichtskachel)',
      type: 'localeText',
      group: 'texte',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung (ein Eintrag = ein Absatz)',
      type: 'localeStringArray',
      group: 'texte',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Ausstattung & Highlights',
      type: 'localeStringArray',
      group: 'texte',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      group: 'medien',
      description: 'Das erste Bild ist das Titelbild. Reihenfolge per Ziehen ändern.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt-Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      make: 'make',
      model: 'model',
      year: 'year',
      km: 'km',
      media: 'photos.0',
    },
    prepare({ make, model, year, km, media }) {
      return {
        title: `${make ?? ''} ${model ?? ''}`.trim() || 'Unbenanntes Fahrzeug',
        subtitle: [year, km ? `${new Intl.NumberFormat('de-CH').format(km)} km` : null]
          .filter(Boolean)
          .join(' · '),
        media,
      };
    },
  },
  orderings: [
    { title: 'Jahrgang (neu → alt)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Kilometer (wenig → viel)', name: 'kmAsc', by: [{ field: 'km', direction: 'asc' }] },
    { title: 'Preis (tief → hoch)', name: 'priceAsc', by: [{ field: 'price', direction: 'asc' }] },
  ],
});
