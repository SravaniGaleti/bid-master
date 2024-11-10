import React, { useEffect, useState } from "react";
import BuyerNav from "./BuyerNav";
import { useForm } from "react-hook-form";
import { changeBuyerPassword } from "../api/api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const buyer = JSON.parse(localStorage.getItem("buyer"));

  const onSubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        return toast.error("Passwords do not match");
      }
      delete data.confirmPassword;
      console.log(data);

      const res = await changeBuyerPassword(data, buyer._id);
      toast.success("Password Updated Successfully");
      reset();
      localStorage.removeItem("buyer");
      window.location.href = "/buyerLogin";
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div>
      <BuyerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Change Password
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500">Email is required</p>
                  )}
                </div>

                {/* password */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="password"
                    type="password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-red-500">Password is required</p>
                  )}
                </div>

                {/* new password */}
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    New Password
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="newPassword"
                    type="password"
                    {...register("newPassword", { required: true })}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500">New Password is required</p>
                  )}
                </div>

                {/* confirm password */}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">Confirm Password is required</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
