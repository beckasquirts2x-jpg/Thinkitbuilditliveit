const UNLOCK_KEY = "little-glow-unlocked";
const FAVORITES_KEY = "little-glow-favorites";
const AUTO_ADVANCE_KEY = "little-glow-auto-advance";
const SLEEPY_FONT_KEY = "little-glow-sleepy-font";
const SLEEP_TIMER_END_KEY = "little-glow-sleep-timer-end";
const THEME_KEY = "little-glow-theme";
const VOICE_KEY = "little-glow-voice";
const REQUESTS_KEY = "little-glow-chapter-requests";

export type FavoriteItem = {
  type: "chapter" | "song";
  id: string;
};

export type ChapterRequestItem = {
  storyId: string;
  storyTitle: string;
  idea: string;
  createdAt: number;
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function getUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(UNLOCK_KEY) === "true";
}

export function setUnlocked(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(UNLOCK_KEY, value ? "true" : "false");
}

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<FavoriteItem[]>(localStorage.getItem(FAVORITES_KEY), []);
}

export function setFavorites(items: FavoriteItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

export function toggleFavorite(type: "chapter" | "song", id: string): FavoriteItem[] {
  const current = getFavorites();
  const exists = current.some((f) => f.type === type && f.id === id);
  const next = exists
    ? current.filter((f) => !(f.type === type && f.id === id))
    : [...current, { type, id }];
  setFavorites(next);
  return next;
}

export function isFavorite(type: "chapter" | "song", id: string): boolean {
  return getFavorites().some((f) => f.type === type && f.id === id);
}

export function getAutoAdvance(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTO_ADVANCE_KEY) === "true";
}

export function setAutoAdvance(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTO_ADVANCE_KEY, value ? "true" : "false");
}

export function getSleepyFont(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SLEEPY_FONT_KEY) === "true";
}

export function setSleepyFont(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SLEEPY_FONT_KEY, value ? "true" : "false");
}

export function getThemeId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(THEME_KEY);
}

export function setThemeId(value: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, value);
}

export function getVoiceURI(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(VOICE_KEY) ?? "";
}

export function setVoiceURI(value: string): void {
  if (typeof window === "undefined") return;
  if (!value) localStorage.removeItem(VOICE_KEY);
  else localStorage.setItem(VOICE_KEY, value);
}

export function getChapterRequests(): ChapterRequestItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<ChapterRequestItem[]>(localStorage.getItem(REQUESTS_KEY), []);
}

export function addChapterRequest(item: ChapterRequestItem): ChapterRequestItem[] {
  const next = [...getChapterRequests(), item].slice(-40);
  if (typeof window !== "undefined") {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(next));
  }
  return next;
}

export function getSleepTimerEnd(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SLEEP_TIMER_END_KEY);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function setSleepTimerEnd(endMs: number | null): void {
  if (typeof window === "undefined") return;
  if (endMs == null) {
    localStorage.removeItem(SLEEP_TIMER_END_KEY);
  } else {
    localStorage.setItem(SLEEP_TIMER_END_KEY, String(endMs));
  }
}
