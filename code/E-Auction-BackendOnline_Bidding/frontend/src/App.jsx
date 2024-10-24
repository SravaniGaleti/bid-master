import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import BuyerLogin from "./components/BuyerLogin";
import SellerLogin from "./components/SellerLogin";
import SellerRegistration from "./components/SellerRegistration";
import BuyerRegistration from "./components/BuyerRegistration";
import Dashboard from "./Admin/Dashboard";
import ViewBidders from "./Admin/ViewBidders";
import ViewBidDetails from "./Admin/ViewBidDetails";
import ViewWinner from "./Admin/ViewWinner";
import ViewPayment from "./Admin/ViewPayment";
import AdminNav from "./Admin/AdminNav";
import AddProducts from "./Seller/AddProducts";
import SellerNav from "./Seller/SellerNav";
import BuyerNav from "./Buyer/BuyerNav";
import SellerHome from "./Seller/SellerHome";
import UpdateProfile from "./Seller/UpdateProfile";
import UpdateAndDeleteBidDetails from "./Seller/UpdateAndDeleteBidDetails";
import ViewBuyerRequests from "./Seller/ViewBuyerRequests";
import BuyerHome from "./Buyer/BuyerHome";
import BuyerViewBidDetails from "./Buyer/BuyerViewBidDetails";
import BuyerProfile from "./Buyer/BuyerProfile";
import MakeBidding from "./Buyer/MakeBidding";
import IfWin from "./Buyer/IfWin";
import AdminLogin from "./components/AdminLogin";
import Sellers from "./Admin/Sellers";
import Buyers from "./Admin/Buyers";
import Products from "./Seller/Products";
import ViewBids from "./Buyer/ViewBids";
import YourBids from "./Buyer/YourBids";
import BidHistory from "./Buyer/BidHistory";
import ChangePassword from "./Buyer/ChangePassword";
import ChangeSellerPassword from "./Seller/ChangeSellerPassword";
import ProductBid from "./Seller/ProductBid";
import AllPayments from "./Seller/AllPayments";
import { ForgotPassword } from "./components/ForgotPassword";

const App = () => {
  const adminToken = localStorage.getItem("admin");
  const sellerToken = localStorage.getItem("seller");
  const buyerToken = localStorage.getItem("buyer");

  console.log("Admin Token", adminToken);
  console.log("Seller Token", sellerToken);
  console.log("Buyer Token", buyerToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyerLogin" element={<BuyerLogin />} />
        <Route path="/sellerLogin" element={<SellerLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/sellerRegistration" element={<SellerRegistration />} />
        <Route path="/buyerRegistration" element={<BuyerRegistration />} />
        <Route path="/forgotPassword/:root" element={<ForgotPassword />} />
        {/* Admin Routes */}
        {/* <Route path="/adminNav" element={<AdminNav />} /> */}

        {adminToken ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="*" element={<Home />} />
        )}
        <Route path="/sellers" element={<Sellers />} />
        <Route path="/buyers" element={<Buyers />} />
        <Route path="/viewBidders" element={<ViewBidders />} />
        <Route path="/viewBidDetails" element={<ViewBidDetails />} />
        <Route path="/viewWinner" element={<ViewWinner />} />
        <Route path="/viewPayments" element={<ViewPayment />} />

        {/* ------------------- Seller --------------------------- */}
        <Route path="/sellerNav" element={<SellerNav />} />
        <Route path="/sellerDashboard" element={<SellerHome />} />
        <Route path="/addProducts" element={<AddProducts />} />
        <Route path="/editProduct/:id" element={<AddProducts />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/updateBidDetails"
          element={<UpdateAndDeleteBidDetails />}
        />
        <Route path="viewBuyerRequests" element={<ViewBuyerRequests />} />
        <Route path="profile" element={<UpdateProfile />} />
        <Route
          path="/changeSellerPassword"
          element={<ChangeSellerPassword />}
        />
        <Route path="/productBidDetails/:id" element={<ProductBid />} />
        <Route path="/viewBidPayments" element={<AllPayments />} />

        {/* -------------buyer --------------- */}
        {/* <Route path="/buyerNav" element={<BuyerNav />} /> */}
        {buyerToken ? (
          <Route path="/buyerDashboard" element={<BuyerHome />} />
        ) : (
          <Route path="*" element={<Home />} />
        )}
        <Route path="/buyerViewBidDetails" element={<BuyerViewBidDetails />} />
        <Route path="/your-bids" element={<YourBids />} />
        <Route path="/ViewBids/:id" element={<ViewBids />} />
        <Route path="/makeBidding" element={<MakeBidding />} />
        <Route path="/ifWin/:id" element={<IfWin />} />
        <Route path="/bidHistory" element={<BidHistory />} />
        <Route path="/buyerProfile" element={<BuyerProfile />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
