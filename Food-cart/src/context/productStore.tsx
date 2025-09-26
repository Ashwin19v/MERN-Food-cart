import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import api from "../lib/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Product, ProductContextType } from "../types/types";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const productProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);

  const fetchProductsByCategory = async (
    categoryName: string
  ): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/category/${categoryName}`);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching category products:", error);
      return [];
    }
  };

  // fetch product by ID
  const fetchProductById = useCallback(
    async (productId: string): Promise<Product | null> => {
      try {
        // if (!token) return null;
        const response = await api.get(`/products/${productId}`);
        return response.data.data || null;
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
      }
    },
    [] //token
  );

  return (
    <ProductContext.Provider
      value={{
        loading,
        activeCategory,
        categoryProducts,
        popularProducts,
        fetchProductById,
        fetchProductsByCategory,
        setActiveCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
