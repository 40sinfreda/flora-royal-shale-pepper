export const MARKS = ["crest", "pace", "lane", "ring", "horizon", "cut"] as const;
export type MarkId = (typeof MARKS)[number];

export function isMark(value: unknown): value is MarkId {
  return MARKS.includes(value as MarkId);
}
