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
import type { FavoriteItem } from "@/lib/storage";

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
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const unlockState = useUnlock();
  const favState = useFavorites();
  const timer = useSleepTimer();

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
    }),
    [unlockState, favState, timer]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
