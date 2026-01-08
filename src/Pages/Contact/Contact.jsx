import React from "react";
import { PhoneCall, MessageSquare, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background blobs shoriye deya hoyeche jate layout clean thake */}

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Animated Icons with Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-10"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="p-5 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <PhoneCall className="text-primary w-8 h-8" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="p-5 rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <MessageSquare className="text-blue-500 w-8 h-8" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            Planning a <span className="text-primary">Grand Event?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Get a free consultation and quote within minutes. Our expert team is
            ready to turn your vision into a breathtaking reality.
          </motion.p>
        </div>

        {/* Buttons with Hover & Pulse Effects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary text-white font-bold text-lg 
            flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Call Now
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group w-full sm:w-auto px-10 py-4 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg 
            flex items-center justify-center gap-3 shadow-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all border border-transparent dark:border-gray-700"
          >
            <MessageSquare className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            Message Us
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
