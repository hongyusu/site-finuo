// Path helpers shared by server and client components. Kept separate from
// seo.js so client components don't pull the whole i18n payload in.
export const LANGS = ['zh', 'en', 'fi'];
export const DEFAULT_LANG = 'zh';

/** Chinese keeps the bare paths it is already indexed under; others are prefixed. */
export function localizedPath(lang, path = '/') {
  const clean = path === '/' ? '' : path;
  if (lang === DEFAULT_LANG) return clean || '/';
  return `/${lang}${clean}`;
}

/** Strip a language prefix from a pathname, returning [lang, barePath]. */
export function splitLangPath(pathname = '/') {
  const m = pathname.match(/^\/(en|fi)(\/.*)?$/);
  if (m) return [m[1], m[2] || '/'];
  return [DEFAULT_LANG, pathname || '/'];
}
