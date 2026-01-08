import React from "react";
import { motion } from "framer-motion";

const BannerSkeleton = () => {
  return (
    <div className="relative w-full container mx-auto lg:my-20 lg:rounded-3xl overflow-hidden px-4 sm:px-0">
      <div className="relative h-[300px] sm:h-[400px] md:h-[550px] w-full bg-gray-100 dark:bg-gray-900 rounded-3xl flex flex-col justify-center items-center gap-6 overflow-hidden border border-gray-200 dark:border-gray-800">
        {/* Shimmer Effect Overlay */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-800/50 to-transparent z-10"
        />

        {/* Content Wrapper */}
        <div className="flex flex-col items-center w-full space-y-4 px-6 text-center">
          {/* Badge/Small Title */}
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>

          {/* Main Title skeleton */}
          <div className="space-y-3 w-full flex flex-col items-center">
            <div className="h-10 sm:h-12 md:h-16 w-3/4 md:w-1/2 bg-gray-300 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="h-10 sm:h-12 md:h-16 w-1/2 bg-gray-300 dark:bg-gray-800 rounded-2xl animate-pulse opacity-60"></div>
          </div>

          {/* Metadata (Rating & Category) */}
          <div className="flex gap-4 mt-2">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            <div className="h-6 w-28 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse opacity-70"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-14 w-44 bg-gray-300 dark:bg-gray-700 rounded-2xl mt-6 animate-pulse shadow-sm"></div>
        </div>

        {/* Floating Decorative Skeletons (Optional: mimic background elements) */}
        <div className="absolute bottom-10 left-10 h-24 w-24 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 h-32 w-32 bg-indigo-400/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
