import React, { useState, useEffect } from "react";
import BuyerNav from "./BuyerNav";
import { buyerBidProducts } from "../api/api";
import { imageURL } from "../api/config";
import { useNavigate } from "react-router-dom";

const BuyerViewBidDetails = () => {
  const [bidProducts, setBidProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchAllBidProducts = async () => {
    try {
      setLoading(true);
      const res = await buyerBidProducts();
      console.log(res);
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

  return (
    <div>
      <BuyerNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">Buyer View Bid Details</h2>

        {/* Check if there are bids */}
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <p>Loading...</p>
          </div>
        ) : bidProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bidProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-center items-center p-3">
                  <img
                    src={`${imageURL}/${product.picture}`}
                    alt={product.name}
                    className="w-40 h-40 object-contain rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Amount:</span> $
                  {product.basicCost}
                </p>
                {/* <p className="text-gray-700">
                  <span className="font-semibold">Highest Bidder:</span>{" "}
                  {bid.highestBidder}
                </p> */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Start Date:</span>{" "}
                    {product.startDate?.date} {product.startDate?.time}{" "}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">End Date:</span>{" "}
                    {product.endDate?.date} {product.endDate?.time}{" "}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => navigate(`/ViewBids/${product._id}`)}
                  >
                    View Details
                  </button>
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

export default BuyerViewBidDetails;
