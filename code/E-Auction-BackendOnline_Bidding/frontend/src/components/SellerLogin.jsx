import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import NavBar from "./Navbar";
import { useForm } from "react-hook-form";
import { sellerLogin } from "../api/api";
import { toast } from "react-toastify";

const SellerLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Seller Login", data);

      const res = await sellerLogin(data);
      res.withoutPassword.role = "seller";

      localStorage.setItem("seller", JSON.stringify(res.withoutPassword));
      toast.success("Seller Login Success");
      navigate("/sellerDashboard");
      window.location.reload();

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?technology,login')",
        }}
      >
        <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-semibold text-white text-center">
            Seller Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="flex items-center justify-between mt-4">
              <p className="text-white">
                Don{"'"}t have an account?{" "}
                <Link
                  to="/sellerRegistration"
                  className="text-indigo-300 hover:underline"
                >
                  Signup
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
                  "Login"
                )}
              </button>
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-white">
                <Link
                  to="/forgotPassword/seller"
                  className="text-indigo-300 hover:underline"
                >
                  {" "}
                  Forget Password
                </Link>
              </p>
            </div>
          </form>
          {/* {error && (
            <div className="mt-4 text-red-300 text-center">{error}</div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
