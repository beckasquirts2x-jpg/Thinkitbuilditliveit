const UNLOCK_KEY = "little-glow-unlocked";
const FAVORITES_KEY = "little-glow-favorites";
const AUTO_ADVANCE_KEY = "little-glow-auto-advance";
const SLEEPY_FONT_KEY = "little-glow-sleepy-font";
const SLEEP_TIMER_END_KEY = "little-glow-sleep-timer-end";

export type FavoriteItem = {
  type: "chapter" | "song";
  id: string;
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

/** Absolute end timestamp (ms) for sleep timer persistence */
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
