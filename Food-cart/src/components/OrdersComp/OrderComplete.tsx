import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const OrderComplete = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md bg-white rounded-3xl shadow-lg p-10 text-center">
        <div className="flex justify-center mb-6">
          <FiCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We've sent a confirmation
          email with your order details.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-500 mt-1">
            Estimated delivery:{" "}
            {new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
          </p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-blue-600 text-white rounded-xl py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-gray-100 text-gray-700 rounded-xl py-3 font-medium hover:bg-gray-200 transition-colors"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
