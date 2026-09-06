import { defineType, defineField } from 'sanity';

/** Impressum + Datenschutz. `kind` unterscheidet die beiden Dokumente. */
export const legalPage = defineType({
  name: 'legalPage',
  title: 'Rechtliche Seiten',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Art',
      type: 'string',
      options: {
        list: [
          { title: 'Impressum', value: 'imprint' },
          { title: 'Datenschutz', value: 'privacy' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'bodyDe',
      title: 'Inhalt Deutsch',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Absatz', value: 'normal' },
            { title: 'Titel', value: 'h2' },
            { title: 'Untertitel', value: 'h3' },
          ],
          lists: [{ title: 'Aufzählung', value: 'bullet' }],
          marks: {
            decorators: [{ title: 'Fett', value: 'strong' }, { title: 'Kursiv', value: 'em' }],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'bodyEn',
      title: 'Inhalt Englisch',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Paragraph', value: 'normal' },
            { title: 'Title', value: 'h2' },
            { title: 'Subtitle', value: 'h3' },
          ],
          lists: [{ title: 'Bullet list', value: 'bullet' }],
          marks: {
            decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { kind: 'kind', title: 'title.de' },
    prepare: ({ kind, title }) => ({
      title: title ?? (kind === 'imprint' ? 'Impressum' : 'Datenschutz'),
      subtitle: kind === 'imprint' ? 'Impressum' : 'Datenschutz',
    }),
  },
});
