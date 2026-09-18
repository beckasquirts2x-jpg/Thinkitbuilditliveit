import type { Chapter } from "./content-types";
import a from "./moon-chapters-a.json";
import b from "./moon-chapters-b.json";
export const moonChapters = [...a, ...b] as Chapter[];
