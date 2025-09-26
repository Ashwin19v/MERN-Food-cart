import { createContext, useContext, useState, type ReactNode } from "react";

import api from "../lib/api/api";
import type { Order, OrderContextType } from "../lib/type/type";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const getMyOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/orders");
      setUserOrders(data);

      toast.success("Orders loaded!");
    } catch (error: any) {
      const msg = "Failed to fetch your orders";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrderById = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/orders/${id}`);
      toast.success("Order deleted successfully!");
      getMyOrders();
    } catch (error: any) {
      const msg = "Failed to delete order";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (id: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    } catch (error: any) {
      const msg = "Failed to fetch order details";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (
    id: string,
    status: string,
    isPaid: boolean,
    deliveryPerson: string,
    estimatedDeliveryTime: string
  ) => {
    setIsLoading(true);
    try {
      await api.put(`/orders/${id}/status`, {
        status,
        isPaid,
        deliveryPerson,
        estimatedDeliveryTime,
      });
      await getMyOrders();
      toast.success("Order status updated!");
    } catch (error: any) {
      const msg = "Failed to update order status";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        isLoading,

        userOrders,
        getMyOrders,

        getOrderById,
        updateOrderStatus,

        deleteOrderById,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
