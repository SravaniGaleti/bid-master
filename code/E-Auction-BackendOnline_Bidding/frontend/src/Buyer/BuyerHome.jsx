import React from "react";
import BuyerNav from "./BuyerNav";

const BuyerHome = () => {
  return (
    <div>
      <BuyerNav />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
        {/* Welcome Section */}
        <div className="max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome, Buyer!
          </h1>
          <p className="text-lg text-gray-600">
            Explore and participate in exciting auctions, place your bids, and
            win your desired products. Stay updated with live auctions, track
            your bids, and manage your purchases all from one place. Experience
            the thrill of competitive bidding and win amazing items!
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
