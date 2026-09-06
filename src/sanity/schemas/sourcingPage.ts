import { defineType, defineField } from 'sanity';

export const sourcingPage = defineType({
  name: 'sourcingPage',
  title: 'Import & Beschaffung',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({ name: 'lead', title: 'Lead-Text', type: 'localeText' }),
    defineField({
      name: 'steps',
      title: 'Prozess-Schritte (4)',
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
            prepare: ({ title }) => ({ title: title ?? 'Schritt' }),
          },
        },
      ],
      validation: (r) => r.length(4),
    }),
    defineField({
      name: 'formTitle',
      title: 'Formular-Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'formLead',
      title: 'Formular-Lead',
      type: 'localeText',
    }),
  ],
  preview: { prepare: () => ({ title: 'Import & Beschaffung' }) },
});
