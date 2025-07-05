import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import Product from "../components/Product";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { fetchProductsByCategory } = useStore();
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleProductIdPage = (product) => {
    console.log("hii");
    navigate(`/products/${product}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const data = await fetchProductsByCategory(categoryName || "");
      setProducts(data);
      setIsLoading(false);
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName, fetchProductsByCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-orange-500 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="mr-1" /> Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center capitalize">
          All {categoryName}
        </h1>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleProductIdPage(product._id)}
                // onClick={() => navigate(`/dashboard/products/${product._id}`)}
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
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
