import { motion } from "framer-motion";

const stats = [
  { title: "Total Orders Today", value: "142", change: "+12%", trend: "up" },
  { title: "Total Revenue Today", value: "$2,845", change: "+8%", trend: "up" },
  {
    title: "Most Popular Item",
    value: "Burger Meal",
    change: "25 orders",
    trend: "up",
  },
  { title: "Active Orders", value: "18", change: "-3%", trend: "down" },
];

const AnalyticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <span
              className={`ml-2 text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsCards;
