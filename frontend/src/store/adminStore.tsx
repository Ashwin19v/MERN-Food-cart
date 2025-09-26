import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { AdminContextType, DashboardStats, User } from "../lib/type/type";
import api from "../lib/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(
    null
  );

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
      setIsLoading(true);
      const { data } = await api.get("users/me");
      setUser(data.data);
      toast.success("Welcome back!" + user?.name);
      console.log(data);
    } catch (error: any) {
      console.log(error);

      if (error.response?.status === 401) {
        const msg = "Session expired. Please login again.";
        toast.error(msg);
      } else {
        const msg = error.response?.data?.message || "Failed to get user data";
        toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { data } = await api.post("/users/login", { email, password });
      setToken(data.token);
      toast.success("Login successful!");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      await api.post("/users/register", { name, email, password });
      toast.success("Registration successful!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";

      toast.error(errorMessage);
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

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchDashboardStats = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/dashboard");
      setDashboardStats(data);
      toast.success("Dashboard stats loaded!");
    } catch (error: any) {
      const msg = "Failed to fetch dashboard stats";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        token,
        updateUserProfile,
        login,
        register,
        isLoading,
        fetchDashboardStats,
        dashboardStats,
      }}
    >
      {children}
      <ToastContainer position="bottom-right" autoClose={3000} theme="light" />
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
