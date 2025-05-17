import { useState } from "react";
import { motion } from "framer-motion";

import { ShoppingCart, Truck, ShieldCheck, Smile } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 md:px-20 py-4 bg-orange-100 fixed top-0 left-0 w-full z-50 shadow-md">
        <h1 className="text-2xl font-bold text-orange-600">FoodCart</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-orange-500">
            Features
          </a>
          <a href="#testimonials" className="hover:text-orange-500">
            Testimonials
          </a>
          <a href="#contact" className="hover:text-orange-500">
            Contact
          </a>
          <a href="/login" className="hover:text-orange-500">
            Login
          </a>
          <a href="/register" className="hover:text-orange-500">
            Signup
          </a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <span className="text-2xl">☰</span>
        </button>
        {menuOpen && (
          <div className="absolute right-6 top-16 bg-white shadow-lg rounded-md w-40 py-2 flex flex-col space-y-2">
            <a href="#features" className="px-4 py-2 hover:bg-orange-50">
              Features
            </a>
            <a href="#testimonials" className="px-4 py-2 hover:bg-orange-50">
              Testimonials
            </a>
            <a href="#contact" className="px-4 py-2 hover:bg-orange-50">
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 pt-32 pb-10 bg-gradient-to-br from-yellow-100 to-orange-100 overflow-hidden">
        {/* Background Image */}
        <img
          src="food5.jpg" // replace with your image path
          alt="Background Food"
          className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
        />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-orange-600 mb-6">
            Fast, Fresh, & Flavorful
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Get your favorite street food delivered right to your door. A food
            cart experience with a modern touch!
          </p>
          <button className="px-6 py-3 text-lg bg-orange-500 hover:bg-orange-600 rounded-full text-white">
            Order Now
          </button>
        </motion.div>
      </section>

      {/* Image Carousel */}
      <section className="bg-white px-6 md:px-20 py-10">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={true}
          className="rounded-lg shadow-lg"
        >
          {[
            "food1.jpg",
            "food2.jpg",
            "food3.jpg",
            "food4.jpg",
            "food5.jpg",
          ].map((src, i) => (
            <div key={i} className="h-[400px] w-full">
              <img
                src={src}
                alt={`Food ${i + 1}`}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white px-6 md:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center"
        >
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <Icon className="w-12 h-12 mx-auto text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-gray-50 py-20 px-6 md:px-20 text-center"
      >
        <h2 className="text-3xl font-bold text-orange-600 mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(({ name, quote }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 shadow rounded-lg"
            >
              <p className="italic text-gray-700">“{quote}”</p>
              <h4 className="mt-4 font-semibold text-orange-600">- {name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-20 text-center px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to satisfy your cravings?
          </h2>
          <p className="mb-8 text-lg">Start ordering with just one click.</p>
          <button className="bg-white text-orange-600 hover:bg-orange-100 px-6 py-3 text-lg rounded-full">
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-orange-100 py-10 px-6 md:px-20 text-center"
      >
        <h3 className="text-xl font-bold text-orange-600 mb-4">
          Connect with us
        </h3>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-orange-600">
            Twitter
          </a>
          <a href="#" className="hover:text-orange-600">
            Instagram
          </a>
          <a href="#" className="hover:text-orange-600">
            Facebook
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          &copy; 2025 FoodCart. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: ShoppingCart,
    title: "Easy Ordering",
    desc: "Order from your favorite food carts in seconds.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Hot and fresh food at your doorstep quickly.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    desc: "Your transactions and data are fully secure.",
  },
  {
    icon: Smile,
    title: "Customer Delight",
    desc: "1000+ happy customers enjoy our services daily.",
  },
];

const testimonials = [
  {
    name: "Alice",
    quote: "Absolutely love the tacos! Super fast delivery too.",
  },
  {
    name: "Bob",
    quote: "Great taste and easy to order. Best food cart app ever!",
  },
  {
    name: "Charlie",
    quote: "Affordable, delicious, and reliable. Highly recommend.",
  },
];
