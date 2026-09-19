export type { Chapter, Song, Story } from "./content-types";
export {
  APP_NAME,
  AUTHOR,
  UNLOCK_PRICE,
  HIVE_NIGHTS_PRICE,
  HIVE_NIGHTS_PACK,
  STORY_TITLE,
} from "./content-types";

import type { Chapter, Song } from "./content-types";
import { moonStory } from "./content-moon";
import { honeybeeStory } from "./content-honeybee";
import { bananaStory } from "./content-banana";
import { marsStory } from "./content-mars";

export const stories = [moonStory, honeybeeStory, bananaStory, marsStory];

/** Moon story chapters — backward-compatible default for older routes */
export const chapters: Chapter[] = stories[0].chapters;

/** All songs across stories */
export const songs: Song[] = stories.flatMap((s) => s.songs);

export function getStory(id: string) {
  return stories.find((s) => s.id === id);
}

export function getChapter(id: string) {
  for (const story of stories) {
    const chapter = story.chapters.find((c) => c.id === id);
    if (chapter) return chapter;
  }
  return undefined;
}

export function getStoryForChapter(chapterId: string) {
  return stories.find((s) => s.chapters.some((c) => c.id === chapterId));
}

export function getSong(id: string) {
  return songs.find((s) => s.id === id);
}

export function getStoryForSong(songId: string) {
  return stories.find((s) => s.songs.some((song) => song.id === songId));
}

export function canAccessChapter(chapter: Chapter, unlocked: boolean) {
  return unlocked || chapter.preview;
}

export function canAccessSong(song: Song, unlocked: boolean) {
  return unlocked || song.preview;
}
