"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProviders";
import { getChapter, getSong } from "@/lib/content";

export default function FavoritesPage() {
  const { favorites, favoritesReady, toggleFavorite } = useApp();

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-glow-gold">Favorites</h1>
        <p className="mt-2 text-sm text-moon-200/75">
          Saved chapters and songs live in this browser (localStorage).
        </p>
      </header>

      {!favoritesReady ? (
        <p className="text-sm text-moon-200/60">Loading…</p>
      ) : favorites.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/15 bg-night-900/50 p-8 text-center">
          <p className="text-4xl" aria-hidden>
            💛
          </p>
          <p className="mt-3 text-moon-200/80">No favorites yet.</p>
          <p className="mt-1 text-sm text-moon-200/55">
            Tap the heart on a chapter or song to save it.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              href="/story"
              className="rounded-2xl bg-glow-gold/20 px-4 py-2 text-sm text-glow-gold"
            >
              Story
            </Link>
            <Link
              href="/songs"
              className="rounded-2xl bg-glow-gold/20 px-4 py-2 text-sm text-glow-gold"
            >
              Songs
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {favorites.map((fav) => {
            if (fav.type === "chapter") {
              const chapter = getChapter(fav.id);
              if (!chapter) return null;
              return (
                <li
                  key={`c-${fav.id}`}
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-night-800/70 px-4 py-3"
                >
                  <Link href={`/story/${chapter.id}`} className="min-w-0 flex-1">
                    <p className="text-xs text-moon-200/50">Chapter</p>
                    <p className="font-semibold text-moon-200">
                      {chapter.number}. {chapter.title}
                    </p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleFavorite("chapter", fav.id)}
                    className="min-h-11 min-w-11 rounded-2xl text-lg"
                    aria-label="Remove favorite"
                  >
                    💛
                  </button>
                </li>
              );
            }
            const song = getSong(fav.id);
            if (!song) return null;
            return (
              <li
                key={`s-${fav.id}`}
                className="flex items-center gap-3 rounded-3xl border border-white/10 bg-night-800/70 px-4 py-3"
              >
                <Link href={`/songs/${song.id}`} className="min-w-0 flex-1">
                  <p className="text-xs text-moon-200/50">Song</p>
                  <p className="font-semibold text-moon-200">
                    {song.number}. {song.title}
                  </p>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleFavorite("song", fav.id)}
                  className="min-h-11 min-w-11 rounded-2xl text-lg"
                  aria-label="Remove favorite"
                >
                  💛
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
