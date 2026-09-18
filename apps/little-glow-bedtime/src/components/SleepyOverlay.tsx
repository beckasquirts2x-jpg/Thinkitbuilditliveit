"use client";

import { useApp } from "./AppProviders";

export function SleepyOverlay() {
  const { sleepy, dismissSleepy } = useApp();
  if (!sleepy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night-950/92 p-6 backdrop-blur-sm">
      <div className="max-w-sm rounded-3xl border border-glow-gold/30 bg-night-900 p-8 text-center shadow-glow">
        <p className="text-5xl" aria-hidden>
          😴
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-glow-gold">Sleepy mode</h2>
        <p className="mt-2 text-moon-200/80">
          Your sleep timer finished. Lights are dim. Sweet dreams, little glow.
        </p>
        <button
          type="button"
          onClick={dismissSleepy}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-glow-gold px-4 py-3 font-semibold text-night-950"
        >
          I’m still awake
        </button>
      </div>
    </div>
  );
}
