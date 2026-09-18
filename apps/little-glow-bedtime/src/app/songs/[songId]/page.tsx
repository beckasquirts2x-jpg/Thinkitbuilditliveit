"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AudioPlayer } from "@/components/AudioPlayer";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LockedPreview } from "@/components/LockedPreview";
import { ReadingControls } from "@/components/ReadingControls";
import { SongCover } from "@/components/SongCover";
import { useApp } from "@/components/AppProviders";
import { useWakeLock } from "@/hooks/useWakeLock";
import { getSongArt } from "@/lib/art";
import { getSong, canAccessSong } from "@/lib/content";

export default function SongPage() {
  const params = useParams();
  const songId = String(params.songId ?? "");
  const song = getSong(songId);
  const { unlocked, unlockReady } = useApp();
  const open = Boolean(song) && (!unlockReady || canAccessSong(song!, unlocked));
  const cover = song ? getSongArt(song.id) : undefined;

  useWakeLock(Boolean(song && open));

  if (!song) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-glow-gold">Song not found.</p>
        <Link href="/songs" className="text-moon-200 underline">
          Back to songs
        </Link>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="space-y-4">
        <Link href="/songs" className="text-sm text-glow-gold/80">
          ← All songs
        </Link>
        <h1 className="text-2xl font-bold text-glow-gold">{song.title}</h1>
        {cover && <SongCover src={cover} alt={song.title} locked />}
        <LockedPreview kind="song" />
      </div>
    );
  }

  return (
    <article className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/songs" className="text-sm text-glow-gold/80">
            ← Songs
          </Link>
          <p className="mt-2 text-xs uppercase tracking-wide text-moon-200/50">
            Song {song.number}
            {song.preview ? " · Free sample" : ""}
          </p>
          <h1 className="text-2xl font-bold text-glow-gold">{song.title}</h1>
          <p className="mt-1 text-sm text-moon-200/70">{song.subtitle}</p>
        </div>
        <FavoriteButton type="song" id={song.id} />
      </div>

      {cover && <SongCover src={cover} alt={`Cover for ${song.title}`} />}

      <ReadingControls />

      <AudioPlayer id={song.id} title={song.title} kind="song" />

      <div className="rounded-3xl border border-white/10 bg-night-900/60 p-5">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-glow-gold/70">
          Lyrics
        </p>
        <div className="space-y-1 text-moon-200">
          {song.lyrics.map((line, i) => {
            if (!line) return <div key={i} className="h-3" />;
            const isLabel =
              line === "Chorus" ||
              line === "Final chorus" ||
              (line.endsWith(":") &&
                (line.startsWith("Owl") ||
                  line.startsWith("Rabbit") ||
                  line.startsWith("Deer") ||
                  line.startsWith("Frog") ||
                  line.startsWith("All the")));
            return (
              <p
                key={i}
                className={
                  isLabel
                    ? "lyric-line chorus-label"
                    : "lyric-line text-base sm:text-lg"
                }
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-moon-200/50">Placement: {song.placement}</p>
    </article>
  );
}
