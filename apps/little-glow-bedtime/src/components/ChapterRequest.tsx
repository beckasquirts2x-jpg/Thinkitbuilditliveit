"use client";

import { FormEvent, useMemo, useState } from "react";
import { stories } from "@/lib/content";
import { addChapterRequest } from "@/lib/storage";

type Props = {
  defaultStoryId?: string;
};

export function ChapterRequest({ defaultStoryId }: Props) {
  const [storyId, setStoryId] = useState(defaultStoryId ?? stories[0]?.id ?? "");
  const [idea, setIdea] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const title = useMemo(
    () => stories.find((s) => s.id === storyId)?.title ?? "this book",
    [storyId]
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const note = idea.trim();
    if (!note || !storyId) return;
    setBusy(true);
    addChapterRequest({
      storyId,
      storyTitle: title,
      idea: note,
      createdAt: Date.now(),
    });
    try {
      await fetch("/api/chapter-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storyId, storyTitle: title, idea: note }),
      });
    } catch {
      /* saved on this device either way */
    }
    setIdea("");
    setSent(true);
    setBusy(false);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5">
      <h2 className="text-lg font-semibold text-glow-gold">Want more chapters?</h2>
      <p className="mt-1 text-sm text-moon-200/70">
        Pick a book and tell us what should happen next. Stays in the app — no
        email.
      </p>

      {sent ? (
        <p className="mt-4 rounded-2xl bg-glow-gold/15 px-4 py-3 text-sm text-glow-gold">
          Saved for {title}. Thank you — more glow coming.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <label className="block text-xs uppercase tracking-wide text-moon-200/50">
            Book
            <select
              value={storyId}
              onChange={(e) => {
                setStoryId(e.target.value);
                setSent(false);
              }}
              className="mt-1 min-h-12 w-full rounded-2xl border border-white/10 bg-night-800 px-3 text-sm text-moon-200"
            >
              {stories.map((story) => (
                <option key={story.id} value={story.id}>
                  {story.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs uppercase tracking-wide text-moon-200/50">
            What should happen next?
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              rows={3}
              maxLength={400}
              required
              placeholder="A new forest friend, a rainy night, a song…"
              className="mt-1 w-full rounded-2xl border border-white/10 bg-night-800 px-3 py-3 text-sm text-moon-200"
            />
          </label>
          <button
            type="submit"
            disabled={busy || !idea.trim()}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-glow-gold px-4 text-sm font-semibold text-night-950 disabled:opacity-50"
          >
            {busy ? "Saving…" : "Send chapter wish"}
          </button>
        </form>
      )}
    </section>
  );
}
