import React from "react";
import { PhoneCall, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <section className="relative  dark:bg-gray-900 py-20 px-6 overflow-hidden flex flex-col  items-center justify-center min-h-screen">
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex justify-center gap-6 mb-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="p-4 rounded-full bg-white/20 dark:bg-white/5 shadow-xl backdrop-blur-xl"
          >
            <PhoneCall className="text-primary w-7 h-7" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: 0.6 }}
            className="p-4 rounded-full bg-white/20 dark:bg-white/5 shadow-xl backdrop-blur-xl"
          >
            <MessageSquare className="text-blue-500 w-7 h-7" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white"
        >
          Need Decoration for Your Event?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Get a free quote within minutes. Our team is always ready to help you
          plan your special moment with professional decoration services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold 
            flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <PhoneCall className="w-5 h-5" />
            Call Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold 
            flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            Message Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactPage;
