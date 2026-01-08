import { useQuery } from "@tanstack/react-query";
// import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Loading from "../../../Loader/Loading";

export default function DecoratorList() {
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);

  // Fetch decorators
  const {
    data: initialDecorators = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", "decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users?role=decorator");
      setDecorators(res.data);
      return res.data;
    },
  });

  // useEffect(() => {
  //   setDecorators(initialDecorators);
  // }, [initialDecorators]);

  const [selected, setSelected] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const openEditModal = (item) => {
    setSelected(item);
    reset(item);
    document.getElementById("editModal").showModal();
  };

  // Update decorator info + role
  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData };
      delete payload._id;

      const updatePayload = {
        name: payload.name,
        email: payload.email,
        role: payload.role,
        experience: payload.experience,
        address: payload.address,
      };

      await axiosSecure.patch(`/users/${selected._id}`, updatePayload);

      const updated = decorators.map((d) =>
        d._id === selected._id ? { ...d, ...updatePayload } : d
      );
      setDecorators(updated);

      document.getElementById("editModal").close();
      Swal.fire("Success", "Decorator info updated!", "success");
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Update failed!", "error");
    }
  };

  // Approve/Disable decorator
  const handleStatusChange = (userId, newStatus) => {
    Swal.fire({
      title: `Are you sure to ${newStatus} this decorator?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
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
          Swal.fire(
            "Updated!",
            `Decorator status set to ${newStatus}.`,
            "success"
          );
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  // Delete decorator
  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/users/${userId}`);
          setDecorators((prev) => prev.filter((d) => d._id !== userId));
          Swal.fire("Deleted!", "Decorator has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Delete failed!", "error");
        }
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">Decorator List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {decorators.map((item) => (
          <div key={item._id} className="p-5 border rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>Email: {item.email}</p>
            <p>Role: {item.role}</p>
            <p>Status: {item.status || "pending"}</p>
            <p>Experience: {item.experience}</p>
            <p>Address: {item.address}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => openEditModal(item)}
                className="btn btn-primary text-white bg-secondary btn-sm border-none"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item._id)}
                className="btn btn-err btn-secondary text-black dark:text-white btn-sm"
              >
                Delete
              </button>

              <select
                value={item.status || "pending"}
                onChange={(e) => handleStatusChange(item._id, e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approve</option>
                <option value="disabled">Disable</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <dialog id="editModal" className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg mb-4">Edit Decorator</h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              {...register("name", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full"
            />

            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full"
            />

            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="admin">Admin</option>
              <option value="decorator">Decorator</option>
            </select>

            <input
              {...register("experience", { required: true })}
              placeholder="Experience"
              className="input input-bordered w-full"
            />

            <input
              {...register("address", { required: true })}
              placeholder="Address"
              className="input input-bordered w-full md:col-span-2"
            />

            <button type="submit" className="btn btn-success  md:col-span-2">
              Save Changes
            </button>
          </form>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("editModal").close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
