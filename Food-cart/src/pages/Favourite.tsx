import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronRight, Clock, Star } from "lucide-react";
import Product from "../components/Product";
import { useState } from "react";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const popularDishes = [
    {
      name: "Cheesy Burger",
      price: "$8.99",
      rating: 4.8,
      time: "15-20 min",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "California Sushi",
      price: "$12.50",
      rating: 4.9,
      time: "20-25 min",
      img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Pepperoni Pizza",
      price: "$10.99",
      rating: 4.7,
      time: "15-25 min",
      img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Chocolate Lava",
      price: "$6.50",
      rating: 4.9,
      time: "10-15 min",
      img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Greek Salad",
      price: "$9.25",
      rating: 4.6,
      time: "10-15 min",
      img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60",
    },
    {
      name: "Beef Tacos",
      price: "$11.75",
      rating: 4.8,
      time: "15-20 min",
      img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60",
    },
  ];
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Cheesy Burger",
      price: 8.99,
      rating: 4.8,
      time: "15-20 min",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      name: "California Sushi",
      price: 12.5,
      rating: 4.9,
      time: "20-25 min",
      img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      name: "Chocolate Lava",
      price: 6.5,
      rating: 4.9,
      time: "10-15 min",
      img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h1
              whileHover={{ x: 5 }}
              className="text-3xl font-bold text-gray-800 flex items-center"
            >
              <Heart className="mr-3 text-orange-500 fill-current" />
              Your Favorites
            </motion.h1>
            <Link
              to="/menu"
              className="text-orange-500 hover:text-orange-600 flex items-center"
            >
              Explore Menu
              <ChevronRight className="ml-1" size={18} />
            </Link>
          </div>

          <AnimatePresence>
            {favorites.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="text-gray-400 mb-4 flex justify-center">
                  <Heart size={48} className="fill-gray-200" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Tap the heart icon on menu items to save them here
                </p>
                <Link
                  to="/menu"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium inline-block hover:bg-orange-600 transition-colors"
                >
                  Browse Menu
                </Link>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {popularDishes.map((id, item) => (
                  <Product dish={item} i={id} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;
