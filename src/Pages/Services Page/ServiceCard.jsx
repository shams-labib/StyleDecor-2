import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, Tag, Star } from "lucide-react";

const ServiceCard = ({ service }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} size={14} className="text-yellow-400 fill-current" />
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Star
            key={i}
            size={14}
            className="text-yellow-400 fill-current opacity-50"
          />
        );
      } else {
        stars.push(<Star key={i} size={14} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col bg-white dark:bg-gray-800 h-full"
    >
      {/* Image: Mobile-e height komiye h-32 ba h-40 kora hoyeche */}
      <div className="relative overflow-hidden aspect-video sm:aspect-square lg:aspect-video">
        <img
          src={service.image || "/default-image.png"}
          alt={service.serviceName}
          className="w-full h-32 sm:h-48 md:h-56 lg:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Title: line-clamp use kora hoyeche jate 1 line er beshi na jay */}
          <h2 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-gray-900 dark:text-gray-100 line-clamp-1">
            {service.serviceName}
          </h2>

          {/* Category */}
          <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-2 flex items-center gap-1">
            <Tag size={12} className="text-primary" />
            <span className="truncate">{service.category}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3">
            <div className="flex">{renderStars(service.rating)}</div>
            <span className="text-gray-500 text-[10px] sm:text-xs font-medium ml-1">
              ({service.rating?.toFixed(1) || "0.0"})
            </span>
          </div>
        </div>

        <div>
          {/* Price */}
          <p className="text-xs sm:text-base font-black text-primary mb-3">
            {service.cost}{" "}
            <span className="text-[10px] sm:text-xs font-normal text-gray-500">
              BDT/{service.unit}
            </span>
          </p>

          {/* Button: Mobile-e text choto kora hoyeche */}
          <Link
            to={`/servicesDetails/${service._id}`}
            className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-white py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-1 sm:gap-2 group"
          >
            Details
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
