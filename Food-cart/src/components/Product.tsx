// Product.tsx
import { motion } from "framer-motion";
import { Star } from "lucide-react";


const Product = ({ dish }: any) => {

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={dish.img}
          alt={dish.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{dish.name}</h3>
          <span className="font-bold text-orange-500">${dish.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">
              {/* {dish.rating.toFixed(1)} */}
            </span>
          </div>
          <span className="text-sm text-gray-500">{dish.time}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Product;