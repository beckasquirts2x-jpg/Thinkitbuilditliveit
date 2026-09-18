"use client";

export function AudioPlaceholder({ title }: { title: string }) {
  return (
    <button
      type="button"
      disabled
      title="Audio coming soon"
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-glow-gold/40 bg-night-900/60 px-4 py-3 text-sm text-glow-gold/80"
    >
      <span aria-hidden>🎧</span>
      Add Suno audio later
      <span className="sr-only">for {title}</span>
    </button>
  );
}
