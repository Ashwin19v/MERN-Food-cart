import React from "react";
import { motion } from "framer-motion";
import { testimonials } from "../utils/Content";
import { Star } from "lucide-react";

const TestimonialsSection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatarUrl}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{testimonial.message}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
