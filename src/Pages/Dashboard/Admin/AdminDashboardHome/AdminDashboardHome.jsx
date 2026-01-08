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
} from "recharts";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

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

  // Chart data based on length only
  const chartData = [
    { name: "Bookings", value: bookingsData.length },
    { name: "Users", value: usersData.length },
    { name: "Services", value: servicesData.length },
    { name: "Payments", value: paymentsData.length },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Admin Dashboard
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="p-5 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
          >
            <div className="text-sm font-semibold">{item.name}</div>
            <div className="text-2xl font-bold mt-2">{item.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {/* Pie Chart */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Data Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                fill="#8884d8"
                stroke="#fff"
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Data Counts</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
