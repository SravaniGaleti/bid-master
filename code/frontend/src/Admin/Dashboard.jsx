import React from "react";
import AdminNav from "./AdminNav";

const Dashboard = () => {
  return (
    <div>
      <AdminNav />
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="flex justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Welcome</h3>
          </div>
          </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Total Products</h3>
            <p className="text-gray-400">100</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Total Bids</h3>
            <p className="text-gray-400">200</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Total Payments</h3>
            <p className="text-gray-400">300</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
