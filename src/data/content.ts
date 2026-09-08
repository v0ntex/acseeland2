/* ============================================================================
   CONTENT-LOADER — Sanity als Quelle, mit Fallbacks aus i18n/ui.ts
   ----------------------------------------------------------------------------
   Für jede Seite gibt es einen Fetcher, der bereits übersetzten Content für
   eine Sprache zurückgibt. Fehlt im Studio noch ein Wert, greift der Fallback
   aus i18n — die Site zeigt also sofort sinnvolle Texte, auch mit leerem
   Sanity-Dataset.
   ========================================================================== */

import { sanityClient } from 'sanity:client';
import { ui, defaultLang, type Lang } from '../i18n/ui';

type Loc = { de?: string | null; en?: string | null } | null | undefined;
type LocPara = { de?: string | null; en?: string | null };

const pick = (loc: Loc, fallback: string, lang: Lang): string => {
  const raw = loc?.[lang] ?? loc?.de ?? loc?.en ?? '';
  return raw && raw.trim().length > 0 ? raw : fallback;
};

function tpl(t: string, vars: Record<string, string | number>): string {
  let out = t;
  for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}

const uiOf =
  (lang: Lang) =>
  (key: keyof (typeof ui)['de'], vars?: Record<string, string | number>): string => {
    const raw = ui[lang][key] ?? ui[defaultLang][key] ?? '';
    return vars ? tpl(raw, vars) : raw;
  };

/* ------------------------------------------------------------------ Site --- */

type Office = {
  label: string;
  street: string;
  zip: string;
  city: string;
  country: string;
  mapsQuery: string;
};

export type SiteData = {
  legalName: string;
  shortName: string;
  uid: string;
  founded: number;
  vehiclesSold: number | null;
  phone: string;
  phoneHref: string;
  whatsapp: string | null;
  email: string;
  offices: Office[];
  social: {
    instagram: string | null;
    instagramHandle: string;
    facebook: string | null;
  };
};

const SITE_FALLBACK: SiteData = {
  legalName: 'Auto Center Seeland AG',
  shortName: 'ACS',
  uid: 'CHE-238.687.038',
  founded: 2002,
  vehiclesSold: 5000,
  phone: '+41 79 363 99 99',
  phoneHref: '+41793639999',
  whatsapp: '+41793639999',
  email: 'info@autocenterseeland.ch',
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
  social: {
    instagram: 'https://www.instagram.com/acseeland/',
    instagramHandle: '@acseeland',
    facebook: null,
  },
};

/* Cache nur im Build (Produktion). Im Dev-Server wuerde ein Modul-Level Cache
   Studio-Aenderungen bis zum Server-Neustart verstecken. */
const CACHE_ENABLED = import.meta.env.PROD;
let __siteCache: SiteData | null = null;
export async function getSite(): Promise<SiteData> {
  if (CACHE_ENABLED && __siteCache) return __siteCache;
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`)
    .catch(() => null);
  if (!raw) {
    __siteCache = SITE_FALLBACK;
    return __siteCache;
  }
  const s = raw as Partial<SiteData> & {
    offices?: Partial<Office>[];
    instagram?: string;
    instagramHandle?: string;
    facebook?: string;
  };
  const offices: Office[] =
    s.offices && s.offices.length
      ? s.offices.map((o) => ({
          label: o.label ?? '',
          street: o.street ?? '',
          zip: o.zip ?? '',
          city: o.city ?? '',
          country: o.country ?? 'Schweiz',
          mapsQuery:
            o.mapsQuery ?? [o.street, `${o.zip ?? ''} ${o.city ?? ''}`.trim(), o.country ?? 'Schweiz'].filter(Boolean).join(', '),
        }))
      : SITE_FALLBACK.offices;
  __siteCache = {
    legalName: s.legalName ?? SITE_FALLBACK.legalName,
    shortName: s.shortName ?? SITE_FALLBACK.shortName,
    uid: s.uid ?? SITE_FALLBACK.uid,
    founded: s.founded ?? SITE_FALLBACK.founded,
    vehiclesSold: s.vehiclesSold ?? SITE_FALLBACK.vehiclesSold,
    phone: s.phone ?? SITE_FALLBACK.phone,
    phoneHref: s.phoneHref ?? SITE_FALLBACK.phoneHref,
    whatsapp: s.whatsapp ?? SITE_FALLBACK.whatsapp,
    email: s.email ?? SITE_FALLBACK.email,
    offices,
    social: {
      instagram: s.instagram ?? SITE_FALLBACK.social.instagram,
      instagramHandle: s.instagramHandle ?? SITE_FALLBACK.social.instagramHandle,
      facebook: s.facebook ?? SITE_FALLBACK.social.facebook,
    },
  };
  return __siteCache;
}

/* ---------------------------------------------------------------- Home ----- */

export type HomeContent = {
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    title3: string;
    lead: string;
    cta: string;
    cta2: string;
  };
  stats: {
    yearsLabel: string;
    soldLabel: string;
    viewingLabel: string;
    viewingValue: string;
    regionLabel: string;
    regionValue: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    linkLabel: string;
    cards: { title: string; body: string }[];
  };
  featured: { eyebrow: string; title: string; lead: string; allLabel: string };
  soldTeaser: { eyebrow: string; title: string; lead: string; cta: string };
  meta: { tagline: string; title: string; description: string };
};

export async function getHomeContent(lang: Lang, site?: SiteData): Promise<HomeContent> {
  const s = site ?? (await getSite());
  const t = uiOf(lang);
  const raw = await sanityClient
    .fetch<Record<string, unknown> | null>(`*[_id == "homePage"][0]`)
    .catch(() => null);
  const d = (raw ?? {}) as Record<string, unknown>;

  const cards = (d.introCards as { title?: Loc; body?: Loc }[] | undefined) ?? [];

  return {
    hero: {
      eyebrow: pick(d.heroEyebrow as Loc, t('hero.eyebrow', { year: s.founded }), lang),
      title1: pick(d.heroTitle1 as Loc, t('hero.title.1'), lang),
      title2: pick(d.heroTitle2 as Loc, t('hero.title.2'), lang),
      title3: pick(d.heroTitle3 as Loc, t('hero.title.3'), lang),
      lead: pick(d.heroLead as Loc, t('hero.lead'), lang),
      cta: pick(d.heroCta as Loc, t('hero.cta'), lang),
      cta2: pick(d.heroCta2 as Loc, t('hero.cta2'), lang),
    },
    stats: {
      yearsLabel: pick(d.statsYearsLabel as Loc, t('stats.years'), lang),
      soldLabel: pick(d.statsSoldLabel as Loc, t('stats.sold'), lang),
      viewingLabel: pick(d.statsViewingLabel as Loc, t('stats.viewing'), lang),
      viewingValue: pick(d.statsViewingValue as Loc, t('stats.viewingValue'), lang),
      regionLabel: pick(d.statsRegionLabel as Loc, t('stats.region'), lang),
      regionValue: pick(d.statsRegionValue as Loc, t('stats.regionValue'), lang),
    },
    intro: {
      eyebrow: pick(d.introEyebrow as Loc, t('intro.eyebrow'), lang),
      title: pick(d.introTitle as Loc, t('intro.title'), lang),
      linkLabel: pick(d.introLinkLabel as Loc, t('intro.link'), lang),
      cards:
        cards.length === 3
          ? cards.map((c, i) => ({
              title: pick(c.title, t(`intro.${i + 1}.title` as never), lang),
              body: pick(c.body, t(`intro.${i + 1}.body` as never), lang),
            }))
          : [1, 2, 3].map((i) => ({
              title: t(`intro.${i}.title` as never),
              body: t(`intro.${i}.body` as never),
            })),
    },
    featured: {
      eyebrow: pick(d.featuredEyebrow as Loc, t('featured.eyebrow'), lang),
      title: pick(d.featuredTitle as Loc, t('featured.title'), lang),
      lead: pick(d.featuredLead as Loc, t('featured.lead'), lang),
      allLabel: pick(d.featuredAllLabel as Loc, t('featured.all'), lang),
    },
    soldTeaser: {
      eyebrow: pick(d.soldTeaserEyebrow as Loc, t('soldTeaser.eyebrow'), lang),
      title: pick(d.soldTeaserTitle as Loc, t('soldTeaser.title'), lang),
      lead: pick(d.soldTeaserLead as Loc, t('soldTeaser.lead'), lang),
      cta: pick(d.soldTeaserCta as Loc, t('soldTeaser.cta'), lang),
    },
    meta: {
      tagline: pick(d.metaTagline as Loc, t('meta.tagline'), lang),
      title: pick(d.metaTitle as Loc, t('meta.home.title'), lang),
      description: pick(d.metaDescription as Loc, t('meta.home.desc'), lang),
    },
  };
}

/* ------------------------------------------------------------- Vehicles ---- */

export type VehiclesPageContent = {
  title: string;
  lead: string;
  empty: string;
  emptyCta: string;
};

export async function getVehiclesPageContent(lang: Lang): Promise<VehiclesPageContent> {
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == "vehiclesPage"][0]`)
      .catch(() => null)) ?? {};
  return {
    title: pick(d.title as Loc, t('vehicles.title'), lang),
    lead: pick(d.lead as Loc, t('vehicles.lead'), lang),
    empty: pick(d.empty as Loc, t('vehicles.empty'), lang),
    emptyCta: pick(d.emptyCta as Loc, t('vehicles.emptyCta'), lang),
  };
}

/* ---------------------------------------------------------------- Sold ----- */

export type SoldPageContent = { title: string; lead: string; note: string; cta: string };

export async function getSoldPageContent(lang: Lang): Promise<SoldPageContent> {
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == "soldPage"][0]`)
      .catch(() => null)) ?? {};
  return {
    title: pick(d.title as Loc, t('sold.title'), lang),
    lead: pick(d.lead as Loc, t('sold.lead'), lang),
    note: pick(d.note as Loc, t('sold.note'), lang),
    cta: pick(d.cta as Loc, t('sold.cta'), lang),
  };
}

/* --------------------------------------------------------------- About ----- */

export type AboutPageContent = {
  title: string;
  lead: string;
  paragraphs: string[];
  valuesTitle: string;
  values: { title: string; body: string }[];
};

export async function getAboutPageContent(lang: Lang, site?: SiteData): Promise<AboutPageContent> {
  const s = site ?? (await getSite());
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == "aboutPage"][0]`)
      .catch(() => null)) ?? {};
  const rawPars = (d.paragraphs as LocPara[] | undefined) ?? [];
  const values = (d.values as { title?: Loc; body?: Loc }[] | undefined) ?? [];

  const withYear = (raw: string) => tpl(raw, { year: s.founded });

  return {
    title: pick(d.title as Loc, t('about.title'), lang),
    lead: withYear(pick(d.lead as Loc, t('about.lead', { year: s.founded }), lang)),
    paragraphs:
      rawPars.length > 0
        ? rawPars.map((p, i) =>
            withYear(pick(p as Loc, t(`about.p${i + 1}` as never, { year: s.founded }), lang)),
          )
        : [1, 2, 3].map((i) => withYear(t(`about.p${i}` as never, { year: s.founded }))),
    valuesTitle: pick(d.valuesTitle as Loc, t('about.values.title'), lang),
    values:
      values.length === 3
        ? values.map((v, i) => ({
            title: pick(v.title, t(`about.v${i + 1}.title` as never), lang),
            body: pick(v.body, t(`about.v${i + 1}.body` as never), lang),
          }))
        : [1, 2, 3].map((i) => ({
            title: t(`about.v${i}.title` as never),
            body: t(`about.v${i}.body` as never),
          })),
  };
}

/* -------------------------------------------------------------- Sourcing --- */

export type SourcingPageContent = {
  title: string;
  lead: string;
  steps: { title: string; body: string }[];
  formTitle: string;
  formLead: string;
};

export async function getSourcingPageContent(lang: Lang): Promise<SourcingPageContent> {
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == "sourcingPage"][0]`)
      .catch(() => null)) ?? {};
  const rawSteps = (d.steps as { title?: Loc; body?: Loc }[] | undefined) ?? [];
  return {
    title: pick(d.title as Loc, t('sourcing.title'), lang),
    lead: pick(d.lead as Loc, t('sourcing.lead'), lang),
    steps:
      rawSteps.length === 4
        ? rawSteps.map((s, i) => ({
            title: pick(s.title, t(`sourcing.step${i + 1}.title` as never), lang),
            body: pick(s.body, t(`sourcing.step${i + 1}.body` as never), lang),
          }))
        : [1, 2, 3, 4].map((i) => ({
            title: t(`sourcing.step${i}.title` as never),
            body: t(`sourcing.step${i}.body` as never),
          })),
    formTitle: pick(d.formTitle as Loc, t('sourcing.formTitle'), lang),
    formLead: pick(d.formLead as Loc, t('sourcing.formLead'), lang),
  };
}

/* --------------------------------------------------------------- Contact --- */

export type ContactPageContent = {
  title: string;
  lead: string;
  availabilityValue: string;
  availabilityNote: string;
  appointmentTitle: string;
  appointmentBody: string;
  formTitle: string;
};

export async function getContactPageContent(lang: Lang): Promise<ContactPageContent> {
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == "contactPage"][0]`)
      .catch(() => null)) ?? {};
  return {
    title: pick(d.title as Loc, t('contact.title'), lang),
    lead: pick(d.lead as Loc, t('contact.lead'), lang),
    availabilityValue: pick(d.availabilityValue as Loc, t('contact.availabilityValue'), lang),
    availabilityNote: pick(d.availabilityNote as Loc, t('contact.availabilityNote'), lang),
    appointmentTitle: pick(d.appointmentTitle as Loc, t('contact.appointmentTitle'), lang),
    appointmentBody: pick(d.appointmentBody as Loc, t('contact.appointmentBody'), lang),
    formTitle: pick(d.formTitle as Loc, t('contact.formTitle'), lang),
  };
}

/* ----------------------------------------------------------------- Legal --- */

export type PortableTextBlock = Record<string, unknown>;

export type LegalContent = {
  title: string;
  body: PortableTextBlock[];
};

export async function getLegalContent(
  kind: 'imprint' | 'privacy',
  lang: Lang,
): Promise<LegalContent> {
  const t = uiOf(lang);
  const d =
    (await sanityClient
      .fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, { id: kind })
      .catch(() => null)) ?? {};
  const bodyField = lang === 'en' ? 'bodyEn' : 'bodyDe';
  const body =
    (d[bodyField] as PortableTextBlock[] | undefined) ??
    (d[lang === 'en' ? 'bodyDe' : 'bodyEn'] as PortableTextBlock[] | undefined) ??
    [];
  return {
    title: pick(d.title as Loc, t(kind === 'imprint' ? 'imprint.title' : 'privacy.title'), lang),
    body,
  };
}
