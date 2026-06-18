import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isRtlLocale, type Locale } from "@/lib/i18n";

export function useLocale() {
  const { i18n } = useTranslation();
  const locale = i18n.language as Locale;
  const rtl = isRtlLocale(locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [locale, rtl]);

  const setLocale = (next: Locale) => {
    void i18n.changeLanguage(next);
  };

  return { locale, rtl, setLocale };
}
