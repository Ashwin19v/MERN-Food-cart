import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";


const SafeLineChart = ({ data, options }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance && chartInstance.chart) {
        chartInstance.chart.destroy();
      }
    };
  }, [data, options]);

  return <Line ref={chartRef} data={data} options={options} />;
};

const SafeBarChart = ({ data, options }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance && chartInstance.chart) {
        chartInstance.chart.destroy();
      }
    };
  }, [data, options]);

  return <Bar ref={chartRef} data={data} options={options} />;
};

const SafePieChart = ({ data, options }: any) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chartInstance = chartRef.current;
    return () => {
      if (chartInstance && chartInstance.chart) {
        chartInstance.chart.destroy();
      }
    };
  }, [data, options]);

  return <Pie ref={chartRef} data={data} options={options} />;
};

const Charts = () => {
  const [timeRange, setTimeRange] = useState("daily");

  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 1500, 2000, 1800, 2500, 2200],
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "rgba(79, 70, 229, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: ["Burgers", "Pizzas", "Drinks", "Snacks", "Desserts"],
    datasets: [
      {
        label: "Sales by Category",
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Sales Analytics</h3>
        <div className="flex space-x-2">
          {["daily", "weekly", "monthly"].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 text-sm rounded-full ${
                timeRange === range
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <SafeLineChart
          data={salesData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: "top" },
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-64">
          <SafeBarChart
            data={{
              labels: ["Burgers", "Pizzas", "Drinks", "Snacks", "Desserts"],
              datasets: [
                {
                  label: "Popular Items",
                  data: [65, 59, 80, 81, 56],
                  backgroundColor: "rgba(79, 70, 229, 0.7)",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
              },
            }}
          />
        </div>
        <div className="h-64">
          <SafePieChart
            data={categoryData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right" },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
