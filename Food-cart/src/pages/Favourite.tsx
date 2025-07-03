import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/store";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, isLoading, error } = useStore();

  const handleRemoveFromFavorites = async (productId: string) => {
    try {
      await removeFromFavorites(productId);
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
  //     </div>
  //   );
  // }

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
              to="/dashboard"
              className="text-orange-500 hover:text-orange-600 flex items-center"
            >
              Explore Menu
              <ChevronRight className="ml-1" size={18} />
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

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
                  to="/dashboard"
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
                {favorites.map((favorite) => (
                  <motion.div
                    key={favorite._id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={favorite.product.image}
                        alt={favorite.product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() =>
                          handleRemoveFromFavorites(favorite.product._id)
                        }
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Heart
                          className="text-red-500 fill-current"
                          size={20}
                        />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {favorite.product.name}
                      </h3>
                      <p className="text-orange-500 font-medium mt-1">
                        ${favorite.product.price.toFixed(2)}
                      </p>
                      <Link
                        to={`/dashboard/products/${favorite.product._id}`}
                        className="mt-3 inline-block text-sm text-orange-500 hover:text-orange-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
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
