import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  Flower,
  Heart,
  Calendar,
  X,
  Rocket,
} from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TOP_DECORATIONS = [
  {
    id: 1,
    name: "Royal Wedding",
    desc: "Exquisite floral arrangements and premium stage lighting.",
    price: "$1,400",
    img: "https://i.ibb.co.com/x8BPQgyQ/c0bfecb5f5e20d7f93a571f1743681fc.jpg",
  },
  {
    id: 2,
    name: "Birthday Bash",
    desc: "Vibrant balloon backdrops and themed table settings.",
    price: "$600",
    img: "https://i.ibb.co.com/C5KPnxtt/SKU-1558-0-1721899376388.jpg",
  },
  {
    id: 3,
    name: "Holud / Diwali",
    desc: "Traditional marigold themes with ethnic cultural accents.",
    price: "$900",
    img: "https://i.ibb.co.com/chB3vYgc/diwali-home-decoration-ideas.jpg",
  },
  {
    id: 4,
    name: "Luxury Gala",
    desc: "High-end corporate events with minimalist modern design.",
    price: "$2,700",
    img: "https://i.ibb.co.com/S4PFbmJL/1-7tpxrvabdgfe3tfm-aeyzg.jpg",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Sub-Components
const DecorationIcon = ({ icon: Icon, className, animate, duration }) => (
  <motion.div
    className={`absolute pointer-events-none text-primary/40 ${className}`}
    animate={animate}
    transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
  >
    <Icon size={28} />
  </motion.div>
);

const DecorationCard = ({ item, onBook }) => (
  <motion.div
    variants={cardVariants}
    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/50"
  >
    <div className="relative w-full h-52 mb-6 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
    </div>

    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white italic">
      {item.name}
    </h3>

    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, idx) => (
        <Star key={idx} size={14} className="fill-primary text-primary" />
      ))}
    </div>

    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 px-2">
      {item.desc}
    </p>

    <div className="mt-auto">
      <p className="text-2xl font-serif font-bold text-gray-800 dark:text-primary-light mb-4">
        Starting at {item.price}
      </p>

      <motion.button
        onClick={onBook}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition-colors"
      >
        <Calendar size={18} />
        Book Event
      </motion.button>
    </div>
  </motion.div>
);

const TopSellerDecorations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative py-24 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="relative mb-20 text-center">
          <DecorationIcon
            icon={Sparkles}
            className="top-[-40px] left-1/2 -translate-x-1/2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            duration={3}
          />
          <DecorationIcon
            icon={Flower}
            className="top-[-10px] left-[25%]"
            animate={{ rotate: [0, 45, 0] }}
            duration={4}
          />
          <DecorationIcon
            icon={Heart}
            className="bottom-[-20px] right-[25%]"
            animate={{ y: [0, -15, 0] }}
            duration={3.5}
          />

          <h2 className="text-4xl md:text-5xl font-serif font-light text-gray-900 dark:text-white uppercase tracking-widest">
            Premier <span className="font-bold text-primary">Decorations</span>
          </h2>
          <div className="h-0.5 w-32 bg-primary/40 mx-auto mt-6 rounded-full" />
          <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">
            Trending Designs for Your Special Occasions
          </p>
        </div>

        {/* Swiper Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletActiveClass:
                "!bg-primary !opacity-100 !w-8 !rounded-full transition-all duration-300",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-16"
          >
            {TOP_DECORATIONS.map((item) => (
              <SwiperSlide key={item.id}>
                <DecorationCard
                  item={item}
                  onBook={() => setIsModalOpen(true)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="custom-pagination mt-4 flex justify-center gap-2 h-2"></div>
      </div>

      {/* --- COMING SOON MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                  <Rocket size={40} className="animate-bounce" />
                </div>
              </div>

              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Website Updating
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                We're currently polishing our booking system to give you the
                best experience.
              </p>

              <div className="mt-8">
                <span className="inline-block rounded-full bg-primary/20 px-6 py-2 text-sm font-bold text-primary tracking-widest uppercase">
                  Coming Soon
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TopSellerDecorations;
