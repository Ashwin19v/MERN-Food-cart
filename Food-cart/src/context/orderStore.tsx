import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../lib/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Order, OrderContextType } from "../types/types";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const orderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/orders/get");
      setOrders(data.data);
      toast.success("Orders fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // Create order function

  const createOrder = async (orderData: Partial<Order>) => {
    setLoading(true);
    try {
      const { data } = await api.post("/orders/add", orderData);
      setOrders((prev) => [...prev, data.data]);
      //   await clearCart();
      toast.success("Order created successfully!");
    } catch (error: any) {
      toast.error("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  // Cancel order function

  const cancelOrder = async (orderId: string) => {
    setLoading(true);
    try {
      await api.post(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        getOrders,
        cancelOrder,
        createOrder,
        loading,
      }}
    >
      {children}
     
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
