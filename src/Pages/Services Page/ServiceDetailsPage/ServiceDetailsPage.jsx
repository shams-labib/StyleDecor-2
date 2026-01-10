import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  ShoppingBasket,
  CircleDollarSign,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loader/Loading";

const iconAnim = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: { type: "spring", stiffness: 300 },
  },
};

const ServiceDetailsPage = () => {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleBookSubmit = (data) => {
    const bookingInfo = {
      serviceName: service.serviceName,
      price: service.cost,
      userName: user?.displayName,
      userEmail: user?.email,
      date: data.date,
      bookingsDate: new Date(),
      location: data.location,
      category: service.category,
      image: service.image,
    };

    axiosSecure.post("/bookings", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: `Your booking for ${service.serviceName} is confirmed.`,
          confirmButtonColor: "var(--p)",
        });
        setOpenModal(false);
        reset();
      }
    });
  };

  const handleBook = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
      Swal.fire({ icon: "error", title: "Please login first" });
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card lg:card-side bg-white dark:bg-gray-900 shadow-2xl p-6 rounded-3xl border border-gray-100 dark:border-gray-800 max-w-5xl w-full"
      >
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <motion.img
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            src={service?.image}
            alt={service?.serviceName}
            className="rounded-2xl w-full object-cover h-80 lg:h-[450px] shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="card-body space-y-4 lg:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-bold"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h2 className="card-title text-4xl font-black text-gray-800 dark:text-white">
            {service?.serviceName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
            {service?.description}
          </p>

          <div className="mt-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="font-bold text-gray-500 text-sm uppercase tracking-widest">
              Category:{" "}
              <span className="text-primary">{service?.category}</span>
            </p>
            <p className="font-black text-3xl text-primary mt-2">
              ৳ {service?.cost}{" "}
              <span className="text-sm font-medium text-gray-400">
                / {service?.unit}
              </span>
            </p>
          </div>

          <div className="card-actions mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-primary hover:bg-primary/90 border-none text-white px-10 h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/20"
              onClick={handleBook}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* --- MODAL (Original Style Restored) --- */}
      {openModal && (
        <div className="modal modal-open backdrop-blur-sm bg-black/40">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="modal-box dark:bg-gray-800 rounded-3xl p-8 max-w-md border border-gray-100 dark:border-gray-700 shadow-2xl"
          >
            <h3 className="font-black text-3xl mb-6 text-center text-gray-800 dark:text-white">
              Book Service
            </h3>

            <form
              onSubmit={handleSubmit(handleBookSubmit)}
              className="space-y-4"
            >
              {[
                {
                  label: "Your Name",
                  value: user?.displayName,
                  icon: <User size={18} />,
                },
                {
                  label: "Your Email",
                  value: user?.email,
                  icon: <Mail size={18} />,
                },
                {
                  label: "Service Name",
                  value: service?.serviceName,
                  icon: <ShoppingBasket size={18} />,
                },
                {
                  label: "Cost",
                  value: `${service?.cost} BDT`,
                  icon: <CircleDollarSign size={18} />,
                },
              ].map((field, i) => (
                <div key={i} className="form-control group">
                  <label className="label py-1 text-xs font-bold text-gray-400 uppercase ml-1">
                    {field.label}
                  </label>
                  <div className="input input-bordered border-gray-200 dark:border-gray-700 flex items-center gap-3 h-12 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
                    <motion.div
                      whileHover="hover"
                      variants={iconAnim}
                      className="text-primary"
                    >
                      {field.icon}
                    </motion.div>
                    <input
                      type="text"
                      value={field.value}
                      disabled
                      className="w-full bg-transparent outline-none text-sm font-semibold text-gray-500"
                    />
                  </div>
                </div>
              ))}

              {/* Booking Date */}
              <div className="form-control group">
                <label className="label py-1 text-xs font-bold text-gray-400 uppercase ml-1">
                  Booking Date
                </label>
                <div className="input input-bordered border-gray-200 dark:border-gray-700 flex items-center gap-3 h-12 rounded-xl focus-within:border-primary transition-all">
                  <motion.div
                    variants={iconAnim}
                    whileHover="hover"
                    className="text-primary"
                  >
                    <Calendar size={18} />
                  </motion.div>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="w-full bg-transparent outline-none text-sm font-semibold dark:text-white"
                  />
                </div>
                {errors.date && (
                  <span className="text-red-500 text-[10px] mt-1 ml-2 font-bold uppercase tracking-tighter">
                    Date is required
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="form-control group">
                <label className="label py-1 text-xs font-bold text-gray-400 uppercase ml-1">
                  Location
                </label>
                <div className="input input-bordered border-gray-200 dark:border-gray-700 flex items-center gap-3 h-12 rounded-xl focus-within:border-primary transition-all">
                  <motion.div
                    variants={iconAnim}
                    whileHover="hover"
                    className="text-primary"
                  >
                    <MapPin size={18} />
                  </motion.div>
                  <input
                    type="text"
                    placeholder="Event location"
                    {...register("location", { required: true })}
                    className="w-full bg-transparent outline-none text-sm font-semibold dark:text-white"
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500 text-[10px] mt-1 ml-2 font-bold uppercase tracking-tighter">
                    Location is required
                  </span>
                )}
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn bg-primary hover:bg-primary/90 border-none text-white w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20"
                  type="submit"
                >
                  Confirm Booking
                </motion.button>

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-ghost btn-sm text-gray-400 hover:text-red-500"
                >
                  Close
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
