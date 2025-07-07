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

const ProfilePage = () => {
  const {
    user,
    logout,
    userData,
    formData,
    isEditing,
    setIsEditing,
    handleInputChange,
    favorites,
    updateUserProfile,
    fetchProductById,
    orders,
  } = useStore();

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

  const renderTabContent = () => {
    if (activeTab === "profile") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Personal Information
            </h2>
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center text-orange-500 hover:text-orange-600"
              >
                <Edit className="mr-1" size={18} /> Edit
              </motion.button>
            ) : (
              <div className="flex space-x-3">
                <motion.button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={updateUserProfile}
                  className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Save
                </motion.button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-gray-500">Name</div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                />
              ) : (
                <div className="flex-1 font-medium">{userData?.name}</div>
              )}
            </div>

            <div className="flex items-center">
              <div className="w-24 text-gray-500">Email</div>
              <div className="flex-1 font-medium text-gray-600">
                {userData?.email}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 text-gray-500">Phone</div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                />
              ) : (
                <div className="flex-1 font-medium">{userData?.phone}</div>
              )}
            </div>

            <div className="flex items-start">
              <div className="w-24 text-gray-500">Address</div>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData?.address}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1 resize-none"
                  rows={2}
                />
              ) : (
                <div className="flex-1 font-medium">{userData?.address}</div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Change Password
              </h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-36 text-gray-500">Current Password</div>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData?.currentPassword}
                    onChange={handleInputChange}
                    className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                  />
                </div>

                <div className="flex items-center">
                  <div className="w-36 text-gray-500">New Password</div>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData?.newPassword}
                    onChange={handleInputChange}
                    className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      );
    }

    if (activeTab === "orders") {
      return (
        <motion.div className="bg-white p-6 rounded-xl shadow-sm">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-10">
              <Heart size={50} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium">No Orders yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Buy items to view them here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="mb-6 border-b pb-4">
                <h4 className="font-semibold text-lg text-gray-800 mb-1">
                  Order ID: {order._id}
                </h4>
                <p className="text-sm text-gray-500 mb-1">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Payment Method:{" "}
                  <span className="font-medium capitalize">
                    {order.paymentMethod}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Shipping Address:{" "}
                  <span className="font-medium">{order.shippingAddress}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Paid:{" "}
                  <span
                    className={`font-medium ${
                      order.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.isPaid ? "Yes" : "No"}
                  </span>
                </p>

                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full">
                  {order.items.map((item, index) => {
                    let id: string;
                    if (typeof item.product === "string") {
                      id = item.product;
                    } else {
                      id = item.product._id;
                    }
                    const product = orderProducts[id];

                    return (
                      <div
                        key={index}
                        className="border p-3 rounded-lg shadow-sm flex flex-col items-center"
                      >
                        {product ? (
                          <>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded mb-2"
                            />
                            <p className="font-semibold text-gray-800">
                              {product.name}
                            </p>
                          </>
                        ) : (
                          <p className="text-gray-400">Loading product...</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-2 font-bold text-orange-500">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium">{order.orderStatus}</span>
                </p>
              </div>
            ))
          )}
        </motion.div>
      );
    }

    if (activeTab === "favorites") {
      const visibleFavorites = favorites.slice(0, 5);
      return (
        <motion.div className="bg-white p-6 rounded-2xl shadow-lg">
          {favorites.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
              {visibleFavorites.map((item: any) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-xl transition-shadow duration-300 group bg-gradient-to-tr from-white to-gray-50"
                >
                  <div className="relative w-full h-full mb-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="font-semibold text-gray-800 text-center text-lg">
                    {item.product.name}
                  </div>
                  <div className="text-orange-500 font-bold mt-2 text-base">
                    ${item.product.price}
                  </div>
                </div>
              ))}

              {favorites.length > 5 && (
                <Link
                  to="/favourites"
                  className="flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all flex items-center justify-center gap-4 group bg-gradient-to-tr from-white to-gray-50"
                  >
                    <div className="p-6 text-center">
                      <div className="text-orange-500 text-4xl font-bold mb-2">
                        +{favorites.length - 5}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Show More Favourites
                      </h3>
                      <ChevronRight className="w-8 h-8 mx-auto mt-2 text-orange-500" />
                    </div>
                  </motion.div>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 py-10">
              <Heart size={50} className="text-gray-300 mb-4" />
              <p className="text-lg font-medium">No favorites yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Add items to your favorites to view them here.
              </p>
            </div>
          )}
        </motion.div>
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
