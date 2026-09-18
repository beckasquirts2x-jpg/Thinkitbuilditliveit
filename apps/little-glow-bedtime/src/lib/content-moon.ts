import type { Story } from "./content-types";
import { moonChapters } from "./content-moon-chapters";
import { moonSongs } from "./content-moon-songs";

export const moonStory: Story = {
  id: "moon-forgot",
  title: "The Moon Forgot Its Glow",
  logline:
    "Tiny firefly Pip helps dark moon Luma remember how to shine.",
  cast: ["Pip", "Rook", "Luma", "Owl", "Sun", "Phob", "Deim"],
  lesson: "Even a little light, if you share it, can fill a whole night.",
  directorNote:
    "Ages 4–8 · Keep Luma dark until the finale · Small lights can fill a whole night.",
  emoji: "🌙",
  chapters: moonChapters,
  songs: moonSongs,
};
