import { motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "../../store/Context";

const OrderDetails = ({ order, onClose }) => {
  const { updateOrderStatus } = useApp();
  const [status, setStatus] = useState(order.status);
  const [isSaving, setIsSaving] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateOrderStatus(order._id, status, order.isPaid);
      onClose();
    } catch (err) {
      console.error("Failed to update order status", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Order Details - {order._id}
            </h3>
            <button
              onClick={onClose}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Customer Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span> {order.user.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Phone:</span> {order.user.phone}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Address:</span>{" "}
                  {order.ShippingAddress}
                </p>
              </div>

              <h4 className="text-md font-medium text-gray-900 mt-6 mb-2">
                Order Summary
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex justify-between"
                    >
                      <span className="text-sm text-gray-700">
                        {item.quantity}x {item.product}
                      </span>
                      <span className="text-sm text-gray-700">
                        ${item.quantity * item.price}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">
                    {order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Order Status
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update Status
                  </label>
                  <select
                    value={status}
                    onChange={handleStatusChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  {[
                    "Pending",
                    "Preparing",
                    "Ready",
                    "Completed",
                    "Cancelled",
                  ].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full mr-2 ${
                          status === step ? getStatusColor(step) : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          status === step
                            ? "font-medium text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="text-md font-medium text-gray-900 mt-6 mb-2">
                Delivery Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Person
                  </label>
                  <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Select delivery person</option>
                    <option>John Smith (Available)</option>
                    <option>Sarah Johnson (On delivery)</option>
                    <option>Michael Brown (Available)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Delivery Time
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="30-45 minutes"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Close
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500";
    case "Preparing":
      return "bg-blue-500";
    case "Ready":
      return "bg-green-500";
    case "Completed":
      return "bg-gray-500";
    case "Cancelled":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};

export default OrderDetails;
