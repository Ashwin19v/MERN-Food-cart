import { createContext, useContext, useState, type ReactNode } from "react";
import api from "../lib/api/api";

import type { User, CustomerContextType } from "../lib/type/type";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCustomers = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/users/customers");
      setCustomers(data.data);
      toast.success("Customers loaded!");
    } catch (error: any) {
      const msg = "Failed to fetch your customers";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserCart = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/cart/${userId}`);
      return data;
    } catch (error) {
      console.log(error);

      console.error("Failed to fetch user cart:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getUserFavorites = async (userId: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/favorites/${userId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch user favorites:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`users/customers/${userId}`);
      getCustomers();
      toast.success("User deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete user");
      const msg = "Failed to delete user";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoading,

        getCustomers,

        customers,
        getUserCart,
        getUserFavorites,

        deleteUser,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
