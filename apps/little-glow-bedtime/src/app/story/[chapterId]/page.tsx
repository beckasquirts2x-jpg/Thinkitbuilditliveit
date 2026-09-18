"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { AudioPlaceholder } from "@/components/AudioPlaceholder";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LockedPreview } from "@/components/LockedPreview";
import { useApp } from "@/components/AppProviders";
import {
  chapters,
  getChapter,
  canAccessChapter,
  STORY_TITLE,
} from "@/lib/content";

export default function ChapterPage() {
  const params = useParams();
  const chapterId = String(params.chapterId ?? "");
  const chapter = getChapter(chapterId);
  const { unlocked, unlockReady } = useApp();

  if (!chapter) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-glow-gold">Chapter not found.</p>
        <Link href="/story" className="text-moon-200 underline">
          Back to story
        </Link>
      </div>
    );
  }

  const open = !unlockReady || canAccessChapter(chapter, unlocked);
  const idx = chapters.findIndex((c) => c.id === chapter.id);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  if (!open) {
    return (
      <div className="space-y-4">
        <Link href="/story" className="text-sm text-glow-gold/80">
          ← All chapters
        </Link>
        <h1 className="text-2xl font-bold text-glow-gold">
          Chapter {chapter.number}: {chapter.title}
        </h1>
        <LockedPreview kind="chapter" />
      </div>
    );
  }

  return (
    <article className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href="/story" className="text-sm text-glow-gold/80">
            ← {STORY_TITLE}
          </Link>
          <p className="mt-2 text-xs uppercase tracking-wide text-moon-200/50">
            Chapter {chapter.number}
          </p>
          <h1 className="text-2xl font-bold text-glow-gold">{chapter.title}</h1>
        </div>
        <FavoriteButton type="chapter" id={chapter.id} />
      </div>

      <div className="prose-bedtime rounded-3xl border border-white/10 bg-night-900/60 p-5 text-moon-200">
        {chapter.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {unlocked && (
        <AudioPlaceholder title={`${chapter.title} narration`} />
      )}

      <nav className="flex gap-3">
        {prev ? (
          <Link
            href={`/story/${prev.id}`}
            className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-night-800/70 px-3 text-sm text-moon-200"
          >
            ← Ch. {prev.number}
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <Link
            href={`/story/${next.id}`}
            className="flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-glow-gold/90 px-3 text-sm font-semibold text-night-950"
          >
            Ch. {next.number} →
          </Link>
        ) : (
          <Link
            href="/songs"
            className="flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-glow-gold/90 px-3 text-sm font-semibold text-night-950"
          >
            Songs →
          </Link>
        )}
      </nav>
    </article>
  );
}
