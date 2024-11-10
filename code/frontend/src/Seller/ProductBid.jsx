import React, { useEffect, useState } from "react";
import SellerNav from "./SellerNav";
import { bidWinners, fetchPayments } from "../api/api";
import { useParams } from "react-router-dom";

const ProductBid = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchAllBids = async () => {
    try {
      setLoading(true);
      const res = await bidWinners(id);
      setBids(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchAllBids();
  }, []);


  return (
    <div>
      <SellerNav />
      <div className="relative overflow-x-auto  sm:rounded-lg mt-8 p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold mb-4">VIEW BIDS</h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <p>Loading...</p>
            </div>
          ) : bids.length > 0 ? (
            bids.map((bid) => (
              <div key={bid._id} className="bg-white rounded-lg shadow-lg p-6">
                {/* <div className="flex justify-center items-center p-3">
                  <img
                    src={`${imageURL}/${bid.picture}`}
                    alt={bid.name}
                    className="w-40 h-40 object-contain rounded-full"
                  />
                </div> */}
                <h3 className="text-xl font-bold mb-2">
                  {bid?.buyerId?.username}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Bid Amount:</span> $
                  {bid?.bidAmount}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Bid Date / Time :</span>
                    {bid?.bidTime}
                  </p>
                  <p className="text-gray-700 mb-2">
                    {bid.isWinningBid ? (
                      <span className="font-semibold text-green-500">
                        Winning Bid
                      </span>
                    ) : (
                      <span className="font-semibold text-red-500">
                        Not Winning Bid
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32">
              <p>No Bids Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductBid;
