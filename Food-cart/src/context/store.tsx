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
  Order,
  Review,
  FavoriteItem,
  StoreContextType,
  Product,
} from "../types/types";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);

  const [userData, setUserData] = useState<User>({
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

  const [isEditing, setIsEditing] = useState(false);

  

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

  const fetchPopularProducts = async () => {
    if (!token) return; // ✅ don't fetch if no token

    setIsLoading(true);
    try {
      const response = await api.get("/products");
      const popular = response.data.data?.slice(0, 3) || [];
      setPopularProducts(popular);
    } catch (error) {
      console.error("Error fetching popular products:", error);
      setPopularProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const fetchProductById = async (
    productId: string
  ): Promise<Product | null> => {
    try {
      if (!token) return null;
      const response = await api.get(`/products/${productId}`);
      return response.data.data || null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  };

  const cleanupAuth = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    setUser(null);
  };

  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/user");
      setUser(data.data);
      console.log("Current user data:", data.data); // ✅ LOG USER DATA
    } catch (error: any) {
      if (error.response?.status === 401) {
        // cleanupAuth();
        setError("Session expired. Please login again.");
      } else {
        setError(error.response?.data?.message || "Failed to get user data");
      }
    }
  };

  // Auth functions remain the same
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      console.log("Login successful, token:", data.token); // ✅ LOG TOKEN
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", { name, email, password });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
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
    } catch (err) {
      console.error("Failed to fetch user data:", err);
    }
  };


  // settings functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        alert("Profile updated successfully!");
      } else {
        alert("Unexpected response");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Update failed");
    }
  };

  const logout = () => {
    cleanupAuth();
    setToken(null);
    setUser(null);
    setCartItems([]);
    setOrders([]);
    setFavorites([]);
  };

  // Cart functions remain the same
  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCartItems(data.data.items);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch cart items");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getCartItems();
      getFavorites();
    }
  }, [token]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!token) {
      setError("Please login to add items to cart");
      return;
    }

    try {
      const { data } = await api.post("/cart/add", {
        productId,
        quantity,
      });

      console.log("Cart Response:", data); // ✅ LOG RESPONSE
      setCartItems(data.data.items);
    } catch (error: any) {
      console.error(
        "Failed to add to cart:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const removeFromCart = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/cart/items/${id}`);
      getCartItems();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to remove item");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.put("/cart/update", {
        productId,
        quantity,
      });
      setCartItems(data.data.items);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update quantity");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to clear cart");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Other functions (orders, favorites, reviews) remain the same
  const getOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/orders/me");
      setOrders(data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (orderData: Partial<Order>) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/orders", orderData);
      setOrders((prev) => [...prev, data.data]);
      await clearCart();
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      await api.post(`/orders/${orderId}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to cancel order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Favorite functions
  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/favorites/get");
      setFavorites(data.data);
      // setIsLoading(false);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch favorites");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/favorites/add", { productId });
      setFavorites((prev) => [...prev, data.data]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add to favorites");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/favorites/${productId}`);
      getFavorites();
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to remove from favorites"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Review functions
  const getProductReviews = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/reviews/${productId}`);
      setReviews(data.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch reviews");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = async (
    productId: string,
    rating: number,
    comment: string
  ) => {
    setIsLoading(true);
    try {
      const { data } = await api.post(`/reviews/add`, {
        productId,
        rating,
        comment,
      });
      setReviews((prev) => [...prev, data.data]);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateReview = async (
    reviewId: string,
    rating: number,
    comment: string
  ) => {
    setIsLoading(true);
    try {
      const { data } = await api.put(`/reviews/${reviewId}`, {
        rating,
        comment,
      });
      setReviews((prev) =>
        prev.map((review) => (review._id === reviewId ? data.data : review))
      );
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/reviews/${reviewId}`);
      // kjkisjc
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to delete review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ...

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        getOrders,
        createOrder,
        cancelOrder,
        favorites,
        getFavorites,
        addToFavorites,
        removeFromFavorites,
        reviews,
        getProductReviews,
        addReview,
        updateReview,
        deleteReview,
        isLoading,
        error,

        fetchPopularProducts,
        popularProducts,
        activeCategory,
        setActiveCategory,
        getCartItems,

        fetchProductsByCategory,

        fetchProductById,

        categoryProducts,
        setCategoryProducts,


        userData,
        formData,
        isEditing,
        setIsEditing,
        setFormData,
        handleInputChange,
        updateUserProfile,
        setUserData,

        fetchUserData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};
