import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/Product";
import OrderList from "./pages/Orders";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Sidebar from "./components/UI/SideBar";
import Topbar from "./components/UI/Navbar";
import { AppProvider } from "./store/Context";
import ChatPage from "./pages/ChatPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppProvider>
      <Router>
        <div className="flex h-screen bg-gray-100 ">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Topbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
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
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
