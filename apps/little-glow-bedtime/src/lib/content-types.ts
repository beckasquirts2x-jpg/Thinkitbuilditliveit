export type Chapter = {
  id: string;
  number: number;
  title: string;
  preview: boolean; // free sample when true
  body: string[];
};

export type Song = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  preview: boolean; // free sample when true
  lyrics: string[];
  placement: string;
};

export type Story = {
  id: string;
  title: string;
  logline: string;
  cast: string[];
  lesson: string;
  /** Story-specific art/direction note shown on chapter list (Moon only for Luma-dark). */
  directorNote?: string;
  /** Suggested pack price label for this story (Stripe later). */
  packName?: string;
  packPrice?: string;
  emoji: string;
  chapters: Chapter[];
  songs: Song[];
  /** Optional read-along video under /public */
  videoUrl?: string;
};

export const APP_NAME = "Little Glow Bedtime";
export const AUTHOR = "Hattie Watson";
export const UNLOCK_PRICE = "$3.99";
/** Suggested Honeybee story-pack price (UI copy only — no Stripe keys). */
export const HIVE_NIGHTS_PRICE = "$1.99";
export const HIVE_NIGHTS_PACK = "Hive Nights";

/** @deprecated Prefer stories[0].title — kept for older imports */
export const STORY_TITLE = "The Moon Forgot Its Glow";
