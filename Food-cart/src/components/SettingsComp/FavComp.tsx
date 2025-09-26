import { motion } from "framer-motion";
import type { FavoriteItem } from "../../types/types";
import { Link } from "react-router-dom";
import { ChevronRight, Heart } from "lucide-react";

const FavComp = ({
  visibleFavorites,
  favorites,
}: {
  visibleFavorites: FavoriteItem[];
  favorites: FavoriteItem[];
}) => {
  return (
    <motion.div className="bg-white p-6 rounded-2xl shadow-lg">
      {favorites.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
          {visibleFavorites.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-xl transition-shadow duration-300 group bg-gradient-to-tr from-white to-gray-50"
            >
              <div className="relative w-full h-full mb-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="font-semibold text-gray-800 text-center text-lg">
                {item.product.name}
              </div>
              <div className="text-orange-500 font-bold mt-2 text-base">
                ${item.product.price}
              </div>
            </div>
          ))}

          {favorites.length > 5 && (
            <Link to="/favourites" className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all flex items-center justify-center gap-4 group bg-gradient-to-tr from-white to-gray-50"
              >
                <div className="p-6 text-center">
                  <div className="text-orange-500 text-4xl font-bold mb-2">
                    +{favorites.length - 5}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Show More Favourites
                  </h3>
                  <ChevronRight className="w-8 h-8 mx-auto mt-2 text-orange-500" />
                </div>
              </motion.div>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-10">
          <Heart size={50} className="text-gray-300 mb-4" />
          <p className="text-lg font-medium">No favorites yet.</p>
          <p className="text-sm text-gray-400 mt-1">
            Add items to your favorites to view them here.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default FavComp;
