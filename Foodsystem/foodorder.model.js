import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "french fries",
        "Samosa",
        "Chaumin",
        "Momo",
        "Sweets rasvari",
        "pizza",
        "paneer",
        "nan",
        "pakoda",
        "fruits slaad",
      ],
    },
    image: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    AdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductTable =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default ProductTable;
