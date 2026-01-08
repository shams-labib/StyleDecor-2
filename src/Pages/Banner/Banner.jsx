import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  ShoppingBasket,
  CircleDollarSign,
  Star,
  Home,
  Briefcase,
  Users,
} from "lucide-react";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import BannerSkeleton from "../BannerSkeleton";

// Animation Variants for reusability
const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const categoryIcons = {
  home: <Home className="w-5 h-5" />,
  wedding: <Users className="w-5 h-5" />,
  office: <Briefcase className="w-5 h-5" />,
  seminar: <Calendar className="w-5 h-5" />,
};

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const res = await axiosSecure.get("/banner");
      return res.data;
    },
  });

  if (isLoading) return <BannerSkeleton />;

  const handleBook = (service) => {
    if (user) {
      setSelectedService(service);
      setOpenModal(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book a service.",
        confirmButtonColor: "#3B82F6",
      }).then(() => (window.location.href = "/login"));
    }
  };

  const handleBookSubmit = async (data) => {
    const bookingInfo = {
      serviceName: selectedService.serviceName,
      price: selectedService.cost,
      userName: user?.displayName,
      userEmail: user?.email,
      date: data.date,
      bookingsDate: new Date(),
      location: data.location,
      category: selectedService.category,
      image: selectedService.image,
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingInfo);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          showConfirmButton: false,
          timer: 2000,
        });
        setOpenModal(false);
        reset();
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="relative w-full lg:my-10 container mx-auto lg:rounded-3xl overflow-hidden shadow-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        stopOnHover={false}
        className="main-banner-carousel"
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full h-[350px] md:h-[550px]">
            {/* Cinematic Image Background */}
            <motion.img
              src={banner.image}
              alt={banner.serviceName}
              className="w-full h-full object-cover"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5 }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-center items-start text-left px-10 md:px-20 space-y-6">
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white text-sm"
              >
                {categoryIcons[banner.category?.toLowerCase()] || (
                  <Star className="w-4 h-4" />
                )}
                <span className="capitalize tracking-wider">
                  {banner.category}
                </span>
              </motion.div>

              <motion.h2
                custom={1}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                className="text-white text-3xl md:text-6xl font-black max-w-2xl leading-tight"
              >
                {banner.serviceName}
              </motion.h2>

              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                className="flex items-center gap-6"
              >
                <div className="flex items-center text-yellow-400 gap-1 font-bold text-xl">
                  <Star size={20} fill="currentColor" /> {banner.rating}
                </div>
                <div className="text-white/80 text-lg border-l border-white/30 pl-6">
                  Starting from{" "}
                  <span className="text-white font-bold text-2xl">
                    ${banner.cost}
                  </span>
                </div>
              </motion.div>

              <motion.button
                custom={3}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                onClick={() => handleBook(banner)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-2xl hover:bg-primary/90 transition-all flex items-center gap-3"
              >
                Book This Service <ShoppingBasket size={20} />
              </motion.button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Modern Modal */}
      <AnimatePresence>
        {openModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl relative z-10 overflow-y-auto max-h-[90vh]"
            >
              <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-6 text-center">
                Confirm Booking
              </h3>

              <form
                onSubmit={handleSubmit(handleBookSubmit)}
                className="space-y-5"
              >
                {/* Visual Service Recap */}
                <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl mb-4">
                  <img
                    src={selectedService?.image}
                    className="w-16 h-16 rounded-xl object-cover"
                    alt=""
                  />
                  <div>
                    <p className="font-bold">{selectedService?.serviceName}</p>
                    <p className="text-primary font-bold">
                      ${selectedService?.cost}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">Event Date</label>
                    <div className="relative">
                      <Calendar
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        type="date"
                        {...register("date", { required: "Date is required" })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    {errors.date && (
                      <p className="text-red-500 text-xs ml-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold ml-1">
                      Location Details
                    </label>
                    <div className="relative">
                      <MapPin
                        className="absolute left-4 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Full venue address"
                        {...register("location", {
                          required: "Location is required",
                        })}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    {errors.location && (
                      <p className="text-red-500 text-xs ml-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpenModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-6 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all"
                  >
                    Confirm Order
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Banner;
