import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav";

// Sample static bid data
const bidData = [
  { id: 1, product: "Smart Watch", bidAmount: 200, highestBidder: "Bidder 1" },
  { id: 2, product: "Laptop", bidAmount: 600, highestBidder: "Bidder 2" },
  { id: 3, product: "Camera", bidAmount: 400, highestBidder: "Bidder 3" },
  { id: 4, product: "Tablet", bidAmount: 350, highestBidder: "Bidder 4" },
];

const ViewBidDetails = () => {
  // State to store bid details
  const [bids, setBids] = useState([]);

  // Simulate fetching data with useEffect
  useEffect(() => {
    // Assuming data will be fetched from an API
    setBids(bidData); // Set static data for now
  }, []);

  return (
    <div>
      <AdminNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">View Bid Details</h2>

        {/* Check if there are bids */}
        {bids.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bids.map((bid) => (
              <div key={bid.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">{bid.product}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Amount:</span> ${bid.bidAmount}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Highest Bidder:</span> {bid.highestBidder}
                </p>
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

export default ViewBidDetails;
