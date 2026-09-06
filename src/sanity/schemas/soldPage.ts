import { defineType, defineField } from 'sanity';

export const soldPage = defineType({
  name: 'soldPage',
  title: 'Verkauft-Archiv',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({ name: 'lead', title: 'Lead-Text', type: 'localeText' }),
    defineField({
      name: 'note',
      title: 'Hinweis-Box (oberhalb CTA)',
      type: 'localeText',
    }),
    defineField({
      name: 'cta',
      title: 'CTA-Text',
      type: 'localeString',
    }),
  ],
  preview: { prepare: () => ({ title: 'Verkauft-Archiv' }) },
});
