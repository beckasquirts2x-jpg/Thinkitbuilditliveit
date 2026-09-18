"use client";

import { useApp } from "./AppProviders";

/** Auto-advance + sleepy font toggles for chapter/song reading. */
export function ReadingControls() {
  const {
    autoAdvance,
    sleepyFont,
    prefsReady,
    toggleAutoAdvance,
    toggleSleepyFont,
  } = useApp();

  if (!prefsReady) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={toggleSleepyFont}
        className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium transition ${
          sleepyFont
            ? "border-glow-gold/50 bg-glow-gold/15 text-glow-gold"
            : "border-white/10 bg-night-800/60 text-moon-200/80"
        }`}
        aria-pressed={sleepyFont}
      >
        <span aria-hidden>🔤</span>
        {sleepyFont ? "Big sleepy text on" : "Big sleepy text"}
      </button>
      <button
        type="button"
        onClick={toggleAutoAdvance}
        className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium transition ${
          autoAdvance
            ? "border-glow-gold/50 bg-glow-gold/15 text-glow-gold"
            : "border-white/10 bg-night-800/60 text-moon-200/80"
        }`}
        aria-pressed={autoAdvance}
      >
        <span aria-hidden>⏭</span>
        {autoAdvance ? "Auto next on" : "Auto next"}
      </button>
    </div>
  );
}
