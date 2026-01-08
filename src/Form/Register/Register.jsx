import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion"; // Animation library
import axios from "axios";
import Swal from "sweetalert2";

import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Pages/Loader/Loading";

const Register = () => {
  const { registerUser, loading, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <Loading />;

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_img_host
      }`;

      // 1. Create User
      await registerUser(data.email, data.password);

      // 2. Upload Image
      const formData = new FormData();
      formData.append("image", profileImg);
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;

      // 3. Prepare Data
      const userProfileUpdate = { displayName: data.name, photoURL };
      const decorInfo = {
        name: data.name,
        email: data.email,
        address: data.address,
        experience: data.experience,
        role: "user",
        photoURL,
      };

      // 4. Save to DB & Update Profile
      await Promise.all([
        axiosSecure.post(`/users?email=${data?.email}`, decorInfo),
        updateUserProfile(userProfileUpdate),
      ]);

      Swal.fire({
        title: "Account Created!",
        text: "Welcome to ZapShift",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Registration failed. Please try again.", "error");
    }
  };

  // Animation variants for staggered list
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-8 md:p-10">
            <header className="mb-8">
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Join ZapShift
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Create your account to get started.
              </p>
            </header>

            <form
              onSubmit={handleSubmit(handleRegistration)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <motion.div variants={itemVars} className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    Full Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 transition-all outline-none dark:text-white"
                    placeholder="John Doe"
                  />
                </motion.div>

                {/* Experience */}
                <motion.div variants={itemVars} className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    Experience
                  </label>
                  <input
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 transition-all outline-none dark:text-white"
                    placeholder="e.g. 2 Years"
                  />
                </motion.div>
              </div>

              {/* Address */}
              <motion.div variants={itemVars} className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  Address
                </label>
                <input
                  {...register("address", { required: "Address is required" })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 transition-all outline-none dark:text-white"
                  placeholder="Your location"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemVars} className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 transition-all outline-none dark:text-white"
                  placeholder="name@example.com"
                />
              </motion.div>

              {/* Photo Upload */}
              <motion.div variants={itemVars} className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  Profile Photo
                </label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
                />
              </motion.div>

              {/* Password */}
              <motion.div variants={itemVars} className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Required",
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-transparent focus:border-blue-500 transition-all outline-none dark:text-white"
                  placeholder="••••••••"
                />
                {errors.password?.type === "pattern" && (
                  <p className="text-[10px] text-red-500 mt-1 font-bold">
                    Must include Uppercase, Lowercase, and Number
                  </p>
                )}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-2xl shadow-lg transition-all mt-6"
              >
                Create Account
              </motion.button>
            </form>

            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
                <span className="mx-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  Social Sign Up
                </span>
                <div className="flex-grow border-t border-gray-100 dark:border-gray-800"></div>
              </div>
              <SocialLogin />
              <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 font-bold hover:underline underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
