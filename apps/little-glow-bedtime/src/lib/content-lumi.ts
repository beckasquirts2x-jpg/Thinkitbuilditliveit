import type { Story } from "./content-types";
import { lumiChapters } from "./content-lumi-chapters";
import { lumiSongs } from "./content-lumi-songs";

export const lumiStory: Story = {
  id: "lumi-and-friends",
  title: "Lumi & Friends",
  logline:
    "Fairy Lumi, Foxy, Benny, Squirrel, and Ollie make the forest brighter with kind hearts and small adventures.",
  cast: ["Lumi", "Foxy", "Benny", "Squirrel", "Ollie", "Raccoon", "Fireflies"],
  lesson: "Kindness makes the biggest magic.",
  directorNote:
    "From the Lumi & Friends banner · Keep it gentle · Red-and-white hair, sparkle dress, forest lights.",
  packName: "Kind Hearts",
  packPrice: "$1.99",
  emoji: "🧚‍♀️",
  chapters: lumiChapters,
  songs: lumiSongs,
};
