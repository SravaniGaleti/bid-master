import react, { useEffect, useState } from "react";
import SellerNav from "./SellerNav";
import { useForm } from "react-hook-form";
import { sellerProfile, updateSellerProfile } from "../api/api";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();
  const seller = JSON.parse(localStorage.getItem("seller"));

  const fetchProfile = async () => {
    try {
      console.log(seller);
      const res = await sellerProfile(seller._id);
      console.log(res);
      setValue("username", res.username);
      setValue("email", res.email);
      setValue("phone", res.phone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await updateSellerProfile(data, seller._id);
      fetchProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SellerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Update Profile
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Username
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="username"
                    type="text"
                    {...register("username", { required: true })}
                  />
                  {errors.username && (
                    <p className="text-red-500">Username is required</p>
                  )}
                </div>

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

                {/* Contact Field */}
                <div className="mb-4">
                  <label
                    htmlFor="contact"
                    className="block text-lg font-medium text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                    id="contact"
                    type="text"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && (
                    <p className="text-red-500">Phone is required</p>
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

export default UpdateProfile;
