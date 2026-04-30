import type { Metadata } from "next";

const BASE = "https://xanael.es";
const LOCALES = ["es", "en", "fr", "it", "pt"] as const;

export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) {
    languages[l] = `${BASE}/${l}${path}`;
  }
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages,
  };
}
