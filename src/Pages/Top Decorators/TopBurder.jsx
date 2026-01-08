import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Star, Pizza, Coffee, ShoppingCart } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const TOP_BURGERS = [
  {
    id: 1,
    name: "Rancho Burger",
    desc: "Kima with poached egg salad",
    price: "$14.00",
    img: "https://assets.bonappetit.com/photos/5b919cb83d923e31d08fed17/4:3/w_2666,h_2000,c_limit/basically-burger-1.jpg",
  },
  {
    id: 2,
    name: "Meat Smash Burger",
    desc: "2x Kima with egg salad",
    price: "$16.00",
    img: "https://www.marthastewart.com/thmb/O7vX-fTaCH0__IcKSCSdEc9KOxU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MS-911343-thick-burger-2x3-643ff8b571c148a5974166ba32f74e28.jpg",
  },
  {
    id: 3,
    name: "Foodish's Burger",
    desc: "Thin Kima with tomato salad",
    price: "$19.00",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHp64n-eLrDSrY29_HCRIuP7-p89ndb18ezw&s",
  },
  {
    id: 4,
    name: "Cheesy Delight",
    desc: "Cheese overloaded burger with fries",
    price: "$17.50",
    img: "https://www.recipetineats.com/tachyon/2023/09/Crispy-fried-chicken-burgers_5.jpg",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
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

// Sub-Component: Floating Decorations
const Decoration = ({ icon: Icon, className, animate, duration }) => (
  <motion.div
    className={`absolute pointer-events-none text-primary/60 ${className}`}
    animate={animate}
    transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
  >
    <Icon size={28} />
  </motion.div>
);

// Sub-Component: Burger Card
const BurgerCard = ({ burger }) => (
  <motion.div
    variants={cardVariants}
    className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/50"
  >
    <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden shadow-xl ring-4 ring-gray-50 dark:ring-gray-900 group-hover:ring-primary/20 transition-all duration-300">
      <img
        src={burger.img}
        alt={burger.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>

    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
      {burger.name}
    </h3>

    <div className="flex items-center gap-1 mb-3">
      {[...Array(5)].map((_, idx) => (
        <Star key={idx} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>

    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 px-2">
      {burger.desc}
    </p>

    <div className="mt-auto">
      <p className="text-2xl font-black text-primary mb-4 group-hover:scale-110 transition-transform">
        {burger.price}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold shadow-md hover:shadow-primary/40 transition-shadow"
      >
        <ShoppingCart size={18} />
        Order Now
      </motion.button>
    </div>
  </motion.div>
);

const TopSellerBurgers = () => {
  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="relative mb-20 text-center">
          <Decoration
            icon={Star}
            className="top-[-30px] left-1/2 -translate-x-1/2"
            animate={{ y: [0, -10, 0] }}
            duration={2}
          />
          <Decoration
            icon={Coffee}
            className="top-[-10px] left-[30%]"
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            duration={2.5}
          />
          <Decoration
            icon={Pizza}
            className="bottom-[-20px] right-[30%]"
            animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
            duration={3}
          />

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Top Seller <span className="text-primary">Burgers</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mt-4 rounded-full" />
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
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            spaceBetween={30}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletActiveClass:
                "bg-primary opacity-100 w-6 rounded-lg transition-all duration-300",
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-16"
          >
            {TOP_BURGERS.map((burger) => (
              <SwiperSlide key={burger.id}>
                <BurgerCard burger={burger} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Custom Pagination Container */}
        <div className="custom-pagination mt-4 flex justify-center gap-2 h-2"></div>
      </div>
    </section>
  );
};

export default TopSellerBurgers;
