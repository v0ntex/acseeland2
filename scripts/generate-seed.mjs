/* ============================================================================
   SEED-GENERATOR — schreibt scripts/seed.ndjson mit den aktuellen
   Fallback-Texten aus src/i18n/ui.ts.
   Danach: `sanity dataset import scripts/seed.ndjson production --missing`
   Nur fehlende Dokumente werden angelegt; existierende bleiben unangetastet.
   ========================================================================== */

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------ Werte (aus i18n/ui.ts) --- */

const FOUNDED = 2002;

const T = {
  de: {
    metaTagline: 'Exklusive Fahrzeuge in Biel/Bienne',
    metaTitle: 'Auto Center Seeland AG — Exklusive Fahrzeuge in Biel/Bienne',
    metaDesc:
      'Sorgfältig ausgewählte Sport-, Luxus- und Occasionsfahrzeuge im Seeland. Besichtigung nach Vereinbarung. Import, Export und Fahrzeugbeschaffung auf Anfrage.',

    heroEyebrow: `Biel/Bienne · Seit ${FOUNDED}`,
    heroTitle1: 'Aussergewöhnliche',
    heroTitle2: 'Fahrzeuge.',
    heroTitle3: 'Höchste Ansprüche.',
    heroLead:
      'Handverlesen, kompromisslos in Qualität und Zustand – mit besonderem Augenmerk auf Historie, Ausstattung und Pflege, für ein automobiles Erlebnis auf höchstem Niveau.',
    heroCta: 'Aktuelle Fahrzeuge',
    heroCta2: 'Termin vereinbaren',

    statsYears: 'Jahre Erfahrung',
    statsSold: 'Verkaufte Fahrzeuge',
    statsViewing: 'Besichtigung',
    statsViewingValue: 'Nach Vereinbarung',
    statsRegion: 'Standort',
    statsRegionValue: 'Biel/Bienne, CH',

    introEyebrow: 'Was wir tun',
    introTitle: 'Drei Wege, zu Ihrem Fahrzeug zu kommen.',
    introLink: 'Mehr erfahren',
    intro1Title: 'Sport- & Luxusfahrzeuge',
    intro1Body:
      'Sorgfältig ausgewählte Sammler- und Sportwagen. Jedes Fahrzeug wird auf Historie, Zustand und Echtheit geprüft, bevor es in unseren Bestand kommt.',
    intro2Title: 'Geprüfte Occasionen',
    intro2Body:
      'Zuverlässige Alltagsfahrzeuge mit lückenloser Servicehistorie, frischer MFK und ehrlicher Zustandsbeschreibung — ohne Überraschungen.',
    intro3Title: 'Import, Export & Beschaffung',
    intro3Body:
      'Sie wissen genau, was Sie suchen? Wir finden es — europaweit, inklusive Verzollung, Import und Schweizer Zulassung.',

    featuredEyebrow: 'Aktueller Bestand',
    featuredTitle: 'Ausgewählte Fahrzeuge',
    featuredLead:
      'Ein Auszug aus unserem aktuellen Angebot. Der vollständige Bestand ist jederzeit online einsehbar.',
    featuredAll: 'Alle Fahrzeuge ansehen',

    soldTeaserEyebrow: 'Referenzen',
    soldTeaserTitle: 'Bereits verkauft',
    soldTeaserLead:
      'Ein Archiv der Fahrzeuge, die durch unsere Hände gegangen sind. Es zeigt besser als jedes Versprechen, wofür wir stehen.',
    soldTeaserCta: 'Zum Archiv',

    vehiclesTitle: 'Aktuelle Fahrzeuge',
    vehiclesLead:
      'Alle Fahrzeuge sind bei uns in Biel/Bienne verfügbar. Besichtigung und Probefahrt nach Vereinbarung.',
    vehiclesEmpty:
      'Für diese Auswahl haben wir aktuell kein Fahrzeug. Passen Sie die Filter an oder lassen Sie uns Ihr Wunschfahrzeug beschaffen.',
    vehiclesEmptyCta: 'Fahrzeug beschaffen lassen',

    soldTitle: 'Bereits verkauft',
    soldLead:
      'Nicht jedes Fahrzeug, das wir verkaufen, erscheint öffentlich. Dieses Archiv zeigt eine Auswahl der Wagen, die bei uns eine neue Besitzerin oder einen neuen Besitzer gefunden haben.',
    soldNote:
      'Alle Fahrzeuge auf dieser Seite sind verkauft und nicht mehr verfügbar. Suchen Sie etwas Ähnliches?',
    soldCta: 'Fahrzeug beschaffen lassen',

    sourcingTitle: 'Import, Export & Beschaffung',
    sourcingLead:
      'Wenn das Fahrzeug, das Sie suchen, nicht in unserem Bestand steht, finden wir es. Europaweit, mit vollständiger Abwicklung bis zur Schweizer Zulassung.',
    step1Title: 'Anforderungsprofil',
    step1Body:
      'Wir besprechen Modell, Ausstattung, Budget und Zeitrahmen — und was für Sie ein Ausschlusskriterium ist.',
    step2Title: 'Suche & Prüfung',
    step2Body:
      'Wir durchsuchen unser Händlernetz und den europäischen Markt. Jeder Kandidat wird auf Historie, Unfallfreiheit und Zustand geprüft.',
    step3Title: 'Import & Verzollung',
    step3Body:
      'Transport, Verzollung, Automobilsteuer und Mehrwertsteuer wickeln wir vollständig ab. Sie erhalten eine klare Gesamtkostenrechnung.',
    step4Title: 'MFK & Übergabe',
    step4Body:
      'Wir führen die Schweizer Zulassung durch, bereiten das Fahrzeug auf und übergeben es fahrbereit.',
    sourcingFormTitle: 'Wunschfahrzeug anfragen',
    sourcingFormLead:
      'Je genauer Ihre Angaben, desto gezielter die Suche. Wir melden uns in der Regel innerhalb von zwei Arbeitstagen.',

    aboutTitle: 'Über Auto Center Seeland',
    aboutLead: `Seit ${FOUNDED} im Seeland zuhause.`,
    aboutP1: `Seit ${FOUNDED} sind wir als Autohaus in Biel/Bienne tätig. Was als klassischer Garagenbetrieb begann, ist heute ein Haus, das einen zuverlässigen Familienkombi ebenso selbstverständlich verkauft wie einen Sammlerwagen.`,
    aboutP2:
      'Wir arbeiten bewusst ohne grosse Schaufensterfront. Unsere Fahrzeuge stehen geschützt, Besichtigungen finden nach Vereinbarung statt. Das ist keine Attitüde, sondern schlicht die Voraussetzung dafür, Fahrzeuge dieses Werts verantwortungsvoll zu betreuen.',
    aboutP3:
      'Zweisprachig, regional verankert und europaweit vernetzt: Wir kaufen, verkaufen, importieren und exportieren — und beraten dabei so, wie wir selbst beraten werden möchten.',
    valuesTitle: 'Wie wir arbeiten',
    v1Title: 'Diskretion',
    v1Body:
      'Besichtigung nach Vereinbarung, keine öffentliche Ausstellung. Ihre Daten und Ihr Kauf bleiben bei uns.',
    v2Title: 'Transparenz',
    v2Body:
      'Vollständige Historie, ehrliche Zustandsbeschreibung, nachvollziehbare Kosten. Keine Überraschungen nach der Unterschrift.',
    v3Title: 'Sorgfalt',
    v3Body:
      'Jedes Fahrzeug wird geprüft, bevor es in unseren Bestand kommt. Was unseren Ansprüchen nicht genügt, kaufen wir nicht.',

    contactTitle: 'Kontakt',
    contactLead:
      'Besichtigungen finden ausschliesslich nach Vereinbarung statt. Schreiben Sie uns oder rufen Sie an — wir finden einen Termin.',
    availabilityValue: 'Jederzeit erreichbar',
    availabilityNote:
      'Wir arbeiten ohne feste Öffnungszeiten. Rufen Sie an oder schreiben Sie uns — in der Regel sind wir sofort erreichbar und finden auch kurzfristig einen Termin.',
    appointmentTitle: 'Besichtigung nur nach Vereinbarung',
    appointmentBody:
      'Unsere Fahrzeuge stehen aus Sicherheitsgründen nicht öffentlich zugänglich. Vereinbaren Sie bitte vorgängig einen Termin — so stellen wir sicher, dass Ihr Wunschfahrzeug bereitsteht und wir uns Zeit für Sie nehmen können.',
    contactFormTitle: 'Nachricht senden',
  },
  en: {
    metaTagline: 'Exclusive vehicles in Biel/Bienne',
    metaTitle: 'Auto Center Seeland AG — Exclusive vehicles in Biel/Bienne',
    metaDesc:
      'Carefully selected sports, luxury and pre-owned vehicles in the Seeland region. Viewing by appointment. Import, export and vehicle sourcing on request.',

    heroEyebrow: `Biel/Bienne · Since ${FOUNDED}`,
    heroTitle1: 'Exceptional',
    heroTitle2: 'vehicles.',
    heroTitle3: 'Exacting standards.',
    heroLead:
      'Hand-picked and uncompromising on quality and condition — with particular attention to history, specification and care, for a driving experience of the highest order.',
    heroCta: 'Current stock',
    heroCta2: 'Book an appointment',

    statsYears: 'Years of experience',
    statsSold: 'Vehicles sold',
    statsViewing: 'Viewing',
    statsViewingValue: 'By appointment',
    statsRegion: 'Location',
    statsRegionValue: 'Biel/Bienne, CH',

    introEyebrow: 'What we do',
    introTitle: 'Three routes to your next car.',
    introLink: 'Learn more',
    intro1Title: 'Sports & luxury cars',
    intro1Body:
      'Carefully selected collector and performance cars. Every vehicle is checked for history, condition and authenticity before it joins our stock.',
    intro2Title: 'Inspected pre-owned cars',
    intro2Body:
      'Dependable everyday vehicles with complete service history, fresh roadworthiness test and an honest condition report — no surprises.',
    intro3Title: 'Import, export & sourcing',
    intro3Body:
      'Know exactly what you are looking for? We will find it — across Europe, including customs clearance, import and Swiss registration.',

    featuredEyebrow: 'Current stock',
    featuredTitle: 'Selected vehicles',
    featuredLead:
      'A selection from what we currently have available. The full stock list is online at all times.',
    featuredAll: 'View all vehicles',

    soldTeaserEyebrow: 'Track record',
    soldTeaserTitle: 'Previously sold',
    soldTeaserLead:
      'An archive of the cars that have passed through our hands. It says more about how we work than any promise could.',
    soldTeaserCta: 'View the archive',

    vehiclesTitle: 'Current stock',
    vehiclesLead:
      'All vehicles are available here in Biel/Bienne. Viewing and test drives by appointment.',
    vehiclesEmpty:
      'We have nothing matching that selection right now. Adjust the filters, or let us source your car for you.',
    vehiclesEmptyCta: 'Have a car sourced',

    soldTitle: 'Previously sold',
    soldLead:
      'Not every car we sell appears publicly. This archive shows a selection of the vehicles that have found a new owner with us.',
    soldNote:
      'Every vehicle on this page has been sold and is no longer available. Looking for something similar?',
    soldCta: 'Have a car sourced',

    sourcingTitle: 'Import, export & sourcing',
    sourcingLead:
      'If the car you are after is not in our stock, we will find it. Across Europe, fully handled through to Swiss registration.',
    step1Title: 'Your brief',
    step1Body:
      'We agree on model, specification, budget and timeframe — and on what would rule a car out for you.',
    step2Title: 'Search & inspection',
    step2Body:
      'We work our dealer network and the wider European market. Every candidate is checked for history, accident damage and condition.',
    step3Title: 'Import & customs',
    step3Body:
      'Transport, customs clearance, vehicle tax and VAT are handled in full. You receive one clear all-in cost breakdown.',
    step4Title: 'Registration & handover',
    step4Body:
      'We complete the Swiss roadworthiness test and registration, prepare the car and hand it over ready to drive.',
    sourcingFormTitle: 'Request a vehicle',
    sourcingFormLead:
      'The more precise your brief, the more targeted our search. We usually respond within two working days.',

    aboutTitle: 'About Auto Center Seeland',
    aboutLead: `At home in the Seeland region since ${FOUNDED}.`,
    aboutP1: `We have been operating as a dealership in Biel/Bienne since ${FOUNDED}. What began as a conventional garage is today a business that sells a dependable family estate as naturally as it sells a collector car.`,
    aboutP2:
      'We deliberately operate without a large shop window. Our vehicles are kept secure and viewings take place by appointment. That is not affectation — it is simply what looking after cars of this value responsibly requires.',
    aboutP3:
      'Bilingual, regionally rooted and connected across Europe: we buy, sell, import and export — and advise the way we would want to be advised ourselves.',
    valuesTitle: 'How we work',
    v1Title: 'Discretion',
    v1Body:
      'Viewing by appointment, no public display. Your details and your purchase stay with us.',
    v2Title: 'Transparency',
    v2Body:
      'Complete history, an honest condition report, costs you can follow. No surprises after signing.',
    v3Title: 'Diligence',
    v3Body:
      'Every vehicle is inspected before it joins our stock. If it does not meet our standard, we do not buy it.',

    contactTitle: 'Contact',
    contactLead:
      'Viewings take place strictly by appointment. Write or call — we will find a time.',
    availabilityValue: 'Reachable any time',
    availabilityNote:
      'We do not keep fixed opening hours. Call or write — you will almost always reach us directly, and we can arrange a viewing at short notice.',
    appointmentTitle: 'Viewing by appointment only',
    appointmentBody:
      'For security reasons our vehicles are not on public display. Please arrange an appointment in advance — that way we can make sure the car you want to see is ready and that we have time for you.',
    contactFormTitle: 'Send a message',
  },
};

/* ---------------------------------------------------------- Helpers ------- */

const loc = (key) => ({ _type: 'localeString', de: T.de[key], en: T.en[key] });
const locT = (key) => ({ _type: 'localeText', de: T.de[key], en: T.en[key] });

let keyCounter = 0;
const k = () => `seed-${(++keyCounter).toString(36)}`;

const card = (titleKey, bodyKey) => ({
  _key: k(),
  _type: 'object',
  title: loc(titleKey),
  body: locT(bodyKey),
});

const paragraph = (deKey, enKey) => ({
  _key: k(),
  _type: 'object',
  de: T.de[deKey],
  en: T.en[enKey],
});

/* ---------------------------------------------------------- Documents ----- */

const documents = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    legalName: 'Auto Center Seeland AG',
    shortName: 'ACS',
    uid: 'CHE-238.687.038',
    founded: FOUNDED,
    vehiclesSold: 5000,
    phone: '+41 79 363 99 99',
    phoneHref: '+41793639999',
    whatsapp: '+41793639999',
    email: 'info@autocenterseeland.ch',
    offices: [
      {
        _key: k(),
        _type: 'office',
        label: 'Hauptsitz / Head office',
        street: 'Längfeldweg 1',
        zip: '2504',
        city: 'Biel/Bienne',
        country: 'Schweiz',
        mapsQuery: 'Längfeldweg 1, 2504 Biel/Bienne, Schweiz',
      },
      {
        _key: k(),
        _type: 'office',
        label: 'Werkstatt / Workshop',
        street: 'Kontrollstrasse 5',
        zip: '2502',
        city: 'Biel/Bienne',
        country: 'Schweiz',
        mapsQuery: 'Kontrollstrasse 5, 2502 Biel/Bienne, Schweiz',
      },
    ],
    instagram: 'https://www.instagram.com/acseeland/',
    instagramHandle: '@acseeland',
  },

  {
    _id: 'homePage',
    _type: 'homePage',
    metaTagline: loc('metaTagline'),
    metaTitle: loc('metaTitle'),
    metaDescription: locT('metaDesc'),

    heroEyebrow: loc('heroEyebrow'),
    heroTitle1: loc('heroTitle1'),
    heroTitle2: loc('heroTitle2'),
    heroTitle3: loc('heroTitle3'),
    heroLead: locT('heroLead'),
    heroCta: loc('heroCta'),
    heroCta2: loc('heroCta2'),

    statsYearsLabel: loc('statsYears'),
    statsSoldLabel: loc('statsSold'),
    statsViewingLabel: loc('statsViewing'),
    statsViewingValue: loc('statsViewingValue'),
    statsRegionLabel: loc('statsRegion'),
    statsRegionValue: loc('statsRegionValue'),

    introEyebrow: loc('introEyebrow'),
    introTitle: loc('introTitle'),
    introLinkLabel: loc('introLink'),
    introCards: [
      card('intro1Title', 'intro1Body'),
      card('intro2Title', 'intro2Body'),
      card('intro3Title', 'intro3Body'),
    ],

    featuredEyebrow: loc('featuredEyebrow'),
    featuredTitle: loc('featuredTitle'),
    featuredLead: locT('featuredLead'),
    featuredAllLabel: loc('featuredAll'),

    soldTeaserEyebrow: loc('soldTeaserEyebrow'),
    soldTeaserTitle: loc('soldTeaserTitle'),
    soldTeaserLead: locT('soldTeaserLead'),
    soldTeaserCta: loc('soldTeaserCta'),
  },

  {
    _id: 'vehiclesPage',
    _type: 'vehiclesPage',
    title: loc('vehiclesTitle'),
    lead: locT('vehiclesLead'),
    empty: locT('vehiclesEmpty'),
    emptyCta: loc('vehiclesEmptyCta'),
  },

  {
    _id: 'soldPage',
    _type: 'soldPage',
    title: loc('soldTitle'),
    lead: locT('soldLead'),
    note: locT('soldNote'),
    cta: loc('soldCta'),
  },

  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: loc('aboutTitle'),
    lead: loc('aboutLead'),
    paragraphs: [
      paragraph('aboutP1', 'aboutP1'),
      paragraph('aboutP2', 'aboutP2'),
      paragraph('aboutP3', 'aboutP3'),
    ],
    valuesTitle: loc('valuesTitle'),
    values: [
      card('v1Title', 'v1Body'),
      card('v2Title', 'v2Body'),
      card('v3Title', 'v3Body'),
    ],
  },

  {
    _id: 'sourcingPage',
    _type: 'sourcingPage',
    title: loc('sourcingTitle'),
    lead: locT('sourcingLead'),
    steps: [
      card('step1Title', 'step1Body'),
      card('step2Title', 'step2Body'),
      card('step3Title', 'step3Body'),
      card('step4Title', 'step4Body'),
    ],
    formTitle: loc('sourcingFormTitle'),
    formLead: locT('sourcingFormLead'),
  },

  {
    _id: 'contactPage',
    _type: 'contactPage',
    title: loc('contactTitle'),
    lead: locT('contactLead'),
    availabilityValue: loc('availabilityValue'),
    availabilityNote: locT('availabilityNote'),
    appointmentTitle: loc('appointmentTitle'),
    appointmentBody: locT('appointmentBody'),
    formTitle: loc('contactFormTitle'),
  },
];

/* ---------------------------------------------------------- Output -------- */

mkdirSync(resolve(__dirname), { recursive: true });
const out = resolve(__dirname, 'seed.ndjson');
writeFileSync(out, documents.map((d) => JSON.stringify(d)).join('\n') + '\n', 'utf8');
console.log(`✓ ${documents.length} Dokumente in ${out} geschrieben`);
console.log('  Import: npm run sanity:seed:apply  (nach `npx sanity login`)');
