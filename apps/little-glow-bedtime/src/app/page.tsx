import Link from "next/link";
import { TipJar } from "@/components/TipJar";
import { UnlockCTA } from "@/components/UnlockCTA";
import { SmileMoon } from "@/components/SmileMoon";
import { APP_NAME, AUTHOR, stories } from "@/lib/content";

export default function HomePage() {
  const freeChapters = stories.reduce(
    (n, s) => n + s.chapters.filter((c) => c.preview).length,
    0
  );
  const freeSongs = stories.reduce(
    (n, s) => n + s.songs.filter((song) => song.preview).length,
    0
  );
  const storyCount = stories.length;

  return (
    <div className="space-y-6">
      <section className="glow-hero overflow-hidden rounded-3xl border border-glow-gold/25 bg-night-900/70 text-center shadow-glow">
        <div className="relative aspect-[4/5] w-full bg-[#0B1F4A]">
          <SmileMoon className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-950/95 via-night-950/40 to-transparent p-5">
            <h1 className="text-3xl font-bold tracking-tight text-glow-gold drop-shadow">
              {APP_NAME}
            </h1>
            <p className="mt-1 text-sm text-moon-200/90">
              Cozy stories by {AUTHOR}
            </p>
          </div>
        </div>
        <p className="px-6 py-4 text-base text-moon-200">
          Bedtime with firefly{" "}
          <strong className="text-glow-soft">Pip</strong>, fairy{" "}
          <strong className="text-glow-soft">Lilah & Friends</strong>, honeybee{" "}
          <strong className="text-glow-soft">Buzz</strong>,{" "}
          <strong className="text-glow-soft">Banana Boy</strong>, and a trip to{" "}
          <strong className="text-glow-soft">Mars</strong>.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/story"
          className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-5 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-4xl">📖</span>
          <span className="mt-2 text-lg font-semibold text-glow-gold">Story</span>
          <span className="mt-1 text-sm text-moon-200/65">
            {storyCount} stories
          </span>
        </Link>
        <Link
          href="/songs"
          className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-5 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-4xl">🎵</span>
          <span className="mt-2 text-lg font-semibold text-glow-gold">Songs</span>
          <span className="mt-1 text-sm text-moon-200/65">Soft lullabies</span>
        </Link>
        <Link
          href="/timer"
          className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-5 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-4xl">⏱</span>
          <span className="mt-2 text-lg font-semibold text-glow-gold">Timer</span>
          <span className="mt-1 text-sm text-moon-200/65">Sleep countdown</span>
        </Link>
        <Link
          href="/favorites"
          className="flex min-h-32 flex-col items-center justify-center rounded-3xl border border-white/10 bg-night-800/80 p-5 text-center transition hover:border-glow-gold/40"
        >
          <span className="text-4xl">💛</span>
          <span className="mt-2 text-lg font-semibold text-glow-gold">Saved</span>
          <span className="mt-1 text-sm text-moon-200/65">Your favorites</span>
        </Link>
      </section>

      <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5">
        <h2 className="text-lg font-semibold text-glow-gold">Free tonight</h2>
        <ul className="mt-3 space-y-2 text-base text-moon-200/90">
          <li>• Story start + timer + saved list</li>
          <li>
            • {freeChapters} free chapter{freeChapters === 1 ? "" : "s"}
          </li>
          <li>
            • {freeSongs} free song{freeSongs === 1 ? "" : "s"}
          </li>
          <li>• No ads · No subscription</li>
        </ul>
      </section>

      <UnlockCTA />

      <section className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-night-900/40 p-5 text-center">
        <p className="text-base text-moon-200/80">Like this little glow?</p>
        <TipJar />
      </section>

      <footer className="space-y-2 pb-4 text-center text-sm text-moon-200/55">
        <Link href="/behind-the-story" className="text-glow-gold/80 underline">
          Behind the story → movie path
        </Link>
        <p>Made with a little glow ✨</p>
      </footer>
    </div>
  );
}
