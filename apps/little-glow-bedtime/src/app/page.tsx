import Link from "next/link";
import { TipJar } from "@/components/TipJar";
import { UnlockCTA } from "@/components/UnlockCTA";
import { APP_NAME, AUTHOR, STORY_TITLE, chapters, songs } from "@/lib/content";

export default function HomePage() {
  const freeSongs = songs.filter((s) => s.preview).length;
  const freeChapters = chapters.filter((c) => c.preview).length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-glow-gold/25 bg-night-900/70 p-6 text-center shadow-glow">
        <p className="text-5xl" aria-hidden>
          🌙✨
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-glow-gold">
          {APP_NAME}
        </h1>
        <p className="mt-2 text-sm text-moon-200/80">
          Cozy bedtime stories & lullabies by {AUTHOR}
        </p>
        <p className="mt-4 text-base text-moon-200">
          Follow tiny firefly <strong className="text-glow-soft">Pip</strong> as
          she helps dark moon <strong className="text-glow-soft">Luma</strong>{" "}
          remember how to shine.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/story"
          className="flex min-h-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-4 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-3xl">📖</span>
          <span className="mt-2 font-semibold text-glow-gold">Story</span>
          <span className="mt-1 text-xs text-moon-200/60">
            {STORY_TITLE}
          </span>
        </Link>
        <Link
          href="/songs"
          className="flex min-h-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-4 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-3xl">🎵</span>
          <span className="mt-2 font-semibold text-glow-gold">Songs</span>
          <span className="mt-1 text-xs text-moon-200/60">6 lullabies</span>
        </Link>
        <Link
          href="/timer"
          className="flex min-h-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-4 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-3xl">⏱</span>
          <span className="mt-2 font-semibold text-glow-gold">Sleep timer</span>
          <span className="mt-1 text-xs text-moon-200/60">5–30 min</span>
        </Link>
        <Link
          href="/favorites"
          className="flex min-h-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-4 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-3xl">💛</span>
          <span className="mt-2 font-semibold text-glow-gold">Favorites</span>
          <span className="mt-1 text-xs text-moon-200/60">Saved glow</span>
        </Link>
      </section>

      <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5">
        <h2 className="text-lg font-semibold text-glow-gold">Free tonight</h2>
        <ul className="mt-3 space-y-2 text-sm text-moon-200/85">
          <li>• Home, sleep timer & favorites</li>
          <li>
            • Story sample — first {freeChapters} chapter
            {freeChapters === 1 ? "" : "s"}
          </li>
          <li>
            • {freeSongs} song sample{freeSongs === 1 ? "" : "s"} with lyrics
          </li>
          <li>• Soft tip jar (optional cocoa)</li>
        </ul>
      </section>

      <UnlockCTA />

      <section className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-night-900/40 p-5 text-center">
        <p className="text-sm text-moon-200/70">
          Like this little glow? Tips help keep bedtime soft.
        </p>
        <TipJar />
      </section>
    </div>
  );
}
