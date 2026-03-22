"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Locale } from "./i18n";

import enDict from "@/dictionaries/en.json";
import plDict from "@/dictionaries/pl.json";

const dictionaries = { en: enDict, pl: plDict } as const;

type Dictionary = typeof enDict;

interface LangContextValue {
  lang: Locale;
  dict: Dictionary;
  switchLang: (locale: Locale) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({
  initialLang,
  initialDict,
  children,
}: {
  initialLang: Locale;
  initialDict: Dictionary;
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const [dict, setDict] = useState<Dictionary>(initialDict);

  const switchLang = useCallback((locale: Locale) => {
    setLang(locale);
    setDict(dictionaries[locale]);
    // Update URL without reload
    const path = locale === "en" ? "/" : "/pl";
    window.history.pushState(null, "", path);
    // Update html lang attribute
    document.documentElement.lang = locale;
  }, []);

  return (
    <LangContext.Provider value={{ lang, dict, switchLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
