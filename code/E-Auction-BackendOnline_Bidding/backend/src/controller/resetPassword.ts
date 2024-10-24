import { Request, Response } from "express";
import { Buyer, Seller, OTP } from "../schemas/usersSchema";
import { hashPassword } from "../utils/helpers";

const verifyOTPAndChangePassword = async (
  email: string,
  otp: string,
  password: string,
  userModel: any
) => {
  const findAccount = await OTP.find({ email })
    .sort({ createdAt: -1 })
    .limit(1);
  if (findAccount.length === 0) {
    return {
      success: false,
      msg: "This OTP has expired, please regenerate OTP",
    };
  }

  const generatedOtp = findAccount[0].otp;
  if (Number(generatedOtp) !== Number(otp)) {
    return { success: false, msg: "OTP Verification failed" };
  }

  const account = await userModel.findOne({ email });
  if (!account) {
    return { success: false, msg: "This email is not registered" };
  }

  account.password = hashPassword(password);
  await account.save();
  return { success: true, msg: "Password Changed Successfully" };
};

export const buyerOTPverification = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, otp, password } = req.body;
  try {
    const result = await verifyOTPAndChangePassword(
      email,
      otp,
      password,
      Buyer
    );
    if (!result.success) {
      return res.status(400).send({ msg: result.msg });
    }
    return res.send({ msg: result.msg });
  } catch (err: any) {
    return res.status(500).send({ error: err.message });
  }
};

export const sellerOTPverification = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, otp, password } = req.body;
  try {
    const result = await verifyOTPAndChangePassword(
      email,
      otp,
      password,
      Seller
    );
    if (!result.success) {
      return res.status(400).send({ msg: result.msg });
    }
    return res.send({ msg: result.msg });
  } catch (err: any) {
    return res.status(500).send({ error: err.message });
  }
};
