import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviewPromise }) => {
  const reviewData = use(reviewPromise);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Heading with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <div className="flex justify-center mb-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-primary/40"
            >
              <Quote size={48} fill="currentColor" />
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            Voices of <span className="text-primary">Satisfaction</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-lg max-w-2xl mx-auto font-medium">
            Real feedback from our valued customers. We strive to provide the
            best service every day.
          </p>
        </motion.div>

        {/* Review Slider */}
        <div className="max-w-5xl mx-auto relative px-4 md:px-12">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            loop={true} // Infinite loop for smoothness
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true, // Choto-boro bullet style
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper pb-14 !overflow-visible" // Added overflow-visible for shadows
          >
            {reviewData.map((review) => (
              <SwiperSlide key={review._id || review.id}>
                {({ isActive }) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: isActive ? 1 : 0.4,
                      scale: isActive ? 1 : 0.9,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex justify-center py-4"
                  >
                    <div className="w-full max-w-2xl">
                      <ReviewCard review={review} />
                    </div>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Arrow Styling in Global CSS or Tailwind layer */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6 !important; /* Your Primary Color */
          background: white;
          width: 45px !important;
          height: 45px !important;
          border-radius: 50%;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          width: 25px !important;
          border-radius: 5px !important;
        }
        .dark .swiper-button-next,
        .dark .swiper-button-prev {
          background: #1f2937;
          color: white !important;
        }
      `}</style>
    </section>
  );
};

export default Reviews;
