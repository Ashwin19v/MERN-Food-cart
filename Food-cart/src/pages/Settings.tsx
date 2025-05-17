import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Edit,
  Lock,
  MapPin,
  Clock,
  Heart,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Apt 4B, New York, NY 10001",
  });
  const [formData, setFormData] = useState({ ...userData });

  const orders = [
    {
      id: "#ORD-78901",
      date: "2023-05-15",
      items: ["Cheesy Burger", "French Fries", "Coke"],
      total: 18.97,
      status: "Delivered",
    },
    {
      id: "#ORD-78900",
      date: "2023-05-10",
      items: ["California Sushi", "Miso Soup"],
      total: 24.5,
      status: "Delivered",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
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
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center text-orange-500 hover:text-orange-600"
                >
                  <Edit className="mr-1" size={18} /> Edit
                </motion.button>
              ) : (
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
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
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 border-b border-gray-300 focus:border-orange-500 outline-none py-1"
                  />
                ) : (
                  <div className="flex-1 font-medium">{userData.email}</div>
                )}
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

            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Security
              </h3>
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-orange-500 hover:text-orange-600"
              >
                <Lock className="mr-2" size={18} /> Change Password
              </motion.button>
            </div>
          </motion.div>
        );

      case "orders":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800">{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Items:
                    </h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {order.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500">
                      <Clock className="mr-1" size={16} />
                      <span className="text-sm">30-45 min delivery</span>
                    </div>
                    <div className="text-lg font-bold text-orange-500">
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="text-gray-400 mb-4 flex justify-center">
                  <ShoppingCart size={48} />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No orders yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Your order history will appear here
                </p>
                <Link
                  to="/menu"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium inline-block hover:bg-orange-600 transition-colors"
                >
                  Browse Menu
                </Link>
              </motion.div>
            )}
          </motion.div>
        );

      case "favorites":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[].length > 0 ? (
              // Render favorites list here
              <></>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center col-span-full"
              >
                <div className="text-gray-400 mb-4 flex justify-center">
                  <Heart size={48} className="fill-gray-200" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Tap the heart icon on menu items to save them here
                </p>
                <Link
                  to="/menu"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium inline-block hover:bg-orange-600 transition-colors"
                >
                  Browse Menu
                </Link>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8"
        >
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
                    <User className="text-orange-500" size={40} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full shadow-md"
                  >
                    <Edit size={16} />
                  </motion.button>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {userData.name}
                </h2>
                <p className="text-gray-500 text-sm">{userData.email}</p>
              </div>

              <nav className="space-y-2">
                <motion.button
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
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
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
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
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
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
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left px-4 py-3 rounded-lg flex items-center text-gray-600 hover:bg-gray-100 mt-8"
                >
                  <LogOut className="mr-3" size={18} />
                  Sign Out
                </motion.button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
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
