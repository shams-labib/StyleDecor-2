import { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContact = () => {
  const [isVisible, setIsVisible] = useState(false);

  // স্ক্রল পজিশন চেক করার জন্য ইফেক্ট
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <AnimatePresence>
        {/* Scroll To Top Button */}
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="group relative bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer overflow-visible"
            whileHover={{ y: -5 }}
          >
            <FaChevronUp size={20} />
            <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Scroll to Top
            </span>
          </motion.button>
        )}

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/8801784768887"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative bg-[#25D366] text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp size={24} />
          <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            WhatsApp Us
          </span>
          {/* Ringing Effect */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        </motion.a>

        {/* Phone Button */}
        <motion.a
          href="tel:+8801784768887"
          className="group relative bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer"
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            delay: 0.3,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPhoneAlt size={22} />
          <span className="absolute right-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Call Now
          </span>
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default FloatingContact;
