import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'acs',
  title: 'Auto Center Seeland',
  projectId: 'm7gc2yj5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
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
            ...S.documentTypeListItems().filter(
              (item) => !['vehicle', 'sold'].includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
