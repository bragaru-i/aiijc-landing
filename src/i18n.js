import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';

import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';

export const ENABLE_LOCALES =
  process.env.NODE_ENV === 'development' ||
  document?.getElementById('root')?.dataset?.localisation === 'True';

export const LANGUAGE_COOKIE_NAME = 'CurrentLang';

// the translations
const resources = {
  en: {
    MainPage: translationEN,
  },
  ru: {
    MainPage: translationRU,
  },
};

export const LANGUAGES = Object.entries(resources).map(([lang, _]) => lang);

export const getLngFromUrl = pathname => {
  for (let lang of LANGUAGES) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return lang;
    }
  }
  return null;
};

export const removeLngPrefix = pathname => {
  for (let lang of LANGUAGES) {
    if (pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`) {
      return pathname.replace(`/${lang}`, '');
    }
  }
  return pathname;
};

let lng =
  getLngFromUrl(window.location.pathname) || Cookies.get(LANGUAGE_COOKIE_NAME);

if (!LANGUAGES.some(l => l === lng)) {
  lng = 'ru';
}

Cookies.set(LANGUAGE_COOKIE_NAME, lng);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['MainPage'],
    defaultNS: 'MainPage',
    resources: resources,
    lng,
  });

export default i18n;
