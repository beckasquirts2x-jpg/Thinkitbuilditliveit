/** Chapter / home hero art under /public/art/ */

export const HOME_HERO = "/art/25-finale-glow-returns.png";

/** Primary hero illustration per chapter id */
export const chapterArt: Record<string, string> = {
  "night-went-gray": "/art/01-gray-night-pip.png",
  "rook-balloon-rocket": "/art/02-meet-rook.png",
  "cloud-maze": "/art/03-cloud-maze.png",
  "owl-shine": "/art/04-owl-sparkles.png",
  "dark-luma": "/art/05-dark-luma-meeting.png",
  "pip-tries": "/art/10-idea-star-sparks.png",
  "other-lights": "/art/17-pip-lantern.png",
  "ask-the-sun": "/art/23-pip-sun.png",
  "moons-of-mars": "/art/24-pip-mars-moons.png",
  "glow-comes-back": "/art/25-finale-glow-returns.png",
};

export function getChapterArt(chapterId: string): string | undefined {
  return chapterArt[chapterId];
}
