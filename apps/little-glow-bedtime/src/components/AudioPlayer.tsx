"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "./AppProviders";
import { fadeOutAndStop, onStopAllAudio, stopAllAudio } from "@/lib/audioControl";
import { useWakeLock } from "@/hooks/useWakeLock";

type Mode = "loading" | "file" | "speech" | "missing-song";

type Props = {
  id: string;
  title: string;
  /** story → SpeechSynthesis fallback; song → drop-mp3 helper */
  kind: "story" | "song";
  /** Text to speak for story chapters */
  speakText?: string;
};

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function probeAudio(id: string): Promise<string | null> {
  for (const ext of ["mp3", "m4a"] as const) {
    const url = `/audio/${id}.${ext}`;
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-store" });
      if (res.ok) return url;
    } catch {
      /* try next */
    }
  }
  return null;
}

export function AudioPlayer({ id, title, kind, speakText }: Props) {
  const { sleepy } = useApp();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mode, setMode] = useState<Mode>("loading");
  const [src, setSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  useWakeLock(playing);

  useEffect(() => {
    let cancelled = false;
    setMode("loading");
    setSrc(null);
    setPlaying(false);
    setProgress(0);
    setDuration(0);

    (async () => {
      const found = await probeAudio(id);
      if (cancelled) return;
      if (found) {
        setSrc(found);
        setMode("file");
      } else if (kind === "story") {
        setMode("speech");
      } else {
        setMode("missing-song");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id, kind]);

  const pauseFile = useCallback((opts?: { fade?: boolean }) => {
    const el = audioRef.current;
    if (!el) {
      setPlaying(false);
      return;
    }
    if (opts?.fade) {
      void fadeOutAndStop(el).then(() => setPlaying(false));
      return;
    }
    el.pause();
    setPlaying(false);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  }, []);

  useEffect(() => {
    return onStopAllAudio((opts) => {
      pauseFile(opts);
      stopSpeech();
    });
  }, [pauseFile, stopSpeech]);

  useEffect(() => {
    if (sleepy) {
      stopAllAudio({ fade: true });
    }
  }, [sleepy]);

  useEffect(() => {
    return () => {
      stopSpeech();
      pauseFile();
    };
  }, [stopSpeech, pauseFile]);

  const pickSoftVoice = useCallback(() => {
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => /samantha|karen|moira|fiona|soft|female/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith("en") && /female|woman|girl/i.test(v.name)) ||
      voices.find((v) => v.lang.startsWith("en")) ||
      voices[0];
    return preferred;
  }, []);

  const toggleSpeech = useCallback(() => {
    if (!speakText || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    if (playing) {
      stopSpeech();
      return;
    }
    stopAllAudio();
    const utter = new SpeechSynthesisUtterance(speakText);
    utter.rate = 0.9;
    utter.pitch = 1;
    const voice = pickSoftVoice();
    if (voice) utter.voice = voice;
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    setPlaying(true);
    window.speechSynthesis.speak(utter);
  }, [speakText, playing, stopSpeech, pickSoftVoice]);

  const toggleFile = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    stopAllAudio();
    void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [playing]);

  const onTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    setProgress(el.currentTime);
    if (el.duration && Number.isFinite(el.duration)) setDuration(el.duration);
  };

  const onSeek = (value: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = value;
    setProgress(value);
  };

  const cycleRate = () => {
    const next = rate === 1 ? 0.9 : rate === 0.9 ? 1.25 : 1;
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  if (mode === "loading") {
    return (
      <div className="rounded-2xl border border-white/10 bg-night-900/60 px-4 py-3 text-sm text-moon-200/60">
        Checking audio…
      </div>
    );
  }

  if (mode === "missing-song") {
    return (
      <div className="rounded-2xl border border-dashed border-glow-gold/40 bg-night-900/60 px-4 py-4 text-center">
        <p className="text-sm text-glow-gold/90">🎧 Player ready</p>
        <p className="mt-2 text-xs text-moon-200/70">
          Drop Suno mp3 into{" "}
          <code className="rounded bg-night-800 px-1.5 py-0.5 text-glow-soft">
            public/audio/{id}.mp3
          </code>
        </p>
        <p className="sr-only">{title}</p>
      </div>
    );
  }

  if (mode === "speech") {
    return (
      <div className="space-y-2 rounded-2xl border border-glow-gold/30 bg-night-900/60 p-4">
        <button
          type="button"
          onClick={toggleSpeech}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-glow-gold/90 px-4 py-3 text-sm font-semibold text-night-950"
        >
          <span aria-hidden>{playing ? "⏸" : "▶"}</span>
          {playing ? "Pause reading" : "Read aloud"}
        </button>
        <p className="text-center text-xs text-moon-200/55">
          Uses your device voice until a recorded file is added.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-2xl border border-glow-gold/30 bg-night-900/60 p-4">
      <audio
        ref={audioRef}
        src={src ?? undefined}
        preload="metadata"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        onEnded={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleFile}
          className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-glow-gold px-3 text-lg font-semibold text-night-950"
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        >
          {playing ? "⏸" : "▶"}
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-glow-gold">{title}</p>
          <p className="text-xs text-moon-200/55">
            {formatTime(progress)} / {formatTime(duration)}
          </p>
        </div>
        <button
          type="button"
          onClick={cycleRate}
          className="min-h-10 rounded-xl border border-white/10 px-2 text-xs text-moon-200/80"
          title="Playback speed"
        >
          {rate}×
        </button>
      </div>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={progress}
        onChange={(e) => onSeek(Number(e.target.value))}
        className="w-full accent-[var(--glow-gold)]"
        aria-label="Seek"
      />
    </div>
  );
}
