import { motion } from "framer-motion";
import { useState } from "react";

import type { Order } from "../../lib/type/type";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { getStatusColor } from "../../lib/comp/utils";
import { useOrder } from "../../store/orderStore";

const OrderDetails = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) => {
  const { updateOrderStatus, deleteOrderById } = useOrder();
  const [status, setStatus] = useState<Order["orderStatus"]>(order.orderStatus);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deliveryPerson, setDeliveryPerson] = useState<string>(
    order.deliveryPerson || ""
  );
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState<string>(
    order.estimatedDeliveryTime || ""
  );

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as Order["orderStatus"]);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateOrderStatus(
        order._id,
        status,
        order.isPaid,
        deliveryPerson,
        estimatedDeliveryTime
      );
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
              <IoMdClose />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-900 mb-2">
                Customer Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Name:</span>{" "}
                  {order.user?.name || "Unknown User"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {order.user?.email || "Unknown Email"}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Phone:</span>{" "}
                  {order.user?.phone || "N/A"}
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
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        {item.product?.image && (
                          <img
                            src={item.product.image}
                            alt={item.product?.name || "Product"}
                            className="w-8 h-8 rounded object-cover mr-2"
                          />
                        )}
                        <div>
                          <span className="text-sm text-gray-700">
                            {item.quantity}x{" "}
                            {item.product?.name || "Product not found"}
                          </span>
                          {item.product?.price && (
                            <div className="text-xs text-gray-500">
                              ${item.product.price} each
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {item.product?.price
                          ? `$${(item.quantity * item.product.price).toFixed(
                              2
                            )}`
                          : "Price unavailable"}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="text-xs text-gray-400">
                    inclusive of all taxes
                  </span>
                  <span className="font-medium text-gray-900">
                    {order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between bg-red-50 p-3 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <MdDelete className="text-red-500 text-xl" />
                  <span className="text-red-700 font-medium">Delete Order</span>
                </div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this order?"
                      )
                    ) {
                      deleteOrderById(order._id);
                      onClose();
                    }
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold transition"
                  title="Delete this order"
                >
                  Delete
                </button>
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
                    <option value="pending">pending</option>
                    <option value="preparing">preparing</option>
                    <option value="ready">ready</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  {[
                    "pending",
                    "preparing",
                    "ready",
                    "delivered",
                    "cancelled",
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
                  <select
                    value={deliveryPerson}
                    onChange={(e) => setDeliveryPerson(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select delivery person</option>
                    <option value="John Smith">John Smith (Available)</option>
                    <option value="Sarah Johnson">
                      Sarah Johnson (On delivery)
                    </option>
                    <option value="Michael Brown">
                      Michael Brown (Available)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Delivery Time
                  </label>
                  <input
                    type="text"
                    value={estimatedDeliveryTime}
                    onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
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



export default OrderDetails;
