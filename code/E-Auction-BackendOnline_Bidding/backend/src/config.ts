import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB_URL:
    process.env.DB_URL ||
    "mongodb://root:root@192.168.1.85:27018/Online_Bidding?authSource=admin",
  SMTP_URL:
    process.env.SMTP_URL ||
    "smtps://no-reply@ymtsindia.com:Takeoff@123@mail.ymtsindia.com:465/?pool=true",
};
