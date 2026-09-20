"use client";

import { useEffect, useState } from "react";
import { ChapterRequest } from "@/components/ChapterRequest";
import { useApp } from "@/components/AppProviders";
import { THEMES } from "@/lib/themes";
import { getChapterRequests, type ChapterRequestItem } from "@/lib/storage";

export default function SettingsPage() {
  const {
    theme,
    setTheme,
    voiceURI,
    setVoiceURI,
    voices,
    prefsReady,
  } = useApp();
  const [requests, setRequests] = useState<ChapterRequestItem[]>([]);

  useEffect(() => {
    setRequests(getChapterRequests());
  }, []);

  function previewVoice(uri: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(
      "Goodnight little glow. Soft voices for sleepy stories."
    );
    utter.rate = 0.9;
    const match = window.speechSynthesis
      .getVoices()
      .find((v) => v.voiceURI === uri);
    if (match) utter.voice = match;
    window.speechSynthesis.speak(utter);
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm text-moon-200/60">Bedtime setup</p>
        <h1 className="text-2xl font-bold text-glow-gold">Look and voice</h1>
      </header>

      <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5">
        <h2 className="text-lg font-semibold text-glow-gold">Background color</h2>
        <p className="mt-1 text-sm text-moon-200/70">
          Pick a night color. It stays on this device.
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {THEMES.map((item) => {
            const on = prefsReady && theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id)}
                className={`flex min-h-16 flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-xs ${
                  on
                    ? "border-glow-gold bg-glow-gold/15 text-glow-gold"
                    : "border-white/10 bg-night-800/70 text-moon-200/80"
                }`}
              >
                <span
                  className="h-7 w-7 rounded-full border border-white/20"
                  style={{ background: item.swatch }}
                  aria-hidden
                />
                {item.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-night-900/50 p-5">
        <h2 className="text-lg font-semibold text-glow-gold">Reader voice</h2>
        <p className="mt-1 text-sm text-moon-200/70">
          Used when a chapter is read aloud on this device.
        </p>
        {!prefsReady ? null : voices.length === 0 ? (
          <p className="mt-3 text-sm text-moon-200/60">
            No device voices yet. Open a chapter and tap Read aloud once, then
            come back.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            <li>
              <button
                type="button"
                onClick={() => setVoiceURI("")}
                className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-3 text-left text-sm ${
                  !voiceURI
                    ? "border-glow-gold bg-glow-gold/15 text-glow-gold"
                    : "border-white/10 bg-night-800/70 text-moon-200"
                }`}
              >
                Soft auto
              </button>
            </li>
            {voices.map((voice) => {
              const on = voiceURI === voice.voiceURI;
              return (
                <li key={voice.voiceURI} className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVoiceURI(voice.voiceURI)}
                    className={`flex min-h-12 min-w-0 flex-1 items-center rounded-2xl border px-3 text-left text-sm ${
                      on
                        ? "border-glow-gold bg-glow-gold/15 text-glow-gold"
                        : "border-white/10 bg-night-800/70 text-moon-200"
                    }`}
                  >
                    <span className="truncate">
                      {voice.name}
                      <span className="ml-2 text-xs opacity-60">{voice.lang}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => previewVoice(voice.voiceURI)}
                    className="min-h-12 shrink-0 rounded-2xl border border-white/10 px-3 text-xs text-moon-200/80"
                  >
                    Try
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <ChapterRequest />

      {requests.length > 0 && (
        <section className="rounded-3xl border border-white/10 bg-night-900/40 p-5">
          <h2 className="text-lg font-semibold text-glow-gold">Wishes on this device</h2>
          <ul className="mt-3 space-y-3 text-sm text-moon-200/80">
            {requests
              .slice()
              .reverse()
              .map((req) => (
                <li key={req.createdAt} className="rounded-2xl bg-night-800/60 p-3">
                  <p className="text-xs text-glow-gold/80">{req.storyTitle}</p>
                  <p className="mt-1">{req.idea}</p>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
