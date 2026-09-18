"use client";

import { useEffect, useRef } from "react";

/**
 * Request Screen Wake Lock while `active` is true (reading/listening).
 * Gracefully no-ops when the API is missing or permission fails.
 */
export function useWakeLock(active: boolean) {
  const lockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (!active) {
      void lockRef.current?.release().catch(() => undefined);
      lockRef.current = null;
      return;
    }

    let cancelled = false;

    const request = async () => {
      try {
        if (!("wakeLock" in navigator)) return;
        const lock = await navigator.wakeLock.request("screen");
        if (cancelled) {
          void lock.release();
          return;
        }
        lockRef.current = lock;
        lock.addEventListener("release", () => {
          if (lockRef.current === lock) lockRef.current = null;
        });
      } catch {
        /* unsupported / denied — ignore */
      }
    };

    void request();

    const onVis = () => {
      if (document.visibilityState === "visible" && active && !lockRef.current) {
        void request();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVis);
      void lockRef.current?.release().catch(() => undefined);
      lockRef.current = null;
    };
  }, [active]);
}
