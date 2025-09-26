import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import type { Order, Product } from "../../types/types";

const OrdersComp = ({
  orders,
  orderProducts,
}: {
  orders: Order[];
  orderProducts: Record<string, Product>;
}) => {
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
              Status: <span className="font-medium">{order.orderStatus}</span>
            </p>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default OrdersComp;
