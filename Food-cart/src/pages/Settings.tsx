import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Edit,
  Heart,
  ShoppingCart,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useStore } from "../context/store";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Product } from "../types/types";
import { useProduct } from "../context/productStore";
import { useAuth } from "../context/authStore";
import { useFavourite } from "../context/favouriteStore";
import { useOrder } from "../context/orderStore";
import ProfileComp from "../components/SettingsComp/ProfileComp";
import OrdersComp from "../components/SettingsComp/OrdersComp";
import FavComp from "../components/SettingsComp/FavComp";

const ProfilePage = () => {
  const {
    user,
    loading,
    userData,
    formData,
    logout,
    isEditing,
    setIsEditing,
    handleInputChange,
    updateUserProfile,
  } = useAuth();
  const { fetchProductById } = useProduct();
  const { favorites } = useFavourite();
  const { orders, getOrders } = useOrder();

  const [activeTab, setActiveTab] = useState("profile");
  const [orderProducts, setOrderProducts] = useState<Record<string, Product>>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productMap: Record<string, Product> = {};

      for (const order of orders) {
        for (const item of order.items) {
          let id: string;
          if (typeof item.product === "string") {
            id = item.product;
          } else {
            id = item.product._id;
          }
          if (!productMap[id]) {
            const product = await fetchProductById(id);
            if (product) {
              productMap[id] = product;
            }
          }
        }
      }

      setOrderProducts(productMap);
    };

    fetchAllProducts();
  }, [orders]);

  useEffect(() => {
    getOrders();
  }, []);

  const renderTabContent = () => {
    if (activeTab === "profile") {
      return (
        <ProfileComp
          handleInputChange={handleInputChange}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          userData={userData ?? {}}
          formData={formData ?? {}}
          updateUserProfile={updateUserProfile}
        />
      );
    }

    if (activeTab === "orders") {
      return <OrdersComp orders={orders} orderProducts={orderProducts} />;
    }

    if (activeTab === "favorites") {
      const visibleFavorites = favorites.slice(0, 5);
      return (
        <FavComp visibleFavorites={visibleFavorites} favorites={favorites} />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                  <User className="text-orange-500" size={40} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>

              <nav className="space-y-2">
                <motion.button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeTab === "profile"
                      ? "bg-orange-100 text-orange-500 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <User className="mr-3" size={18} />
                  Profile
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeTab === "orders"
                      ? "bg-orange-100 text-orange-500 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingCart className="mr-3" size={18} />
                  My Orders
                </motion.button>

                <motion.button
                  onClick={() => setActiveTab("favorites")}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeTab === "favorites"
                      ? "bg-orange-100 text-orange-500 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Heart className="mr-3" size={18} />
                  Favorites
                </motion.button>

                <motion.button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 mt-8"
                >
                  <LogOut className="mr-3" size={18} />
                  Sign Out
                </motion.button>
              </nav>
            </div>
          </div>

          <div className="md:w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
