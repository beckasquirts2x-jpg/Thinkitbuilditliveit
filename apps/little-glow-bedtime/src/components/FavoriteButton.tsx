"use client";

import { useApp } from "./AppProviders";

export function FavoriteButton({
  type,
  id,
}: {
  type: "chapter" | "song";
  id: string;
}) {
  const { isFavorite, toggleFavorite, favoritesReady } = useApp();
  const on = favoritesReady && isFavorite(type, id);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(type, id)}
      aria-pressed={on}
      aria-label={on ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-2xl border text-lg transition ${
        on
          ? "border-glow-gold bg-glow-gold/20 text-glow-gold"
          : "border-white/10 bg-white/5 text-moon-200/70 hover:border-glow-gold/40"
      }`}
    >
      {on ? "💛" : "🤍"}
    </button>
  );
}
