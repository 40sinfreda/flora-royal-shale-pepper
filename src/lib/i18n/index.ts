import { dictionaries, type Locale, type MessageKey } from "./messages";

export type { Locale, MessageKey };

export function t(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let s = dictionaries[locale][key] || dictionaries.en[key] || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}

export function countryLabel(locale: Locale, name: string): string {
  const key = `country.${name}` as MessageKey;
  if (key in dictionaries[locale]) return t(locale, key);
  return name;
}

export function regionLabel(locale: Locale, name: string): string {
  const key = `region.${name}` as MessageKey;
  if (key in dictionaries[locale]) return t(locale, key);
  return name;
}
