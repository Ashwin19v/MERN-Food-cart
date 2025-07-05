import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Edit,
  Heart,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useStore } from "../context/store";
import { useState } from "react";

const ProfilePage = () => {
  const {
    user,
    userData,
    formData,
    isEditing,
    setIsEditing,
    setFormData,
    handleInputChange,
    updateUserProfile,
  } = useStore();

  const [activeTab, setActiveTab] = useState("profile");

  const orders = [
    {
      id: "#ORD-78901",
      date: "2023-05-15",
      items: ["Cheesy Burger", "French Fries", "Coke"],
      total: 18.97,
      status: "Delivered",
    },
  ];

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
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                />
              ) : (
                <div className="flex-1 font-medium">{userData.name}</div>
              )}
            </div>

            <div className="flex items-center">
              <div className="w-24 text-gray-500">Email</div>
              <div className="flex-1 font-medium text-gray-600">
                {userData.email}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 text-gray-500">Phone</div>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                />
              ) : (
                <div className="flex-1 font-medium">{userData.phone}</div>
              )}
            </div>

            <div className="flex items-start">
              <div className="w-24 text-gray-500">Address</div>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1 resize-none"
                  rows={2}
                />
              ) : (
                <div className="flex-1 font-medium">{userData.address}</div>
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
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                  />
                </div>

                <div className="flex items-center">
                  <div className="w-36 text-gray-500">New Password</div>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
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
          {orders.map((order) => (
            <div key={order.id} className="mb-6 border-b pb-4">
              <h4 className="font-semibold">{order.id}</h4>
              <p className="text-sm text-gray-500">{order.date}</p>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {order.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-orange-500">
                Total: ${order.total}
              </p>
            </div>
          ))}
        </motion.div>
      );
    }

    if (activeTab === "favorites") {
      return (
        <motion.div className="bg-white p-6 rounded-xl shadow-sm text-center text-gray-500">
          <Heart size={40} className="mx-auto text-gray-300 mb-4" />
          No favorites yet.
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

                <motion.button className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 mt-8">
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
