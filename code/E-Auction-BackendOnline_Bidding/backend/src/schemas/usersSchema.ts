import mongoose from "mongoose";

// Helper function to convert UTC to IST
function toIST(date: Date) {
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
}
// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is Required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is Required"],
    unique: true,
  },
  password: { type: String, required: [true, "password is Required"] },
  role: {
    type: Number,
    enum: [1],
    default: 1,
  },
});

// Seller Schema
const sellerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is Required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is Required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is Required"] },
    phone: { type: String, required: true, unique: true },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    role: {
      type: Number,
      enum: [2],
      default: 2,
    },
  },
  {
    timestamps: { currentTime: () => toIST(new Date()) },
  }
);

// Buyer Schema
const buyerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is Required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is Required"],
      unique: true,
    },
    password: { type: String, required: [true, "password is Required"] },
    phone: { type: String, required: true, unique: true },
    role: {
      type: Number,
      enum: [3],
      default: 3,
    },
  },
  {
    timestamps: { currentTime: () => toIST(new Date()) },
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is Required"],
      unique: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    description: {
      type: String,
    },
    basicCost: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: { currentTime: () => toIST(new Date()) },
  }
);

const biddingSchema = new mongoose.Schema(
  {
    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    bidTime: {
      type: Date,
      default: () => new Date(),
    },
    isWinningBid: {
      type: Boolean,
      default: false,
    },
    paymentStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Payment Schema
const paymentSchema = new mongoose.Schema(
  {
    bidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bidding",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    cardHolder: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentmode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 1,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
const Seller = mongoose.model("Seller", sellerSchema);
const Buyer = mongoose.model("Buyer", buyerSchema);
const Product = mongoose.model("Product", productSchema);
const Bidding = mongoose.model("Bidding", biddingSchema);
const Payment = mongoose.model("Payment", paymentSchema);
const OTP = mongoose.model("OTP", otpSchema);
export { Admin, Seller, Buyer, Product, Bidding, Payment, OTP };
