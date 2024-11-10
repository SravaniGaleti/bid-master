import React, { useState } from "react";
import AdminNav from "./AdminNav";

const ViewBidders = () => {
  // State to manage list of bidders
  const [bidders, setBidders] = useState([
    { id: 1, name: "Bidder 1", product: "Laptop", bidAmount: "$1200", status: "pending" },
    { id: 2, name: "Bidder 2", product: "Smartphone", bidAmount: "$800", status: "pending" },
    { id: 3, name: "Bidder 3", product: "Headphones", bidAmount: "$100", status: "pending" },
  ]);

  // Function to handle Accept/Reject actions
  const handleAction = (id, action) => {
    setBidders((prevBidders) =>
      prevBidders.map((bidder) =>
        bidder.id === id
          ? { ...bidder, status: action === "accept" ? "accepted" : "rejected" }
          : bidder
      )
    );
  };

  return (
    <div>
      <AdminNav />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8 p-6">
        <h2 className="text-2xl font-semibold mb-4">View Bidders: Accept / Reject</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bidder Name
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Bid Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {bidders.map((bidder) => (
              <tr
                key={bidder.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {bidder.name}
                </th>
                <td className="px-6 py-4">{bidder.product}</td>
                <td className="px-6 py-4">{bidder.bidAmount}</td>
                <td className="px-6 py-4">
                  {bidder.status === "pending" ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : (
                    <span
                      className={`${
                        bidder.status === "accepted"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } px-3 py-1 rounded-lg`}
                    >
                      {bidder.status.charAt(0).toUpperCase() + bidder.status.slice(1)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {bidder.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(bidder.id, "accept")}
                        className="bg-green-500 px-3 py-1 rounded mr-2 text-white"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(bidder.id, "reject")}
                        className="bg-red-500 px-3 py-1 rounded text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`${
                        bidder.status === "accepted"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {bidder.status.charAt(0).toUpperCase() + bidder.status.slice(1)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBidders;
