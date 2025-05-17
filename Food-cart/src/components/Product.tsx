import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Search,
  Star,
  Clock,
  Bike,
  ShieldCheck,
} from "lucide-react";
const Product = ({ dish, i }) => {
  const [isHovered, setIsHovered] = useState(null);
  return (
    <>
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.03 }}
        onHoverStart={() => setIsHovered(i)}
        onHoverEnd={() => setIsHovered(null)}
        className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden relative"
      >
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={dish.img}
            alt={dish.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered === i ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          />
          <AnimatePresence>
            {isHovered === i && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium shadow-lg"
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-gray-800">{dish.name}</h3>
            <p className="text-orange-500 font-bold">{dish.price}</p>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(dish.rating) ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({dish.rating})</span>
          </div>
          <div className="flex items-center mt-3 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{dish.time}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Product;
