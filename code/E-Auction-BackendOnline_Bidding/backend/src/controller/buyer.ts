import { Request, Response } from "express";
import mongoose from "mongoose";
import { matchedData } from "express-validator";
import { Bidding, Buyer, Product } from "../schemas/usersSchema";
import {
  comparePassword,
  hashPassword,
  sendBidNotificationEmails,
  sendBidSpecificEmail,
} from "../utils/helpers";
import moment from "moment-timezone";

// Seller registering
export const registerBuyer = async (
  req: Request,
  res: Response
): Promise<any> => {
  // const data = matchedData(req);
  const { username, email, password, phone } = req.body;
  try {
    const user = await Buyer.findOne({ username });

    if (user) return res.status(401).send({ msg: "User already exists" });

    const hashedPassword = hashPassword(password);

    const newUser = new Buyer({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    const savedUser = await newUser.save();
    return res.status(201).send({
      msg: `Registered Successful  ✅.Pls login ${savedUser.username}`,
    });
  } catch (err: any) {
    return res.status(400).send({ error: err });
  }
};

// Login the Buyer
export const buyerLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const pass = body.password;

    const findUser = await Buyer.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!findUser) {
      return res.status(400).send({ msg: "Buyer not found" });
    }
    if (findUser.role !== 3) {
      return res.status(402).send({ msg: "You are not a Buyer" });
    }
    if (!comparePassword(pass, findUser.password)) {
      return res.status(400).send({ msg: "Invalid Password" });
    }

    const { password, ...withoutPassword } = findUser.toObject();
    return res.send({ msg: "Login Successful", withoutPassword });
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Update the Password
export const updatePassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const body = req.body;
    const pass = body.password;
    const newpassword = body.newPassword;
    const user = await Buyer.findById(id);

    if (!user) {
      return res.status(400).send({ msg: "Buyer not found" });
    }

    const findUser = await Buyer.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!findUser) {
      return res.status(400).send({ msg: "Buyer not found" });
    }

    if (findUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Buyer not found" });
    }

    if (!comparePassword(pass, findUser.password)) {
      return res.status(400).send({ msg: "Invalid Password" });
    }

    const hashedPassword = hashPassword(newpassword);
    findUser.password = hashedPassword;

    await findUser.save();

    return res.send({ msg: "Password Updated Succesfully" });
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Get Single Buyer
export const getSingleBuyer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const buyerid = req.params.id;
    const buyer = await Buyer.findById(buyerid);
    if (!buyer) {
      return res.status(404).json({ msg: "Buyer not found" });
    }

    return res.status(200).json(buyer);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update the Profile

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const buyerid = req.params.id;
  const data = matchedData(req);
  const { username, email, phone } = data;

  try {
    const findUser = await Buyer.findById(buyerid);

    if (!findUser) {
      return res.status(404).json({ msg: "Buyer not found" });
    }

    findUser.username = username;
    findUser.email = email;
    findUser.phone = phone;
    // Save the updated details of seller to the database
    await findUser.save();
    return res.status(201).json({
      message: "Buyer Updated Successfully",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// View Products for Bidding
export const viewBiddingProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Get the current date and time in IST
    const currentDateTime = moment().tz("Asia/Kolkata").toDate();

    // Find all products where the end date is greater than the current date
    const biddingProducts = await Product.find({
      endDate: { $gt: currentDateTime },
    });

    if (biddingProducts.length === 0) {
      return res.send({
        msg: "No products are currently available for bidding.",
      });
    }

    // Format the dates for the response
    const formattedProducts = biddingProducts.map((product: any) => {
      const startDate = moment(product.startDate).tz("Asia/Kolkata");
      const endDate = moment(product.endDate).tz("Asia/Kolkata");

      return {
        ...product.toObject(), // Convert Mongoose document to plain object
        startDate: {
          date: startDate.format("DD/MM/YYYY"),
          time: startDate.format("hh:mm A"),
        },
        endDate: {
          date: endDate.format("DD/MM/YYYY"),
          time: endDate.format("hh:mm A"),
        },
      };
    });

    res.send(formattedProducts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// buyer can view all the bids completed and bid by him
export const viewCompletedBids = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const buyerId = req.params.buyerId;

    // Get the current date and time in IST
    const currentDateTime = moment().tz("Asia/Kolkata").toDate();

    // Find all products where the end date is greater than the current date
    const biddingProducts = await Product.find({
      endDate: { $lt: currentDateTime },
    });

    if (biddingProducts.length === 0) {
      return res.send({
        msg: "No products are currently available for bidding.",
      });
    }

    const bids = await Bidding.find({ buyerId }).populate("bidId");

    if (bids.length === 0) {
      return res.send({ msg: "No bids found for this product." });
    }

    const myProducts: any[] = [];

    for (let i of bids) {
      if (!myProducts.includes(i.bidId)) {
        myProducts.push(i.bidId);
      } else {
        continue;
      }
    }

    if (myProducts.length === 0) {
      return res.send({
        msg: "No products are currently available for bidding.",
      });
    }

    // Format the dates for the response
    const formattedProducts = myProducts.map((product: any) => {
      const startDate = moment(product.startDate).tz("Asia/Kolkata");
      const endDate = moment(product.endDate).tz("Asia/Kolkata");

      return {
        ...product.toObject(), // Convert Mongoose document to plain object
        startDate: {
          date: startDate.format("DD/MM/YYYY"),
          time: startDate.format("hh:mm A"),
        },
        endDate: {
          date: endDate.format("DD/MM/YYYY"),
          time: endDate.format("hh:mm A"),
        },
      };
    });

    res.send(formattedProducts);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Buyer can place the Bid
export const placeBid = async (req: Request, res: Response): Promise<any> => {
  const { productId, buyerId } = req.params;
  const { bidAmount } = req.body;

  try {
    const product: any = await Product.findById(productId);
    if (!product) {
      return res
        .status(400)
        .json({ msg: "Bidding has ended or product not found" });
    }

    if (bidAmount < product.basicCost) {
      return res.send({ msg: "Bid Amount cannot be less than the basicCost" });
    }

    // Create a new bid without checking for existing bids
    const newBid = new Bidding({
      bidId: productId,
      buyerId,
      bidAmount,
    });

    const savedBid = await newBid.save();

    // Format the bid date and time
    const bidTimeIST = moment(savedBid.createdAt).tz("Asia/Kolkata");
    const formattedDate = bidTimeIST.format("DD/MM/YYYY");
    const formattedTime = bidTimeIST.format("hh:mm A");

    const getSpecificEmail: any = await Bidding.findOne({
      bidId: productId,
      buyerId: buyerId,
    })
      .populate("buyerId")
      .populate("bidId");
    if (getSpecificEmail) {
      const email = getSpecificEmail.buyerId?.email;
      const username = getSpecificEmail.buyerId?.username;
      const productname = getSpecificEmail.bidId?.name;
      const basicCost = getSpecificEmail.bidId?.basicCost;
      sendBidSpecificEmail(email, username, bidAmount, productname, basicCost);
    }
    if (getSpecificEmail) {
      const productname = getSpecificEmail.bidId?.name;
      const basicCost = getSpecificEmail.bidId?.basicCost;
      sendBidNotificationEmails(
        productId,
        buyerId,
        bidAmount,
        productname,
        basicCost
      );
    }
    res.status(201).json({
      msg: "Bid placed successfully",
      bid: {
        ...savedBid.toObject(),
        bidDate: formattedDate,
        bidTime: formattedTime,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Function to get the most recent bid for a buyer
export const getLatestBid = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { productId, buyerId } = req.params;

  try {
    const latestBid = await Bidding.findOne({ bidId: productId, buyerId }).sort(
      { createdAt: -1 }
    ); // Sort to get the most recent bid

    if (!latestBid) {
      return res.status(404).json({ msg: "No bids found for this product." });
    }

    // Format the bid date and time
    const bidTimeIST = moment(latestBid.createdAt).tz("Asia/Kolkata");
    const formattedDate = bidTimeIST.format("DD/MM/YYYY");
    const formattedTime = bidTimeIST.format("hh:mm A");

    res.status(200).json({
      msg: "Latest bid retrieved successfully",
      bid: {
        ...latestBid.toObject(),
        bidDate: formattedDate,
        bidTime: formattedTime,
      },
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Buyer can view all bids for a specific product, but only the most recent bid per buyer
export const viewBids = async (req: Request, res: Response): Promise<any> => {
  const { productId } = req.params;

  try {
    // Find all bids for the specific product, sort them by creation date (most recent first)
    console.log(productId);
    
    const bids = await Bidding.find({ bidId: productId })
      .populate("buyerId", "username email")
      .sort({ createdAt: -1 }); // Sort by most recent
console.log(bids , "pavan");

   

    const product = await Product.findById({_id:productId});
    console.log("ded ",product)
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
   

    // Create a map to keep track of the most recent bid per buyer
    const uniqueBids = new Map();

    for (const bid of bids) {
      if (!uniqueBids.has(bid.buyerId.toString())) {
        // Only add the bid if it's the first one for this buyer (since bids are sorted by creation date)
        uniqueBids.set(bid.buyerId.toString(), bid);
      }
    }

    // Convert the map to an array and format the bid date and time for each bid
    const formattedBids = Array.from(uniqueBids.values()).map((bid) => {
      const bidTimeIST = moment(bid.createdAt).tz("Asia/Kolkata");
      return {
        ...bid.toObject(),
        bidDate: bidTimeIST.format("DD/MM/YYYY"),
        bidTime: bidTimeIST.format("hh:mm A"),
      };
    });

    res.status(200).json({
      msg: "Bids retrieved successfully",
      product: product,
      bids: formattedBids,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const viewBidHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const buyerid = req.params.buyerId;
  try {
    const result = await Bidding.find({ buyerId: buyerid }).populate(
      "bidId",
      "name"
    );
    res.send(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update the Bidding Details
export const updateBiddingDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { bidId, buyerId } = req.params;
  const { bidAmount } = req.body;

  try {
    const findUser = await Bidding.findOne({ bidId: bidId, buyerId: buyerId });

    if (!findUser) {
      return res.status(404).json({ msg: "Buyer not found" });
    }

    findUser.bidAmount = bidAmount;
    // Save the updated details of Buyer to the database
    await findUser.save();
    return res.status(201).json({
      message: "Buyer Bid Updated Successfully",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Buyer can view All their Bidding Products
export const viewMyProductBiddingHistory = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { productId, buyerId } = req.params;
  console.log(productId, buyerId, " productId, buyerId");

  try {
    const result = await Bidding.find({ bidId: productId, buyerId: buyerId })
      .populate("bidId", "name basicCost")
      .sort({ createdAt: -1 });

    if (result.length === 0) {
      return res.send({ msg: "You have no bidding History" });
    }

    // Format createdAt for each bid in the result array
    const formattedResult = result.map((bid) => {
      const bidTimeIST = moment(bid.createdAt).tz("Asia/Kolkata");
      const formattedDate = bidTimeIST.format("DD/MM/YYYY");
      const formattedTime = bidTimeIST.format("hh:mm A");

      return {
        ...bid.toObject(),
        bidDate: formattedDate,
        bidTime: formattedTime,
      };
    });

    // Send the formatted result
    res.status(200).json({
      msg: "Bidding history retrieved successfully",
      bids: formattedResult,
    });

    console.log(result, "result");
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// He is already Bidded or Not
export const isBiddedOrNot = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { productId, buyerId } = req.params;
  try {
    const result = await Bidding.find({ bidId: productId, buyerId: buyerId });
    if (result.length === 0) {
      return res.send({ isAlreadyBidded: false });
    } else {
      return res.send({ isAlreadyBidded: true });
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
