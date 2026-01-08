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
      staggerChildren: 0.15, // Protiti card er majhe smooth gap
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    filter: "blur(10px)", // Dhukbar somoy ekta bhalo cinematic feel dibe
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
          <Loader2 className="text-primary" size={48} />
        </motion.div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Loading amazing services...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 bg-red-50 dark:bg-gray-900 rounded-2xl mx-4">
        <p className="text-red-500 font-bold text-lg">
          Oops! Something went wrong.
        </p>
        <p className="text-red-400 text-sm">{error?.message}</p>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-50 dark:from-gray-900 dark:to-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* --- Section Header --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-yellow-500"
            >
              <Sparkles size={40} fill="currentColor" />
            </motion.span>
            Top <span className="text-primary">Services</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Explore our most-rated and trending services handpicked just for
            you.
          </p>
        </motion.div>

        {/* --- Services Grid --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {topServices.length > 0 ? (
            topServices.map((service) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }} // Hover e upore uthbe
              >
                <ServiceCard service={service} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-inner text-gray-400">
              No services found in our database.
            </div>
          )}
        </motion.div>

        {/* --- Action Button --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <Link
            to="/services"
            className="group relative inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-black text-lg shadow-2xl shadow-primary/30 overflow-hidden"
          >
            <span className="relative z-10">Explore All Services</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopCard;
