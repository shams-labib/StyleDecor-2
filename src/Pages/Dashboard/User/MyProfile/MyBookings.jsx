import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Loader/Loading";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import {
  Calendar,
  Filter,
  MapPin,
  CreditCard,
  Edit,
  Trash2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ["bookings", page, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?email=${user?.email}&page=${page}&limit=${limit}`
      );
      setServices(res.data.data);
      setTotalPages(res.data.totalPages);
      return res.data.data;
    },
  });

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (selected) {
      reset({
        userName: selected.userName,
        price: selected.price,
        category: selected.category,
        location: selected.location,
        userEmail: selected.userEmail,
      });
    }
  }, [selected, reset]);

  const sortedServices = [...services].sort((a, b) => {
    if (sortBy === "date") {
      const d1 = new Date(a.bookingsDate),
        d2 = new Date(b.bookingsDate);
      return sortOrder === "asc" ? d1 - d2 : d2 - d1;
    }
    const s1 = (a.deliveryStatus || "").toLowerCase(),
      s2 = (b.deliveryStatus || "").toLowerCase();
    return sortOrder === "asc" ? s1.localeCompare(s2) : s2.localeCompare(s1);
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${selected._id}`, data);
      if (res.data.modifiedCount) {
        setServices((prev) =>
          prev.map((s) => (s._id === selected._id ? { ...s, ...data } : s))
        );
        Swal.fire({
          icon: "success",
          title: "Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal();
      }
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = (service) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Cancel it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/bookings/${service._id}`);
        setServices((prev) => prev.filter((s) => s._id !== service._id));
        Swal.fire("Cancelled", "Your booking has been removed.", "success");
      }
    });
  };

  const handlePayment = async (data) => {
    const paymentInfo = {
      cost: data.price,
      parcelId: data._id,
      senderEmail: data.userEmail,
      parcelName: data.serviceName,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            My Bookings
          </h2>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Filter size={16} className="ml-2 text-gray-400" />
            <select
              className="select select-sm select-ghost focus:bg-transparent font-bold text-xs"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">By Date</option>
              <option value="status">By Status</option>
            </select>
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="btn btn-sm btn-ghost px-2"
            >
              <ArrowUpDown size={16} className="text-primary" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2 px-4">
              <thead>
                <tr className="text-gray-400 text-[10px] uppercase tracking-widest border-none">
                  <th className="bg-transparent pl-8">Service</th>
                  <th className="bg-transparent hidden md:table-cell">
                    Location
                  </th>
                  <th className="bg-transparent">Price</th>
                  <th className="bg-transparent">Payment</th>
                  <th className="bg-transparent text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedServices.map((s, i) => (
                  <motion.tr
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={s._id}
                    className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                  >
                    <td className="rounded-l-2xl pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="mask mask-squircle w-12 h-12 bg-gray-200">
                          <img src={s.image} alt="" />
                        </div>
                        <div>
                          <div className="font-black text-gray-800 dark:text-white">
                            {s.userName}
                          </div>
                          <div className="text-[10px] font-bold uppercase text-primary flex items-center gap-1">
                            <Calendar size={10} /> {s.bookingsDate}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell font-medium text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} /> {s.location}
                      </div>
                    </td>
                    <td className="font-black text-gray-700 dark:text-gray-200">
                      ৳{s.price?.toLocaleString()}
                    </td>
                    <td>
                      {s.paymentStatus === "paid" ? (
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-black uppercase">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(s)}
                          className="btn btn-xs bg-primary text-white border-none rounded-lg font-bold"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                    <td className="rounded-r-2xl text-center">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelected(s);
                            setIsOpen(true);
                          }}
                          className="btn btn-ghost btn-sm text-gray-400 hover:text-primary"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
                          className="btn btn-ghost btn-sm text-gray-400 hover:text-rose-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="p-2 rounded-xl bg-white dark:bg-gray-900 border disabled:opacity-30 shadow-sm"
          >
            <ChevronLeft />
          </button>
          <span className="font-black text-sm uppercase tracking-widest">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="p-2 rounded-xl bg-white dark:bg-gray-900 border disabled:opacity-30 shadow-sm"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="modal modal-open backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-box bg-white dark:bg-gray-900 rounded-[2.5rem] p-10 max-w-lg border dark:border-gray-800"
            >
              <h3 className="text-2xl font-black mb-6">Modify Booking</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1">
                    Display Name
                  </label>
                  <input
                    {...register("userName", { required: true })}
                    className="input input-bordered rounded-2xl bg-gray-50 dark:bg-gray-800 border-none font-bold"
                  />
                </div>
                <div className="form-control">
                  <label className="text-[10px] font-black uppercase text-gray-400 ml-2 mb-1">
                    Event Location
                  </label>
                  <input
                    {...register("location", { required: true })}
                    className="input input-bordered rounded-2xl bg-gray-50 dark:bg-gray-800 border-none font-bold"
                  />
                </div>
                <div className="modal-action gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-ghost rounded-2xl font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-2xl font-bold px-8 shadow-lg shadow-primary/20"
                  >
                    Save Changes
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

export default MyBookings;
