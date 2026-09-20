"use client";

import {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useUnlock } from "@/hooks/useUnlock";
import { useFavorites } from "@/hooks/useFavorites";
import { useSleepTimer, type TimerMinutes } from "@/hooks/useSleepTimer";
import { useBedtimePrefs, type DeviceVoice } from "@/hooks/useBedtimePrefs";
import type { FavoriteItem } from "@/lib/storage";
import type { ThemeId } from "@/lib/themes";

type AppContextValue = {
  unlocked: boolean;
  unlockReady: boolean;
  unlock: () => void;
  lock: () => void;
  favorites: FavoriteItem[];
  favoritesReady: boolean;
  toggleFavorite: (type: "chapter" | "song", id: string) => void;
  isFavorite: (type: "chapter" | "song", id: string) => boolean;
  timerMinutes: TimerMinutes | null;
  remainingSec: number;
  sleepy: boolean;
  timerLabel: string | null;
  startTimer: (m: TimerMinutes) => void;
  clearTimer: () => void;
  dismissSleepy: () => void;
  autoAdvance: boolean;
  sleepyFont: boolean;
  theme: ThemeId;
  voiceURI: string;
  voices: DeviceVoice[];
  prefsReady: boolean;
  setAutoAdvance: (v: boolean) => void;
  setSleepyFont: (v: boolean) => void;
  setTheme: (v: ThemeId) => void;
  setVoiceURI: (v: string) => void;
  toggleAutoAdvance: () => void;
  toggleSleepyFont: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const unlockState = useUnlock();
  const favState = useFavorites();
  const timer = useSleepTimer();
  const prefs = useBedtimePrefs();

  const value = useMemo<AppContextValue>(
    () => ({
      unlocked: unlockState.unlocked,
      unlockReady: unlockState.ready,
      unlock: unlockState.unlock,
      lock: unlockState.lock,
      favorites: favState.favorites,
      favoritesReady: favState.ready,
      toggleFavorite: favState.toggle,
      isFavorite: favState.isFavorite,
      timerMinutes: timer.minutes,
      remainingSec: timer.remainingSec,
      sleepy: timer.sleepy,
      timerLabel: timer.label,
      startTimer: timer.start,
      clearTimer: timer.clear,
      dismissSleepy: timer.dismissSleepy,
      autoAdvance: prefs.autoAdvance,
      sleepyFont: prefs.sleepyFont,
      theme: prefs.theme,
      voiceURI: prefs.voiceURI,
      voices: prefs.voices,
      prefsReady: prefs.ready,
      setAutoAdvance: prefs.setAutoAdvance,
      setSleepyFont: prefs.setSleepyFont,
      setTheme: prefs.setTheme,
      setVoiceURI: prefs.setVoiceURI,
      toggleAutoAdvance: prefs.toggleAutoAdvance,
      toggleSleepyFont: prefs.toggleSleepyFont,
    }),
    [unlockState, favState, timer, prefs]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
