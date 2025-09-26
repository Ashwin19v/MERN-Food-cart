import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";

import {
  foodCategories,
  staticPopularDishes,
} from "../components/utils/Content";
import { ChevronRight, Search, } from "lucide-react";
import FeatureSection from "../components/HomePageComp/Feature";
import TestimonialsSection from "../components/HomePageComp/Testimonal";
import { useProduct } from "../context/productStore";

const HomePage = () => {
  const { fetchProductsByCategory, activeCategory, setActiveCategory } =
    useProduct();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);

  const handleSeeMoreClick = () => {
    navigate(`/category/${activeCategory}`);
  };

  // Function to handle navigation to product details page

  const handleProductIdPage = (product: string) => {
    navigate(`/products/${product}`);
  };

  // Fetch popular products on initial render
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (activeCategory && activeCategory !== "All") {
        const products = await fetchProductsByCategory(activeCategory);
        setCategoryProducts(products);
      } else {
        setCategoryProducts([]);
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
        <FeatureSection />

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

          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
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

          {activeCategory === "All" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 place-items-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
              {categoryProducts
                .filter((product) =>
                  product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(0, 5)
                .map((product: any, i: number) => (
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

              {categoryProducts.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
              ).length > 5 && (
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

        {/* Popular Dishes (Static) */}
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
              {staticPopularDishes
                .filter((dish) =>
                  dish.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((dish, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Product dish={dish} />
                  </motion.div>
                ))}
            </div>
          </motion.section>
        )}

        {/* Reviews Section */}
        <TestimonialsSection />
      </section>
    </div>
  );
};

export default HomePage;
