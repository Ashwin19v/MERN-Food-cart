import { motion } from "framer-motion";
import { useState } from "react";
import OrderDetails from  "../components/layout/OrderDetails";
const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    items: [
      { name: "Cheeseburger", quantity: 2, price: 8.99 },
      { name: "French Fries", quantity: 1, price: 3.99 },
      { name: "Soda", quantity: 2, price: 2.49 },
    ],
    total: 26.45,
    status: "Preparing",
    date: "2023-05-15 10:30",
    address: "123 Main St, City, Country",
    phone: "+1 234 567 8901",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    items: [
      { name: "Pepperoni Pizza", quantity: 1, price: 12.99 },
      { name: "Garlic Bread", quantity: 1, price: 4.99 },
    ],
    total: 17.98,
    status: "Pending",
    date: "2023-05-15 11:15",
    address: "456 Oak Ave, City, Country",
    phone: "+1 345 678 9012",
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    items: [
      { name: "Chicken Sandwich", quantity: 1, price: 7.99 },
      { name: "Onion Rings", quantity: 1, price: 4.49 },
      { name: "Iced Tea", quantity: 1, price: 2.99 },
    ],
    total: 15.47,
    status: "Ready",
    date: "2023-05-15 12:45",
    address: "789 Pine Rd, City, Country",
    phone: "+1 456 789 0123",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    items: [
      { name: "Veggie Burger", quantity: 1, price: 9.99 },
      { name: "Sweet Potato Fries", quantity: 1, price: 4.99 },
      { name: "Smoothie", quantity: 1, price: 5.99 },
    ],
    total: 20.97,
    status: "Completed",
    date: "2023-05-14 18:30",
    address: "321 Elm St, City, Country",
    phone: "+1 567 890 1234",
  },
  {
    id: "#ORD-005",
    customer: "Michael Wilson",
    items: [
      { name: "BBQ Ribs", quantity: 1, price: 15.99 },
      { name: "Coleslaw", quantity: 1, price: 3.99 },
      { name: "Beer", quantity: 2, price: 5.99 },
    ],
    total: 31.96,
    status: "Cancelled",
    date: "2023-05-14 19:45",
    address: "654 Maple Dr, City, Country",
    phone: "+1 678 901 2345",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-blue-100 text-blue-800",
  Ready: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
};

const statusOptions = [
  "Pending",
  "Preparing",
  "Ready",
  "Completed",
  "Cancelled",
];

const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold text-gray-800"
      >
        Order Management
      </motion.h1>

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
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full md:w-64"
          />
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedOrder(order)}
                      className="text-indigo-600 hover:text-indigo-900"
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

      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrderList;
