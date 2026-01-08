import React from "react";
import logoImg from "../../../assets/logo.png";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group select-none relative">
      {/* --- ICON ARCHITECTURE --- */}
      <div className="relative flex items-center justify-center">
        {/* Layer 1: The Outer Pulsing Aura (Glow) */}
        <div className="absolute inset-0 bg-orange-500/20 dark:bg-orange-500/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Layer 2: The Rotating Dashed Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-6px] rounded-full border border-dashed border-orange-500/40 group-hover:border-orange-500 transition-colors duration-500"
        />

        {/* Layer 3: The Main Image Sphere */}
        <div className="relative w-11 h-11 md:w-13 md:h-13 rounded-full p-[2px] bg-gradient-to-tr from-orange-500 via-orange-300 to-orange-600 shadow-lg shadow-orange-500/20">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 overflow-hidden border-2 border-transparent">
            <motion.img
              whileHover={{ scale: 1.15 }}
              src={logoImg}
              alt="StyleDecor Logo"
              className="w-full h-full object-cover rounded-full transition-transform duration-500"
            />
          </div>
        </div>

        {/* Layer 4: The Status Beacon (Floating Spark) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full border-2 border-white dark:border-gray-950 z-20 shadow-sm"
        />
      </div>

      {/* --- TEXT ARCHITECTURE --- */}
      <div className="flex flex-col -space-y-1">
        <div className="flex items-center">
          <span className="text-2xl md:text-3xl font-black tracking-tighter transition-all duration-500">
            {/* "Style" adapts to Theme */}
            <span className="text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
              Style
            </span>
            {/* "Decor" is always Gradient Orange */}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700 dark:from-orange-400 dark:to-orange-600">
              Decor
            </span>
          </span>
        </div>

        {/* Premium Tagline with Spacing and Polish */}
        <div className="flex items-center gap-1.5 overflow-hidden">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-[9px] md:text-[11px] font-extrabold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500 group-hover:text-orange-500/80 transition-colors duration-500"
          >
            Aesthetic Living
          </motion.span>
          <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>
      </div>

      {/* Subtle Background Text (Invisible until hover) */}
      <span className="absolute -bottom-4 left-16 text-[40px] font-black opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] pointer-events-none transition-opacity duration-1000 tracking-widest uppercase">
        Decor
      </span>
    </Link>
  );
};

export default Logo;
