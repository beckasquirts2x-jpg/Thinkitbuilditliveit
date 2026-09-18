"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getSleepTimerEnd, setSleepTimerEnd } from "@/lib/storage";
import { stopAllAudio } from "@/lib/audioControl";

export type TimerMinutes = 5 | 10 | 15 | 30;

export function useSleepTimer() {
  const [minutes, setMinutes] = useState<TimerMinutes | null>(null);
  const [remainingSec, setRemainingSec] = useState(0);
  const [sleepy, setSleepy] = useState(false);
  const [ready, setReady] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endedRef = useRef(false);

  const clearIntervalOnly = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    if (endedRef.current) return;
    endedRef.current = true;
    clearIntervalOnly();
    setSleepTimerEnd(null);
    setMinutes(null);
    setRemainingSec(0);
    setSleepy(true);
    stopAllAudio({ fade: true });
  }, [clearIntervalOnly]);

  const tickFromEnd = useCallback(
    (endMs: number, startedMinutes: TimerMinutes | null) => {
      clearIntervalOnly();
      const update = () => {
        const left = Math.max(0, Math.ceil((endMs - Date.now()) / 1000));
        setRemainingSec(left);
        if (left <= 0) {
          finish();
        }
      };
      update();
      if (startedMinutes) setMinutes(startedMinutes);
      intervalRef.current = setInterval(update, 1000);
    },
    [clearIntervalOnly, finish]
  );

  const clear = useCallback(() => {
    endedRef.current = false;
    clearIntervalOnly();
    setSleepTimerEnd(null);
    setMinutes(null);
    setRemainingSec(0);
    setSleepy(false);
  }, [clearIntervalOnly]);

  const start = useCallback(
    (m: TimerMinutes) => {
      endedRef.current = false;
      setSleepy(false);
      const endMs = Date.now() + m * 60 * 1000;
      setSleepTimerEnd(endMs);
      setMinutes(m);
      tickFromEnd(endMs, m);
    },
    [tickFromEnd]
  );

  useEffect(() => {
    const endMs = getSleepTimerEnd();
    if (endMs) {
      const left = endMs - Date.now();
      if (left <= 0) {
        setSleepTimerEnd(null);
        setSleepy(true);
        stopAllAudio({ fade: true });
      } else {
        const approxMin = Math.round(left / 60000) as TimerMinutes;
        const m: TimerMinutes =
          approxMin <= 5 ? 5 : approxMin <= 10 ? 10 : approxMin <= 15 ? 15 : 30;
        tickFromEnd(endMs, m);
      }
    }
    setReady(true);
    return () => clearIntervalOnly();
  }, [tickFromEnd, clearIntervalOnly]);

  const label =
    remainingSec > 0
      ? `${Math.floor(remainingSec / 60)}:${String(remainingSec % 60).padStart(2, "0")}`
      : null;

  return {
    minutes,
    remainingSec,
    sleepy,
    ready,
    label,
    start,
    clear,
    dismissSleepy: () => {
      endedRef.current = false;
      setSleepy(false);
    },
  };
}
