import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiLock, FiMail } from "react-icons/fi";
import { useNavigate, Link, useParams } from "react-router-dom";
import NavBar from "./Navbar";
import { useForm } from "react-hook-form";
import { FaUserSecret } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  ForgetBuyer,
  ForgetBuyerChange,
  ForgetSeller,
  ForgetSellerChange,
} from "../api/api";

export const ForgotPassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const navigate = useNavigate();

  const [OTPSent, setOTPSent] = useState(false);

  const { root } = useParams();

  const [TimeOut, setTimeOut] = useState(60);

  const OTP = async () => {
    try {
      let email = getValues("email");

      if (email.trim() == "") {
        return toast.error("Please Enter Email");
      }

      if (root == "buyer") {
        await ForgetBuyer(email);
      } else {
        await ForgetSeller(email);
      }
      toast.success("OTP sent Successful");
      Timer();
      setOTPSent(true);
    } catch (error) {}
  };

  const Change = handleSubmit(async (data) => {
    try {
      if (root == "buyer") {
        await ForgetBuyerChange(data.email, data.OTP, data.password);
        navigate("/buyerLogin");
      } else {
        await ForgetSellerChange(data.email, data.OTP, data.password);
        navigate("/sellerLogin");
      }
      toast.success("Password Changed Successfully");
      setOTPSent(true);
    } catch (error) {}
  });

  const Timer = () => {
    let Time = 60;
    let intervale = setInterval(() => {
      let counter = Time - 1;
      Time = counter;
      setTimeOut(counter);

      if (counter <= 0) {
        clearInterval(intervale);
      }
    }, 1000);
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
            Forgot Password
          </h2>
          <form className="space-y-4">
            <div>
              <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                <FiMail className="w-6 h-6 text-gray-400 ml-3" />
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  disabled={OTPSent}
                />
              </div>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            {!OTPSent && (
              <div className="">
                <button
                  className="bg-blue-500 text-white p-2 text-md rounded-sm"
                  type="button"
                  onClick={OTP}
                >
                  Get OTP
                </button>
              </div>
            )}
            {OTPSent && (
              <>
                <div>
                  <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                    <FaUserSecret className="w-6 h-6 text-gray-400 ml-3" />
                    <input
                      type="Number"
                      className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="OTP"
                      {...register("OTP", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
                    <FiLock className="w-6 h-6 text-gray-400 ml-3" />
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="New Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="">
                  <button
                    className="bg-blue-500 text-white p-2 text-md rounded-sm"
                    onClick={Change}
                    type="button"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-sm font-semibold my-3 text-white">
                  OTP Will Expire in <span id="timer">{TimeOut}</span>s{" "}
                  {TimeOut == 0 && (
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={OTP}
                    >
                      Resend OTP
                    </span>
                  )}
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
