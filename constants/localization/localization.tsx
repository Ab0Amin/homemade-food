import React, { useState, useEffect, createContext, useContext } from "react";
import { I18nManager } from "react-native";
import { en } from "./en";
import { ar } from "./ar";
import type { TranslationKey } from "./en";

export type Language = "en" | "ar";

interface LocalizationContextType {
  language: Language;
  translations: TranslationKey;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const translations = {
  en,
  ar,
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

// Helper function to get nested translation
const getNestedTranslation = (obj: any, path: string): string => {
  return path.split(".").reduce((current, key) => current?.[key], obj) || path;
};

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("ar");

  const configureRTL = (lang: Language) => {
    const isRTL = lang === "ar";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    configureRTL(lang);
  };

  const t = (key: string): string => {
    return getNestedTranslation(translations[language], key);
  };

  const value: LocalizationContextType = {
    language,
    translations: translations[language],
    setLanguage,
    isRTL: language === "ar",
    t,
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return context;
};

// Convenience hook for just getting the translation function
export const useTranslation = () => {
  const { t } = useLocalization();
  return t;
};
