import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import TopDecoratorsCard from "./TopDecoratorsCard";
import { motion } from "framer-motion";
import { Sparkles, Users } from "lucide-react";

// Animation Variants for the Grid
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Protiti card ekta ekta kore ashbe
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const TopDecorator = () => {
  const axiosSecure = useAxiosSecure();
  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["users", "decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=decorator");
      return res.data;
    },
  });

  const topDecorators = decorators.slice(0, 4);

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Title Section */}
      <div className="text-center mb-12 space-y-3">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Top Decorators
          </h2>

          <motion.div
            animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto flex items-center justify-center gap-2"
        >
          <Users className="w-5 h-5 text-blue-500" />
          Discover the most skilled and creative decorators of our platform.
        </motion.p>
      </div>

      {/* Grid Section with Staggered Animation */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {topDecorators.length > 0 ? (
            topDecorators.map((decorator) => (
              <motion.div
                key={decorator._id || decorator.email}
                variants={itemVariants}
              >
                <TopDecoratorsCard decorator={decorator} />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-300 col-span-full">
              No decorators available.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TopDecorator;
