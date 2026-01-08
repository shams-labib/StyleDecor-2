import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-transparent">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring - Pulsing */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full border-2 border-blue-500/20 dark:border-blue-400/10"
        />

        {/* Middle Ring - Rotating */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-16 h-16 rounded-full border-t-2 border-r-2 border-blue-600 dark:border-blue-400"
        />

        {/* The "Zap" Shift Center - Fast Dash */}
        <motion.div
          animate={{
            x: [-20, 20, -20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-8 h-1 bg-blue-500 dark:bg-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-8 text-sm font-bold tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400"
      >
        StyleDecor
      </motion.p>
    </div>
  );
};

export default Loading;
