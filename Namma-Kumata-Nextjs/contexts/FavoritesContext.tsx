"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface FavoriteItem {
  favouriteId: string; // ⭐ backend favourite _id
  refId: string; // ⭐ productId OR advertisementId
  type: "listing" | "ad";
  data: any;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  syncSSR: (items: FavoriteItem[]) => void;
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (favouriteId: string) => void;
  isFavorite: (refId: string) => boolean;
  getFavouriteId: (refId: string) => string | null;
  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = "namma_kumata_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  /* -----------------------------------------
     LOAD FROM LOCALSTORAGE
  ------------------------------------------*/
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Error loading favorites:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* -----------------------------------------
     SAVE TO LOCALSTORAGE
  ------------------------------------------*/
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  /* -----------------------------------------
     SYNC SSR → CLIENT
  ------------------------------------------*/
  const syncSSR = (items: FavoriteItem[]) => {
    setFavorites(items); // overwrite — SSR is source of truth
  };

  /* -----------------------------------------
     ADD
  ------------------------------------------*/
  const addFavorite = (item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.refId === item.refId)) return prev;
      return [...prev, item];
    });
  };

  /* -----------------------------------------
     REMOVE
  ------------------------------------------*/
  const removeFavorite = (favouriteId: string) => {
    setFavorites((prev) => prev.filter((f) => f.favouriteId !== favouriteId));
  };

  /* -----------------------------------------
     CHECK
  ------------------------------------------*/
  const isFavorite = (refId: string) => {
    return favorites.some((f) => f.refId === refId);
  };

  /* -----------------------------------------
     GET favouriteId by refId
  ------------------------------------------*/
  const getFavouriteId = (refId: string) => {
    const found = favorites.find((f) => f.refId === refId);
    return found ? found.favouriteId : null;
  };

  /* -----------------------------------------
     TOGGLE
  ------------------------------------------*/
  const toggleFavorite = (item: FavoriteItem) => {
    const exists = isFavorite(item.refId);

    if (exists) {
      const favId = getFavouriteId(item.refId);
      if (favId) removeFavorite(favId);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        syncSSR,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavouriteId,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
}
