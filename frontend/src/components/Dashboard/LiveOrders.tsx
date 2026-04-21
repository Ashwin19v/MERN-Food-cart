import { motion } from "framer-motion";

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Ready"
  | "Completed"
  | "Cancelled";

const orders: {
  id: string;
  items: string;
  status: OrderStatus;
  time: string;
}[] = [
  {
    id: "#ORD-001",
    items: "Burger, Fries, Coke",
    status: "Preparing",
    time: "2 mins ago",
  },
  {
    id: "#ORD-002",
    items: "Pizza, Salad",
    status: "Pending",
    time: "5 mins ago",
  },
  {
    id: "#ORD-003",
    items: "Sandwich, Juice",
    status: "Ready",
    time: "10 mins ago",
  },
  {
    id: "#ORD-004",
    items: "Pasta, Garlic Bread",
    status: "Completed",
    time: "15 mins ago",
  },
  {
    id: "#ORD-005",
    items: "Steak, Mashed Potatoes",
    status: "Preparing",
    time: "20 mins ago",
  },
];

const statusColors: Record<OrderStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Preparing: "bg-blue-100 text-blue-800",
  Ready: "bg-green-100 text-green-800",
  Completed: "bg-gray-100 text-gray-800",
  Cancelled: "bg-red-100 text-red-800",
};

const LiveOrders = () => {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Live Order Tracking
      </h3>
      <div className="space-y-3">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 bg-white rounded-lg shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{order.id}</p>
                <p className="text-sm text-gray-500">{order.items}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">{order.time}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LiveOrders;
