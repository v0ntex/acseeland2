import { defineType, defineField } from 'sanity';

export const vehiclesPage = defineType({
  name: 'vehiclesPage',
  title: 'Fahrzeuge-Übersicht',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({ name: 'lead', title: 'Lead-Text', type: 'localeText' }),
    defineField({
      name: 'empty',
      title: 'Text wenn keine Fahrzeuge / gefiltert leer',
      type: 'localeText',
    }),
    defineField({
      name: 'emptyCta',
      title: 'Empty-State-CTA',
      type: 'localeString',
    }),
  ],
  preview: { prepare: () => ({ title: 'Fahrzeuge-Übersicht' }) },
});
