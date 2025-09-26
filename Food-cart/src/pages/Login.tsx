import { motion } from "framer-motion";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100 px-6 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-2xl shadow-xl bg-white overflow-hidden"
      >
        <img
          src="food5.jpg"
          alt="Background Food"
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
        />

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
            Welcome Back 🍔
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Or continue with
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">
              <FaGoogle className="text-red-500" />
              Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition-colors">
              <FaFacebookF className="text-blue-600" />
              Facebook
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="/register" className="text-orange-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
