import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Loader/Loading";
import {
  Edit,
  Trash2,
  Mail,
  MapPin,
  Briefcase,
  ShieldCheck,
  Star,
  XCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DecoratorList() {
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { refetch, isLoading } = useQuery({
    queryKey: ["users", "decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=decorator");
      setDecorators(res.data);
      return res.data;
    },
  });

  const openEditModal = (item) => {
    setSelected(item);
    reset(item);
    document.getElementById("editModal").showModal();
  };

  const onSubmit = async (formData) => {
    try {
      const updatePayload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        experience: formData.experience,
        address: formData.address,
      };

      await axiosSecure.patch(`/users/${selected._id}`, updatePayload);
      setDecorators((prev) =>
        prev.map((d) =>
          d._id === selected._id ? { ...d, ...updatePayload } : d
        )
      );

      document.getElementById("editModal").close();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        confirmButtonColor: "var(--p)",
      });
      refetch();
    } catch (err) {
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  const handleStatusChange = (userId, newStatus) => {
    Swal.fire({
      title: `Set status to ${newStatus}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--p)",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/${userId}/status`, {
            status: newStatus,
          });
          setDecorators((prev) =>
            prev.map((d) =>
              d._id === userId ? { ...d, status: newStatus } : d
            )
          );
          Swal.fire("Success", `Decorator is now ${newStatus}`, "success");
        } catch (err) {
          Swal.fire("Error", "Update failed", "error");
        }
      }
    });
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Delete Decorator?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${userId}`);
          setDecorators((prev) => prev.filter((d) => d._id !== userId));
          Swal.fire("Deleted!", "Removed from list.", "success");
        } catch (err) {
          Swal.fire("Error", "Delete failed", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-black text-gray-800 dark:text-white tracking-tight">
            Decorator Team
          </h2>
          <p className="text-gray-500 font-medium">
            Manage and monitor all professional decorators
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-6 py-2 rounded-2xl font-bold border border-primary/20">
          Total: {decorators.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {decorators.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={item._id}
              className="bg-white dark:bg-gray-900 p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 group relative overflow-hidden"
            >
              {/* Status Ribbon */}
              <div
                className={`absolute top-0 right-0 px-6 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
                  item.status === "approved"
                    ? "bg-green-500 text-white"
                    : item.status === "disabled"
                    ? "bg-rose-500 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {item.status || "pending"}
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-black">
                  {item.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-tighter">
                    <ShieldCheck size={14} className="text-primary" />{" "}
                    {item.role}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Mail size={16} className="text-primary/60" /> {item.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Star size={16} className="text-amber-400" />{" "}
                  {item.experience} Years Experience
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={16} className="text-rose-400" /> {item.address}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-primary rounded-xl transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-rose-500 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </button>

                <select
                  value={item.status || "pending"}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="ml-auto select select-sm select-ghost text-xs font-bold uppercase tracking-tighter focus:bg-transparent"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="approved">✅ Approve</option>
                  <option value="disabled">🚫 Disable</option>
                </select>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit Modal */}
      <dialog id="editModal" className="modal backdrop-blur-sm">
        <div className="modal-box max-w-xl bg-white dark:bg-gray-900 rounded-[2.5rem] p-10">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Edit className="text-primary" /> Edit Profile
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                {...register("name")}
                className="input bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-semibold"
                placeholder="Name"
              />
              <input
                {...register("email")}
                className="input bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-semibold"
                placeholder="Email"
              />
              <select
                {...register("role")}
                className="select bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-semibold"
              >
                <option value="admin">Admin</option>
                <option value="decorator">Decorator</option>
              </select>
              <input
                {...register("experience")}
                className="input bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-semibold"
                placeholder="Experience"
              />
              <input
                {...register("address")}
                className="input bg-gray-50 dark:bg-gray-800 border-none rounded-2xl font-semibold md:col-span-2"
                placeholder="Address"
              />
            </div>

            <div className="flex gap-3 pt-6">
              <button
                type="submit"
                className="btn bg-primary hover:bg-primary/90 border-none text-white flex-1 rounded-2xl font-bold"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("editModal").close()}
                className="btn bg-gray-100 dark:bg-gray-800 border-none flex-1 rounded-2xl font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
