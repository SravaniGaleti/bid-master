import React, { useState, useEffect } from "react";
import SellerNav from "./SellerNav";

const ViewBuyerRequests = () => {
  // Sample data for buyer requests (replace with API data later)
  const [buyerRequests, setBuyerRequests] = useState([
    {
      id: 1,
      buyerName: "John Doe",
      productName: "Smart Watch",
      requestDate: "2024-10-10",
      bidAmount: "$200",
    },
    {
      id: 2,
      buyerName: "Jane Smith",
      productName: "Laptop",
      requestDate: "2024-10-09",
      bidAmount: "$600",
    },
    {
      id: 3,
      buyerName: "Michael Johnson",
      productName: "Headphones",
      requestDate: "2024-10-08",
      bidAmount: "$150",
    },
  ]);

  return (
    <div>
      <SellerNav />
      <div className="bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-8">
            View Buyer Requests
          </h2>

          {/* Grid to display cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyerRequests.length > 0 ? (
              buyerRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {request.productName}
                  </h3>
                  <p className="text-gray-400">
                    <span className="font-bold">Buyer:</span>{" "}
                    {request.buyerName}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-bold">Bid Amount:</span>{" "}
                    {request.bidAmount}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-bold">Request Date:</span>{" "}
                    {request.requestDate}
                  </p>
                  <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p>No buyer requests available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBuyerRequests;
