"use client";

import Link from "next/link";
import { UNLOCK_PRICE } from "@/lib/content";
import { useApp } from "./AppProviders";

export function UnlockCTA({ compact = false }: { compact?: boolean }) {
  const { unlocked } = useApp();
  if (unlocked) return null;

  if (compact) {
    return (
      <Link
        href="/unlock"
        className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-glow-gold px-4 py-2 text-sm font-semibold text-night-950 shadow-glow"
      >
        Unlock Full Glow · {UNLOCK_PRICE}
      </Link>
    );
  }

  return (
    <div className="rounded-3xl border border-glow-gold/30 bg-gradient-to-br from-glow-gold/15 to-transparent p-5 text-center">
      <p className="text-lg font-semibold text-glow-gold">Unlock Full Glow</p>
      <p className="mt-2 text-sm text-moon-200/80">
        One-time unlock for both bedtime stories, all songs, and audio slots.
      </p>
      <p className="mt-1 text-xs text-moon-200/50">No ads · No subscription</p>
      <Link
        href="/unlock"
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-glow-gold px-4 py-3 text-base font-semibold text-night-950 shadow-glow"
      >
        Unlock for {UNLOCK_PRICE}
      </Link>
    </div>
  );
}
