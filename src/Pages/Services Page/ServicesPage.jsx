import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import ServiceCard from "./ServiceCard";

const ServicesPage = () => {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [budgetFilter, setBudgetFilter] = useState([0, 100000]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedSearch(searchTerm);
  };

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", submittedSearch, categoryFilter, budgetFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (submittedSearch) params.append("search", submittedSearch);
      if (categoryFilter !== "all") params.append("category", categoryFilter);
      params.append("minBudget", budgetFilter[0]);
      params.append("maxBudget", budgetFilter[1]);

      const res = await axiosSecure.get(`/services?${params.toString()}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-500">Error loading services.</p>
    );

  return (
    <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen container mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
        Our Services
      </h1>

      {/* Search & Filters Card */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mb-10 gap-4"
      >
        {/* Search */}
        <div className="flex flex-1 gap-3">
          <input
            type="text"
            placeholder="Search service..."
            className="flex-1 border outline-none border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 md:mt-0">
          {/* Category */}
          <select
            className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="home">Home</option>
            <option value="wedding">Wedding</option>
            <option value="office">Office</option>
            <option value="seminar">Seminar</option>
            <option value="birthday">Birthday</option>
          </select>

          {/* Budget */}
          <div className="flex flex-col">
            <input
              type="range"
              min="0"
              max="100000"
              step="5000"
              value={budgetFilter[1]}
              className="w-full accent-blue-500"
              onChange={(e) =>
                setBudgetFilter([budgetFilter[0], parseInt(e.target.value)])
              }
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Max Budget: {budgetFilter[1]} BDT
            </span>
          </div>
        </div>
      </form>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300 col-span-full">
            No services available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
