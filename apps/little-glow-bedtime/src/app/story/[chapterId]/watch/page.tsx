"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getChapterArt } from "@/lib/art";
import { getStory } from "@/lib/content";

export default function StoryWatchPage() {
  const params = useParams();
  const slug = String(params.chapterId ?? "");
  const story = getStory(slug);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fileReady, setFileReady] = useState(false);
  const [fileFailed, setFileFailed] = useState(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const pages = useMemo(() => {
    if (!story) return [];
    return story.chapters.map((ch) => ({
      id: ch.id,
      title: ch.title,
      text: ch.body.join(" "),
      art: getChapterArt(ch.id),
    }));
  }, [story]);

  const page = pages[idx];

  useEffect(() => {
    if (!story?.videoUrl) {
      setFileFailed(true);
      return;
    }
    let cancelled = false;
    fetch(story.videoUrl, { method: "HEAD", cache: "no-store" })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) setFileReady(true);
        else setFileFailed(true);
      })
      .catch(() => {
        if (!cancelled) setFileFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [story]);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speakPage = useCallback(
    (i: number) => {
      if (!pages[i] || typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }
      stopSpeech();
      const utter = new SpeechSynthesisUtterance(pages[i].text);
      utter.rate = 0.92;
      utter.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const voice =
        voices.find((v) => /samantha|karen|moira|fiona|female/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      if (voice) utter.voice = voice;
      utter.onend = () => {
        if (i < pages.length - 1) {
          setIdx(i + 1);
          speakPage(i + 1);
        } else {
          setPlaying(false);
        }
      };
      utter.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(utter);
    },
    [pages, stopSpeech]
  );

  useEffect(() => {
    return () => stopSpeech();
  }, [stopSpeech]);

  if (!story) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-glow-gold">Story not found.</p>
        <Link href="/story" className="text-moon-200 underline">
          Back to stories
        </Link>
      </div>
    );
  }

  const togglePlay = () => {
    if (playing) {
      stopSpeech();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    speakPage(idx);
  };

  return (
    <div className="space-y-4">
      <Link href={`/story/${story.id}`} className="text-sm text-glow-gold/80">
        ← {story.title}
      </Link>
      <header>
        <p className="text-xs uppercase tracking-wide text-moon-200/50">
          Read-along
        </p>
        <h1 className="text-2xl font-bold text-glow-gold">{story.title}</h1>
        <p className="mt-1 text-sm text-moon-200/70">{story.lesson}</p>
      </header>

      {fileReady && story.videoUrl && (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-night-950">
          <video
            ref={videoRef}
            className="aspect-video w-full bg-black"
            controls
            playsInline
            preload="metadata"
          >
            <source src={story.videoUrl} type="video/mp4" />
          </video>
        </div>
      )}

      {(fileFailed || !story.videoUrl) && page && (
        <div className="space-y-3">
          {page.art ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={page.art}
              alt={page.title}
              className="w-full rounded-3xl border border-white/10 object-cover"
            />
          ) : null}
          <div className="rounded-3xl border border-white/10 bg-night-900/60 p-4">
            <p className="text-xs uppercase tracking-wide text-moon-200/50">
              Page {idx + 1} of {pages.length}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-glow-gold">
              {page.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-moon-200">{page.text}</p>
          </div>
          <button
            type="button"
            onClick={togglePlay}
            className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-glow-gold text-base font-semibold text-night-950"
          >
            {playing ? "Pause read-along" : "Play read-along"}
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => {
                stopSpeech();
                setPlaying(false);
                setIdx((n) => Math.max(0, n - 1));
              }}
              className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-white/10 bg-night-800/70 text-sm text-moon-200 disabled:opacity-40"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={idx >= pages.length - 1}
              onClick={() => {
                stopSpeech();
                setPlaying(false);
                setIdx((n) => Math.min(pages.length - 1, n + 1));
              }}
              className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-glow-gold/30 bg-glow-gold/10 text-sm font-medium text-glow-gold disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <Link
        href={`/story/${story.id}`}
        className="flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-night-800/70 text-sm text-moon-200"
      >
        Read chapter by chapter →
      </Link>
    </div>
  );
}
