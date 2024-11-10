import { Request, Response } from "express";
import otpGenerator from "otp-generator";
import { Buyer, Seller, OTP } from "../schemas/usersSchema";
import { sendOTPEmail } from "../utils/helpers";
import nodemailer from 'nodemailer'

// Helper function to generate and send OTP
const generateAndSendOTP = async (
  email,
  userModel,
  res
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
    SendForgotPassword(email, otp);
  }

  res.status(200).json({ message: "OTP sent successfully" });
};

// Sending OTP For Buyer
export const sendOTPForBuyer = async (
  req,
  res
 ) => {
  try {
    const { email } = req.body;
    await generateAndSendOTP(email, Buyer, res);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

// Sending OTP For Seller
export const sendOTPForSeller = async (
  req,
  res
 ) => {
  try {
    const { email } = req.body;
    await generateAndSendOTP(email, Seller, res);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};


// forgot password
// 1556575401
export const SendForgotPassword = async (email, otp) => {
  // Configure the transporter with your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cse.takeoff@gmail.com', // Your email here
      pass: 'digkagfgyxcjltup',      // Your email password here (use App Passwords for enhanced security)
    },
  });

  // Create the email content with the updated HTML structure for Online Bidding
  const mailOptions = {
    from: '"Online Bidding Support" <cse.takeoff@gmail.com>', // Sender address with a friendly name
    to: email, // Recipient's email address
    subject: 'Your OTP for Online Bidding Password Reset', // Subject line tailored for Online Bidding
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <!-- Header Section -->
        <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px;">
          <h2>Password Reset Request</h2>
        </div>

        <!-- Body Section -->
        <div style="background-color: white; padding: 20px; margin-top: 10px; border-radius: 5px;">
          <p>Dear Valued User,</p>
          <p>We received a request to reset your password for your Online Bidding account. To ensure the security of your account, please use the following One-Time Password (OTP) to reset your password:</p>

          <!-- OTP Display -->
          <div style="text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span>
          </div>

          <p>This OTP is valid for the next 15 minutes.</p>
          <p>If you did not request a password reset, please ignore this email or contact our support team immediately.</p>
          <p>Best regards,<br/>Online Bidding Team</p>
        </div>

        <!-- Footer Section -->
        <div style="text-align: center; margin-top: 20px; color: #777;">
          <p>&copy; ${new Date().getFullYear()} Online Bidding Service. All rights reserved.</p>
          <p>If you have any questions, feel free to <a href="mailto:support@onlinebidding.com" style="color: #007bff; text-decoration: none;">contact us</a>.</p>
        </div>
      </div>
    `,
  };

  try {
    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw new Error('Failed to send password reset email. Please try again later.');
  }
};
