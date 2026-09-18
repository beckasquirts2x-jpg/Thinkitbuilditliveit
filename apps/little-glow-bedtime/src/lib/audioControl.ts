/** Lightweight bus so sleep timer can pause/stop any playing audio or speech. */

type StopListener = () => void;

const listeners = new Set<StopListener>();

export function onStopAllAudio(listener: StopListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function stopAllAudio() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* ignore */
    }
  });
}
