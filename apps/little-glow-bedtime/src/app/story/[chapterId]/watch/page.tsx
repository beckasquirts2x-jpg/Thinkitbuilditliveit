"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getStory } from "@/lib/content";

export default function StoryWatchPage() {
  const params = useParams();
  const slug = String(params.chapterId ?? "");
  const story = getStory(slug);

  if (!story?.videoUrl) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-glow-gold">No video for this story yet.</p>
        <Link href="/story" className="text-moon-200 underline">
          Back to stories
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link href={`/story/${story.id}`} className="text-sm text-glow-gold/80">
        ← {story.title}
      </Link>
      <header>
        <p className="text-xs uppercase tracking-wide text-moon-200/50">
          Read-along video
        </p>
        <h1 className="text-2xl font-bold text-glow-gold">{story.title}</h1>
        <p className="mt-1 text-sm text-moon-200/70">{story.lesson}</p>
      </header>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-night-950">
        <video
          className="aspect-video w-full bg-black"
          controls
          playsInline
          preload="metadata"
          poster={undefined}
        >
          <source src={story.videoUrl} type="video/mp4" />
          Your browser can’t play this video.
        </video>
      </div>
      <p className="text-center text-xs text-moon-200/50">
        Or read chapter by chapter instead.
      </p>
      <Link
        href={`/story/${story.id}`}
        className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-night-800/70 text-sm text-moon-200"
      >
        Read the book →
      </Link>
    </div>
  );
}
