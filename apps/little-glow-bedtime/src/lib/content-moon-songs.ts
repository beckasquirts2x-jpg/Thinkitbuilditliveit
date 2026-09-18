import type { Song } from "./content-types";
import a from "./moon-songs-a.json";
import b from "./moon-songs-b.json";
export const moonSongs = [...a, ...b] as Song[];
