import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  ShoppingBasket,
  CircleDollarSign,
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
        });
      }
    });

    setOpenModal(false);
    reset();
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
    <div className="container mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card lg:card-side bg-white dark:bg-gray-900 shadow-2xl p-6 rounded-2xl border border-gray-100 dark:border-gray-700 backdrop-blur"
      >
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            src={service?.image}
            alt={service?.serviceName}
            className="rounded-xl w-full object-cover h-80 lg:h-full shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="card-body space-y-3">
          <h2 className="card-title text-3xl font-bold tracking-wide">
            {service?.serviceName}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {service?.description}
          </p>
          <div className="mt-4 space-y-1">
            <p className="font-semibold">
              Category:{" "}
              <span className="text-primary">{service?.category}</span>
            </p>
            <p className="font-semibold text-xl text-green-600">
              Price: {service?.cost} BDT / {service?.unit}
            </p>
          </div>
          <div className="card-actions mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn btn-primary px-6 shadow-lg"
              onClick={handleBook}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="modal modal-open"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="modal-box dark:bg-gray-800 rounded-xl shadow-xl"
          >
            <h3 className="font-bold text-2xl mb-4 text-center">
              Book This Service
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
                  value: service?.cost,
                  icon: <CircleDollarSign size={18} />,
                },
              ].map((field, i) => (
                <div key={i} className="form-control group">
                  <label className="label font-semibold">{field.label}</label>
                  <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md transition-all duration-200">
                    <motion.div whileHover="hover" variants={iconAnim}>
                      {field.icon}
                    </motion.div>
                    <input
                      type="text"
                      value={field.value}
                      disabled
                      className="w-full bg-transparent outline-none"
                    />
                  </div>
                </div>
              ))}

              {/* Booking Date */}
              <div className="form-control group">
                <label className="label font-semibold">Booking Date</label>
                <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md">
                  <motion.div variants={iconAnim} whileHover="hover">
                    <Calendar size={18} />
                  </motion.div>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    Booking date is required
                  </span>
                )}
              </div>

              {/* Location */}
              <div className="form-control group">
                <label className="label font-semibold">Location</label>
                <div className="input input-bordered flex items-center gap-2 group-hover:shadow-md">
                  <motion.div variants={iconAnim} whileHover="hover">
                    <MapPin size={18} />
                  </motion.div>
                  <input
                    type="text"
                    placeholder="Event location"
                    {...register("location", { required: true })}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    Location is required
                  </span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                className="btn btn-primary w-full shadow-lg"
                type="submit"
              >
                Confirm Booking
              </motion.button>
            </form>

            <div className="modal-action">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setOpenModal(false)}
                className="btn btn-outline btn-primary"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceDetailsPage;
