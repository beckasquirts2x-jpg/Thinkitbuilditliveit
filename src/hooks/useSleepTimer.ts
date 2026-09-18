"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type TimerMinutes = 5 | 10 | 15 | 30;

export function useSleepTimer() {
  const [minutes, setMinutes] = useState<TimerMinutes | null>(null);
  const [remainingSec, setRemainingSec] = useState(0);
  const [sleepy, setSleepy] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMinutes(null);
    setRemainingSec(0);
    setSleepy(false);
  }, []);

  const start = useCallback((m: TimerMinutes) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setMinutes(m);
    setRemainingSec(m * 60);
    setSleepy(false);

    intervalRef.current = setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = null;
          setSleepy(true);
          setMinutes(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const label =
    remainingSec > 0
      ? `${Math.floor(remainingSec / 60)}:${String(remainingSec % 60).padStart(2, "0")}`
      : null;

  return { minutes, remainingSec, sleepy, label, start, clear, dismissSleepy: () => setSleepy(false) };
}
