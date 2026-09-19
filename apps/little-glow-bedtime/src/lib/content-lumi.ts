import type { Story } from "./content-types";
import { lumiChapters } from "./content-lumi-chapters";
import { lumiSongs } from "./content-lumi-songs";

export const lumiStory: Story = {
  id: "lilah-and-friends",
  title: "Lilah & Friends",
  logline:
    "Fairy Lilah, Foxy, Benny, Squirrel, Ollie, and Rocky make the forest brighter with kind hearts and small adventures.",
  cast: ["Lilah", "Foxy", "Benny", "Squirrel", "Ollie", "Rocky"],
  lesson: "Kindness makes the biggest magic.",
  directorNote:
    "Pronounced LIE-la · Lilah’s own story — not part of Pip’s moon adventure · Red-and-white hair, sparkle dress, forest lights.",
  packName: "Kind Hearts",
  packPrice: "$1.99",
  emoji: "🧚‍♀️",
  videoUrl: "/videos/lilah-and-friends.mp4",
  chapters: lumiChapters,
  songs: lumiSongs,
};
