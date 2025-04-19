// product.validation.js
import * as yup from "yup";

export const productSchema = yup.object({
  name: yup.string().max(255).required(),
  price: yup.number().min(0).required(),
  quantity: yup.number().min(1).required(),
  category: yup
    .string()
    .oneOf([
      "french fries",
      "Samosa",
      "Chaumin",
      "Momo",
      "Sweets rasvari",
      "pizza",
      "paneer",
      "nan",
      "pakoda",
      "fruit salad",
    ])
    .required(),
  image: yup.string().nullable(),
  description: yup.string().min(10).max(1000).required(),
});
