import type { Story } from "./content-types";
import { HIVE_NIGHTS_PACK, HIVE_NIGHTS_PRICE } from "./content-types";
import { honeybeeChapters } from "./content-honeybee-chapters";
import { honeybeeSongs } from "./content-honeybee-songs";

export const honeybeeStory: Story = {
  id: "honeybee-soft-alarm",
  title: "Honeybee's Soft Alarm",
  logline:
    "Buzz, a young honeybee who only knows loud, learns a lullaby buzz so the hive can sleep before dawn work.",
  cast: [
    "Buzz",
    "Queen Amber",
    "Nurse Nia",
    "Drone Drowsy",
    "Night Crickets",
    "Sol the sunflower",
  ],
  lesson:
    "Different times need different volumes. Soft isn't small — soft is kind.",
  packName: HIVE_NIGHTS_PACK,
  packPrice: HIVE_NIGHTS_PRICE,
  emoji: "🐝",
  chapters: honeybeeChapters,
  songs: honeybeeSongs,
};
