import { motion } from "framer-motion";
import type { CartItem } from "../types/types";
import { Trash2 } from "lucide-react";


const cartProduct = (
    {  item, updateCartQuantity, removeFromCart }:
    { item: CartItem; updateCartQuantity: (id: string, quantity: number) => void; removeFromCart: (id: string) => void; }
) => {
  return (
    <motion.div
      key={item._id}
      layout
      className="bg-white rounded-xl shadow-sm flex flex-col sm:flex-row overflow-hidden"
    >
      <div className="sm:w-32 h-32 flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-medium text-gray-800">
            {item.product.name}
          </h3>
          <p className="text-orange-500 font-bold">
            ${item.product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              updateCartQuantity(item.product._id, item.quantity - 1)
            }
            disabled={item.quantity <= 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() =>
              updateCartQuantity(item.product._id, item.quantity + 1)
            }
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(item.product._id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default cartProduct