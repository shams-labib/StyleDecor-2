import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  Trash2,
  ShieldCheck,
  User as UserIcon,
  Palette,
  Mail,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  const handleRoleChange = (userId, newRole) => {
    axiosSecure
      .patch(`/users/${userId}`, { role: newRole })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Role updated to ${newRole}`,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete!",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#fff"
        : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${userId}`).then(() => {
          setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
          Swal.fire("Deleted!", "User has been removed.", "success");
        });
      }
    });
  };

  // Helper for Role Badges
  const getRoleIcon = (role) => {
    if (role === "admin")
      return <ShieldCheck size={14} className="text-rose-500" />;
    if (role === "decorator")
      return <Palette size={14} className="text-amber-500" />;
    return <UserIcon size={14} className="text-blue-500" />;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">
            User Management
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Total registered users: {users.length}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-400 uppercase text-[11px] tracking-widest border-none">
              <th className="bg-transparent font-black pb-4">User Details</th>
              <th className="bg-transparent font-black pb-4">Contact Info</th>
              <th className="bg-transparent font-black pb-4 text-center">
                Current Role
              </th>
              <th className="bg-transparent font-black pb-4 text-center">
                Manage Role
              </th>
              <th className="bg-transparent font-black pb-4 text-right pr-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {users.map((user) => (
                <motion.tr
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={user._id}
                  className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <td className="rounded-l-2xl py-4 border-none">
                    <div className="flex items-center gap-4 pl-2">
                      <div className="avatar placeholder">
                        <div className="bg-primary/10 text-primary rounded-xl w-12 h-12 font-bold shadow-sm">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt="" />
                          ) : (
                            <span className="text-lg">
                              {user.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 dark:text-gray-200">
                          {user.name}
                        </div>
                        <div className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md inline-block mt-1 font-bold">
                          ID: {user._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="border-none">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Mail size={12} className="text-primary" /> {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Phone size={12} className="text-primary" />{" "}
                        {user.phone || "N/A"}
                      </div>
                    </div>
                  </td>

                  <td className="border-none text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 text-[11px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </td>

                  <td className="border-none text-center">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="select select-sm select-bordered bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="decorator">Decorator</option>
                    </select>
                  </td>

                  <td className="rounded-r-2xl border-none text-right pr-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="p-2.5 text-gray-400 hover:text-white hover:bg-red-500 rounded-xl transition-all shadow-sm hover:shadow-red-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
