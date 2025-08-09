
import { useStore } from "../context/store";
import { motion, AnimatePresence } from "framer-motion";
import {  ShoppingCart, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CartProduct from "../components/cartProduct";

const CartPage = () => {
  const { cartItems, updateCartQuantity, removeFromCart, isLoading,cartTotal } =
    useStore();

 
  const deliveryFee = 2.99;
  const total = cartTotal + deliveryFee;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <motion.h1
                whileHover={{ x: 5 }}
                className="text-3xl font-bold text-gray-800 flex items-center"
              >
                <ShoppingCart className="mr-3 text-orange-500" />
                Your Cart
              </motion.h1>
              <Link
                to="/menu"
                className="text-orange-500 hover:text-orange-600 flex items-center"
              >
                <ChevronLeft className="mr-1" size={18} />
                Continue Shopping
              </Link>
            </div>

            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl shadow-sm p-8 text-center"
                >
                  <div className="text-gray-400 mb-4 flex justify-center">
                    <ShoppingCart size={48} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Looks like you haven't added anything to your cart yet
                  </p>
                  <Link
                    to="/menu"
                    className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Browse Menu
                  </Link>
                </motion.div>
              ) : (
                <motion.div layout className="space-y-4">
                  {cartItems.map((item) => (
                    <CartProduct
                      key={item._id}
                      item={item}
                      updateCartQuantity={updateCartQuantity}
                      removeFromCart={removeFromCart}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <motion.div
              className="md:w-1/3 bg-white rounded-xl shadow-sm p-6 sticky top-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-gray-800 font-bold">Total</span>
                  <span className="text-orange-500 font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block text-center text-md text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-4 mt-4"
              >
                Proceed to Checkout
              </Link>
             
              <p className="text-center text-sm text-gray-500 mt-4">
                Free delivery for orders over $20
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
