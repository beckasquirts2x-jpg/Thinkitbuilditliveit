"use client";

import Link from "next/link";
import { SongCover } from "@/components/SongCover";
import { UnlockCTA } from "@/components/UnlockCTA";
import { useApp } from "@/components/AppProviders";
import { getSongArt } from "@/lib/art";
import { stories, canAccessSong } from "@/lib/content";

export default function SongsIndexPage() {
  const { unlocked, unlockReady } = useApp();
  const totalSongs = stories.reduce((n, s) => n + s.songs.length, 0);

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-moon-200/60">Lullabies</p>
        <h1 className="text-2xl font-bold text-glow-gold">Bedtime Songs</h1>
        <p className="mt-2 text-base text-moon-200/80">
          {totalSongs} gentle songs across the stories that have them. Tap one
          for lyrics.
        </p>
      </header>

      {!unlocked && unlockReady && <UnlockCTA />}

      {stories
        .filter((story) => story.songs.length > 0)
        .map((story) => (
          <section key={story.id} className="space-y-3">
            <h2 className="text-sm font-semibold text-glow-gold/90">
              {story.emoji} {story.title}
            </h2>
            <ul className="space-y-3">
              {story.songs.map((song) => {
                const open = !unlockReady || canAccessSong(song, unlocked);
                const cover = getSongArt(song.id);
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
                      {cover ? (
                        <SongCover
                          src={cover}
                          alt=""
                          thumb
                          locked={!open}
                        />
                      ) : (
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-glow-gold/15 text-lg">
                          {open ? "🎵" : "🔒"}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-moon-200">
                          {song.number}. {song.title}
                        </p>
                        <p className="truncate text-xs text-moon-200/55">
                          {song.preview
                            ? "Free · "
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
