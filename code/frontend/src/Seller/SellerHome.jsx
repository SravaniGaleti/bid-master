import React from "react";
import SellerNav from "./SellerNav";

const SellerHome = () => {
  return (
    <div>
        <SellerNav/>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome, Seller!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your auction products, view buyer requests, and track your
            sales all from one place. Grow your business by adding products to
            our auction platform and get the highest bids from buyers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
