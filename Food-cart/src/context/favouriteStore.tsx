import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../lib/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { FavoriteContextType, FavoriteItem } from "../types/types";

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);


export const favouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Favorite functions
  const getFavorites = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/favorites/get");
      setFavorites(data.data);
      toast.success("Favorites fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  // Add to favorites function

  const addToFavorites = async (productId: string) => {
    setLoading(true);
    try {
      const { data } = await api.post("/favorites/add", { productId });
      setFavorites((prev) => [...prev, data.data]);
      toast.success("Item added to favorites!");
    } catch (error: any) {
      toast.error("Failed to add to favorites");
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites function

  const removeFromFavorites = async (productId: string) => {
    setLoading(true);
    try {
      await api.delete(`/favorites/${productId}`);
      getFavorites();
      toast.success("Item removed from favorites!");
    } catch (error: any) {
      toast.error("Failed to remove from favorites");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        removeFromFavorites,
        favorites,
        getFavorites,
        addToFavorites,
        loading,
      }}
    >
      {children}
     
    </FavoriteContext.Provider>
  );
};

export const useFavourite = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
