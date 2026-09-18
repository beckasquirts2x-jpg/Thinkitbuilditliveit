/** Lightweight bus so sleep timer can pause/stop any playing audio or speech. */

type StopListener = (opts?: { fade?: boolean }) => void;

const listeners = new Set<StopListener>();

export function onStopAllAudio(listener: StopListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Fade an HTMLAudioElement volume down, then pause and reset volume. */
export function fadeOutAndStop(
  el: HTMLAudioElement,
  durationMs = 1200
): Promise<void> {
  return new Promise((resolve) => {
    const startVol = el.volume;
    if (startVol <= 0.01 || el.paused) {
      el.pause();
      el.volume = startVol || 1;
      resolve();
      return;
    }
    const steps = 12;
    const stepMs = durationMs / steps;
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      el.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        window.clearInterval(timer);
        el.pause();
        el.volume = startVol;
        resolve();
      }
    }, stepMs);
  });
}

export function stopAllAudio(opts?: { fade?: boolean }) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  listeners.forEach((fn) => {
    try {
      fn(opts);
    } catch {
      /* ignore */
    }
  });
}
