"use client";

import Link from "next/link";
import { UnlockCTA } from "@/components/UnlockCTA";
import { useApp } from "@/components/AppProviders";
import { AUTHOR, HIVE_NIGHTS_PACK, HIVE_NIGHTS_PRICE, stories } from "@/lib/content";

export default function StoryPickerPage() {
  const { unlocked, unlockReady } = useApp();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-moon-200/60">Bedtime stories</p>
        <h1 className="text-2xl font-bold text-glow-gold">Choose a story</h1>
        <p className="mt-2 text-base text-moon-200/80">
          Cozy nights by {AUTHOR}. Chapter 1 of each story is free to try.
        </p>
      </header>

      {!unlocked && unlockReady && <UnlockCTA />}

      <ul className="space-y-3">
        {stories.map((story) => {
          const freeCh = story.chapters.filter((c) => c.preview).length;
          return (
            <li key={story.id}>
              <Link
                href={`/story/${story.id}`}
                className="flex min-h-24 gap-3 rounded-3xl border border-white/10 bg-night-800/70 p-4 transition hover:border-glow-gold/40"
              >
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-glow-gold/15 text-3xl"
                  aria-hidden
                >
                  {story.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-glow-gold">{story.title}</p>
                  <p className="mt-1 text-sm text-moon-200/80">{story.logline}</p>
                  <p className="mt-2 text-xs text-moon-200/55">
                    {story.chapters.length} chapters · {story.songs.length} songs
                    · {freeCh} free sample
                    {story.packName
                      ? ` · or ${story.packName} ${story.packPrice ?? HIVE_NIGHTS_PRICE}`
                      : ""}
                  </p>
                </div>
                <span className="self-center text-glow-gold/70" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="text-center text-xs text-moon-200/45">
        Full Glow unlocks all stories. {HIVE_NIGHTS_PACK} ({HIVE_NIGHTS_PRICE})
        is a suggested Honeybee pack for later Stripe — not wired yet.
      </p>
    </div>
  );
}
