import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../lib/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { CartItem, CartContextType } from "../types/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const cartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // console.log(cartItems);

  // Cart functions remain the same
  const getCartItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/cart");
      console.log(data);

      setCartItems(data.data.items);
      toast.success("Cart items fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false);
    }
  };

  // Add to cart function

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const { data } = await api.post("/cart/add", {
        productId,
        quantity,
      });

      // console.log("Cart Response:", data); // ✅ LOG RESPONSE
      setCartItems(data.data.items);
      toast.success("Item added to cart!");
    } catch (error: any) {
      toast.error("Failed to add to cart");
    }
  };

  // Remove from cart function

  const removeFromCart = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/cart/items/${id}`);
      getCartItems();
      toast.success("Item removed from cart!");
    } catch (error: any) {
      toast.error("Failed to remove item");
    } finally {
      setLoading(false);
    }
  };

  // Update cart quantity function

  const updateCartQuantity = async (productId: string, quantity: number) => {
    setLoading(true);
    try {
      const { data } = await api.put("/cart/update", {
        productId,
        quantity,
      });
      setCartItems(data.data.items);
      toast.success("Cart quantity updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  // Clear cart function

  const clearCart = async () => {
    setLoading(true);
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
      toast.success("Cart cleared successfully!");
    } catch (error: any) {
      toast.error("Failed to clear cart");
    } finally {
      setLoading(false);
    }
  };
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        clearCart,
        cartItems,
        removeFromCart,
        cartTotal,

        getCartItems,
        addToCart,
        updateCartQuantity,
        loading,
      }}
    >
      {children}
      
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
