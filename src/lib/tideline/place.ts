import type { Locale } from "@/lib/i18n/messages";

export type PlaceScope = "country" | "region";

export type Place = {
  country: string;
  region: string;
  scope: PlaceScope;
};

export type CountryDef = {
  name: string;
  region: string;
  locale: Locale;
  lat: number;
  lng: number;
};

export const REGIONS = [
  "Europe",
  "Americas",
  "Asia-Pacific",
  "Middle East",
  "Africa",
] as const;

export const COUNTRIES: CountryDef[] = [
  { name: "Israel", region: "Middle East", locale: "he", lat: 31.47, lng: 34.85 },
  { name: "Cyprus", region: "Europe", locale: "en", lat: 35.07, lng: 33.22 },
  { name: "Egypt", region: "Middle East", locale: "en", lat: 27.2, lng: 33.8 },
  { name: "Turkey", region: "Europe", locale: "en", lat: 39.0, lng: 35.0 },
  { name: "United Kingdom", region: "Europe", locale: "en", lat: 52.5, lng: -1.5 },
  { name: "Ireland", region: "Europe", locale: "en", lat: 53.4, lng: -8.0 },
  { name: "France", region: "Europe", locale: "en", lat: 46.6, lng: 2.5 },
  { name: "Spain", region: "Europe", locale: "en", lat: 40.4, lng: -3.7 },
  { name: "Portugal", region: "Europe", locale: "en", lat: 39.5, lng: -8.0 },
  { name: "Italy", region: "Europe", locale: "en", lat: 42.5, lng: 12.5 },
  { name: "Croatia", region: "Europe", locale: "en", lat: 45.1, lng: 15.2 },
  { name: "Greece", region: "Europe", locale: "en", lat: 39.0, lng: 22.0 },
  { name: "Switzerland", region: "Europe", locale: "en", lat: 47.0, lng: 8.2 },
  { name: "Germany", region: "Europe", locale: "en", lat: 51.2, lng: 10.4 },
  { name: "United States", region: "Americas", locale: "en", lat: 39.8, lng: -98.5 },
  { name: "Canada", region: "Americas", locale: "en", lat: 56.1, lng: -106.3 },
  { name: "Mexico", region: "Americas", locale: "en", lat: 23.6, lng: -102.5 },
  { name: "Brazil", region: "Americas", locale: "en", lat: -14.2, lng: -51.9 },
  { name: "Australia", region: "Asia-Pacific", locale: "en", lat: -25.3, lng: 133.8 },
  { name: "New Zealand", region: "Asia-Pacific", locale: "en", lat: -41.0, lng: 174.0 },
  { name: "Japan", region: "Asia-Pacific", locale: "en", lat: 36.2, lng: 138.3 },
  { name: "South Africa", region: "Africa", locale: "en", lat: -30.6, lng: 22.9 },
];

export function countryDef(name: string): CountryDef | undefined {
  return COUNTRIES.find((c) => c.name === name);
}

export function localeForCountry(name: string): Locale {
  return countryDef(name)?.locale ?? "en";
}

export function slugify(input: string): string {
  const s = input
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  if (s && s !== "new") return s;
  const rand = Math.random().toString(36).slice(2, 8);
  return `crew-${Date.now().toString(36)}${rand}`;
}

export function isWhatsappUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.replace(/^www\./, "");
    return (
      host === "chat.whatsapp.com" ||
      host === "wa.me" ||
      host === "api.whatsapp.com" ||
      host === "whatsapp.com"
    );
  } catch {
    return false;
  }
}

export type PlaceFilter = { country?: string; region?: string };

export function filterFromPlace(place: Place | null): PlaceFilter {
  if (!place) return {};
  if (place.scope === "region") return { region: place.region };
  return { country: place.country };
}
