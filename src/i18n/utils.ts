import { ui, defaultLang, routes, vehiclePath, type Lang, type UIKey, type RouteKey } from './ui';

/* Re-exported so components can import everything they need from one module. */
export { vehiclePath };
export type { Lang, UIKey, RouteKey };

/** Derive the language from the current URL. /en/... => 'en', everything else => 'de' */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : defaultLang;
}

/**
 * Translate a key for a language.
 * Pass `vars` to fill {placeholders}, e.g. t('hero.eyebrow', { year: 2002 }).
 * Keeping values out of the strings means facts like the founding year live
 * in exactly one place (src/data/site.ts) and cannot drift apart.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    let out = ui[lang][key] ?? ui[defaultLang][key] ?? key;
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        out = out.split(`{${name}}`).join(String(value));
      }
    }
    return out;
  };
}

/** Build a localised path for a named route. */
export function localePath(lang: Lang) {
  return (key: RouteKey): string => routes[key][lang];
}

/** Given the current path, return the equivalent path in the other language. */
export function alternatePath(url: URL, lang: Lang): string {
  const path = url.pathname;
  const other: Lang = lang === 'de' ? 'en' : 'de';

  // Named routes map one-to-one.
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (path === routes[key][lang]) return routes[key][other];
  }
  // Vehicle detail pages: /fahrzeuge/<id>/ <-> /en/vehicles/<id>/
  const de = path.match(/^\/fahrzeuge\/([^/]+)\/?$/);
  if (de) return `/en/vehicles/${de[1]}/`;
  const en = path.match(/^\/en\/vehicles\/([^/]+)\/?$/);
  if (en) return `/fahrzeuge/${en[1]}/`;

  return routes.home[other];
}

/* --- Formatting ---------------------------------------------------------- */

/** Swiss number format: 164’900 (apostrophe as thousands separator). */
export function formatNumber(n: number): string {
  return n.toLocaleString('de-CH').replace(/’|'/g, '’');
}

export function formatPrice(price: number | null, lang: Lang): string {
  if (price === null) return ui[lang]['spec.price.request'];
  return `CHF ${formatNumber(price)}`;
}

export function formatKm(km: number): string {
  return `${formatNumber(km)} km`;
}
