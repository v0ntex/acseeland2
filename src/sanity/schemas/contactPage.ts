import { defineType, defineField } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'localeString' }),
    defineField({ name: 'lead', title: 'Lead-Text', type: 'localeText' }),
    defineField({
      name: 'availabilityValue',
      title: 'Erreichbarkeit — Wert',
      type: 'localeString',
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Erreichbarkeits-Text (unter der Erreichbarkeit)',
      type: 'localeText',
    }),
    defineField({
      name: 'appointmentTitle',
      title: 'Termin-Block: Titel',
      type: 'localeString',
    }),
    defineField({
      name: 'appointmentBody',
      title: 'Termin-Block: Text',
      type: 'localeText',
    }),
    defineField({
      name: 'formTitle',
      title: 'Kontaktformular-Titel',
      type: 'localeString',
    }),
  ],
  preview: { prepare: () => ({ title: 'Kontakt' }) },
});
