import { createContext, useContext, useState, type ReactNode } from "react";

import api from "../lib/api/api";
import type { Product, ProductContextType } from "../lib/type/type";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/products");
      setProducts(data);
      toast.success("Products fetched!");
    } catch (error: any) {
      const msg = "Failed to fetch products";
      console.log(error);

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (product: Partial<Product>) => {
    setIsLoading(true);
    try {
      await api.post("/products", product);
      await fetchProducts();
      toast.success("Product created!");
    } catch (error: any) {
      const msg = "Failed to create product";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    setIsLoading(true);
    try {
      await api.put(`/products/${id}`, product);
      await fetchProducts();
      toast.success("Product updated!");
    } catch (error: any) {
      const msg = "Failed to update product";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
      toast.success("Product deleted!");
    } catch (error: any) {
      const msg = "Failed to delete product";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        isLoading,

        products,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </ProductContext.Provider>
  );
};

export const useproduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
