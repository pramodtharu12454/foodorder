import express from "express";
import UserTable from "./schema.model.js";
const router = express.Router();

router.post("/user/register", (req, res) => {
  async (req, res) => {
    const newUser = req.body;
    await UserTable.create(newUser);
    return res.status(201).send({ message: "registered...." });
  };
});

router.post("/user/login", (req, res) => {
  return res.status(201).send({ message: "login successful...." });
});

export { router as userController };
