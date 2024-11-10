import React, { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { buyerRegistration } from "../api/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import NavBar from "./Navbar";

const BuyerRegistration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Submit = async (data) => {
    try {
      setLoading(true);
      console.log("Buyer Registration", data);
      if (data.password !== data.confirmPassword) {
        toast.error("Password and Confirm Password should be same");
        return;
      }
      delete data.confirmPassword;
      const res = await buyerRegistration(data);
      console.log(res);
      toast.success("Buyer Registration Success");
      navigate("/buyerLogin") // Redirect to BuyerLogin page
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?signup,technology')",
        }}
      >
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold text-white text-center">
            Buyer Signup
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(Submit)}>
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiUser className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Username"
                  {...register("username", { required: true })}
                />
              </div>
              {errors.username && (
                <p className="text-red-300">Username is required</p>
              )}
            </div>
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiMail className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <p className="text-red-300">Email is required</p>
              )}
            </div>
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiPhone className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                />
              </div>
              {errors.phone && (
                <p className="text-red-300">Phone is required</p>
              )}
            </div>
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiLock className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <p className="text-red-300">Password is required</p>
              )}
            </div>
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiLock className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: true })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-300">Confirm Password is required</p>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-white">
                Already have an account?{" "}
                <Link
                  to="/buyerLogin"
                  className="text-indigo-300 hover:underline"
                >
                  Login
                </Link>
              </p>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </form>
          {/* {error && <div className="mt-4 text-red-300 text-center">{error}</div>} */}
        </div>
      </div>
    </>
  );
};

export default BuyerRegistration;
