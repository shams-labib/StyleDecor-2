import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function CreateService() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      cost: parseFloat(data.cost),
      rating: parseFloat(data.rating),
      createdByEmail: user?.email,
      createdAt: new Date(),
    };

    Swal.fire({
      title: "Are you sure to add this service?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.post("/services", finalData);
          Swal.fire(
            "Service added!",
            "Service has been added to the collection.",
            "success"
          );
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Adding service failed!", "error");
        }
      }
    });

    reset();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Create Decoration Service
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Service Name */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Service Name</span>
          </label>
          <input
            {...register("serviceName", { required: true })}
            className="input input-bordered w-full outline-none"
            placeholder="Enter service name"
          />
          {errors.serviceName && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Cost */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Cost (BDT)</span>
          </label>
          <input
            type="number"
            {...register("cost", { required: true })}
            className="input input-bordered w-full outline-none"
            placeholder="50000"
          />
          {errors.cost && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Rating */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Rating</span>
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register("rating", { required: true, min: 0, max: 5 })}
            className="input input-bordered w-full outline-none"
            placeholder="Enter rating (0-5)"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">Rating is required (0-5)</p>
          )}
        </div>

        {/* Unit */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Unit</span>
          </label>
          <select
            {...register("unit", { required: true })}
            className="select select-bordered w-full outline-none"
          >
            <option value="">Select Unit</option>
            <option value="per_sqft">Per sq-ft</option>
            <option value="per_floor">Per floor</option>
            <option value="per_meter">Per meter</option>
            <option value="per_event">Per event</option>
          </select>
          {errors.unit && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label">
            <span className="font-semibold">Service Category</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full outline-none"
          >
            <option value="">Select Category</option>
            <option value="home">Home</option>
            <option value="wedding">Wedding</option>
            <option value="office">Office</option>
            <option value="seminar">Seminar</option>
            <option value="meeting">Birthday</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Services Image */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="font-semibold">Services Image</span>
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="input input-bordered w-full outline-none"
            placeholder="Services photo"
          />
          {errors.image && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Description */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="font-semibold">Description</span>
          </label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full h-28 outline-none"
            placeholder="Write service details here..."
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Required</p>
          )}
        </div>

        {/* Auto-filled Email */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="font-semibold">Created By (Email)</span>
          </label>
          <input
            value={user?.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 dark:bg-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary md:col-span-2 w-full mt-3"
        >
          Create Service
        </button>
      </form>
    </div>
  );
}
