import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Firma & Kontakt',
  type: 'document',
  groups: [
    { name: 'firma', title: 'Firma', default: true },
    { name: 'kontakt', title: 'Kontakt' },
    { name: 'standorte', title: 'Standorte' },
    { name: 'social', title: 'Social Media' },
  ],
  fields: [
    defineField({
      name: 'legalName',
      title: 'Firmenname (offiziell)',
      type: 'string',
      group: 'firma',
      initialValue: 'Auto Center Seeland AG',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Kurzform',
      type: 'string',
      group: 'firma',
      initialValue: 'ACS',
    }),
    defineField({
      name: 'uid',
      title: 'UID / Handelsregister-Nr.',
      type: 'string',
      group: 'firma',
      initialValue: 'CHE-238.687.038',
    }),
    defineField({
      name: 'founded',
      title: 'Gründungsjahr',
      type: 'number',
      group: 'firma',
      description: "Wird für 'Seit ...' und Jahre-Erfahrung verwendet",
      initialValue: 2002,
      validation: (r) => r.integer().min(1900),
    }),
    defineField({
      name: 'vehiclesSold',
      title: "Verkaufte Fahrzeuge (Kennzahl, z.B. 5000 → '5’000+')",
      type: 'number',
      group: 'firma',
      initialValue: 5000,
    }),

    defineField({
      name: 'phone',
      title: 'Telefon (angezeigt)',
      type: 'string',
      group: 'kontakt',
      initialValue: '+41 79 363 99 99',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phoneHref',
      title: 'Telefon (für tel:-Link, ohne Leerzeichen)',
      type: 'string',
      group: 'kontakt',
      initialValue: '+41793639999',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp-Nummer',
      type: 'string',
      group: 'kontakt',
      description: 'Leer lassen um WhatsApp-Buttons auszublenden',
      initialValue: '+41793639999',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
      group: 'kontakt',
      initialValue: 'info@autocenterseeland.ch',
      validation: (r) => r.required().email(),
    }),

    defineField({
      name: 'offices',
      title: 'Standorte',
      type: 'array',
      group: 'standorte',
      of: [
        {
          type: 'object',
          name: 'office',
          fields: [
            { name: 'label', title: 'Bezeichnung', type: 'string', validation: (r) => r.required() },
            { name: 'street', title: 'Strasse', type: 'string', validation: (r) => r.required() },
            { name: 'zip', title: 'PLZ', type: 'string', validation: (r) => r.required() },
            { name: 'city', title: 'Ort', type: 'string', validation: (r) => r.required() },
            { name: 'country', title: 'Land', type: 'string', initialValue: 'Schweiz' },
            {
              name: 'mapsQuery',
              title: 'Google-Maps-Suchbegriff',
              type: 'string',
              description: 'z. B. "Längfeldweg 1, 2504 Biel/Bienne, Schweiz"',
            },
          ],
          preview: {
            select: { label: 'label', street: 'street', city: 'city' },
            prepare: ({ label, street, city }) => ({
              title: label ?? 'Standort',
              subtitle: [street, city].filter(Boolean).join(', '),
            }),
          },
        },
      ],
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'instagramHandle',
      title: 'Instagram Handle (Anzeigetext)',
      type: 'string',
      group: 'social',
      initialValue: '@acseeland',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Firma & Kontakt' }),
  },
});
