import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import {
  ChevronRight,
  Search,
  Star,
  Clock,
  Bike,
  ShieldCheck,
} from "lucide-react";

// Sample data
const foodCategories = [
  {
    name: "Burgers",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Sushi",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Desserts",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Salads",
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60",
  },
  {
    name: "Tacos",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&auto=format&fit=crop&q=60",
  },
];

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

const reviews = [
  {
    name: "Alice Johnson",
    comment:
      "Amazing food and quick delivery! The packaging was eco-friendly too.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    date: "2 days ago",
  },
  {
    name: "John Smith",
    comment: "Loved the sushi! Fresh and tasty. Will definitely order again.",
    rating: 4,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "1 week ago",
  },
  {
    name: "Sara Williams",
    comment: "My kids love the cheesy burgers! Perfect for family dinners.",
    rating: 5,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    date: "3 days ago",
  },
  {
    name: "Michael Brown",
    comment: "The pizza arrived hot and delicious. Great service!",
    rating: 5,
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    date: "5 days ago",
  },
];

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Fast Delivery",
    description: "Get your food delivered in under 30 minutes",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Food Safety",
    description: "All restaurants follow strict safety protocols",
  },
  {
    icon: <Bike className="w-6 h-6" />,
    title: "Live Tracking",
    description: "Track your order in real-time",
  },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDishes = popularDishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* <Header /> */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4 sm:px-6 py-8 text-gray-800 overflow-x-hidden">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center pt-10 pb-16"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Delicious Food Delivered
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Order from your favorite restaurants and get it delivered to your
              doorstep in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center mx-auto"
              >
                Order Now <ChevronRight className="ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
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

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 max-w-2xl mx-auto mb-16"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search your favorite food..."
                className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Food Categories */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Explore Categories
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {["All", ...foodCategories.map((cat) => cat.name)].map(
                (category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "bg-orange-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                  >
                    {category}
                  </motion.button>
                )
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {foodCategories.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Popular Dishes */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Popular Dishes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDishes.map((dish, i) => (
                <Product dish={dish} i={i} />
              ))}
            </div>
          </motion.section>

          {/* Reviews Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-20"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {review.name}
                      </h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-amber-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 italic">
                    "{review.comment}"
                  </p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </motion.div>
              ))}

              {/* CTA Review Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl shadow-md p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-3">
                  Share Your Experience
                </h3>
                <p className="mb-6">
                  We'd love to hear about your food journey with us!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-orange-500 rounded-full font-medium shadow-lg"
                >
                  Write a Review
                </motion.button>
              </motion.div>
            </div>
          </motion.section>

          {/* Newsletter CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 md:p-12 text-white mb-20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Get 10% Off Your First Order
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and stay updated with delicious
                deals!
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                whileHover={{ scale: 1.01 }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-full shadow-lg"
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.section>
        </section>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
