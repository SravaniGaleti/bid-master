import express from "express";
import { checkSchema } from "express-validator";
import * as adminController from "../controller/admin";
import {
  AdminRegisterValidation,
  userValidation,
} from "../validation/usersValidation";
import * as sellerController from "../controller/seller";
import * as buyerController from "../controller/buyer";
import * as biddingController from "../controller/bidding";
import * as paymentController from "../controller/payment";
import { upload } from "../middlewares/multermiddleware";
import {
  sendOTPForBuyer,
  sendOTPForSeller,
} from "../controller/forgotPassword";
import {
  buyerOTPverification,
  sellerOTPverification,
} from "../controller/resetPassword";
const router = express.Router();

// Admin Register
router.get(
  "/admin/register",
  checkSchema(AdminRegisterValidation),
  adminController.registerAdmin
);
// Admin Login
router.post("/admin/login", adminController.adminLogin);

// Seller Register
router.post(
  "/seller/register",
  checkSchema(userValidation),
  sellerController.registerSeller
);

//get single seller
router.get("/seller/:id", sellerController.getSingleSeller);

// Update the Seller Profile
router.post(
  "/seller/updateprofile/:id",
  checkSchema(userValidation),
  sellerController.updateProfile
);
// Seller Login
router.post("/seller/login", sellerController.sellerLogin);

// Seller Update Password
router.patch("/seller/updatepassword/:id", sellerController.updatePassword);
// Buyer Register
router.post(
  "/buyer/register",
  checkSchema(userValidation),
  buyerController.registerBuyer
);

//get single buyer
router.get("/buyer/:id", buyerController.getSingleBuyer);

// Update the Buyer Profile
router.post(
  "/buyer/updateprofile/:id",
  checkSchema(userValidation),
  buyerController.updateProfile
);

// Buyer Update the Password
router.patch("/buyer/updatepassword/:id", buyerController.updatePassword);

// Buyer Login
router.post("/buyer/login", buyerController.buyerLogin);

// Admin can Accept Sellers (after register the sellers accept that accout the status isAccepted to true)
router.patch(
  "/sellers/changeStatus/:id",
  adminController.acceptSellersRegisters
);

// Admin can view All Sellers
router.get("/view/allsellers", adminController.getAllSellers);
// Admin can view All Buyers
router.get("/view/allbuyers", adminController.getAllBuyers);

// The seller can Add the Products
router.post(
  "/seller/addproduct/:id",
  upload.single("picture"),
  sellerController.addProduct
);

// Seller can view the single Product
router.get("/seller/viewproduct/:id", sellerController.getSingleProduct);

// Seller can get their Products
router.get("/seller/getproducts/:id", sellerController.getProducts);
// Seller can delete the Product
router.delete("/seller/deleteproduct/:id", sellerController.deleteProduct);
// Seller can Update the Product Based On ProductId
router.put(
  "/seller/updateproduct/:id",
  upload.single("picture"),
  sellerController.updateProduct
);

// Buyer can view All the Bidding Products
router.get("/buyer/viewproducts/online", buyerController.viewBiddingProducts);

//Buyer can view all the bidding completed by him
router.get(
  "/buyer/viewcompletedbids/:buyerId",
  buyerController.viewCompletedBids
);

// Buyer can view all the bids based on productId
router.get("/product/bids/:productId", buyerController.viewBids);
// Buyer can get their bidding history based on buyerid and ProductId
router.get(
  "/bidhistory/:productId/:buyerId",
  buyerController.viewMyProductBiddingHistory
);

// Already bidded or not (true or false)
router.get("/bidded/:productId/:buyerId", buyerController.isBiddedOrNot);
// Place a Bid(Buyer can place the  bid)
router.post("/bidding/:productId/:buyerId", buyerController.placeBid);

// Finalize the Bidding
router.get(
  "/product/finalize-bidding/:productId",
  biddingController.finalizeBidding
);

// The Winner can make the Payment
router.post("/payment/:bidId/:buyerId", paymentController.makePayment);

// Seller can view the Payments
router.get("/getpayments/:bidId", paymentController.viewBidPayments);

// Buyer can view their bid History
router.get("/getbidhistory/:buyerId", buyerController.viewBidHistory);

// Get winners and losers by seller
router.get("/getwinnerslosers/:productId", sellerController.getWinnersLosers);

// Get All Payments
router.get("/getAllPayments", adminController.getAllPayments);

// View Winners Details
router.get("/winnerdetails", adminController.viewWinnersDetails);

// Update the Bid Product
router.patch(
  "/updatebid/:bidId/:buyerId",
  buyerController.updateBiddingDetails
);

// Send OTP
router.post("/buyer/sendotp", sendOTPForBuyer);
// Buyer OTP
router.post("/seller/sendotp", sendOTPForSeller);

// Buyer OTP verififcation
router.post("/buyerotpverify", buyerOTPverification);
// Seller OTP verififcation
router.post("/sellerotpverify", sellerOTPverification);
export default router;
