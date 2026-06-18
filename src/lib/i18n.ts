import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "@/locales/ar.json";
import en from "@/locales/en.json";
import servicePagesAr from "@/locales/servicePages-ar.json";
import servicePagesEn from "@/locales/servicePages-en.json";

export const supportedLocales = ["en", "ar"] as const;
export type Locale = (typeof supportedLocales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function isRtlLocale(locale: string) {
  return locale === "ar";
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { ...en, ...servicePagesEn } },
    ar: { translation: { ...ar, ...servicePagesAr } },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
