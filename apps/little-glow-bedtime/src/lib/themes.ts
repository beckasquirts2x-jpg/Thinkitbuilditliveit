export type ThemeId =
  | "night"
  | "forest"
  | "plum"
  | "cocoa"
  | "rose"
  | "ink";

export type Theme = {
  id: ThemeId;
  label: string;
  swatch: string;
};

export const THEMES: Theme[] = [
  { id: "night", label: "Night sky", swatch: "#070b18" },
  { id: "forest", label: "Forest", swatch: "#07140d" },
  { id: "plum", label: "Plum dusk", swatch: "#140818" },
  { id: "cocoa", label: "Warm cocoa", swatch: "#160e08" },
  { id: "rose", label: "Rose glow", swatch: "#180810" },
  { id: "ink", label: "Ink black", swatch: "#050505" },
];

export const DEFAULT_THEME: ThemeId = "night";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}

export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = id;
}
