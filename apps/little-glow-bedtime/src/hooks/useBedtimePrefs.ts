"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAutoAdvance,
  setAutoAdvance as persistAutoAdvance,
  getSleepyFont,
  setSleepyFont as persistSleepyFont,
} from "@/lib/storage";

export function useBedtimePrefs() {
  const [autoAdvance, setAutoAdvanceState] = useState(false);
  const [sleepyFont, setSleepyFontState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAutoAdvanceState(getAutoAdvance());
    setSleepyFontState(getSleepyFont());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("sleepy-font", sleepyFont);
  }, [sleepyFont, ready]);

  const setAutoAdvance = useCallback((value: boolean) => {
    persistAutoAdvance(value);
    setAutoAdvanceState(value);
  }, []);

  const setSleepyFont = useCallback((value: boolean) => {
    persistSleepyFont(value);
    setSleepyFontState(value);
  }, []);

  const toggleAutoAdvance = useCallback(() => {
    setAutoAdvance(!autoAdvance);
  }, [autoAdvance, setAutoAdvance]);

  const toggleSleepyFont = useCallback(() => {
    setSleepyFont(!sleepyFont);
  }, [sleepyFont, setSleepyFont]);

  return {
    autoAdvance,
    sleepyFont,
    ready,
    setAutoAdvance,
    setSleepyFont,
    toggleAutoAdvance,
    toggleSleepyFont,
  };
}
