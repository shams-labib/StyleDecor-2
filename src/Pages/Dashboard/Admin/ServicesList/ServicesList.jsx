import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../Loader/Loading";

const ServicesDashboardComponent = () => {
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      setServices(res.data);
      return res.data;
    },
  });

  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  // useEffect(() => {
  //   setServices(products);
  // }, [products]);

  useEffect(() => {
    if (selected) {
      reset({
        serviceName: selected.serviceName,
        cost: selected.cost,
        unit: selected.unit,
        category: selected.category,
        description: selected.description,
        createdByEmail: selected.createdByEmail,
      });
    }
  }, [selected, reset]);

  function openEditModal(service) {
    setSelected(service);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelected(null);
  }

  const onSubmit = (data) => {
    axiosSecure.patch(`/services/${selected._id}`, data);

    setServices((prev) =>
      prev.map((s) => (s._id === selected._id ? { ...s, ...data } : s))
    );
    closeModal();
    Swal.fire({
      title: "Data updated",
      text: "Services updated success ",
      icon: "success",
    });
  };

  const handleDelete = (service) => {
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
          await axiosSecure.delete(`/services/${service._id}`);
          setServices((prev) => prev.filter((s) => s._id !== service._id));
          Swal.fire("Deleted!", "Service has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Delete failed!", "error");
        }
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError) return <p>Error loading services.</p>;

  return (
    <div className="p-4 max-w-full dark:bg-gray-900">
      <h2 className="text-2xl font-semibold mb-4">Services</h2>

      <div className="bg-base-100 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="hidden sm:table-cell">#</th>
                <th>Service Name</th>
                <th className="hidden md:table-cell">Category</th>
                <th className="hidden md:table-cell">Unit</th>
                <th>Cost (BDT)</th>
                <th className="hidden lg:table-cell">Created By</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={s._id || i}>
                  <td className="hidden sm:table-cell">{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={s.image} alt="Services Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{s.serviceName}</div>
                        <div className="text-sm opacity-50">
                          Services States
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell capitalize">
                    {s.category}
                  </td>
                  <td className="hidden md:table-cell">{s.unit}</td>
                  <td>
                    <span className="font-semibold">
                      {s.cost?.toLocaleString()}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell">{s.createdByEmail}</td>
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
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-2">Edit Service</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="label">
                  <span className="label-text">Service Name</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("serviceName", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text">Cost (BDT)</span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    {...register("cost", {
                      valueAsNumber: true,
                      required: true,
                    })}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Unit</span>
                  </label>
                  <input
                    className="input input-bordered w-full"
                    {...register("unit", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  {...register("category", { required: true })}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  {...register("description")}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Created By (email)</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("createdByEmail", { required: true })}
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

export default ServicesDashboardComponent;
