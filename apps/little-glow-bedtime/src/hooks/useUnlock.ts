"use client";

import { useCallback, useEffect, useState } from "react";
import { getUnlocked, setUnlocked } from "@/lib/storage";

export function useUnlock() {
  const [unlocked, setUnlockedState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUnlockedState(getUnlocked());
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "little-glow-unlocked") {
        setUnlockedState(e.newValue === "true");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    setUnlockedState(true);
  }, []);

  const lock = useCallback(() => {
    setUnlocked(false);
    setUnlockedState(false);
  }, []);

  return { unlocked, ready, unlock, lock };
}
