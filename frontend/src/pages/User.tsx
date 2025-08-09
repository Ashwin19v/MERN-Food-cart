import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useApp } from "../store/Context";
import OrderDetails from "../components/layout/OrderDetails";
import type { CartItem, Order, Product, User } from "../lib/type/type";

const UserManagement = () => {
  const {
    customers,
    getOrderById,
    getUserCart,
    getUserFavorites,
    getCustomers,
    deleteUser,
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[] | []>([]);
  const [userCart, setUserCart] = useState<CartItem[]>([]);
  const [userFavorites, setUserFavorites] = useState<Product[]>([]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activeTab, setActiveTab] = useState("orders");
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = customers.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getCustomers();
  }, []);

  const handleViewUserDetails = async (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
    setActiveTab("orders");

    try {
      // Fetch user orders
      const orders = await getOrderById(user._id);
      const cartItems = await getUserCart(user._id);
      const favorites = await getUserFavorites(user._id);
      setUserCart(
        Array.isArray(cartItems) ? cartItems : cartItems ? [cartItems] : []
      );
      setUserFavorites(
        Array.isArray(favorites) ? favorites : favorites ? [favorites] : []
      );

      setUserOrders(Array.isArray(orders) ? orders : orders ? [orders] : []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(userId);
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    setUserOrders([]);
  };

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold text-gray-800"
      >
        User Management
      </motion.h1>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
          />
        </div>
        <div className="text-sm text-gray-600">
          Total Users: {customers.length}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delete
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      onClick={() => handleDeleteUser(user._id)}
                      className={`px-2 inline-flex text-sm text-white leading-5 font-semibold rounded-full bg-red-500`}
                    >
                      Delete
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewUserDetails(user)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      View Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedUser.name}'s Details
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedUser.email}
                    </p>
                  </div>
                  <button
                    onClick={closeUserModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6 border-b">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`pb-2 px-1 text-sm font-medium ${
                      activeTab === "orders"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Orders ({userOrders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("cart")}
                    className={`pb-2 px-1 text-sm font-medium ${
                      activeTab === "cart"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Cart
                  </button>
                  <button
                    onClick={() => setActiveTab("favorites")}
                    className={`pb-2 px-1 text-sm font-medium ${
                      activeTab === "favorites"
                        ? "text-indigo-600 border-b-2 border-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Favourites
                  </button>
                </div>

                {/* Tab Content */}
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Orders Tab */}
                  {activeTab === "orders" && (
                    <div className="space-y-4">
                      {userOrders.length > 0 ? (
                        userOrders.map((order) => (
                          <div
                            key={order._id}
                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                            onClick={() => handleViewOrder(order)}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">
                                  Order #{order._id.slice(-8)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {order.items.length} item(s)
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  ${order.totalAmount.toFixed(2)}
                                </p>
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    order.orderStatus === "delivered"
                                      ? "bg-green-200 text-green-800"
                                      : order.orderStatus === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-300 text-blue-800"
                                  }`}
                                >
                                  {order.orderStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No orders found
                        </p>
                      )}
                    </div>
                  )}
                  {activeTab === "cart" && (
                    <div className="space-y-4">
                      {userCart.length > 0 ? (
                        userCart.map((cart) =>
                          cart.items.map((item) => (
                            <div
                              key={item._id}
                              className="border rounded-lg p-4 hover:bg-gray-50"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-4">
                                  {item.product?.image && (
                                    <img
                                      src={item.product.image}
                                      alt={item.product.name}
                                      className="w-16 h-16 rounded-lg object-cover"
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium">
                                      {item.product?.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Quantity: {item.quantity}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      Price: $
                                      {item.product?.price?.toFixed(2) ||
                                        "0.00"}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">
                                    $
                                    {(
                                      item.quantity * (item.product?.price || 0)
                                    ).toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    Added:{" "}
                                    {new Date(
                                      cart.createdAt ?? ""
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No items in cart
                        </p>
                      )}
                    </div>
                  )}

                  {activeTab === "favorites" && (
                    <div className="space-y-4">
                      {userFavorites.length > 0 ? (
                        userFavorites.map((fav) => (
                          <div
                            key={fav._id}
                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center space-x-4">
                                {fav.product?.image && (
                                  <img
                                    src={fav.product.image}
                                    alt={fav.product.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium">
                                    {fav.product?.name || "Product"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Category: {fav.product?.category || "N/A"}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Price: $
                                    {fav.product?.price?.toFixed(2) || "0.00"}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center text-red-500">
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Added:{" "}
                                  {new Date(
                                    fav.createdAt ?? ""
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No favorite items found
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showOrderDetails && selectedOrder && (
          <OrderDetails order={selectedOrder} onClose={closeOrderDetails} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;
