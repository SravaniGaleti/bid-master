import axiosapi from "./config";

// ---------------------admin routes -------------------------
// admin login route
export const adminLogin = async (data) => {
  const res = await axiosapi.post("admin/login", data);
  return res.data;
};

// seller approve route
export const sellerApproval = async (id) => {
  const res = await axiosapi.patch(`sellers/changeStatus/${id}`);
  return res.data;
};

//all sellers
export const allSellers = async () => {
  const res = await axiosapi.get("view/allsellers");
  return res.data;
};

//all buyers
export const allBuyers = async () => {
  const res = await axiosapi.get("view/allbuyers");
  return res.data;
};

//all products
export const allProducts = async () => {
  const res = await axiosapi.get("view/allproducts");
  return res.data;
};

//all bids
export const allBids = async () => {
  const res = await axiosapi.get("view/allbids");
  return res.data;
};

//all winners
export const allWinners = async () => {
  const res = await axiosapi.get("winnerdetails");
  return res.data;
};

//all payments
export const allBidPayments = async () => {
  const res = await axiosapi.get("getAllPayments");
  return res.data;
};

//------------------------ buyer routes ----------------------------
// buyer registration route
export const buyerRegistration = async (data) => {
  const res = await axiosapi.post("buyer/register", data);
  return res.data;
};

//buyer Login
export const buyerLogin = async (data) => {
  const res = await axiosapi.post("buyer/login", data);
  return res.data;
};

// buyer all products
export const buyerBidProducts = async () => {
  const res = await axiosapi.get("buyer/viewproducts/online");
  return res.data;
};

//buyer bid products
export const buyerBidProduct = async (id) => {
  const res = await axiosapi.get(`buyer/viewcompletedbids/${id}`);
  return res.data;
};

// winner products
export const winnerProducts = async (id) => {
  const res = await axiosapi.get(`product/finalize-bidding/${id}`);
  return res.data;
};

// view bidding history
export const ViewBiddingHistory = async (id) => {
  const res = await axiosapi.get(`getbidhistory/${id}`);
  return res.data;
};

// see all bids on a product
export const viewBids = async (id) => {
  const res = await axiosapi.get(`product/bids/${id}`);
  return res.data;
};

// place a bid
export const placeBid = async (data, id, buyerId) => {
  const res = await axiosapi.post(`bidding/${id}/${buyerId}`, data);
  return res.data;
};

// get buyer profile
export const buyerProfile = async (id) => {
  const res = await axiosapi.get(`buyer/${id}`);
  return res.data;
};

// buyer update profile
export const updateProfile = async (data, id) => {
  const res = await axiosapi.post(`buyer/updateprofile/${id}`, data);
  return res.data;
};

// buyer change password
export const changeBuyerPassword = async (data, id) => {
  const res = await axiosapi.patch(`buyer/updatepassword/${id}`, data);
  return res.data;
};

// make payments
export const makePayment = async (data, id, buyerId) => {
  const res = await axiosapi.post(`payment/${id}/${buyerId}`, data);
  return res.data;
};

//---------------------seller routes---------------------------
// seller registration route
export const sellerRegistration = async (data) => {
  const res = await axiosapi.post("seller/register", data);
  return res.data;
};

//seller Login
export const sellerLogin = async (data) => {
  const res = await axiosapi.post("seller/login", data);
  return res.data;
};

// get seller all products
export const sellerProducts = async (id) => {
  const res = await axiosapi.get(`seller/getproducts/${id}`);
  return res.data;
};

// add products
export const addProducts = async (data, id) => {
  const res = await axiosapi.post(`seller/addproduct/${id}`, data);
  return res.data;
};

// single product
export const singleProduct = async (id) => {
  const res = await axiosapi.get(`seller/viewproduct/${id}`);
  return res.data;
};

//delete product
export const deleteProduct = async (id) => {
  const res = await axiosapi.delete(`seller/deleteproduct/${id}`);
  return res.data;
};

//update product
export const updateproduct = async (data, id) => {
  const res = await axiosapi.put(`seller/updateproduct/${id}`, data);
  return res.data;
};

//get seller profile
export const sellerProfile = async (id) => {
  const res = await axiosapi.get(`seller/${id}`);
  return res.data;
};

//update profile
export const updateSellerProfile = async (data, id) => {
  const res = await axiosapi.post(`seller/updateprofile/${id}`, data);
  return res.data;
};

//change password
export const changeSellerPassword = async (data, id) => {
  const res = await axiosapi.patch(`seller/updatepassword/${id}`, data);
  return res.data;
};

//Bid History
export const BidHistory = async (Buyer, product) => {
  const res = await axiosapi.get(`bidhistory/${product}/${Buyer}`);
  return res.data;
};

//Bid Exist
export const BidExist = async (product, Buyer) => {
  const res = await axiosapi.get(`bidded/${product}/${Buyer}`);
  return res.data;
};
//get bid winners
export const bidWinners = async (id) => {
  const res = await axiosapi.get(`getwinnerslosers/${id}`);
  return res.data;
};

//fetch payments
export const fetchPayments = async (id) => {
  const res = await axiosapi.get(`getpayments/${id}`);
  return res.data;
};

//forget password buyer
export const ForgetBuyer = async (email) => {
  const res = await axiosapi.post(`buyer/sendotp`, { email: email });
  return res.data;
};

//forget password Seller
export const ForgetSeller = async (email) => {
  const res = await axiosapi.post(`seller/sendotp`, { email: email });
  return res.data;
};

//forget password buyer
export const ForgetBuyerChange = async (email, otp, password) => {
  console.log(email, otp, password);
  const res = await axiosapi.post(`buyerotpverify`, {
    email: email,
    otp: otp,
    password: password,
  });
  return res.data;
};

//forget password Seller
export const ForgetSellerChange = async (email, otp, password) => {
  const res = await axiosapi.post(`sellerotpverify`, {
    email: email,
    otp: otp,
    password: password,
  });
  return res.data;
};
