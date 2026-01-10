import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Loader/Loading";
import {
  UserCheck,
  Clock,
  MapPin,
  DollarSign,
  PackageCheck,
  Briefcase,
} from "lucide-react";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const {
    data: parcels = [],
    refetch: parcelsRefetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", "planning-phase"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data.data;
    },
  });

  const { data: riders = [], isLoading: decoLoading } = useQuery({
    queryKey: ["riders", "approved"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?status=approved&role=decorator`
      );
      return res.data;
    },
  });

  const riderModalRef = useRef();

  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  const handleAssignRider = async (rider) => {
    const riderAssignInfo = {
      decoratorEmail: rider.email,
      decoratorName: rider.name,
      decoratorStatus: "accepted",
    };

    try {
      const res = await axiosSecure.patch(
        `/bookings/${selectedParcel._id}/role`,
        riderAssignInfo
      );
      if (res.data?.acknowledged) {
        riderModalRef.current.close();
        setSelectedParcel(null);
        parcelsRefetch();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Decorator has been assigned!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.message });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Manage Bookings
            </h1>
            <p className="text-gray-500 font-medium mt-1 uppercase text-xs tracking-widest">
              Assign Decorators to New Orders ({parcels.length})
            </p>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-2 px-4">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-tighter border-none">
                  <th className="bg-transparent pl-6">Service</th>
                  <th className="bg-transparent">Cost</th>
                  <th className="bg-transparent">Date</th>
                  <th className="bg-transparent">Location</th>
                  <th className="bg-transparent text-center pr-6">
                    Management
                  </th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <tr
                    key={parcel._id}
                    className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-800 transition-all group"
                  >
                    <td className="rounded-l-2xl pl-6 py-4 font-bold text-gray-800 dark:text-white">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <PackageCheck size={18} />
                        </div>
                        {parcel.serviceName}
                      </div>
                    </td>
                    <td className="font-bold text-green-600">
                      ৳ {parcel.price}
                    </td>
                    <td className="text-sm text-gray-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> {parcel.date}
                      </div>
                    </td>
                    <td className="text-sm text-gray-500 max-w-[150px] truncate">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} className="text-rose-400" />{" "}
                        {parcel.location}
                      </div>
                    </td>
                    <td className="rounded-r-2xl text-center pr-6">
                      {parcel.deliveryStatus === "planning-phase" &&
                      parcel.paymentStatus === "paid" ? (
                        <button
                          onClick={() => openAssignRiderModal(parcel)}
                          className="px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 mx-auto"
                        >
                          <UserCheck size={14} /> Assign Decorator
                        </button>
                      ) : parcel.deliveryStatus === "materials-prepared" ? (
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-[10px] font-black uppercase">
                          <Briefcase size={12} /> Assigned
                        </span>
                      ) : parcel.deliveryStatus === "Completed" ? (
                        <span className="inline-flex items-center px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase">
                          ✓ Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-tighter">
                          <DollarSign size={12} /> Waiting for Payment
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      <dialog
        ref={riderModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
            Available Professionals
          </h3>
          <p className="text-sm text-gray-400 mb-6 font-medium uppercase tracking-widest">
            Find and Assign a Decorator ({riders.length})
          </p>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {riders.map((rider) => (
              <div
                key={rider._id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-between group hover:bg-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 group-hover:bg-white/20 rounded-xl flex items-center justify-center font-bold text-primary group-hover:text-white">
                    {rider.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-white">
                      {rider.name}
                    </h4>
                    <p className="text-xs text-gray-500 group-hover:text-white/70">
                      {rider.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAssignRider(rider)}
                  className="px-4 py-2 bg-primary group-hover:bg-white text-white group-hover:text-primary text-xs font-black rounded-lg shadow-md transition-all"
                >
                  SELECT
                </button>
              </div>
            ))}
          </div>

          <div className="modal-action mt-8">
            <form method="dialog" className="w-full">
              <button className="btn btn-block bg-gray-100 dark:bg-gray-800 border-none text-gray-500 hover:text-red-500 rounded-xl font-bold uppercase tracking-widest text-xs">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;
