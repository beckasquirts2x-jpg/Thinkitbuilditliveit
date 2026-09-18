"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FavoriteItem,
  getFavorites,
  isFavorite as checkFavorite,
  toggleFavorite as toggleFav,
} from "@/lib/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setReady(true);
  }, []);

  const toggle = useCallback((type: "chapter" | "song", id: string) => {
    const next = toggleFav(type, id);
    setFavorites(next);
  }, []);

  const isFavorite = useCallback(
    (type: "chapter" | "song", id: string) =>
      favorites.some((f) => f.type === type && f.id === id) || checkFavorite(type, id),
    [favorites]
  );

  return { favorites, ready, toggle, isFavorite };
}
