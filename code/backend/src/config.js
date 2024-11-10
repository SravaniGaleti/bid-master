import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB_URL:
    process.env.DB_URL ||
    "mongodb://localhost:27017/Online_Bidding?authSource=admin",
  SMTP_URL:
    process.env.SMTP_URL ||
    "smtps://narendrareddy8367@gmail.com:xjvwggokvbgcfxhx@smtp.gmail.com:465/?pool=true",
};
