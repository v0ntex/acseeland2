import { localeString } from './localeString';
import { localeText } from './localeText';
import { localeStringArray } from './localeStringArray';
import { vehicle } from './vehicle';
import { sold } from './sold';
import { siteSettings } from './siteSettings';
import { homePage } from './homePage';
import { vehiclesPage } from './vehiclesPage';
import { soldPage } from './soldPage';
import { aboutPage } from './aboutPage';
import { sourcingPage } from './sourcingPage';
import { contactPage } from './contactPage';
import { legalPage } from './legalPage';

export const schemaTypes = [
  // Basis-Typen
  localeString,
  localeText,
  localeStringArray,
  // Dokumente
  vehicle,
  sold,
  siteSettings,
  homePage,
  vehiclesPage,
  soldPage,
  aboutPage,
  sourcingPage,
  contactPage,
  legalPage,
];
