import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Shield,
  FileText,
  PlusCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const CreateDecoratorForm = () => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const decorInfo = {
      name: data.name,
      email: data.email,
      address: data.address,
      experience: data.experience,
      role: data.role,
      bio: data.bio,
      status: "active",
      createdAt: new Date(),
    };

    axiosSecure
      .post(`/users?email=${data?.email}`, decorInfo)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Decorator profile created successfully.",
          icon: "success",
          confirmButtonColor: "var(--p)",
        });
        reset();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to create decorator", "error");
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 shadow-2xl p-8 lg:p-10 rounded-[2.5rem] max-w-4xl mx-auto md:my-10 border border-gray-100 dark:border-gray-800"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
          <PlusCircle size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white leading-none">
            Add Decorator
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Register a new professional to the platform
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <User size={12} /> Full Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Ex: John Doe"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all"
            />
            {errors.name && (
              <p className="text-red-500 text-[10px] ml-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <Mail size={12} /> Email Address
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="decorator@example.com"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all"
            />
          </div>

          {/* Experience */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <Briefcase size={12} /> Experience (Years)
            </label>
            <input
              {...register("experience", { required: true })}
              type="number"
              placeholder="Ex: 5"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all"
            />
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <Shield size={12} /> Assign Role
            </label>
            <select
              {...register("role", { required: true })}
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all appearance-none"
            >
              <option value="decorator">Professional Decorator</option>
              <option value="user">Regular User (Disable)</option>
            </select>
          </div>

          {/* Address */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <MapPin size={12} /> Work Location / Address
            </label>
            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="House, Street, City"
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-2 flex items-center gap-1">
              <FileText size={12} /> Professional Bio
            </label>
            <textarea
              {...register("bio")}
              rows="3"
              placeholder="Tell us about the expertise and style..."
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-semibold transition-all"
            ></textarea>
          </div>
        </div>

        <div className="pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full md:w-max px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Add Decorator Profile
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateDecoratorForm;
