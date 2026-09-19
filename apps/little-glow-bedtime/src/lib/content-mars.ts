import type { Story } from "./content-types";
import { marsChapters } from "./content-mars-chapters";
import { marsSongs } from "./content-mars-songs";

export const marsStory: Story = {
  id: "pip-flies-to-mars",
  title: "Pip Flies to Mars",
  logline:
    "Tiny firefly Pip follows star crumbs from the forest to the red dust — and never gives up her glow.",
  cast: ["Pip", "Rook", "Luma", "Phob", "Deim", "Owl", "Rabbit"],
  lesson: "Far is just a lot of close places in a row. Take your glow with you.",
  directorNote: "New story · Ages 4–8 · Keep the flight gentle. Mars is sleepy, not scary.",
  packName: "Star Crumbs",
  packPrice: "$1.99",
  emoji: "🚀",
  chapters: marsChapters,
  songs: marsSongs,
};
