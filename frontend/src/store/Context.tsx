import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import axios from "axios";
import type {
  User,
  CartItem,
  AppContextType,
  DashboardStats,
  Order,
  Product,
} from "../lib/type/type";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = axios.create({
  baseURL: "http://localhost:5000/api/admin",
  headers: {
    "Content-Type": "application/json",
  },
});

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [customers, setCustomers] = useState<User[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 

  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  // console.log(api.defaults.headers.common["Authorization"]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        await getCurrentUser();
      }
    };
    initializeAuth();
  }, [token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("users/me");
      setUser(data.data);
      toast.success("Welcome back!" + user?.name);
    } catch (error: any) {
      if (error.response?.status === 401) {
        const msg = "Session expired. Please login again.";
        setError(msg);
        toast.error(msg);
        // setUser(null);
        // setToken(null);
        // localStorage.removeItem("token");
      } else {
        const msg = error.response?.data?.message || "Failed to get user data";
        setError(msg);
        toast.error(msg);
      }
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/users/login", { email, password });
      setToken(data.token);
      toast.success("Login successful!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/users/register", { name, email, password });
      toast.success("Registration successful!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (
    name: string,
    currentPassword: string,
    password?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.put("/users/update", {
        name,
        currentPassword,
        password,
      });
      setUser(data.data);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getCustomers = async () => {
    try {
      const { data } = await api.get("/users/customers");
      setCustomers(data.data);
      toast.success("Customers loaded!");
    } catch (error: any) {
      const msg = "Failed to fetch your customers";
      setError(msg);
      toast.error(msg);
    }
  };

 
  const getMyOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setUserOrders(data);

      toast.success("Orders loaded!");
    } catch (error: any) {
      const msg = "Failed to fetch your orders";
      setError(msg);
      toast.error(msg);
    }
  };

  const deleteOrderById = async (id: string) => {
    try {
      await api.delete(`/orders/${id}`);
      toast.success("Order deleted successfully!");
      getMyOrders();
    } catch (error: any) {
      const msg = "Failed to delete order";
      setError(msg);
      toast.error(msg);
    }
  };

  const getOrderById = async (id: string) => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return data.data;
    } catch (error: any) {
      const msg = "Failed to fetch order details";
      setError(msg);
      toast.error(msg);
    }
  };

  const updateOrderStatus = async (
    id: string,
    status: string,
    isPaid: boolean,
    deliveryPerson: string,
    estimatedDeliveryTime: string
  ) => {
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
      setError(msg);
      toast.error(msg);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
      toast.success("Products fetched!");
    } catch (error: any) {
      const msg = "Failed to fetch products";
      setError(msg);
      toast.error(msg);
    }
  };

  const createProduct = async (product: Partial<Product>) => {
    try {
      await api.post("/products", product);
      await fetchProducts();
      toast.success("Product created!");
    } catch (error: any) {
      const msg = "Failed to create product";
      setError(msg);
      toast.error(msg);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      await api.put(`/products/${id}`, product);
      await fetchProducts();
      toast.success("Product updated!");
    } catch (error: any) {
      const msg = "Failed to update product";
      setError(msg);
      toast.error(msg);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
      toast.success("Product deleted!");
    } catch (error: any) {
      const msg = "Failed to delete product";
      setError(msg);
      toast.error(msg);
    }
  };
  const getUserCart = async (userId: string) => {
    console.log(userId);

    try {
      const { data } = await api.get(`/cart/${userId}`);
      return data;
    } catch (error) {
      console.log(error);

      console.error("Failed to fetch user cart:", error);
      return [];
    }
  };

  const getUserFavorites = async (userId: string) => {
    try {
      const { data } = await api.get(`/favorites/${userId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch user favorites:", error);
      return [];
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`users/customers/${userId}`);
      getCustomers();
      toast.success("User deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete user");
      const msg = "Failed to delete user";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        cartItems,
        login,
        register,
        fetchDashboardStats,
        dashboardStats,
        isLoading,
        error,
        userOrders,
        getMyOrders,
        selectedOrder,
        getOrderById,
        updateOrderStatus,
        getCustomers,
        products,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        updateUserProfile,
        customers,
        getUserCart,
        getUserFavorites,
        deleteOrderById,
        deleteUser,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
