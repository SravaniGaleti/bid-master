import React from "react";
import { Link } from "react-router-dom";

const BuyerNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("buyer");
    window.location.href = "/buyerLogin";
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link className="text-xl font-bold text-green-500" to="/">
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
        <div className={`w-full lg:flex lg:items-center lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/buyerDashboard"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/buyerViewBidDetails"
              >
                Online Bids
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/your-bids"
              >
                Your Bids
              </Link>
            </li>
            <li>
              <Link
                className="text-white hover:text-gray-300 text-lg"
                to="/bidHistory"
              >
                Bid History
              </Link>
            </li>
            <li>
              {/* dropdown  */}
              <div className="group inline-block">
                <button
                  className="text-white hover:text-gray-300 text-lg"
                >
                  Profile
                </button>
                <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                  <li className="">
                    <Link
                      to="/buyerProfile"
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      View Profile
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      to="/changePassword"
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      Change Password
                    </Link>
                  </li>
                </ul>
              </div>
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

export default BuyerNav;
