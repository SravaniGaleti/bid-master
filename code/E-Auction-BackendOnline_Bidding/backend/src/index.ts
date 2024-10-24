import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import { ErrorHandler } from "./errors/globalError";
import router from "./routes/authRoutes";
import config from "./config";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send({
    health: "Good",
    msg: "welcome to BookIn Ease ",
  });
});

app.use("/api", router);
app.use("/public", express.static("public"));

app.use(ErrorHandler);

const PORT = config.PORT;
mongoose
  .connect(config.DB_URL)
  .then(() => {
    console.log("DataBase connected successfully");
    app.listen(PORT, () => {
      console.log(`Server Listening at the Port ${PORT}`);
    });
  })
  .catch((err) => console.log(`Error: ${err}`));

//   ADMIN GET ROUTE (To create admin)
// http://localhost:4000/api/admin/register?username=admin12&email=admin@gmail.com&password=admin@123
