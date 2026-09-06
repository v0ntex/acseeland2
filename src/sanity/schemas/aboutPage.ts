import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Über uns',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({
      name: 'lead',
      title: 'Lead-Text',
      type: 'localeString',
      description: "'{year}' wird automatisch mit dem Gründungsjahr ersetzt",
    }),
    defineField({
      name: 'paragraphs',
      title: 'Story-Absätze',
      type: 'array',
      description: "'{year}' wird automatisch ersetzt",
      of: [
        {
          type: 'object',
          fields: [
            { name: 'de', title: 'Deutsch', type: 'text', rows: 4 },
            { name: 'en', title: 'Englisch', type: 'text', rows: 4 },
          ],
          preview: {
            select: { title: 'de' },
            prepare: ({ title }) => ({ title: title ? title.slice(0, 60) + '…' : 'Absatz' }),
          },
        },
      ],
    }),
    defineField({
      name: 'valuesTitle',
      title: 'Titel Werte-Sektion',
      type: 'localeString',
    }),
    defineField({
      name: 'values',
      title: 'Werte (3 Cards)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titel', type: 'localeString' },
            { name: 'body', title: 'Text', type: 'localeText' },
          ],
          preview: {
            select: { title: 'title.de' },
            prepare: ({ title }) => ({ title: title ?? 'Wert' }),
          },
        },
      ],
      validation: (r) => r.length(3),
    }),
  ],
  preview: { prepare: () => ({ title: 'Über uns' }) },
});
