import { defineType } from 'sanity';

export const localeString = defineType({
  name: 'localeString',
  title: 'Text (DE/EN)',
  type: 'object',
  fields: [
    { name: 'de', title: 'Deutsch', type: 'string', validation: (r) => r.required() },
    { name: 'en', title: 'Englisch', type: 'string', validation: (r) => r.required() },
  ],
});
