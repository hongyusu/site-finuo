import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh from './zh.json';
import fi from './fi.json';

export const LANGS = ['zh', 'en', 'fi'];
export const DEFAULT_LANG = 'zh';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  fi: { translation: fi },
};

// One instance per language rather than a single mutable singleton: pages are
// rendered per language during the build, and a shared instance whose `lng` is
// flipped mid-render leaks the wrong language into the wrong page.
const instances = {};

export function getI18n(lang = DEFAULT_LANG) {
  const lng = LANGS.includes(lang) ? lang : DEFAULT_LANG;
  if (!instances[lng]) {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      react: {
        // Render synchronously (no Suspense) so translated content is present during SSR.
        useSuspense: false,
      },
    });
    instances[lng] = instance;
  }
  return instances[lng];
}

// Default export keeps the dormant CRA entry point working.
export default getI18n(DEFAULT_LANG);
