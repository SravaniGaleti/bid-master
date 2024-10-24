import React, { useState, useEffect } from "react";
import BuyerNav from "./BuyerNav";
import { BidHistory, buyerBidProduct } from "../api/api";
import { imageURL } from "../api/config";
import { useNavigate } from "react-router-dom";

const YourBids = () => {
  const [bidProducts, setBidProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [Modal, setModal] = useState(false);

  const [bidProductsHistory, setBidProductsHistory] = useState([]);

  const buyer = JSON.parse(localStorage.getItem("buyer"));

  const navigate = useNavigate();

  const fetchAllBidProducts = async () => {
    try {
      setLoading(true);
      const res = await buyerBidProduct(buyer._id);
      setBidProducts(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async (id) => {
    try {
      setModal(true);
      let res = await BidHistory(buyer._id, id);
      setBidProductsHistory(res.bids);
    } catch (error) {}
  };

  const close = () => {
    setModal(false);
  };

  useEffect(() => {
    fetchAllBidProducts();
  }, []);
  console.log(bidProductsHistory);
  return (
    <div>
      <BuyerNav />
      <div className="p-8 min-h-screen bg-gray-100">
        <h2 className="text-3xl font-semibold mb-8">Your Bids</h2>

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
                    onClick={() => navigate(`/ifWin/${product._id}`)}
                  >
                    Result
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => fetchHistory(product._id)}
                  >
                    Bid History
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No bids available.</p>
        )}
      </div>
      {Modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full h-[80%] p-5">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={close}
            >
              Close
            </button>
            <div className="h-[90%] overflow-y-scroll">
              {" "}
              <div className="grid grid-cols-1  gap-8">
                {bidProductsHistory.map((product) => (
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
                        {product.bidDate} {product.bidTime}
                      </p>
                      <p className="text-gray-700 mb-2">
                        {product.isWinningBid ? (
                          <span className="font-semibold text-green-500">
                            You won this bid
                          </span>
                        ) : (
                          <span className="font-semibold text-red-500">
                            You lost this bid
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourBids;
