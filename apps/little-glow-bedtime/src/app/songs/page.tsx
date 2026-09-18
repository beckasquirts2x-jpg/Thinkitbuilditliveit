"use client";

import Link from "next/link";
import { UnlockCTA } from "@/components/UnlockCTA";
import { useApp } from "@/components/AppProviders";
import { stories, canAccessSong } from "@/lib/content";

export default function SongsIndexPage() {
  const { unlocked, unlockReady } = useApp();
  const totalSongs = stories.reduce((n, s) => n + s.songs.length, 0);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-moon-200/60">Lullaby lyrics</p>
        <h1 className="text-2xl font-bold text-glow-gold">Bedtime Songs</h1>
        <p className="mt-2 text-sm text-moon-200/80">
          {totalSongs} gentle songs across both stories. Tap a song for lyrics.
          Audio slots say “Add Suno audio later.”
        </p>
      </header>

      {!unlocked && unlockReady && <UnlockCTA />}

      {stories.map((story) => (
        <section key={story.id} className="space-y-3">
          <h2 className="text-sm font-semibold text-glow-gold/90">
            {story.emoji} {story.title}
          </h2>
          <ul className="space-y-3">
            {story.songs.map((song) => {
              const open = !unlockReady || canAccessSong(song, unlocked);
              return (
                <li key={song.id}>
                  <Link
                    href={`/songs/${song.id}`}
                    className={`flex min-h-16 items-center gap-3 rounded-3xl border px-4 py-3 transition ${
                      open
                        ? "border-white/10 bg-night-800/70 hover:border-glow-gold/40"
                        : "border-white/5 bg-night-900/50 opacity-80"
                    }`}
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-glow-gold/15 text-lg">
                      {open ? "🎵" : "🔒"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-moon-200">
                        {song.number}. {song.title}
                      </p>
                      <p className="truncate text-xs text-moon-200/55">
                        {song.preview
                          ? "Free sample · "
                          : open
                            ? "Unlocked · "
                            : "Locked · "}
                        {song.subtitle}
                      </p>
                    </div>
                    <span className="text-glow-gold/70" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
