"use client";

import { useApp } from "@/components/AppProviders";
import type { TimerMinutes } from "@/hooks/useSleepTimer";

const OPTIONS: TimerMinutes[] = [5, 10, 15, 30];

export default function TimerPage() {
  const {
    timerMinutes,
    timerLabel,
    remainingSec,
    sleepy,
    startTimer,
    clearTimer,
    dismissSleepy,
  } = useApp();

  const progress =
    timerMinutes && remainingSec > 0
      ? remainingSec / (timerMinutes * 60)
      : 0;

  return (
    <div className="space-y-6">
      <header className="text-center">
        <p className="text-5xl" aria-hidden>
          🌙
        </p>
        <h1 className="mt-3 text-2xl font-bold text-glow-gold">Sleep timer</h1>
        <p className="mt-2 text-sm text-moon-200/75">
          Pick a cozy countdown. When it ends, Sleepy mode dims the night.
        </p>
      </header>

      <div className="rounded-3xl border border-glow-gold/25 bg-night-900/70 p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-moon-200/50">
          {timerMinutes ? "Time left" : sleepy ? "Sleepy mode" : "Ready"}
        </p>
        <p className="mt-2 font-mono text-5xl font-semibold text-glow-gold">
          {timerLabel ?? (sleepy ? "00:00" : "—:—")}
        </p>
        {timerMinutes && (
          <div className="mx-auto mt-5 h-2 max-w-xs overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-glow-gold transition-all duration-1000"
              style={{ width: `${Math.max(2, progress * 100)}%` }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {OPTIONS.map((m) => {
          const active = timerMinutes === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => startTimer(m)}
              className={`flex min-h-16 flex-col items-center justify-center rounded-3xl border text-lg font-semibold transition ${
                active
                  ? "border-glow-gold bg-glow-gold text-night-950 shadow-glow"
                  : "border-white/10 bg-night-800/70 text-moon-200 hover:border-glow-gold/40"
              }`}
            >
              {m} min
            </button>
          );
        })}
      </div>

      {(timerMinutes || sleepy) && (
        <button
          type="button"
          onClick={() => {
            clearTimer();
            dismissSleepy();
          }}
          className="flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-sm text-moon-200"
        >
          Cancel timer
        </button>
      )}

      <p className="text-center text-xs text-moon-200/50">
        Client-side only · stays on this device · no account needed
      </p>
    </div>
  );
}
