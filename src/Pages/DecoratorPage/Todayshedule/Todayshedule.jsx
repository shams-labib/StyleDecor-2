import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

const Todayshedule = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["decorators", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/bookings?decoratorEmail=${user?.email}`
      );
      return res.data.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Filter by selected date
  const filteredParcels = parcels.filter((parcel) => {
    const parcelDate = new Date(parcel.date).toISOString().split("T")[0];
    return parcelDate === selectedDate;
  });

  return (
    <div>
      <h2 className="md:text-4xl text-3xl text-center font-semibold mb-6">
        Today's Schedule : {filteredParcels.length}
      </h2>

      {/* Date Filter */}
      <div className="mb-5">
        <label className="font-semibold mr-3">Filter by date:</label>
        <input
          type="date"
          className="border px-3 py-2 rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra table-hover w-full border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Tracking ID</th>
              <th>Category</th>
              <th>Location</th>
              <th>Cost (BDT)</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredParcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <th>{index + 1}</th>

                {/* Image + Service Name */}
                <td className="flex items-center gap-2">
                  <img
                    src={parcel.image}
                    className="w-12 h-12 object-cover rounded-lg border"
                    alt=""
                  />
                  <span>{parcel.serviceName}</span>
                </td>

                {/* Tracking ID */}
                <td className="font-mono text-sm">{parcel.trackingId}</td>

                {/* Category */}
                <td>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {parcel.category}
                  </span>
                </td>

                {/* Location */}
                <td>{parcel.location}</td>

                {/* Cost */}
                <td className="font-semibold">{parcel.price}</td>

                {/* Status */}
                <td>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-lg text-sm">
                    {parcel.deliveryStatus || "Pending"}
                  </span>
                </td>
              </tr>
            ))}

            {filteredParcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-5 text-gray-500">
                  No deliveries scheduled for this date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todayshedule;
