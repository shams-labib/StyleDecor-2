import React from "react";
import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const WhyChooseAndContact = () => {
  const features = [
    "100% On-time Delivery",
    "Professional Decoration Team",
    "Affordable & Transparent Pricing",
    "Custom Theme & Design Options",
    "High Quality Materials Guaranteed",
    "24/7 Support & Quick Response",
  ];

  // Container animation logic
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="w-full space-y-20 py-20 px-4">
      <section className="max-w-6xl mx-auto">
        {/* Header Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-2"
        >
          <div className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
            <Sparkles size={16} /> <span>Why Choose Us</span>{" "}
            <Sparkles size={16} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            We Create Events That{" "}
            <span className="text-primary">Last Forever</span>
          </h2>
        </motion.div>

        {/* Animated Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -10,
                backgroundColor: "rgba(59, 130, 246, 0.05)", // Subtle blue tint on hover
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
              className="group p-8 bg-white dark:bg-gray-900 cursor-pointer 
              shadow-lg hover:shadow-2xl rounded-[2rem] flex flex-col items-center text-center gap-5 border border-gray-100 dark:border-gray-800 transition-all duration-300"
            >
              {/* Icon with Rotating background effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <CheckCircle
                  className="text-primary w-12 h-12 relative z-10 transition-transform duration-500 
                  group-hover:rotate-[360deg]"
                />
              </div>

              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {item}
              </p>

              <div className="w-10 h-1 bg-gray-100 dark:bg-gray-800 group-hover:w-20 group-hover:bg-primary transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default WhyChooseAndContact;
