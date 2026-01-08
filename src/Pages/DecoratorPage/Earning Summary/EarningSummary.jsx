import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Loading from "../../Loader/Loading";

const EarningSummary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email, "Completed"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user?.email}&deliveryStatus=Completed`
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  const calculateEarnings = (price) => {
    if (price > 80000) return 9999;
    if (price > 50000) return 7000;
    if (price > 10000) return 1000;
    return 0;
  };

  return (
    <div className="p-6 ">
      <div className="flex flex-col items-center gap-3 mb-10">
        <FaMoneyCheckAlt className="text-4xl text-blue-600 drop-shadow" />
        <h1 className="md:text-4xl text-2xl font-extrabold text-gray-800 dark:text-white tracking-wide text-center">
          Deliveries Earnings Summary
        </h1>
        <p className="text-gray-500 font-medium">
          Completed Deliveries:{" "}
          <span className="text-blue-600">{parcels.length}</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wide">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Service Name</th>
              <th className="p-4 text-left">Created At</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Earnings</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-4 font-semibold text-gray-800">{index + 1}</td>
                <td className="p-4 font-medium text-gray-700">
                  {parcel.serviceName}
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(parcel.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-gray-600 capitalize">
                  {parcel.category}
                </td>
                <td className="p-4 font-semibold text-blue-600">
                  {parcel.price} BDT
                </td>
                <td className="p-4 font-semibold text-green-600">
                  {calculateEarnings(parcel.price)} BDT
                </td>
                <td className="p-4 text-center">
                  <button className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition">
                    Cash Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningSummary;
