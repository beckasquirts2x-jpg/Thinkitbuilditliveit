"use client";

import Link from "next/link";
import { ChapterHero } from "@/components/ChapterHero";
import { UnlockCTA } from "@/components/UnlockCTA";
import { useApp } from "@/components/AppProviders";
import { getChapterArt } from "@/lib/art";
import { STORY_TITLE, AUTHOR, chapters, canAccessChapter } from "@/lib/content";

export default function StoryIndexPage() {
  const { unlocked, unlockReady } = useApp();

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm text-moon-200/60">Bedtime story</p>
        <h1 className="text-2xl font-bold text-glow-gold">{STORY_TITLE}</h1>
        <p className="mt-1 text-sm text-moon-200/70">By {AUTHOR}</p>
        <p className="mt-3 text-sm text-moon-200/80">
          Ages 4–8 · Keep Luma dark until the finale · Small lights can fill a
          whole night.
        </p>
      </header>

      {!unlocked && unlockReady && <UnlockCTA />}

      <ol className="space-y-3">
        {chapters.map((chapter) => {
          const open = !unlockReady || canAccessChapter(chapter, unlocked);
          const art = getChapterArt(chapter.id);
          return (
            <li key={chapter.id}>
              <Link
                href={`/story/${chapter.id}`}
                className={`flex min-h-16 items-center gap-3 rounded-3xl border px-4 py-3 transition ${
                  open
                    ? "border-white/10 bg-night-800/70 hover:border-glow-gold/40"
                    : "border-white/5 bg-night-900/50 opacity-80"
                }`}
              >
                {art ? (
                  <ChapterHero
                    src={art}
                    alt=""
                    thumb
                    locked={!open}
                  />
                ) : (
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-glow-gold/15 text-sm font-bold text-glow-gold">
                    {open ? chapter.number : "🔒"}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-moon-200">{chapter.title}</p>
                  <p className="text-xs text-moon-200/55">
                    {chapter.preview
                      ? "Free sample"
                      : open
                        ? "Unlocked"
                        : "Unlock Full Glow"}
                  </p>
                </div>
                <span className="text-glow-gold/70" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
