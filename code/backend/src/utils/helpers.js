import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import fs from "fs";
import config from "../config";
import { Bidding } from "../schemas/usersSchema";
import { log } from "console";
const saltRounds = 10;

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);

// Send OTP email verification for forgot password
export const sendOTPEmail = async (email, OTP) => {
  // Read email template from file
  let template = fs.readFileSync(
    "./src/templates/OTP-Verification.html",
    "utf8"
  );
  console.log("Inside the OTP SENDING Email");
  template = template.replace("{{otp}}", OTP);
  const transporter = nodemailer.createTransport(config.SMTP_URL, {});

  const mailOptions = {
    from: process.env.MAIL_FROM || "no-reply@yourapp.com",
    to: email,
    subject: `OTP`,
    html: template,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Sending Make a bid email for  a buyer
export const sendBidSpecificEmail = async (
  email,
  username,
  bidAmount,
  productname,
  basicCost
) => {
  // Read email template from file
  let template = fs.readFileSync(
    "./src/templates/BiddingSpecific.html",
    "utf8"
  );

  // Replace placeholders with actual values
  template = template
    .replace("{{username}}", username)
    .replace("{{bidAmount}}", bidAmount.toString())
    .replace("{{productname}}", productname)
    .replace("{{currentProduct}}", productname)
    .replace("{{basicCost}}", basicCost.toString());

  const transporter = nodemailer.createTransport(config.SMTP_URL, {});

  const mailOptions = {
    from: process.env.MAIL_FROM || "no-reply@yourapp.com",
    to: email,
    subject: `Your Bid on ${productname}`,
    html: template,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};





export const sendBidNotificationEmails = async (
  productId,
  currentBuyerId,
  bidAmount,
  productname,
  basicCost
) => {
  try {
    console.log("Inside send bid notifications");

    // Get all bids for the product except the current buyer
    const allBids = await Bidding.find({
      bidId: productId,
      buyerId: { $ne: currentBuyerId },
    })
      .populate("buyerId", "email username")
      .sort({ createdAt: -1 });

    if (!allBids.length) {
      console.log("No other bidders to notify.");
      return;
    }

    // Create a map to keep track of the most recent bid per buyer
    const uniqueBidders = new Map();

    for (const bid of allBids) {
      if (!uniqueBidders.has(bid.buyerId._id.toString())) {
        uniqueBidders.set(bid.buyerId._id.toString(), bid.buyerId);
      }
    }

    // Prepare email transporter
    const transporter = nodemailer.createTransport(config.SMTP_URL, {});

    // Read email template from file
    let template = fs.readFileSync("./src/templates/BidAllMails.html", "utf8");

    // Prepare email sending promises for each unique bidder
    const emailPromises = Array.from(uniqueBidders.values()).map(
      async (bidder) => {
        const email = bidder.email;
        const username = bidder.username;

        let personalizedTemplate = template
          .replace("{{username}}", username)
          .replace("{{productname}}", productname)
          .replace("{{bidAmount}}", bidAmount.toString())
          .replace("{{basicCost}}", basicCost.toString());

        const mailOptions = {
          from: process.env.MAIL_FROM || "no-reply@yourapp.com",
          to: email,
          subject: `A New Bid Has Been Placed on ${productname}`,
          html: personalizedTemplate,
        };

        try {
          // Send email
          await transporter.sendMail(mailOptions);
          console.log(`Notification email sent to ${email}`);
        } catch (error) {
          console.error(`Error sending email to ${email}:`, error);
        }
      }
    );

    console.log("Email promises created:", emailPromises.length);

    // Send all emails concurrently
    await Promise.all(emailPromises);
    console.log("Notification emails sent to all other unique bidders.");
  } catch (error) {
    console.error("Error fetching emails or sending notifications:", error);
  }
};




// Function to send email to User when his/her Registration Successfull
export const sendRegistrationEmail = async (email, name) => {
  console.log("dedededee  ", email, name);

  // Read email template from file
  let template = fs.readFileSync(
    "./src/templates/Registration.html",
    "utf8"
  );
  console.log("Inside the Registration Email");

  template = template.replace("{{name}}", name);

  const transporter = nodemailer.createTransport(config.SMTP_URL, {});

  const mailOptions = {
    from: process.env.MAIL_FROM || "no-reply@yourapp.com",
    to: email,
    subject: `Your Registration Successful`,
    html: template,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};