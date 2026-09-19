import type { Story } from "./content-types";
import { lumiChapters } from "./content-lumi-chapters";
import { lumiSongs } from "./content-lumi-songs";

export const lumiStory: Story = {
  id: "lilah-and-friends",
  title: "Lilah & Friends",
  logline:
    "Fairy Lilah — red-and-white hair, green eyes, white sparkle dress, red shoes — sings to a forest of rainbow animals while a soft red glow trails behind her flight.",
  cast: [
    "Lilah",
    "Fireflies",
    "Rainbow rabbits",
    "White owls",
    "Mice",
    "Raccoons",
    "Foxes",
    "Bears",
  ],
  lesson: "Every color belongs in the listening circle.",
  directorNote:
    "LIE-la · Solid white dress + pink sparkles · Red sparkling shoes · Red smoke-glow trail when flying · Animals all different colors, owls stay white.",
  packName: "Kind Hearts",
  packPrice: "$1.99",
  emoji: "🧚‍♀️",
  videoUrl: "/videos/lilah-and-friends.mp4",
  chapters: lumiChapters,
  songs: lumiSongs,
};
