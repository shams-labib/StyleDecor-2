import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const DecoratorForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      specialty: data.specialty.split(",").map((s) => s.trim()),
      availability: data.availability.split(",").map((d) => d.trim()),
      role: "decorator", // default role
    };

    try {
      await axios.post("http://localhost:5000/decorators", payload);
      alert("Decorator created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Error creating decorator.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Decorator</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="border p-2 rounded w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            className="border p-2 rounded w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone is required" })}
            className="border p-2 rounded w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="border p-2 rounded w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Specialty (comma separated)"
            {...register("specialty", { required: "Specialty is required" })}
            className="border p-2 rounded w-full"
          />
          {errors.specialty && (
            <p className="text-red-500 text-sm">{errors.specialty.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Availability Days (comma separated)"
            {...register("availability", {
              required: "Availability is required",
            })}
            className="border p-2 rounded w-full"
          />
          {errors.availability && (
            <p className="text-red-500 text-sm">
              {errors.availability.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Decorator
        </button>
      </form>
    </div>
  );
};

export default DecoratorForm;
