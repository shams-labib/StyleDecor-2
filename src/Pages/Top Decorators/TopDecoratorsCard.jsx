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
        relative p-3 sm:p-6 rounded-2xl shadow-lg border 
        bg-white/80 dark:bg-gray-800/80 
        backdrop-blur-sm 
        hover:shadow-2xl hover:-translate-y-1 
        transition-all duration-300
        border-gray-200 dark:border-gray-700
        flex flex-col h-full
      "
    >
      {/* Top Section - Badges */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 mb-3 sm:mb-4">
        <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-sm font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          ⭐ {experience} <span className="hidden xs:inline">Ratings</span>
        </span>

        <span
          className={`px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-bold rounded-full flex items-center gap-1 shadow-sm uppercase ${
            status === "approved"
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          <FaCheckCircle className="text-[10px] sm:text-[12px]" />
          {status}
        </span>
      </div>

      {/* Profile Icon Section */}
      <div className="flex justify-center mb-3 sm:mb-4">
        <div
          className="
          p-3 sm:p-4 rounded-full 
          bg-white/40 dark:bg-gray-700/40 
          backdrop-blur-md 
          border border-gray-200 dark:border-gray-600
          shadow-inner
        "
        >
          <FaUserTie className="text-3xl sm:text-5xl text-gray-700 dark:text-gray-200" />
        </div>
      </div>

      {/* Info Section */}
      <div className="text-center flex-1">
        <h2 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
          {name}
        </h2>
        <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
          Specialist
        </p>

        <div className="space-y-1 sm:space-y-2">
          {/* Email */}
          <p className="flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300 text-[10px] sm:text-sm">
            <FaEnvelope className="shrink-0 text-primary" size={12} />
            <span className="truncate max-w-[100px] sm:max-w-none">
              {email}
            </span>
          </p>

          {/* Address */}
          <p className="flex items-center justify-center gap-1.5 text-gray-700 dark:text-gray-300 text-[10px] sm:text-sm">
            <FaMapMarkerAlt className="shrink-0 text-red-400" size={12} />
            <span className="truncate max-w-[100px] sm:max-w-none">
              {address}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecoratorCard;
