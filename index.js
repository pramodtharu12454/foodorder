import express from "express";
import mongoose from "mongoose";
import connectDB from "./user/dbconnection.js";
import { userController } from "./user/usercontroller.js";

const app = express();

app.use(express.json());

app.use(userController);

connectDB();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`this server is running in ${PORT}`);
});
