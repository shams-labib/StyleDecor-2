import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  ShieldCheck,
  X,
  User,
  Camera,
} from "lucide-react";

const ProfileCard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

  const { data: profileData = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`users?email=${user.email}`);
      return res.data[0] || {};
    },
  });

  const profile = {
    name: user?.displayName || profileData.name || "User Name",
    email: user?.email || profileData.email,
    address: profileData.address || "Address Not Set",
    experience: profileData.experience || 0,
    role: profileData.role || "User",
    status: profileData.status || "offline",
    createdAt: profileData.createdAt || new Date(),
    photoURL:
      user?.photoURL ||
      profileData.photoURL ||
      "https://i.ibb.co/5GzXkwq/user.png",
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-16 px-4 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
      >
        {/* Banner & Avatar (Same as before) */}
        <div className="h-44 bg-gradient-to-tr from-blue-600 to-purple-600 relative">
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
            <div className="w-36 h-36 rounded-full p-1.5 bg-white dark:bg-gray-900 shadow-2xl">
              <img
                src={profile.photoURL}
                alt={profile.name}
                className="w-full h-full rounded-full object-cover bg-gray-100 dark:bg-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-20 px-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">
            {profile.name}
          </h2>
          <p className="text-sm font-bold text-gray-400 mt-1">
            {profile.email}
          </p>
        </div>

        {/* Info Grid (Same as before) */}
        <div className="p-8 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <InfoBox
              icon={<ShieldCheck size={18} />}
              label="Status"
              value={profile.status}
              color="text-emerald-500"
            />
            <InfoBox
              icon={<Briefcase size={18} />}
              label="Experience"
              value={`${profile.experience} Yrs`}
              color="text-blue-500"
            />
          </div>
          <InfoBox
            icon={<MapPin size={18} />}
            label="Address"
            value={profile.address}
            color="text-rose-500"
            full
          />
        </div>

        {/* Buttons */}
        <div className="px-8 pb-10 space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)} // Open Modal
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg"
          >
            Edit Profile
          </motion.button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
          >
            <FaArrowLeft size={12} /> Back to Dashboard
          </Link>
        </div>
      </motion.div>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 z-[70] border border-gray-100 dark:border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                  Edit Profile
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      defaultValue={profile.name}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                    Experience (Years)
                  </label>
                  <div className="relative">
                    <Briefcase
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="number"
                      defaultValue={profile.experience}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      defaultValue={profile.address}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 dark:text-gray-200 font-semibold"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold shadow-xl"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoBox = ({ icon, label, value, color, full }) => (
  <div
    className={`p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 flex items-center gap-4 ${
      full ? "w-full" : ""
    }`}
  >
    <div
      className={`p-2 rounded-xl bg-white dark:bg-gray-800 shadow-sm ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate max-w-[150px]">
        {value}
      </p>
    </div>
  </div>
);

export default ProfileCard;
