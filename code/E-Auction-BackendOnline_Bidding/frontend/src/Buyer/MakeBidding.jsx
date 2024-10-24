import React, { useState, useEffect } from "react";
import BuyerNav from "./BuyerNav";

const MakeBidding = () => {
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Dummy data for auction details (you can replace it with actual API data)
  useEffect(() => {
    const fetchAuctionDetails = () => {
      const dummyData = {
        title: "Vintage Painting",
        currentBid: 100,
        endTime: "2024-10-20T12:00:00Z",
      };
      setAuctionDetails(dummyData);
    };
    fetchAuctionDetails();
  }, []);

  const handleBidChange = (e) => {
    setBidAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bidValue = parseFloat(bidAmount);

    if (isNaN(bidValue) || bidValue <= auctionDetails.currentBid) {
      setError("Please enter a valid bid amount higher than the current bid.");
      setMessage("");
    } else {
      // Place the bid (replace this with actual API call)
      setMessage(`Bid of $${bidValue} placed successfully!`);
      setError("");
      setBidAmount("");
    }
  };

  if (!auctionDetails) {
    return <div>Loading auction details...</div>;
  }

  return (
    <div>
      <BuyerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-3xl font-extrabold text-white mb-6">
                Make Your Bid
              </h2>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">
                {auctionDetails.title}
              </h3>
              <p className="text-lg text-gray-400">
                Current Bid:{" "}
                <span className="font-bold">${auctionDetails.currentBid}</span>
              </p>
              <p className="text-lg text-gray-400">
                End Time:{" "}
                <span className="font-bold">
                  {new Date(auctionDetails.endTime).toLocaleString()}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="mt-6">
                <label className="block text-lg font-medium text-gray-300 mb-1">
                  Enter your bid:
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={handleBidChange}
                    min={auctionDetails.currentBid + 0.01}
                    required
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-300 mt-1"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 text-lg font-semibold"
                >
                  Place Bid
                </button>
              </form>

              {message && <p className="text-green-500 mt-4">{message}</p>}
              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeBidding;
