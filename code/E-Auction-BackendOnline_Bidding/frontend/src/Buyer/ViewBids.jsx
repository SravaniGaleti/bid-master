import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { BidExist, placeBid, viewBids } from "../api/api";
import BuyerNav from "./BuyerNav";
import { imageURL } from "../api/config";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ViewBids = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [bids, setBids] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [BidExistCheck, setBidExistCheck] = useState(false);

  const { id } = useParams();

  const buyer = JSON.parse(localStorage.getItem("buyer"));

  const fetchBids = async () => {
    try {
      setLoading(true);
      const res = await viewBids(id);
      console.log(res);
      setBids(res);

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBids();
    bidExist();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      if (Number(data.bidAmount) < bids.product.basicCost) {
        setError("Bid Amount should be greater than the basic cost");
        return;
      }
      const bidData = {
        bidAmount: data.bidAmount,
      };
      console.log(bidData);
      const res = await placeBid(bidData, id, buyer._id);
      console.log(res);
      fetchBids();
      toast.success("Bid Placed Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const bidExist = async () => {
    try {
      let res = await BidExist(id, buyer._id);
      setBidExistCheck(res.isAlreadyBidded);
    } catch (error) {}
  };

  return (
    <div>
      <BuyerNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">View Bids</h2>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-xl w-full shadow-xl ">
              <h2 className="text-3xl font-extrabold text-white ">
                Make Your Bid
              </h2>
              <div className="  overflow-hidden">
                <div className="p-6 sm:p-10">
                  <h3 className="text-xl font-semibold text-gray-300 mb-4">
                    {bids?.product?.name}
                  </h3>
                  <p className="text-lg text-gray-400">
                    Current Bid:{" "}
                    <span className="font-bold">
                      ${bids?.product?.basicCost}
                    </span>
                  </p>
                  <p className="text-lg text-gray-400">
                    End Time:{" "}
                    <span className="font-bold">
                      {new Date(bids?.product?.endDate).toLocaleString()}
                    </span>
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                    <label className="block text-lg font-medium text-gray-300 mb-1">
                      Enter your bid:
                      <input
                        type="number"
                        {...register("bidAmount", { required: true })}
                        // min={Number(bids?.product?.basicCost) + 0.01}
                        min={0}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 mt-1"
                      />
                    </label>
                    {errors.bidAmount && (
                      <p className="text-red-500">Bid Amount is required</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    {BidExistCheck ? (
                      <button
                        type="submit"
                        className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                      >
                        Update Bid
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                      >
                        Place Bid
                      </button>
                    )}
                  </form>
                </div>
              </div>
              <button
                className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold mb-2 underline">
            Product Details
          </h3>
          <div className="  space-x-4 mb-3 w-fit shadow-lg rounded-md p-3">
            <img
              src={`${imageURL}/${bids?.product?.picture}`}
              alt={bids?.product?.name}
              className="w-64 h-56 object-contain   p-2 "
            />
            <div>
              <h3 className="text-xl font-bold mb-2">{bids?.product?.name}</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Basic Cost:</span> $
                {bids?.product?.basicCost}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Description:</span>{" "}
                {bids?.product?.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start ">
            {BidExistCheck ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={openModal}
              >
                Update Now
              </button>
            ) : (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={openModal}
              >
                Bid Now
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mb-3 ">
          <h1 className="text-2xl font-semibold underline">ALL BIDS</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p>Loading...</p>
            </div>
          ) : bids && bids.bids.length !== 0 ? (
            bids.bids?.map((bid) => (
              <div key={bid._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center items-center p-3"></div>
                <h3 className="text-xl font-bold mb-2">
                  {bid.buyerId?.username}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Amount:</span> $
                  {bid.bidAmount}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Date:</span> {bid.bidDate}{" "}
                  {bid.bidTime}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-2xl font-semibold">No Bids Found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBids;
