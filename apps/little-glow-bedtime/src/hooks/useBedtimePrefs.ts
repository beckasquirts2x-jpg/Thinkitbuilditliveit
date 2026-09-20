"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAutoAdvance,
  setAutoAdvance as persistAutoAdvance,
  getSleepyFont,
  setSleepyFont as persistSleepyFont,
  getThemeId,
  setThemeId as persistTheme,
  getVoiceURI,
  setVoiceURI as persistVoice,
} from "@/lib/storage";
import {
  applyTheme,
  DEFAULT_THEME,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";

export type DeviceVoice = {
  name: string;
  lang: string;
  voiceURI: string;
};

export function useBedtimePrefs() {
  const [autoAdvance, setAutoAdvanceState] = useState(false);
  const [sleepyFont, setSleepyFontState] = useState(false);
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [voiceURI, setVoiceURIState] = useState("");
  const [voices, setVoices] = useState<DeviceVoice[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = getThemeId();
    const nextTheme = isThemeId(savedTheme) ? savedTheme : DEFAULT_THEME;
    setAutoAdvanceState(getAutoAdvance());
    setSleepyFontState(getSleepyFont());
    setThemeState(nextTheme);
    setVoiceURIState(getVoiceURI());
    applyTheme(nextTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.toggle("sleepy-font", sleepyFont);
  }, [sleepyFont, ready]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const load = () => {
      const list = window.speechSynthesis.getVoices();
      setVoices(
        list
          .filter((v) => v.lang.toLowerCase().startsWith("en") || !v.lang)
          .map((v) => ({ name: v.name, lang: v.lang, voiceURI: v.voiceURI }))
      );
    };

    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const setAutoAdvance = useCallback((value: boolean) => {
    persistAutoAdvance(value);
    setAutoAdvanceState(value);
  }, []);

  const setSleepyFont = useCallback((value: boolean) => {
    persistSleepyFont(value);
    setSleepyFontState(value);
  }, []);

  const setTheme = useCallback((value: ThemeId) => {
    persistTheme(value);
    setThemeState(value);
    applyTheme(value);
  }, []);

  const setVoiceURI = useCallback((value: string) => {
    persistVoice(value);
    setVoiceURIState(value);
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
    theme,
    voiceURI,
    voices,
    ready,
    setAutoAdvance,
    setSleepyFont,
    setTheme,
    setVoiceURI,
    toggleAutoAdvance,
    toggleSleepyFont,
  };
}
