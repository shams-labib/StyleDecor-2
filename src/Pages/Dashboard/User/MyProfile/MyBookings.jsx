// Updated MyBookings.jsx with sorting by date and status
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Loader/Loading";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const { user } = useAuth();

  // Sorting states
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // items per page

  const { isLoading, isError } = useQuery({
    queryKey: ["bookings", page],
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

  // Prefill modal
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

  // Sorting function using bookingsDate and deliveryStatus
  const sortServices = (data) => {
    let sorted = [...data];

    if (sortBy === "date") {
      sorted.sort((a, b) => {
        const d1 = new Date(a.bookingsDate);
        const d2 = new Date(b.bookingsDate);
        return sortOrder === "asc" ? d1 - d2 : d2 - d1;
      });
    }

    if (sortBy === "status") {
      sorted.sort((a, b) => {
        const s1 = a.deliveryStatus?.toLowerCase() || "";
        const s2 = b.deliveryStatus?.toLowerCase() || "";
        return sortOrder === "asc"
          ? s1.localeCompare(s2)
          : s2.localeCompare(s1);
      });
    }

    return sorted;
  };

  const sortedServices = sortServices(services);

  function openEditModal(service) {
    setSelected(service);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelected(null);
  }

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/bookings/${selected._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Services Updated Successfully!",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => console.log(err));

    setServices((prev) =>
      prev.map((s) => (s._id === selected._id ? { ...s, ...data } : s))
    );
    closeModal();
  };

  const handleDelete = (service) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove booking",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${service._id}`);
          setServices((prev) => prev.filter((s) => s._id !== service._id));
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Delete failed!", "error");
        }
      }
    });
  };

  const handlePayment = async (data) => {
    const paymentInfo = {
      cost: data.price,
      parcelId: data._id,
      senderEmail: data.userEmail,
      parcelName: data.serviceName,
      trackingId: data?.trackingId,
    };

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.assign(res.data.url);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading services.</p>;

  return (
    <div className="p-4 max-w-full dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      <div className="flex items-center gap-3 mb-4">
        <select
          className="select select-bordered outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="status">Sort by Status</option>
        </select>

        <select
          className="select select-bordered cursor-pointer outline-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="hidden sm:table-cell">#</th>
                <th>User Name</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden md:table-cell">Location</th>
                <th>Price (BDT)</th>
                <th className="hidden lg:table-cell">Payment Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedServices.map((s, i) => (
                <tr key={s._id || i}>
                  <td className="hidden sm:table-cell">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={s.image} alt="User Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{s.userName}</div>
                        <div className="text-sm opacity-50">
                          {s.deliveryStatus}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell capitalize">
                    {s.category}
                  </td>
                  <td className="hidden md:table-cell">{s.location}</td>
                  <td>
                    <span className="font-semibold">
                      {s.price?.toLocaleString()}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell">
                    {s.paymentStatus === "paid" ? (
                      <span className="text-green-500">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(s)}
                        className="btn btn-primary btn-sm text-white font-semibold"
                      >
                        Pay
                      </button>
                    )}
                  </td>
                  <td className="flex items-center justify-center gap-2">
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => openEditModal(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => handleDelete(s)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-4">
        <button
          className={`px-4 py-2 rounded-md border cursor-pointer ${
            page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>

        <span className="px-4 py-2 rounded-md border bg-gray-100 text-gray-700">
          Page {page} of {totalPages}
        </span>

        <button
          className={`px-4 py-2 rounded-md border cursor-pointer ${
            page === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-2">Edit Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("userName", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text">Price (BDT)</span>
                  </label>
                  <input
                    type="number"
                    disabled
                    className="input input-bordered w-full"
                    {...register("price", { valueAsNumber: true })}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <input
                    disabled
                    className="input input-bordered w-full"
                    {...register("category", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("location", { required: true })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("userEmail", { required: true })}
                />
              </div>

              <div className="modal-action">
                <button type="button" className="btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
