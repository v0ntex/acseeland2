import { defineType } from 'sanity';

export const localeStringArray = defineType({
  name: 'localeStringArray',
  title: 'Liste (DE/EN)',
  type: 'object',
  fields: [
    {
      name: 'de',
      title: 'Deutsch',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    },
    {
      name: 'en',
      title: 'Englisch',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.required().min(1),
    },
  ],
});
