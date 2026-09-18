"use client";

import { UnlockCTA } from "./UnlockCTA";

export function LockedPreview({ kind }: { kind: "chapter" | "song" }) {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-night-900/80 p-6 text-center">
      <p className="text-4xl" aria-hidden>
        🔒
      </p>
      <h2 className="mt-3 text-xl font-semibold text-glow-gold">
        {kind === "chapter" ? "Chapter locked" : "Song locked"}
      </h2>
      <p className="mt-2 text-sm text-moon-200/75">
        Free preview includes Chapter 1 and 2 sample songs. Unlock Full Glow for
        the complete bedtime adventure.
      </p>
      <div className="mt-5">
        <UnlockCTA />
      </div>
    </div>
  );
}
