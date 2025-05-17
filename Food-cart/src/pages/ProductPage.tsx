import React, { useState } from "react";
import {
  FiMinus,
  FiPlus,
  FiHeart,
  FiClock,
  FiStar,
  FiTag,
  FiBox,
} from "react-icons/fi";
import { GiChiliPepper, GiKnifeFork, GiWeightScale } from "react-icons/gi";
import { MdOutlineLocalOffer } from "react-icons/md";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Spicy Pad Thai",
    price: 12.99,
    originalPrice: 15.99,
    rating: 4.8,
    reviews: 234,
    description:
      "Experience the authentic flavors of Thailand with our signature Pad Thai. Made with premium rice noodles, fresh vegetables, and protein of your choice, this dish perfectly balances sweet, sour, and spicy flavors. Each plate is garnished with crushed peanuts, fresh lime, and bean sprouts for that perfect crunch.",
    prepTime: "15-20 min",
    spicyLevel: 3,
    calories: "450 kcal",
    servingSize: "Regular (400g)",
    dietaryInfo: [
      "Gluten-Free Options",
      "Vegetarian Options",
      "Contains Peanuts",
      "Contains Soy",
    ],
    nutritionalInfo: {
      protein: "18g",
      carbs: "65g",
      fats: "12g",
      fiber: "4g",
    },
    ingredients: [
      "Rice Noodles",
      "Tofu/Chicken",
      "Bean Sprouts",
      "Peanuts",
      "Fresh Lime",
      "Thai Basil",
      "Special Sauce",
      "Green Onions",
      "Garlic",
      "Dried Shrimp",
    ],
    customization: [
      "Spice Level Adjustment",
      "Protein Choice",
      "Extra Vegetables",
      "No Peanuts",
    ],
    images: ["food1.jpg", "food2.jpg", "food3.jpg", "food4.jpg", "food5.jpg"],
    tags: ["Popular", "Staff Pick", "Spicy"],
    availableFor: ["Dine-in", "Takeaway", "Delivery"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-gray-900">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/menu" className="hover:text-gray-900">
                Menu
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Enhanced Images Section */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12 rounded-3xl overflow-hidden bg-white p-4 shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden cursor-pointer transition-all ${
                    selectedImage === idx ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt="ghnj"
                    className="w-full h-full object-cover hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Enhanced Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                {product.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
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
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Enhanced Description */}
            <div className="space-y-4">
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm">
                  <FiClock className="text-gray-400 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Prep Time</p>
                    <p className="font-medium">{product.prepTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm">
                  <GiWeightScale className="text-gray-400 w-5 h-5" />
                  <div>
                    <p className="text-sm text-gray-500">Serving Size</p>
                    <p className="font-medium">{product.servingSize}</p>
                  </div>
                </div>
              </div>

              {/* Spice Level */}
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="text-sm text-gray-500 mb-2">Spice Level</h4>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, idx) => (
                    <GiChiliPepper
                      key={idx}
                      className={`w-5 h-5 ${
                        idx < product.spicyLevel
                          ? "text-red-500"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Nutritional Info */}
            <div className="border-t border-b border-gray-200 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Nutritional Information
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <span className="text-lg font-bold text-gray-900">
                      {value}
                    </span>
                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
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
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium">
                  Add to Cart
                </button>
                <button className="p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                  <FiHeart className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
