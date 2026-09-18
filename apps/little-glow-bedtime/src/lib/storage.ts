const UNLOCK_KEY = "little-glow-unlocked";
const FAVORITES_KEY = "little-glow-favorites";

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
