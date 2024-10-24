import { Request, Response } from "express";
import otpGenerator from "otp-generator";
import { Buyer, Seller, OTP } from "../schemas/usersSchema";
import { sendOTPEmail } from "../utils/helpers";

// Helper function to generate and send OTP
const generateAndSendOTP = async (
  email: string,
  userModel: any,
  res: Response
) => {
  const findAccount = await userModel.findOne({ email });
  if (!findAccount) {
    return res
      .status(402)
      .send({ msg: "Email doesn't exist, please register" });
  }

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  // Ensure OTP is unique
  let result = await OTP.findOne({ otp });
  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    result = await OTP.findOne({ otp });
  }

  const otpPayload = { email, otp };
  const otpCreate = await OTP.create(otpPayload);

  if (otpCreate) {
    sendOTPEmail(email, otp);
  }

  res.status(200).json({ message: "OTP sent successfully" });
};

// Sending OTP For Buyer
export const sendOTPForBuyer = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    await generateAndSendOTP(email, Buyer, res);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};

// Sending OTP For Seller
export const sendOTPForSeller = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    await generateAndSendOTP(email, Seller, res);
  } catch (err: any) {
    return res.status(400).send({ error: err.message });
  }
};
