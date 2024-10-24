import React, { useEffect, useState } from "react";
import BuyerNav from "./BuyerNav";
import { useNavigate, useParams } from "react-router-dom";
import { makePayment, winnerProducts } from "../api/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const IfWin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigateTo = useNavigate();

  const handleReturnToAuctions = () => {
    navigateTo("/buyerViewBidDetails");
  };
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState("");

  const buyer = JSON.parse(localStorage.getItem("buyer"));
  const { id } = useParams();

  const fetchWinners = async () => {
    try {
      setLoading(true);
      const res = await winnerProducts(id);
      setData(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  const dummyData = {
    cardHolder: buyer.username,
    cardNumber: "7412589631236540",
    cvv: "125",
    expiryDate: "2024-2-3034",
    paymentmode: "upi",
  };

  useEffect(() => {
    fetchWinners();
  }, [showModal]);
  const openModal = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await makePayment(data, id, buyer._id);

      toast.success("Payment Successful");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  console.log(data?.winner?.paymentStatus, "lll");

  return (
    <div>
      <BuyerNav />
      {message ? (
        <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold text-white mb-6">
                  {message}
                </h2>
                <p className="text-lg text-gray-400 mb-4">
                  Bidding is in progress for this product
                </p>
                <button
                  onClick={handleReturnToAuctions}
                  className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                >
                  Return to Auction Listings
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : data && data?.winner?.buyerId?._id === buyer._id ? (
        <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-gray-800 rounded-lg p-6 max-w-xl w-full shadow-xl ">
                <h2 className="text-3xl font-extrabold text-white ">Payment</h2>
                <div className="  overflow-hidden mt-3">
                  {/* Payment - cardHolder,cardNumber,cvv, expiryDate */}
                  <div className="mb-3  text-end">
                    <h3 className="text-xl font-semibold text-gray-300 mb-0">
                      Amount :{" "}
                      <span className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300">
                        {data?.winner?.bidAmount} $
                      </span>
                    </h3>
                  </div>
                  <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label
                        htmlFor="cardHolder"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Card Holder
                      </label>
                      <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        id="cardHolder"
                        type="text"
                        {...register("cardHolder", { required: true })}
                      />
                      {errors.cardHolder && (
                        <p className="text-red-500">Card Holder is required</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="cardNumber"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Card Number
                      </label>
                      <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        id="cardNumber"
                        type="text"
                        {...register("cardNumber", {
                          required: true,
                          pattern: /^[0-9]{16}$/,
                        })}
                        minLength={16}
                        maxLength={16}
                      />
                      {errors.cardNumber?.type === "required" && (
                        <p className="text-red-500">Card Number is required</p>
                      )}
                      {errors.cardNumber?.type === "pattern" && (
                        <p className="text-red-500">
                          Card Number must be 16 digits
                        </p>
                      )}
                    </div>
                    <div className="mb-3 h-[0px] w-[0px] invisible">
                      <label
                        htmlFor="paymentmode"
                        className="block text-lg font-medium text-gray-300 mb-1"
                      >
                        Payment Mode
                      </label>
                      <input
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                        id="paymentmode"
                        type="text"
                        {...register("paymentmode", {
                          required: true,
                          pattern: /^[0-9]{16}$/,
                          value: "card",
                        })}
                      />
                    </div>
                    <div className="mb-3 flex justify-between items-center">
                      <div>
                        <label
                          htmlFor="cvv"
                          className="block text-lg font-medium text-gray-300 mb-1"
                        >
                          CVV
                        </label>
                        <input
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                          id="cvv"
                          type="text"
                          {...register("cvv", { required: true, minLength: 3 })}
                          minLength={3}
                          maxLength={3}
                        />
                        {errors.cvv?.required && (
                          <p className="text-red-500">CVV is required</p>
                        )}
                        {errors.cvv?.type === "minLength" && (
                          <p className="text-red-500">CVV must be 3 digits</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="expiryDate"
                          className="block text-lg font-medium text-gray-300 mb-1"
                        >
                          Expiry Date
                        </label>
                        <input
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300"
                          id="expiryDate"
                          type="date"
                          {...register("expiryDate", { required: true })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.expiryDate && (
                          <p className="text-red-500">
                            Expiry Date is required
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Pay
                      </button>
                    </div>
                  </form>
                </div>
                <p className="text-2xl font-semibold text-center">UPI</p>
                <hr></hr>
                <div className="my-3 flex  gap-10 items-center">
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-phonepe-logo-icon-download-in-svg-png-gif-file-formats--payment-app-application-indian-companies-pack-logos-icons-2249157.png?f=webp&w=256"
                    alt="paytem"
                    className="w-[150px] cursor-pointer"
                    onClick={() => onSubmit(dummyData)}
                  />
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-google-pay-logo-icon-download-in-svg-png-gif-file-formats--gpay-payment-money-pack-logos-icons-1721670.png?f=webp&w=256"
                    alt="phone pay"
                    className="w-[50px]  cursor-pointer"
                    onClick={() => onSubmit(dummyData)}
                  />
                  <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-paytm-logo-icon-download-in-svg-png-gif-file-formats--online-payment-brand-logos-pack-icons-226448.png?f=webp&w=256"
                    alt="google pay"
                    className="w-[100px]  cursor-pointer"
                    onClick={() => onSubmit(dummyData)}
                  />
                </div>
                <button
                  className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold text-white mb-6">
                  Congratulations!
                </h2>
                <p className="text-lg text-gray-400 mb-4">
                  You have successfully won the auction for the{" "}
                  <span className="font-bold text-white">
                    {data?.winner?.bidId?.name}
                  </span>
                  .
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  Thank you for participating! Your bid has been confirmed
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={handleReturnToAuctions}
                    className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                  >
                    Return to Auction Listings
                  </button>
                  {data?.winner?.paymentStatus ? (
                    <div className="mt-4 inline-block border border-green-600 text-green-600 px-6 py-3 rounded-md hover:text-white hover:bg-green-700 transition-colors duration-300 text-lg font-semibold">
                      Payment Successful
                    </div>
                  ) : (
                    <button
                      className="mt-4 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 text-lg font-semibold"
                      onClick={openModal}
                    >
                      Bid Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
              <div className="p-6 sm:p-10">
                <h2 className="text-3xl font-extrabold text-white mb-6">
                  Sorry!
                </h2>
                <p className="text-lg text-gray-400 mb-4">
                  You have not won the auction for the{" "}
                  <span className="font-bold text-white">
                    {loading ? "Loading..." : data?.winner?.bidId?.name}
                  </span>
                  .
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  Thank you for participating! Better luck next time.
                </p>
                {/* who won there name and biding price */}
                <p className="text-lg text-gray-400 mb-4">
                  Winner:{" "}
                  {loading ? "Loading..." : data?.winner?.buyerId?.username}
                </p>
                <p className="text-lg text-gray-400 mb-4">
                  Biding Price:{" "}
                  {loading ? "Loading..." : data?.winner?.bidAmount}
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={handleReturnToAuctions}
                    className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                  >
                    Return to Auction Listings
                  </button>
                  {/* <button
                    onClick={() => setDisplay(!display)}
                    className="mt-4 inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-300 text-lg font-semibold"
                  >
                    Bid History
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IfWin;
