import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  PlusCircle,
  DollarSign,
  Star,
  Layers,
  Image as ImageIcon,
  AlignLeft,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CreateService() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      cost: parseFloat(data.cost),
      rating: parseFloat(data.rating),
      createdByEmail: user?.email,
      createdAt: new Date(),
    };

    Swal.fire({
      title: "Confirm New Service?",
      text: "This will be visible to all customers.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--p)",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Create it!",
      background: "var(--b1)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post("/services", finalData);
          Swal.fire({
            icon: "success",
            title: "Service Published!",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
        } catch (err) {
          Swal.fire("Error!", "Failed to save service.", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight flex items-center justify-center gap-3">
            <PlusCircle className="text-primary" size={36} /> Add New Service
          </h2>
          <p className="text-gray-500 font-medium mt-2">
            Expand your portfolio with a new decoration package
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 shadow-2xl shadow-gray-200/50 dark:shadow-none rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-gray-800">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Service Name */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Service Title
              </label>
              <div className="relative">
                <input
                  {...register("serviceName", { required: true })}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold"
                  placeholder="e.g. Royal Wedding Package"
                />
                {errors.serviceName && (
                  <span className="text-[10px] text-red-500 absolute -bottom-5 left-2">
                    Title is required
                  </span>
                )}
              </div>
            </div>

            {/* Cost */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <DollarSign size={12} /> Cost (BDT)
              </label>
              <input
                type="number"
                {...register("cost", { required: true })}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold"
                placeholder="50000"
              />
            </div>

            {/* Rating & Unit (Grid inside Grid) */}
            <div className="grid grid-cols-2 gap-4 md:col-span-1">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                  <Star size={12} /> Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  {...register("rating", { required: true })}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold text-center"
                  placeholder="4.5"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  Unit Type
                </label>
                <select
                  {...register("unit", { required: true })}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-4 py-4 focus:ring-2 focus:ring-primary outline-none font-bold"
                >
                  <option value="per_sqft">Sq-ft</option>
                  <option value="per_floor">Floor</option>
                  <option value="per_event">Event</option>
                </select>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Layers size={12} /> Service Category
              </label>
              <select
                {...register("category", { required: true })}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold capitalize"
              >
                <option value="">Select Category</option>
                <option value="home">Home</option>
                <option value="wedding">Wedding</option>
                <option value="office">Office</option>
                <option value="seminar">Seminar</option>
                <option value="meeting">Birthday</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <ImageIcon size={12} /> Image URL
              </label>
              <input
                type="text"
                {...register("image", { required: true })}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <AlignLeft size={12} /> Detailed Description
              </label>
              <textarea
                {...register("description", { required: true })}
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-[1.5rem] px-5 py-4 focus:ring-2 focus:ring-primary outline-none font-bold min-h-[120px]"
                placeholder="Describe the aesthetic, materials used, and what's included..."
              ></textarea>
            </div>

            {/* Email (Read Only) */}
            <div className="md:col-span-2 space-y-2 opacity-60 cursor-not-allowed">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Mail size={12} /> Creator Email
              </label>
              <input
                value={user?.email || ""}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-950 border-none rounded-2xl px-5 py-4 font-bold text-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                Create Service
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
