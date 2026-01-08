import React from "react";
import {
  FaUserTie,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const DecoratorCard = ({ decorator }) => {
  const { name, email, address, experience, status } = decorator;

  return (
    <div
      className="
        relative p-6 rounded-2xl shadow-lg border 
        bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-sm 
        hover:shadow-2xl hover:-translate-y-1 
        transition-all duration-300
        border-gray-200 dark:border-gray-700
      "
    >
      {/* Gradient Glow Border */}
      <div className="absolute inset-0 rounded-2xl -z-10 opacity-20 blur-xl"></div>

      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          ⭐ {experience} Ratings
        </span>

        <span
          className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 shadow-sm ${
            status === "approved"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          <FaCheckCircle size={12} />
          {status}
        </span>
      </div>

      {/* Profile Icon with Glass Circle */}
      <div className="flex justify-center mb-4">
        <div
          className="
          p-4 rounded-full 
          bg-white/40 dark:bg-gray-700/40 
          backdrop-blur-md 
          border border-gray-200 dark:border-gray-600
          shadow-inner
        "
        >
          <FaUserTie className="text-5xl text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      {/* Name */}
      <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white">
        {name}
      </h2>

      {/* Subtitle */}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
        Decoration Specialist
      </p>

      {/* Email */}
      <p className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
        <FaEnvelope className="text-sm" /> {email}
      </p>

      {/* Address */}
      <p className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300 mt-1">
        <FaMapMarkerAlt className="text-sm" /> {address}
      </p>
    </div>
  );
};

export default DecoratorCard;
