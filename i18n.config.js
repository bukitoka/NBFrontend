import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files
import translationEN from "./src/locales/en/translation";
import translationIDN from "./src/locales/idn/translation";

export const Initi18n = () => {

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  idn: {
    translation: translationIDN,
  },
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: true,
    },
  });

  const loadLocale = async () => {
    const code  = await localStorage.getItem('language')
    await i18n.changeLanguage(code ?? 'en')
  }

  loadLocale()
}
