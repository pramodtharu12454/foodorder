import express from "express";
const router = express.Router();

router.post("/user/register", (req, res) => {
  return res.status(201).send({ message: "registered...." });
});

router.post("/user/login", (req, res) => {
  return res.status(201).send({ message: "login successful...." });
});

export { router as userController };
