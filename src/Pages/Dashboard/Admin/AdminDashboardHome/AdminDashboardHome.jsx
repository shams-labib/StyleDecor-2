import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  CartesianGrid,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { Users, Briefcase, CalendarCheck, Wallet } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"];

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch data
  const { data: bookingsData = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => (await axiosSecure.get("/bookings/book")).data,
  });

  const { data: usersData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: servicesData = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await axiosSecure.get("/services")).data,
  });

  const { data: paymentsData = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosSecure.get("/payments")).data,
  });

  const chartData = [
    {
      name: "Bookings",
      value: bookingsData.length,
      icon: <CalendarCheck size={24} />,
      grad: "from-blue-500 to-indigo-600",
    },
    {
      name: "Users",
      value: usersData.length,
      icon: <Users size={24} />,
      grad: "from-purple-500 to-fuchsia-600",
    },
    {
      name: "Services",
      value: servicesData.length,
      icon: <Briefcase size={24} />,
      grad: "from-pink-500 to-rose-600",
    },
    {
      name: "Payments",
      value: paymentsData.length,
      icon: <Wallet size={24} />,
      grad: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen dark:bg-gray-950 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Welcome back! Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {chartData.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-[2rem] shadow-xl shadow-indigo-500/10 bg-gradient-to-br ${item.grad} text-white relative overflow-hidden group`}
          >
            <div className="absolute -right-4 -bottom-4 opacity-20 transition-transform group-hover:scale-125 duration-500">
              {React.cloneElement(item.icon, { size: 100 })}
            </div>
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
                {item.icon}
              </div>
              <div className="text-lg font-semibold opacity-90">
                {item.name}
              </div>
              <div className="text-4xl font-black mt-1 tracking-tighter">
                {item.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Data Distribution
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  iconType="circle"
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
            Monthly Statistics
          </h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af" }}
                />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{ borderRadius: "16px" }}
                />
                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[10, 10, 0, 0]}
                  barSize={45}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
