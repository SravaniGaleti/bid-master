import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin");
    window.location.href = "/adminLogin";
  };
  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-xl font-bold text-yellow-500" to="/">
          E-AUCTION
        </Link>
        <button className="lg:hidden text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className={`w-full lg:flex lg:items-center lg:w-auto `}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/dashboard"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/sellers"
              >
                Sellers
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/buyers"
              >
                Buyers
              </Link>
            </li>
            {/* <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/viewBidders"
              >
                View Bidders
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/viewBidDetails"
              >
                View Bid Details
              </Link>
            </li>*/}
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/viewWinner"
              >
                View Winners
              </Link>
            </li> 
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/viewPayments"
              >
                View Payments
              </Link>
            </li>
            <li>
              <button
                className="text-white hover:text-gray-300 text-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
