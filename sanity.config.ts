import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

const SINGLETONS = [
  { id: 'siteSettings', type: 'siteSettings', title: 'Firma & Kontakt' },
  { id: 'homePage', type: 'homePage', title: 'Startseite' },
  { id: 'vehiclesPage', type: 'vehiclesPage', title: 'Fahrzeuge-Übersicht' },
  { id: 'soldPage', type: 'soldPage', title: 'Verkauft-Archiv' },
  { id: 'aboutPage', type: 'aboutPage', title: 'Über uns' },
  { id: 'sourcingPage', type: 'sourcingPage', title: 'Import & Beschaffung' },
  { id: 'contactPage', type: 'contactPage', title: 'Kontakt' },
] as const;

const LEGAL_DOCS = [
  { id: 'imprint', title: 'Impressum', kind: 'imprint' },
  { id: 'privacy', title: 'Datenschutz', kind: 'privacy' },
] as const;

const SINGLETON_TYPES = new Set([
  ...SINGLETONS.map((s) => s.type),
  'legalPage',
]);

export default defineConfig({
  name: 'acs',
  title: 'Auto Center Seeland',
  projectId: 'm7gc2yj5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Inhalte')
          .items([
            S.listItem()
              .title('Fahrzeuge im Bestand')
              .child(S.documentTypeList('vehicle').title('Fahrzeuge im Bestand')),
            S.listItem()
              .title('Verkaufte Fahrzeuge')
              .child(S.documentTypeList('sold').title('Verkaufte Fahrzeuge')),
            S.divider(),
            S.listItem()
              .title('Seiten')
              .child(
                S.list()
                  .title('Seiten')
                  .items(
                    SINGLETONS.map((s) =>
                      S.listItem()
                        .title(s.title)
                        .id(s.id)
                        .child(
                          S.document()
                            .schemaType(s.type)
                            .documentId(s.id)
                            .title(s.title),
                        ),
                    ),
                  ),
              ),
            S.listItem()
              .title('Rechtliche Seiten')
              .child(
                S.list()
                  .title('Rechtliche Seiten')
                  .items(
                    LEGAL_DOCS.map((d) =>
                      S.listItem()
                        .title(d.title)
                        .id(d.id)
                        .child(
                          S.document()
                            .schemaType('legalPage')
                            .documentId(d.id)
                            .title(d.title),
                        ),
                    ),
                  ),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Neue Dokumente von Singleton-Typen nicht per "+Neu" erstellen lassen
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && !['duplicate', 'delete'].includes(action))
        : actions,
  },
});
