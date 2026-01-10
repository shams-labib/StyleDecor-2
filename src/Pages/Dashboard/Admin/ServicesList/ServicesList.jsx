import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Loader/Loading";
import {
  Edit3,
  Trash2,
  Tag,
  Box,
  DollarSign,
  Mail,
  Plus,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ServicesDashboardComponent = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      setServices(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    if (selected) {
      reset({
        serviceName: selected.serviceName,
        cost: selected.cost,
        unit: selected.unit,
        category: selected.category,
        description: selected.description,
        createdByEmail: selected.createdByEmail,
      });
    }
  }, [selected, reset]);

  const openEditModal = (service) => {
    setSelected(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/services/${selected._id}`, data);
      setServices((prev) =>
        prev.map((s) => (s._id === selected._id ? { ...s, ...data } : s))
      );
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Service details have been refreshed.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update service", "error");
    }
  };

  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/services/${service._id}`);
          setServices((prev) => prev.filter((s) => s._id !== service._id));
          Swal.fire("Deleted!", "Service removed successfully.", "success");
        } catch (err) {
          Swal.fire("Error!", "Delete failed!", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500 font-bold">
        Error loading services.
      </p>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Services Inventory
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              Manage and update all available offerings
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary px-5 py-2 rounded-2xl font-bold text-sm border border-primary/20">
              Total: {services.length}
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2 px-4">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-none">
                  <th className="bg-transparent pl-8 hidden sm:table-cell">
                    #
                  </th>
                  <th className="bg-transparent">Service Details</th>
                  <th className="bg-transparent hidden md:table-cell">
                    Category
                  </th>
                  <th className="bg-transparent">Cost</th>
                  <th className="bg-transparent hidden lg:table-cell">
                    Provider
                  </th>
                  <th className="bg-transparent text-right pr-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {services.map((s, i) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={s._id || i}
                      className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                    >
                      <td className="rounded-l-2xl pl-8 py-5 hidden sm:table-cell text-gray-400 font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask mask-squircle w-14 h-14 bg-gray-200 dark:bg-gray-700">
                              <img src={s.image} alt={s.serviceName} />
                            </div>
                          </div>
                          <div>
                            <div className="font-black text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                              {s.serviceName}
                            </div>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                              Unit: {s.unit}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell capitalize">
                        <span className="px-3 py-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-full text-[10px] font-black text-gray-500 dark:text-gray-400">
                          {s.category}
                        </span>
                      </td>
                      <td className="font-black text-primary">
                        ৳{s.cost?.toLocaleString()}
                      </td>
                      <td className="hidden lg:table-cell text-xs text-gray-500 font-medium italic">
                        {s.createdByEmail}
                      </td>
                      <td className="rounded-r-2xl text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(s)}
                            className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-primary rounded-xl transition-all shadow-sm"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(s)}
                            className="p-2.5 bg-white dark:bg-gray-800 text-gray-400 hover:text-rose-500 rounded-xl transition-all shadow-sm"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal (Premium Look) */}
      <AnimatePresence>
        {isOpen && (
          <div className="modal modal-open backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-box max-w-2xl bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 scrollbar-hide"
            >
              <h3 className="text-3xl font-black text-gray-800 dark:text-white mb-8 flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-xl">
                  <Edit3 size={24} />
                </div>
                Modify Service
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Box size={12} /> Service Title
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      {...register("serviceName", { required: true })}
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Tag size={12} /> Category
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      {...register("category", { required: true })}
                    />
                  </div>

                  {/* Cost */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <DollarSign size={12} /> Cost (BDT)
                    </label>
                    <input
                      type="number"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      {...register("cost", {
                        valueAsNumber: true,
                        required: true,
                      })}
                    />
                  </div>

                  {/* Unit */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Box size={12} /> Pricing Unit
                    </label>
                    <input
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      {...register("unit", { required: true })}
                    />
                  </div>

                  {/* Created By */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      <Mail size={12} /> Creator Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      {...register("createdByEmail", { required: true })}
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 tracking-widest flex items-center gap-1">
                      Full Description
                    </label>
                    <textarea
                      className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-primary outline-none text-gray-700 dark:text-gray-200 font-bold transition-all"
                      rows={3}
                      {...register("description")}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    className="btn flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl font-bold uppercase text-xs tracking-widest"
                    onClick={closeModal}
                  >
                    Dismiss
                  </button>
                  <button
                    type="submit"
                    className="btn flex-1 bg-primary hover:bg-primary/90 text-white border-none rounded-2xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-primary/20 transition-all"
                  >
                    Save Updates
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

export default ServicesDashboardComponent;
