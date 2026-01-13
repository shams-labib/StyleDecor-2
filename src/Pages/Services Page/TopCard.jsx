import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ArrowRight } from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: "blur(5px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const TopCard = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: services = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const topServices = Array.isArray(services) ? services.slice(0, 8) : [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="text-primary" size={40} />
        </motion.div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse text-sm md:text-base">
          Loading amazing services...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 bg-red-50 dark:bg-gray-900/50 rounded-3xl mx-4 my-10">
        <p className="text-red-500 font-bold text-lg">
          Oops! Something went wrong.
        </p>
        <p className="text-red-400 text-sm mt-2">{error?.message}</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 py-12 md:py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-2 md:gap-4 tracking-tight">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-yellow-500"
            >
              <Sparkles
                className="w-8 h-8 md:w-10 md:h-10"
                fill="currentColor"
              />
            </motion.span>
            Top <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-sm md:text-lg px-4">
            Explore our most-rated and trending services handpicked just for
            you.
          </p>
        </motion.div>

        {/* --- Services Grid --- */}
        {/* Mobile: 1 column (grid-cols-1) for readability, or 2 if cards are very small.
            Tablet: 2 columns (sm:grid-cols-2)
            Desktop Small: 3 columns (md:grid-cols-3)
            Desktop Large: 4 columns (lg:grid-cols-4)
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {topServices.length > 0 ? (
            topServices.map((service) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="h-full"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-400">
              No services found in our database.
            </div>
          )}
        </motion.div>

        {/* --- Action Button --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 md:mt-16 flex justify-center px-4"
        >
          {/* Joy bangla */}
          <Link
            to="/services"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-base md:text-lg shadow-xl hover:shadow-primary/40 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Explore All Services</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />

            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCard;
