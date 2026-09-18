"use client";

import Link from "next/link";
import { TipJar } from "@/components/TipJar";
import { useApp } from "@/components/AppProviders";
import { UNLOCK_PRICE, APP_NAME, HIVE_NIGHTS_PACK, HIVE_NIGHTS_PRICE, stories } from "@/lib/content";

export default function UnlockPage() {
  const { unlocked, unlock, lock, unlockReady } = useApp();

  return (
    <div className="space-y-6">
      <header className="text-center">
        <p className="text-5xl" aria-hidden>
          ✨
        </p>
        <h1 className="mt-3 text-2xl font-bold text-glow-gold">
          Unlock Full Glow
        </h1>
        <p className="mt-2 text-sm text-moon-200/75">
          One-time unlock for {APP_NAME}. No ads. No subscription in v1.
        </p>
      </header>

      <div className="rounded-3xl border border-glow-gold/30 bg-gradient-to-br from-glow-gold/15 to-night-900 p-6">
        <p className="text-center text-4xl font-bold text-glow-gold">
          {UNLOCK_PRICE}
        </p>
        <p className="mt-1 text-center text-xs text-moon-200/55">
          Suggested range $2.99–$4.99 · shown as {UNLOCK_PRICE}
        </p>

        <ul className="mt-5 space-y-2 text-sm text-moon-200/90">
          <li>✓ Both stories — {stories.reduce((n, s) => n + s.chapters.length, 0)} chapters</li>
          <li>✓ All lullaby lyric pages ({stories.reduce((n, s) => n + s.songs.length, 0)})</li>
          <li>✓ Audio placeholder slots (Add Suno audio later)</li>
          <li>✓ Favorites & sleep timer (already free)</li>
        </ul>

        {!unlockReady ? (
          <p className="mt-6 text-center text-sm text-moon-200/60">Loading…</p>
        ) : unlocked ? (
          <div className="mt-6 space-y-3 text-center">
            <p className="rounded-2xl bg-glow-gold/20 px-4 py-3 font-semibold text-glow-gold">
              Full Glow is unlocked on this device 🌟
            </p>
            <Link
              href="/story"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-glow-gold font-semibold text-night-950"
            >
              Read the full story
            </Link>
            <button
              type="button"
              onClick={lock}
              className="w-full text-xs text-moon-200/45 underline"
            >
              Reset unlock (dev / testing)
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={unlock}
              className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-glow-gold text-base font-semibold text-night-950 shadow-glow"
            >
              Unlock Full Glow · {UNLOCK_PRICE}
            </button>
            <p className="text-center text-xs text-moon-200/50">
              v1 uses a local unlock flag (localStorage). Stripe checkout comes
              later — this simulates a successful one-time purchase.
            </p>
          </div>
        )}
      </div>

      <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5 text-center">
        <h2 className="font-semibold text-glow-gold">Free core stays free</h2>
        <p className="mt-2 text-sm text-moon-200/75">
          Home, sleep timer, favorites, Chapter 1 of each story, and free song
          samples — always available without unlocking. Existing Moon Full Glow
          unlock still works on this device.
        </p>
      </section>

      <section className="rounded-3xl border border-white/10 bg-night-900/40 p-5 text-center">
        <h2 className="font-semibold text-glow-gold">
          Later: {HIVE_NIGHTS_PACK}
        </h2>
        <p className="mt-2 text-sm text-moon-200/75">
          Suggested Honeybee-only pack at {HIVE_NIGHTS_PRICE}. Not wired to
          Stripe yet — Full Glow unlocks Honeybee for now. No Stripe keys in
          this PR.
        </p>
      </section>

      <section className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-night-900/40 p-5 text-center">
        <p className="text-sm text-moon-200/70">
          Prefer a soft tip instead?
        </p>
        <TipJar />
      </section>
    </div>
  );
}
