import { createContext, useContext, ReactNode } from "react";
import { Locale, defaultLocale } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
}

const LocaleContext = createContext<LocaleContextValue>({ locale: defaultLocale });

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}
