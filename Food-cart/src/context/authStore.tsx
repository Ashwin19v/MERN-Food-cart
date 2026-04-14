import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import api from "../lib/api";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AuthContextType, User } from "../types/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userData, setUserData] = useState<User>({
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    currentPassword: "",
    newPassword: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        await getCurrentUser();
        await fetchUserData();
      }
      // else {
      // cleanupAuth();
      // }
    };
    initializeAuth();
  }, [token]);

  const cleanupAuth = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    setUser(null);
  };
  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/user");
      setUser(data.data);
      toast.success("Welcome back, " + data.data.name);
    } catch (error: any) {
      toast.error("Failed to fetch user data");
      if (error.response?.status === 401) {
        // cleanupAuth();
        console.log("timed out");
      } else {
        console.log(error.response?.data?.message || "Failed to get user data");
      }
    }
  };

  // Auth functions remain the same
  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      toast.success("Login successful!");
    } catch (error: any) {
      console.log(error.data.error);

      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Register function

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error("Registration failed " + error);
      console.log(error.data.error);
    } finally {
      setLoading(false);
    }
  };

  // fetch user data after login/register
  const fetchUserData = async () => {
    try {
      const { data } = await api.get("/auth/user"); // assumes /api/auth/user
      setUserData(data.data);

      setFormData((prev) => ({
        ...prev,
        name: data.data.name || "",
        phone: data.data.phone || "",
        address: data.data.address || "",
      }));

      toast.success("User data fetched successfully!");
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      toast.error("Failed to fetch user data");
    }
  };

  // settings functions
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update user profile function

  const updateUserProfile = async () => {
    try {
      const response = await api.put("/auth/user/update", {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        currentPassword: formData.currentPassword,
        password: formData.newPassword,
      });

      if (response.data && response.data.data) {
        setUserData(response.data.data);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // Logout function

  const logout = () => {
    toast.success("Logout successful!");
    cleanupAuth();
    setToken(null);
    setUser(null);
    // setCartItems([]);
    // setOrders([]);
    // setFavorites([]);
  };
  const fetchAdminList = async () => {
    try {
      const { data } = await api.get("/chat/fetchAdmin");
      return data.data || [];
    } catch (error: any) {
      console.log(
        error.response?.data?.message || "Failed to fetch admin list",
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isEditing,
        loading,
        token,
        formData,
        login,
        logout,
        register,
        userData,
        updateUserProfile,
        handleInputChange,
        fetchAdminList,
        fetchUserData,
        setIsEditing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
