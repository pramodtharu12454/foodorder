import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserTable from "../user/schema.model.js";

export const isAdmin = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  try {
    const secretKey = "fs3rwfew4t35";
    const payload = jwt.verify(token, secretKey);

    const user = await UserTable.findOne({ email: payload.email });

    if (!user || user.role !== "admin") {
      return res.status(401).send({ message: "Unauthorized." });
    }

    req.loggedInUserId = user._id;
    next();
  } catch {
    return res.status(401).send({ message: "Unauthorized." });
  }
};
export const isUser = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  try {
    const secretKey = "fs3rwfew4t35";
    const payload = jwt.verify(token, secretKey);

    const user = await UserTable.findOne({ email: payload.email });

    if (!user) {
      return res.status(401).send({ message: "Unauthorized." });
    }

    req.loggedInUserId = user._id;
    next();
  } catch {
    return res.status(401).send({ message: "Unauthorized." });
  }
};
