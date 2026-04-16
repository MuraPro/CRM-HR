// sort-imports-ignore
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

//* Locale RU
import commonTranslationRU from "./locales/ru/common.json";
import authTranslationRU from "./locales/ru/auth.json";
import validationTranslationRU from "./locales/ru/validation.json";
//* Locale UZ
import commonTranslationUZ from "./locales/uz/common.json";
import authTranslationUZ from "./locales/uz/auth.json";
import validationTranslationUZ from "./locales/uz/validation.json";

export const resources = {
  ru: {
    common: commonTranslationRU,
    auth: authTranslationRU,
    validation: validationTranslationRU,
  },

  uz: {
    common: commonTranslationUZ,
    auth: authTranslationUZ,
    validation: validationTranslationUZ,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "ru",
    defaultNS: "common",
    supportedLngs: ["ru", "uz"],
    ns: Object.keys(resources.ru),
    resources,
  });

export default i18n;
