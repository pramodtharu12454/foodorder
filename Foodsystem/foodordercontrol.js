import express from "express";
import { productSchema } from "./product.validation.js";
import Product from "../models/product.model.js";
import { isAdmin, isUser } from "../middleware/authentication.middleware.js";
import { validateMongoIdFromReqParams } from "../middleware/validate.mongo.id.js";
import validateReqBody from "../middleware/validate.reqbody.middleware.js";
import { paginationSchema } from "../shared/paginationschema.js";

const router = express.Router();

// Add food by admin
router.post(
  "/food/add",
  isAdmin,
  validateReqBody(productSchema),
  async (req, res) => {
    const newProduct = req.body;
    const AdminId = req.loggedInUserId;
    await Product.create({ ...newProduct, AdminId });
    return res.status(201).send({ message: "Food added successfully." });
  }
);

// Get food detail by ID
router.get(
  "/food/detail/:id",
  isUser,
  validateMongoIdFromReqParams,
  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Food not found." });
    }
    return res.status(200).send({ message: "success", foodDetails: product });
  }
);

// List food for users with pagination
router.post(
  "/food/list",
  isUser,
  validateReqBody(paginationSchema),
  async (req, res) => {
    const { limit, page } = req.body;
    const skip = (page - 1) * limit;
    const products = await Product.find({}).skip(skip).limit(limit);
    const totalItems = await Product.countDocuments();
    const totalPage = Math.ceil(totalItems / limit);
    return res
      .status(200)
      .send({ message: "success", foodList: products, totalPage });
  }
);

// Delete food by admin
router.delete(
  "/food/delete/:id",
  isAdmin,
  validateMongoIdFromReqParams,
  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Food not found." });
    }
    const isOwner =
      product.AdminId.toString() === req.loggedInUserId.toString();
    if (!isOwner) {
      return res.status(403).send({ message: "Unauthorized action." });
    }
    await Product.deleteOne({ _id: productId });
    return res.status(200).send({ message: "Food deleted successfully." });
  }
);

// Update food by admin
router.put(
  "/food/edit/:id",
  isAdmin,
  validateMongoIdFromReqParams,
  validateReqBody(productSchema),
  async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    await Product.updateOne({ _id: productId }, { $set: updatedData });
    return res.status(200).send({ message: "Food updated successfully." });
  }
);

export { router as foodController };
