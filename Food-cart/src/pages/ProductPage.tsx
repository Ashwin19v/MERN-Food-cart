import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiHeart, FiStar } from "react-icons/fi";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import ReviewPage from "./Review";
import type { Product } from "../types/types";

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  // console.log(productId)
  const { fetchProductById, addToCart, addToFavorites } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  // const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!productId) return;
  const fetchData = async () => {
    console.log("Fetching product for ID:", productId);
    // setLoading(true);
    const data = await fetchProductById(productId);
    if (!data) {
      setError("Product not found.");
    } else {
      setProduct(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [productId]);

  const handleOnClick = async () => {
    try {
      await addToCart(productId, quantity);
      // console.log("Item added successfully");
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-xl font-medium">Loading...</div>
    );
  if (error || !product)
    return (
      <div className="text-center text-red-500 py-20">
        {error || "Something went wrong."}
      </div>
    );

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      // onClick={onClick}
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/dashboard" className="hover:text-gray-900">
                Home
              </a>
            </li>

            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 place-items-center">
          {/* Left Column - Images */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12 rounded-3xl overflow-hidden bg-white p-4 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 w-5 h-5" />
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">{product.reviews} reviews</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-gray-200 rounded-full bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-lg font-medium text-gray-900">
                  Total: ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                  onClick={() => handleOnClick()}
                >
                  Add to Cart
                </button>
                <button
                  className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                  onClick={() => addToFavorites(productId)}
                >
                  <FiHeart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12">
          <ReviewPage productId={productId} />
        </div>
      </div>
      {/* review */}
    </div>
  );
};

export default ProductPage;
