import { matchedData, validationResult } from "express-validator";
import { Bidding, Product, Seller } from "../schemas/usersSchema";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../utils/helpers";
import moment from "moment-timezone";
// Seller registering
export const registerSeller = async (
  req: Request,
  res: Response
): Promise<any> => {
  // const data = matchedData(req.);
  const { username, email, password, phone } = req.body;
  try {
    const user = await Seller.findOne({ username });
    ``;
    if (user) return res.status(401).send({ msg: "User already exists" });

    const hashedPassword = hashPassword(password);

    const newUser = new Seller({
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

// Login the Seller
export const sellerLogin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const body = req.body;
    const pass = body.password;

    const findUser = await Seller.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!findUser) {
      return res.status(400).send({ msg: "Seller not found" });
    }

    if (!comparePassword(pass, findUser.password)) {
      return res.status(400).send({ msg: "Invalid Password" });
    }

    if (findUser.role !== 2) {
      return res.status(402).send({ msg: "You are not a Seller" });
    }

    if (!findUser.isAccepted) {
      return res.status(402).send({
        msg: "Wait for Admin Approval or your registered status was rejected",
      });
    }

    const { password, ...withoutPassword } = findUser.toObject();
    return res.send({ msg: "Login Successful", withoutPassword });
  } catch (err: any) {
    return res.status(400).send({ msg: err.message });
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

    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(400).send({ msg: "Seller not found" });
    }

    const findUser = await Seller.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!findUser) {
      return res.status(400).send({ msg: "Seller not found" });
    }

    if (findUser._id.toString() !== id) {
      return res.status(400).send({ msg: "Seller not found" });
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
export const getSingleSeller = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sellerid = req.params.id;
  try {
    const seller = await Seller.findById(sellerid);
    if (!seller) {
      return res.send({ msg: "Seller not found" });
    }
    return res.send(seller);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

// Update the Profile

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sellerid = req.params.id;
  // const data = matchedData(req);
  const { username, email, phone } = req.body;

  try {
    const findUser = await Seller.findById(sellerid);

    if (!findUser) {
      return res.status(400).json({ msg: "Seller not found" });
    }
    findUser.username = username;
    findUser.email = email;
    findUser.phone = phone;
    // Save the updated details of seller to the database
    await findUser.save();
    return res.status(201).json({
      msg: "Seller Updated Successfully",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.msg });
  }
};

// Seller can add the Product
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  const sellerid = req.params.id;
  try {
    const { name, description, basicCost, startDate, endDate } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Create a new Placement instance
    const newTest = new Product({
      name,
      sellerId: sellerid,
      description,
      basicCost,
      startDate,
      endDate,
      picture: req.file.path,
    });

    console.log(newTest);
    
    // Save the new Test to the database
    const savedTest = await newTest.save();
    return res.status(201).json({
      message: "Product added successfully",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Seller can view the single Product
export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.send({ msg: "Product not found" });
    }

    res.send(product);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Seller can update their Product
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const productId = req.params.id;
  const { name, description, basicCost, startDate, endDate } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) throw new Error("Product not found");

    // Update product details
    product.name = name || product.name;
    product.description = description || product.description;
    product.basicCost = basicCost || product.basicCost;
    product.startDate = startDate || product.startDate;
    product.endDate = endDate || product.endDate;

    // Handle file upload if a new picture is provided
    if (req.file) {
      product.picture = req.file.path;
    }

    // Save the updated product to the database
    await product.save();
    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Seller can delete the Product
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  const productId = req.params.id;
  try {
    await Product.findByIdAndDelete(productId);
    res.send({ msg: "Deleted Successfully" });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Seller can View Their Products

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  const sellerid = req.params.id;
  try {
    const result = await Product.find({ sellerId: sellerid });

    if (result.length === 0) {
      return res.send({ msg: "You didn't add any products" });
    }

    // Format the dates to AM/PM in IST using moment
    const formattedProducts = result.map((product) => {
      const startDate = moment(product.startDate).tz("Asia/Kolkata");
      const endDate = moment(product.endDate).tz("Asia/Kolkata");

      return {
        ...product.toObject(), // Convert Mongoose document to plain object
        startDate: {
          date: startDate.format("DD/MM/YYYY"), // Separate date
          time: startDate.format("hh:mm A"), // Separate time
        },
        endDate: {
          date: endDate.format("DD/MM/YYYY"), // Separate date
          time: endDate.format("hh:mm A"), // Separate time
        },
      };
    });
    res.send(formattedProducts);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};

// Seller can view all the winners and losers details
export const getWinnersLosers = async (
  req: Request,
  res: Response
): Promise<any> => {
  const bidid = req.params.productId;
  try {
    const result = await Bidding.find({ bidId: bidid })
      .sort({ bidAmount: -1, createdAt: 1 })
      .populate("buyerId", "username email phone");

    if (result.length === 0) {
      return res.send({ msg: "Bidding is still ongoing" });
    }
    res.send(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
