import React, { useState, useEffect } from "react";
import BuyerNav from "./BuyerNav";
import { ViewBiddingHistory, buyerBidProduct } from "../api/api";
import { imageURL } from "../api/config";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone"
const checkBidStatus = (product) => {
  // Combine the endDate and endTime into a single moment object
  const endDateTime = moment(`${product.endDate} ${product.endTime}`, "DD/MM/YYYY hh:mm A").tz("Asia/Kolkata");
  const currentTime = moment().tz("Asia/Kolkata");

  if (currentTime.isBefore(endDateTime)) {
    return "Bid is pending"; // The bid is still ongoing
  } else {
    if (product.isWinningBid) {
      return "You won this bid"; // The bid ended and the user won
    } else {
      return "You lost this bid"; // The bid ended and the user lost
    }
  }
};


const BidHistory = () => {
  const [bidProducts, setBidProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(bidProducts,"bid products")

  const [Modal, setModal] = useState(false);

  const buyer = JSON.parse(localStorage.getItem("buyer"));

  const navigate = useNavigate();

  const fetchAllBidProducts = async () => {
    try {
      setLoading(true);
      const res = await ViewBiddingHistory(buyer._id);
      setBidProducts(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBidProducts();
  }, []);


  const dates = new Date()

  return (
    <div>
      <BuyerNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">Bid History</h2>

        {/* Check if there are bids */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p>Loading...</p>
          </div>
        ) : bidProducts.length > 0 ? (
          <div className="grid grid-cols-1  gap-8">
            {bidProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                {/* <div className="flex justify-center items-center p-3">
                  <img
                    src={`${imageURL}/${product.picture}`}
                    alt={product.name}
                    className="w-40 h-40 object-contain rounded-full"
                  />
                </div> */}
                <h3 className="text-xl font-bold mb-2">
                  {product?.bidId?.name}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Amount:</span> $
                  {product.bidAmount}
                </p>
                {/* <p className="text-gray-700">
                  <span className="font-semibold">Highest Bidder:</span>{" "}
                  {bid.highestBidder}
                </p> */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Bid Date / Time :</span>{" "}
                    {product.bidTime}
                  </p>
                  <p className="text-gray-700 mb-2">
                  <p className="text-gray-700 mb-2">
  {/* {product.isWinningBid ? (
    <span className="font-semibold text-green-500">
      You won this bid
    </span>
  ) 
  : (
    <span className="font-semibold text-gray-500">
      Bid is Pending
    </span>
  )} */}
  <span className={`font-semibold ${product.isWinningBid ? 'text-green-500' : 'text-red-500'}`}>
                      {checkBidStatus(product)}
                    </span>
</p>

                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bids available.</p>
        )}
      </div>
    </div>
  );
};

export default BidHistory;
