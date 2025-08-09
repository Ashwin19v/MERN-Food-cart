import { motion } from "framer-motion";
import AnalyticsCards from "../components/Dashboard/Analyticscard";
import Charts from "../components/Dashboard/Charts";
import LiveOrders from "../components/Dashboard/LiveOrders";
import { useApp } from "../store/Context";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, fetchDashboardStats } = useApp();
  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  return (
    <div className="space-y-6">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="text-2xl font-bold text-gray-800"
      >
        Dashboard Overview
      </motion.h1>

      <AnalyticsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-4 rounded-lg shadow"
        >
          <Charts />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <LiveOrders />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
