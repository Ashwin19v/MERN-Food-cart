import React from "react";
import { motion } from "framer-motion";
import { features } from "../utils/Content";

const FeatureSection: React.FC = () => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-center mb-4">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-500 mr-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
          </div>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureSection;
