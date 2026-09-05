import { defineConfig } from 'astro/config';

export default defineConfig({
  // CHANGE THIS to your real domain before going live (used for sitemap + og:url).
  site: 'https://www.autocenterseeland.ch',
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: false },
  },
  image: { responsiveStyles: true },
});
