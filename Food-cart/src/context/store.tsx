import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import axios from "axios";
import type {
  User,
  CartItem,
  Order,
  FavoriteItem,
  StoreContextType,
  Product,
} from "../types/types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);

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
    if (!token) return;

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

  // fetch products by category

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
        if (!token) return null;
        const response = await api.get(`/products/${productId}`);
        return response.data.data || null;
      } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
      }
    },
    [token]
  );

  // cleanup auth function

  const cleanupAuth = () => {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    setUser(null);
  };

  // get current user data
  // This function fetches the current user data from the server

  const getCurrentUser = async () => {
    try {
      const { data } = await api.get("/auth/user");
      setUser(data.data);
      toast.success("Welcome back, " + data.data.name);
    } catch (error: any) {
      toast.error("Failed to fetch user data");
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
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error("Login failed");
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration successful!");
    } catch (error: any) {
      toast.error("Registration failed");
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

      toast.success("User data fetched successfully!");
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      toast.error("Failed to fetch user data");
    }
  };

  // settings functions
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    setCartItems([]);
    setOrders([]);
    setFavorites([]);
  };

 
  useEffect(() => {
    // getFavorites();
    getCartItems();
    getOrders();
  }, []);

  // Cart functions remain the same
  const getCartItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/cart");
      setCartItems(data.data.items);
      toast.success("Cart items fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch cart items");
      setError(error.response?.data?.message || "Failed to fetch cart items");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add to cart function

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

      // console.log("Cart Response:", data); // ✅ LOG RESPONSE
      setCartItems(data.data.items);
      toast.success("Item added to cart!");
    } catch (error: any) {
      toast.error("Failed to add to cart");
      console.error(
        "Failed to add to cart:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Remove from cart function

  const removeFromCart = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/cart/items/${id}`);
      getCartItems();
      toast.success("Item removed from cart!");
    } catch (error: any) {
      toast.error("Failed to remove item");
      setError(error.response?.data?.message || "Failed to remove item");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update cart quantity function

  const updateCartQuantity = async (productId: string, quantity: number) => {
    setIsLoading(true);
    try {
      const { data } = await api.put("/cart/update", {
        productId,
        quantity,
      });
      setCartItems(data.data.items);
      toast.success("Cart quantity updated successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update quantity");
      toast.error("Failed to update quantity");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart function

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await api.delete("/cart/clear");
      setCartItems([]);
      toast.success("Cart cleared successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to clear cart");
      toast.error("Failed to clear cart");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Other functions (orders, favorites, reviews) remain the same
  const getOrders = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/orders/get");
      setOrders(data.data);
      toast.success("Orders fetched successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch orders");
      toast.error("Failed to fetch orders");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Create order function

  const createOrder = async (orderData: Partial<Order>) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/orders/add", orderData);
      setOrders((prev) => [...prev, data.data]);
      await clearCart();
      toast.success("Order created successfully!");
    } catch (error: any) {
      console.log(error);

      setError(error.response?.data?.error || "Failed to create order");
      toast.error("Failed to create order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel order function

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
    setLoading(true);
    try {
      const { data } = await api.get("/favorites/get");
      setFavorites(data.data);
      toast.success("Favorites fetched successfully!");
    } catch (error: any) {
      toast.error("Failed to fetch favorites");
      setError(error.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  // Add to favorites function

  const addToFavorites = async (productId: string) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/favorites/add", { productId });
      setFavorites((prev) => [...prev, data.data]);
      toast.success("Item added to favorites!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add to favorites");
      toast.error("Failed to add to favorites");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove from favorites function

  const removeFromFavorites = async (productId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/favorites/${productId}`);
      getFavorites();
      toast.success("Item removed from favorites!");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to remove from favorites"
      );
      toast.error("Failed to remove from favorites");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Review functions
  // Fetch reviews for a product when productId changes
  const getProductReviews = useCallback(async (productId: string) => {
    try {
      const { data } = await api.get(`/reviews/${productId}`);
      return data.data || [];
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch reviews");
      return [];
    }
  }, []);

  //  Add review function

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
      toast.success("Review added successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to add review");
      toast.error("Failed to add review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  //  Update review function

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
      toast.success("Review updated successfully!");
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to update review");
      toast.error("Failed to update review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete review function
  const deleteReview = async (reviewId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete review");
      setError(error.response?.data?.message || "Failed to delete review");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle review edit and delete

  const handleReviewDelete = async (reviewId: string) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await deleteReview(reviewId);
    }
  };

  // Calculate cart total

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const fetchAdminList = async () => {
    try {
      const { data } = await api.get("/chat/fetchAdmin");
      return data.data || [];
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch admin list");
      return [];
    }
  };

  return (
    <StoreContext.Provider
      value={{
        loading,
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

        fetchUserData,

        handleReviewDelete,
        fetchAdminList,
      }}
    >
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
