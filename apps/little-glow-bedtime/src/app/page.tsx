import Image from "next/image";
import Link from "next/link";
import { TipJar } from "@/components/TipJar";
import { UnlockCTA } from "@/components/UnlockCTA";
import { HOME_HERO } from "@/lib/art";
import { APP_NAME, AUTHOR, stories, songs } from "@/lib/content";

export default function HomePage() {
  const freeSongs = songs.filter((s) => s.preview).length;
  const freeChapters = stories.reduce(
    (n, s) => n + s.chapters.filter((c) => c.preview).length,
    0
  );
  const storyCount = stories.length;

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-glow-gold/25 bg-night-900/70 text-center shadow-glow">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={HOME_HERO}
            alt="Pip and friends as the moon’s glow returns"
            fill
            priority
            sizes="(max-width: 512px) 100vw, 512px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h1 className="text-3xl font-bold tracking-tight text-glow-gold drop-shadow">
              {APP_NAME}
            </h1>
            <p className="mt-1 text-sm text-moon-200/90">
              Cozy bedtime stories & lullabies by {AUTHOR}
            </p>
          </div>
        </div>
        <p className="px-6 py-4 text-base text-moon-200">
          Two bedtime adventures: firefly{" "}
          <strong className="text-glow-soft">Pip</strong> helping moon{" "}
          <strong className="text-glow-soft">Luma</strong>, and honeybee{" "}
          <strong className="text-glow-soft">Buzz</strong> learning a soft alarm
          for the hive.
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
            {storyCount} stories
          </span>
        </Link>
        <Link
          href="/songs"
          className="flex min-h-28 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-4 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-3xl">🎵</span>
          <span className="mt-2 font-semibold text-glow-gold">Songs</span>
          <span className="mt-1 text-xs text-moon-200/60">
            {songs.length} lullabies
          </span>
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
