import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  Admin,
  Bidding,
  Buyer,
  Payment,
  Product,
  Seller,
} from "../schemas/usersSchema";
import { comparePassword, hashPassword } from "../utils/helpers";
// Admin registering
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  //   const username=req.query.username;
  //   const password=req.query.password;
  //   const email = req.query.email;
  const data = matchedData(req);
  const { username, password, email } = data;
  if (!username || !password || !email) {
    return res
      .status(401)
      .send({ msg: "username and password and email are required" });
  }
  try {
    const user = await Admin.findOne({ username });
    if (user) return res.status(401).send({ msg: "User already exists" });

    const hashedPassword = hashPassword(password);

    const newUser = new Admin({
      username,
      password: hashedPassword,
      email,
    });

    const savedUser = await newUser.save();
    return res.status(201).send({
      msg: `Registered Successful  ✅.Pls login ${savedUser.username}`,
    });
  } catch (err: any) {
    return res.status(400).send({ error: err });
  }
};

// Login the Admin
export const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const pass = body.password;

    const findUser = await Admin.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!findUser) throw new Error("Admin not found");
    if (findUser.role !== 1) {
      throw new Error("Unauthorized: Admin access required");
    }
    if (!comparePassword(pass, findUser.password))
      throw new Error("Bad Credentials");
    const finalResult = findUser.toObject();
    const { password, ...withoutPassword } = finalResult;

    return res.send({ msg: "Login Successful", withoutPassword });
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

export const acceptSellersRegisters = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sellerid = req.params.id;
  try {
    const resultData = await Seller.findById(sellerid);
    if (!resultData) {
      return res
        .status(401)
        .send({ msg: "Data is not present with this sellerId" });
    }
    resultData.isAccepted = true;
    const finalResult = await resultData.save();
    const finaldata = finalResult.toObject();
    const { password, ...withoutPassword } = finaldata;
    res.send(withoutPassword);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Admin can View All Sellers
export const getAllSellers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allSellers = await Seller.find({}).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.send(allSellers);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Admin can View All Buyers
export const getAllBuyers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const allBuyers = await Buyer.find({}).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);

    res.send(allBuyers);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Helper function to get only the date in IST
const getDateIST = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-IN", options);
};

// Helper function to get only the time in IST
const getTimeIST = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleTimeString("en-IN", options);
};

// View Payment details
export const getAllPayments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payments = await Payment.find({}).populate(
      "buyerId",
      "username email phone"
    );

    // Use Promise.all to wait for all promises to resolve
    const finalResult = await Promise.all(
      payments.map(async (eachItem: any) => {
        const product = await Product.findOne({ _id: eachItem.bidId });
        const sellerDetails = await Seller.findOne({ _id: product?.sellerId });

        return {
          ...eachItem.toObject(),
          productName: product?.name,
          basicCost: product?.basicCost,
          sellerId: product?.sellerId,
          sellerName: sellerDetails?.username,
          sellerEmail: sellerDetails?.email,
          sellerPhone: sellerDetails?.phone,
          productStartDate: product?.startDate
            ? getDateIST(product.startDate)
            : null,
          productStartTime: product?.startDate
            ? getTimeIST(product.startDate)
            : null,
          productEndDate: product?.endDate ? getDateIST(product.endDate) : null,
          productEndTime: product?.endDate ? getTimeIST(product.endDate) : null,
        };
      })
    );
    if (finalResult.length === 0) {
      return res.send({ msg: "No payments Done Yet" });
    }
    res.send(finalResult);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// View Winners Details
export const viewWinnersDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const winnerBiddings = await Bidding.find({ isWinningBid: true }).populate(
      "buyerId",
      "username email phone"
    );
    const finalResult = await Promise.all(
      winnerBiddings.map(async (eachItem: any) => {
        const product = await Product.findOne({ _id: eachItem.bidId });
        const sellerDetails = await Seller.findOne({ _id: product?.sellerId });

        return {
          ...eachItem.toObject(),
          bidDate: getDateIST(eachItem.bidTime),
          bidTime: getTimeIST(eachItem.bidTime),
          productName: product?.name,
          basicCost: product?.basicCost,
          sellerName: sellerDetails?.username,
          sellerEmail: sellerDetails?.email,
          sellerPhone: sellerDetails?.phone,
          productStartDate: product?.startDate
            ? getDateIST(product.startDate)
            : null,
          productStartTime: product?.startDate
            ? getTimeIST(product.startDate)
            : null,
          productEndDate: product?.endDate ? getDateIST(product.endDate) : null,
          productEndTime: product?.endDate ? getTimeIST(product.endDate) : null,
        };
      })
    );
    if (finalResult.length === 0) {
      return res.send({ msg: "No payments Done Yet" });
    }
    res.send(finalResult);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};
