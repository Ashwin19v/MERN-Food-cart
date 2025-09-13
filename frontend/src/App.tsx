import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppProvider } from "./store/Context";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Product";
import OrderList from "./pages/Orders";
import Settings from "./pages/Settings";
import User from "./pages/User";
import ChatPage from "./pages/ChatPage";
import Layout from "./components/Layout";
import ProtectedRoutes from "./components/Protected";

function App() {
  return (
    <AppProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Dashboard />
                    </motion.div>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ProductList />
                    </motion.div>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <OrderList />
                    </motion.div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Settings />
                    </motion.div>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <User />
                    </motion.div>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ChatPage />
                    </motion.div>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
}

export default App;
