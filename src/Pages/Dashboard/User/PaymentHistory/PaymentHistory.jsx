import React from "react";
import {
  Copy,
  CheckCircle2,
  Clock,
  Hash,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../Loader/Loading";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Copied to clipboard",
      showConfirmButton: false,
      timer: 1500,
      background: "#10b981",
      color: "#fff",
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              Payment Ledger
            </h2>
            <p className="text-gray-500 font-medium mt-1">
              Track all your transactions and invoices
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest block">
              Total Spent
            </span>
            <span className="text-2xl font-black text-primary">
              ৳
              {payments
                .reduce((acc, curr) => acc + curr.amount, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-3 px-6">
              <thead>
                <tr className="text-gray-400 text-[11px] uppercase tracking-widest border-none">
                  <th className="bg-transparent pl-4">#</th>
                  <th className="bg-transparent">Parcel & Tracking</th>
                  <th className="bg-transparent">Transaction Details</th>
                  <th className="bg-transparent">Amount</th>
                  <th className="bg-transparent">Status</th>
                  <th className="bg-transparent text-right">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-20">
                      <div className="flex flex-col items-center opacity-20">
                        <Clock size={64} />
                        <p className="text-xl font-bold mt-4">
                          No transactions found
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  payments.map((p, index) => (
                    <motion.tr
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={p._id}
                      className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                    >
                      <td className="rounded-l-2xl pl-6 text-gray-400 font-bold">
                        {index + 1}
                      </td>

                      <td className="py-5">
                        <div className="flex flex-col">
                          <span className="font-black text-gray-800 dark:text-white group-hover:text-primary transition-colors">
                            {p.parcelName}
                          </span>
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase tracking-tighter">
                            <Hash size={10} /> {p.trackingId}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 w-fit px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700">
                          <span className="text-xs font-mono font-bold text-gray-500">
                            {p.transactionId.slice(0, 14)}...
                          </span>
                          <button
                            onClick={() => handleCopy(p.transactionId)}
                            className="text-gray-400 hover:text-primary transition-colors"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center font-black text-gray-900 dark:text-gray-100">
                          <span className="text-primary mr-0.5">৳</span>
                          {p.amount.toLocaleString()}
                        </div>
                      </td>

                      <td>
                        {p.paymentStatus === "paid" ? (
                          <div className="flex items-center gap-1.5 text-emerald-500 font-black text-[10px] uppercase bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20">
                            <CheckCircle2 size={12} /> Completed
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-rose-500 font-black text-[10px] uppercase bg-rose-500/10 w-fit px-3 py-1 rounded-full border border-rose-500/20">
                            <Clock size={12} /> Pending
                          </div>
                        )}
                      </td>

                      <td className="rounded-r-2xl text-right pr-6">
                        <div className="text-xs font-bold text-gray-500">
                          {new Date(p.paidAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[10px] font-medium text-gray-400">
                          {new Date(p.paidAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
