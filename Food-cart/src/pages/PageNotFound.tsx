// src/pages/NotFound.js
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  // Star positions for the space background
  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 20 + 1}px`,
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Animated elements background */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-amber-600 rounded-full "
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: star.delay,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl"
      >
        {/* Floating sun illustration */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-12"
        >
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="#F59E0B"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
            <motion.path
              d="M100 40C100 40 120 60 120 80C120 100 100 120 80 120C60 120 40 100 40 80C40 60 60 40 80 40C90 40 100 40 100 40Z"
              fill="#D97706"
              initial={{ x: 100, y: -100, rotate: 45 }}
              animate={{ x: 0, y: 0, rotate: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            />
            <motion.text
              x="100"
              y="110"
              textAnchor="middle"
              fill="white"
              fontSize="80"
              fontWeight="bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              404
            </motion.text>
          </svg>
        </motion.div>

        {/* 404 text */}
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-3xl font-semibold text-amber-900 mb-6"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-lg text-amber-800 mb-8 max-w-md mx-auto"
        >
          The page you're looking for has disappeared into the sunset. Let's get
          you back on track.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-10 bottom-20 w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute right-20 top-1/3 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-400 shadow-lg"
      />
    </div>
  );
};

export default NotFound;
