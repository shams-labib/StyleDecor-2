import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { motion } from "framer-motion";

// Brand assets
import amazon from "../../assets/brands/amazon.png";
import amazonVector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import monstar from "../../assets/brands/moonstar.png";
import restad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import starPeople from "../../assets/brands/start_people.png";

const Brands = () => {
  const brandsLogo = [
    amazon,
    amazonVector,
    casio,
    monstar,
    restad,
    star,
    starPeople,
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 my-10 overflow-hidden">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
          Trusted By <span className="text-primary">Industry Leaders</span>
        </h2>
        <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="container mx-auto">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          loop={true}
          speed={4000} // Speed set to 4s for linear motion
          freeMode={true} // Smoother continuous movement
          autoplay={{
            delay: 0, // 0 delay creates marquee effect
            disableOnInteraction: false,
          }}
          modules={[Autoplay, FreeMode]}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 5, spaceBetween: 50 },
          }}
          className="brand-swiper"
        >
          {brandsLogo.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative group cursor-pointer"
              >
                {/* Logo Container */}
                <div className="w-40 h-24 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <img
                    src={logo}
                    alt={`Brand ${index + 1}`}
                    className="max-h-12 md:max-h-16 w-auto object-contain"
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Adding a subtle gradient fade on the edges */}
      <style jsx global>{`
        .brand-swiper {
          transition-timing-function: linear !important;
        }
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </div>
  );
};

export default Brands;
