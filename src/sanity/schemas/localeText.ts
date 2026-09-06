import { defineType } from 'sanity';

export const localeText = defineType({
  name: 'localeText',
  title: 'Fliesstext (DE/EN)',
  type: 'object',
  fields: [
    { name: 'de', title: 'Deutsch', type: 'text', rows: 3, validation: (r) => r.required() },
    { name: 'en', title: 'Englisch', type: 'text', rows: 3, validation: (r) => r.required() },
  ],
});
