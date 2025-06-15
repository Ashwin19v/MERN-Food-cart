// HomePage.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { useStore } from "../context/store";
import {
  ChevronRight,
  Search,
  Star,
  Clock,
  Bike,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";

const foodCategories = [
  {
    name: "Burgers",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Sushi",
    img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
  },
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
  },
  {
    name: "Desserts",
    img: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
  },
  {
    name: "Salads",
    img: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
  },
  {
    name: "Tacos",
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47",
  },
];

const HomePage = () => {

  const { fetchPopularProducts, fetchProductsByCategory, popularProducts, activeCategory, setActiveCategory, } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);

  const handleSeeMoreClick = () => {
    navigate(`/dashboard/category/${activeCategory}`);
  };

  const handleProductIdPage = (product) =>{
    console.log("hii")
    navigate(`/dashboard/products/${product}`)
  }

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (activeCategory && activeCategory !== "All") {
        const products = await fetchProductsByCategory(activeCategory);
        setCategoryProducts(products);
        console.log(products)
      } else {
        setCategoryProducts([]); // Clear if "All"
      }
    };

    fetchCategoryProducts();
  }, [activeCategory]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4 sm:px-6 py-8 text-gray-800 overflow-x-hidden">
      <section className="max-w-7xl mx-auto">
        {/* Hero Section */}
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
          {[
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
          ].map((feature, index) => (
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
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category
                    ? "bg-orange-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
                    }`}
                >
                  {category}
                </motion.button>
              )
            )}
          </div>

          {activeCategory === "All" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {foodCategories.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all"
                  onClick={() => setActiveCategory(item.name)}
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.slice(0, 5).map((product: any, i: number) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleProductIdPage(product._id)}
                >
                  <Product
                    dish={{
                      name: product.name,
                      price: product.price,
                      rating: product.rating || 4.5,
                      time: "15-20 min",
                      img: product.image,
                    }}
                   
                  />
                </motion.div>
              ))}

              {/* ✅ Only show "Show More" card if there are more than 5 products */}
              {categoryProducts.length > 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all flex items-center justify-center"
                  onClick={handleSeeMoreClick}
                >
                  <div className="p-6 text-center">
                    <div className="text-orange-500 text-4xl font-bold mb-2">
                      +{categoryProducts.length - 5}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Show More {activeCategory}
                    </h3>
                    <ChevronRight className="w-8 h-8 mx-auto mt-2 text-orange-500" />
                  </div>
                </motion.div>
              )}
            </div>

          )}
        </motion.section>

        {/* Popular Dishes */}
        {activeCategory === "All" && (
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
              {popularProducts
                .filter((product: any) =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleProductIdPage(product._id)}
                  >
                    <Product               
                      dish={{
                        name: product.name,
                        price: product.price,
                        rating: product.rating || 4.5,
                        time: "15-20 min",
                        img: product.image,
                      }}
                      
                    />

                  </motion.div>
                ))}
            </div>
          </motion.section>
        )}

        {/* Reviews Section */}
       
      </section>
    </div>
  );
};

export default HomePage;