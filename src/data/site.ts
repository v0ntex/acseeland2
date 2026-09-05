/* ============================================================================
   SITE SETTINGS — Auto Center Seeland AG
   ----------------------------------------------------------------------------
   Edit this file to change contact details and social links.
   Everything here appears in the header, footer and contact page.
   ========================================================================== */

export const site = {
  legalName: 'Auto Center Seeland AG',
  shortName: 'ACS',
  uid: 'CHE-238.687.038',
  /* Gründungsjahr des Autohauses. Wird für "Seit ...", die Jahre-Erfahrung
     und die strukturierten Daten verwendet — nur hier ändern.
     Hinweis: die AG ist im Handelsregister seit 2014 eingetragen. */
  founded: 2002,

  /* Anzahl verkaufter Fahrzeuge, erscheint als Kennzahl ("5’000+") auf
     Startseite und "Über uns". Bleibt der Wert null, entfällt die Kennzahl. */
  vehiclesSold: 5000 as number | null,

  /* --- Contact -------------------------------------------------------- */
  phone: '+41 79 363 99 99',
  phoneHref: '+41793639999',
  /* Same mobile number, used for the WhatsApp buttons.
     Set to null if you would rather not offer WhatsApp. */
  whatsapp: '+41793639999',
  email: 'info@autocenterseeland.ch',

  /* --- Locations ------------------------------------------------------
     Both are offices. Viewing is BY APPOINTMENT ONLY — the showroom is
     deliberately discreet because of the value of the vehicles.          */
  offices: [
    {
      label: 'Hauptsitz / Head office',
      street: 'Längfeldweg 1',
      zip: '2504',
      city: 'Biel/Bienne',
      country: 'Schweiz',
      mapsQuery: 'Längfeldweg 1, 2504 Biel/Bienne, Schweiz',
    },
    {
      label: 'Werkstatt / Workshop',
      street: 'Kontrollstrasse 5',
      zip: '2502',
      city: 'Biel/Bienne',
      country: 'Schweiz',
      mapsQuery: 'Kontrollstrasse 5, 2502 Biel/Bienne, Schweiz',
    },
  ],

  /* No fixed opening hours are published: ACS is reachable at any time and
     viewings are arranged individually. The site states availability
     instead of a timetable. */

  /* --- Social ---------------------------------------------------------- */
  social: {
    instagram: 'https://www.instagram.com/acseeland/',
    instagramHandle: '@acseeland',
    facebook: null as string | null,
  },

  /* --- Where the contact / sourcing forms submit -----------------------
     Default is a plain mailto: (works everywhere, no backend, no cost).
     To use Formspree instead, paste your endpoint here, e.g.
       formEndpoint: 'https://formspree.io/f/xxxxxxxx'                     */
  formEndpoint: null as string | null,
} as const;

export type Office = (typeof site.offices)[number];
