/** Chapter / home hero / song cover art under /public/art/ */

export const HOME_HERO = "/art/25-finale-glow-returns.png";
export const OG_IMAGE = "/og-image.png";
export const FINALE_ART = "/art/25-finale-glow-returns.png";

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
  "coconut-crackdown": "/art/banana-coconut-crackdown.png",
  "pineapple-protocol": "/art/banana-pineapple-protocol.png",
  "blender-of-doom": "/art/banana-blender-of-doom.png",
  "space-peel": "/art/banana-space-peel.png",
  "grocery-gauntlet": "/art/banana-grocery-gauntlet.png",
};

/** Idea panels for the Pip Tries gallery (art 10–16) */
export type IdeaPanel = {
  src: string;
  label: string;
};

export const pipTriesPanels: IdeaPanel[] = [
  { src: "/art/10-idea-star-sparks.png", label: "Star sparks" },
  { src: "/art/11-idea-polish.png", label: "Polish" },
  { src: "/art/12-idea-firefly-choir.png", label: "Firefly choir" },
  { src: "/art/13-idea-glow-blanket.png", label: "Glow blanket" },
  { src: "/art/14-idea-lantern-bounce.png", label: "Lantern bounce" },
  { src: "/art/15-dark-luma-blanket.png", label: "Soft blanket" },
  { src: "/art/16-dark-luma-choir.png", label: "Choir light" },
];

/** Song cover art mapped to existing illustrations */
export const songArt: Record<string, string> = {
  "little-fireflys-song": "/art/01-gray-night-pip.png",
  "lumas-sad-song": "/art/06-dark-luma-tear.png",
  "when-the-fairy-gets-sad": "/art/08-sad-pip-alone.png",
  "stars-and-moon-carry-me": "/art/24-pip-mars-moons.png",
  "song-for-a-sad-moon": "/art/05-dark-luma-meeting.png",
  "things-that-glow": "/art/22-pip-stars.png",
  "buzz-loud": "/art/12-idea-firefly-choir.png",
  "petal-still": "/art/13-idea-glow-blanket.png",
  "soft-alarm-song": "/art/25-finale-glow-returns.png",
  "see-you-next-peel": "/art/banana-coconut-crackdown.png",
  "playtocol": "/art/banana-pineapple-protocol.png",
  "red-button-kindness": "/art/banana-blender-of-doom.png",
  "slippery-dance": "/art/banana-space-peel.png",
  "one-free-hug": "/art/banana-grocery-gauntlet.png",
};

/** Curated gallery for behind-the-story movie path */
export const behindTheStoryArt: { src: string; caption: string }[] = [
  { src: "/art/01-gray-night-pip.png", caption: "Opening — gray night, one small spark" },
  { src: "/art/02-meet-rook.png", caption: "Meet Rook — junkyard hope" },
  { src: "/art/05-dark-luma-meeting.png", caption: "Dark Luma — keep her dark until the end" },
  { src: "/art/10-idea-star-sparks.png", caption: "Fail montage — ideas that almost work" },
  { src: "/art/17-pip-lantern.png", caption: "Other lights — borrowed shine" },
  { src: "/art/23-pip-sun.png", caption: "Ask the Sun — daytime advice" },
  { src: "/art/24-pip-mars-moons.png", caption: "Moons of Mars — two small lights" },
  { src: "/art/25-finale-glow-returns.png", caption: "Finale — glow returns together" },
];

export function getChapterArt(chapterId: string): string | undefined {
  return chapterArt[chapterId];
}

export function getSongArt(songId: string): string | undefined {
  return songArt[songId];
}
