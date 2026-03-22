export const defaultLocale = "en" as const;
export const locales = ["en", "pl"] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}
