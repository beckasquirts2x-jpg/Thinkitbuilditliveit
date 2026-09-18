"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ChapterHero } from "@/components/ChapterHero";
import { FavoriteButton } from "@/components/FavoriteButton";
import { LockedPreview } from "@/components/LockedPreview";
import { PipTriesGallery } from "@/components/PipTriesGallery";
import { ReadingControls } from "@/components/ReadingControls";
import { StoryChapterList } from "@/components/StoryChapterList";
import { useApp } from "@/components/AppProviders";
import { useWakeLock } from "@/hooks/useWakeLock";
import { getChapterArt } from "@/lib/art";
import {
  getChapter,
  getStory,
  getStoryForChapter,
  canAccessChapter,
  type Chapter,
  type Story,
} from "@/lib/content";

function ChapterReader({
  chapter,
  parentStory,
}: {
  chapter: Chapter;
  parentStory: Story;
}) {
  const router = useRouter();
  const { unlocked, unlockReady, autoAdvance } = useApp();
  const art = getChapterArt(chapter.id);
  const open = !unlockReady || canAccessChapter(chapter, unlocked);
  const storyChapters = parentStory.chapters;
  const idx = storyChapters.findIndex((c) => c.id === chapter.id);
  const prev = idx > 0 ? storyChapters[idx - 1] : null;
  const next = idx < storyChapters.length - 1 ? storyChapters[idx + 1] : null;
  const backHref = `/story/${parentStory.id}`;
  const nextHref = next ? `/story/${next.id}` : "/songs";

  useWakeLock(open);

  useEffect(() => {
    if (!open || !autoAdvance || !next) return;
    const t = window.setTimeout(() => {
      router.push(`/story/${next.id}`);
    }, 45000);
    return () => window.clearTimeout(t);
  }, [open, autoAdvance, next, router, chapter.id]);

  if (!open) {
    return (
      <div className="space-y-4">
        <Link href={backHref} className="text-sm text-glow-gold/80">
          ← All chapters
        </Link>
        <h1 className="text-2xl font-bold text-glow-gold">
          Chapter {chapter.number}: {chapter.title}
        </h1>
        {art && (
          <ChapterHero
            src={art}
            alt={`Illustration for ${chapter.title}`}
            locked
          />
        )}
        <LockedPreview kind="chapter" />
      </div>
    );
  }

  return (
    <article className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link href={backHref} className="text-sm text-glow-gold/80">
            ← {parentStory.title}
          </Link>
          <p className="mt-2 text-xs uppercase tracking-wide text-moon-200/50">
            Chapter {chapter.number}
          </p>
          <h1 className="text-2xl font-bold text-glow-gold">{chapter.title}</h1>
        </div>
        <FavoriteButton type="chapter" id={chapter.id} />
      </div>

      {art && (
        <ChapterHero src={art} alt={`Illustration for ${chapter.title}`} />
      )}

      <ReadingControls />

      <div className="prose-bedtime rounded-3xl border border-white/10 bg-night-900/60 p-5 text-moon-200">
        {chapter.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {chapter.id === "pip-tries" && <PipTriesGallery />}

      <AudioPlayer
        id={chapter.id}
        title={`${chapter.title} narration`}
        kind="story"
        speakText={chapter.body.join(" ")}
      />

      <nav className="flex flex-col gap-3">
        <Link
          href={nextHref}
          className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-glow-gold px-4 text-base font-semibold text-night-950 shadow-glow glow-accent"
        >
          {next ? "Keep reading →" : "Songs →"}
        </Link>
        <div className="flex gap-3">
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
              className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-glow-gold/30 bg-glow-gold/10 px-3 text-sm font-medium text-glow-gold"
            >
              Ch. {next.number} →
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </div>
      </nav>
    </article>
  );
}

export default function StoryOrChapterPage() {
  const params = useParams();
  const slug = String(params.chapterId ?? "");
  const storyById = getStory(slug);

  if (storyById) {
    return <StoryChapterList story={storyById} />;
  }

  const chapter = getChapter(slug);
  const parentStory = chapter ? getStoryForChapter(chapter.id) : undefined;

  if (!chapter || !parentStory) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-glow-gold">Chapter not found.</p>
        <Link href="/story" className="text-moon-200 underline">
          Back to stories
        </Link>
      </div>
    );
  }

  return <ChapterReader chapter={chapter} parentStory={parentStory} />;
}
