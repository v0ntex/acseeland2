import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

const projectId = process.env.SANITY_PROJECT_ID ?? 'm7gc2yj5';
const dataset = process.env.SANITY_DATASET ?? 'production';

export default defineConfig({
  // CHANGE THIS to your real domain before going live (used for sitemap + og:url).
  site: 'https://www.autocenterseeland.ch',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },
  image: { responsiveStyles: true },
  output: 'static',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      // false = immer frische Daten. Beim Vercel-Build ist das billig,
      // im Dev sieht man Studio-Aenderungen sofort nach Reload.
      useCdn: false,
      studioBasePath: '/studio',
    }),
    react(),
  ],
});
