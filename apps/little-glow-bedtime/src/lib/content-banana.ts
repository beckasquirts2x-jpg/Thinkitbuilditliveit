import type { Story } from "./content-types";
import { bananaChapters } from "./content-banana-chapters";
import { bananaSongs } from "./content-banana-songs";

export const bananaStory: Story = {
  id: "banana-boy",
  title: "Banana Boy Adventures",
  logline:
    "Benny the Banana Boy and friends defend Giggle Jungle with giggles, teamwork, and peel-powered kindness.",
  cast: [
    "Benny / Banana Boy",
    "Purple Monkey Squad",
    "Grog",
    "Duke Durian",
    "Captain Coco",
  ],
  lesson:
    "When life gets hard as a coconut, crack it open with kindness — softness and shells can be friends.",
  packName: "Jungle Peels",
  packPrice: "$1.99",
  emoji: "🍌",
  chapters: bananaChapters,
  songs: bananaSongs,
};
