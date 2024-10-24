import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const adminToken = localStorage.getItem("admin");
  const sellerToken = localStorage.getItem("seller");
  const buyerToken = localStorage.getItem("buyer");

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
            {adminToken && (
              <li>
                <Link
                  className="text-white hover:text-gray-300 text-lg"
                  to="/dashboard"
                >
                  Home
                </Link>
              </li>
            )}
            {sellerToken && (
              <li>
                <Link
                  className="text-white hover:text-gray-300 text-lg"
                  to="/sellerDashboard"
                >
                  Home
                </Link>
              </li>
            )}
            {buyerToken && (
              <li>
                <Link
                  className="text-white hover:text-gray-300 text-lg"
                  to="/buyerDashboard"
                >
                  Home
                </Link>
              </li>
            )}
            {!adminToken && !buyerToken && !sellerToken && (
              <li>
                <Link
                  className="text-white hover:text-gray-300 text-lg"
                  to="/dashboard"
                >
                  Home
                </Link>
              </li>
            )}
            {/* <li>
              {!adminToken && !buyerToken && !sellerToken && (
                <Link
                  className="text-white hover:text-gray-300 text-lg"
                  to="/auctions"
                >
                  Auctions
                </Link>
              )}
            </li> */}
            <>
              {!adminToken && !buyerToken && !sellerToken && (
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/buyerLogin"
                  >
                    Buyer
                  </Link>
                </li>
              )}
              {!adminToken && !buyerToken && !sellerToken && (
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/sellerLogin"
                  >
                    Seller
                  </Link>
                </li>
              )}
              {!adminToken && !buyerToken && !sellerToken && (
                <li>
                  <Link
                    className="text-white hover:text-gray-300 text-lg"
                    to="/adminLogin"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
